import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Position, SquareValue } from '../types'


type GameProviderProps = {
  children: React.ReactNode
}

type Winner = SquareValue | undefined

type GameStates = {
  currentTurn: number
  currentSquareValue: SquareValue
  isRunning: boolean
  winner: Winner
}

type GameActions = {
  onNextTurn: () => void
  addUserSelectedSquare: (position: Position) => void
}

type GameProviderData = [
  state: GameStates,
  actions: GameActions,
]

const MINIMUM_NUMBER_OF_SQUARES_TO_FINISH_THE_GAME = 5
const NUMBER_OF_SQUARES_WITH_SAME_VALUE_TO_FINISH_THE_GAME = 3

const ENDGAME_INDEX_SET = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
]


export const GameContext = createContext<GameProviderData | null>(null)

export const GameProvider: React.FC<GameProviderProps> = ({
  children
}) => {
  const [isRunning, setIsRunning] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [currentSquareValue, setCurrentSquareValue] = useState<SquareValue>(SquareValue.X)
  const [selectedSquares, setSelectedSquares] = useState(new Array(9).fill(undefined))
  const [winner, setWinner] = useState<Winner>()


  const changeCurrentSquareValue = useCallback(() => {
    if (currentTurn % 2 === 0)
      return setCurrentSquareValue(SquareValue.O)

    setCurrentSquareValue(SquareValue.X)
  }, [currentTurn])

  useEffect(() => {
    changeCurrentSquareValue()
  }, [changeCurrentSquareValue])


  const finishGame = useCallback((winnerValue?: Winner) => {
    stopGame()
    defineWinner(winnerValue)
  }, [])

  const verifyGameOver = useCallback((indexers: number[]) => {
    const filteredList = selectedSquares
      .filter((value, index) => indexers.includes(index) && value)

    if (
      filteredList.length <
      NUMBER_OF_SQUARES_WITH_SAME_VALUE_TO_FINISH_THE_GAME)
      return false

    const gameOver = filteredList
      .every((value, _, array) => value === array[0])

    return gameOver

  }, [selectedSquares])

  useEffect(() => {
    const quantityOfSelectedSquares = selectedSquares.filter(square => square).length

    if (quantityOfSelectedSquares >= MINIMUM_NUMBER_OF_SQUARES_TO_FINISH_THE_GAME) {
      const setIndexes = ENDGAME_INDEX_SET.find(verifyGameOver)

      if (!setIndexes && quantityOfSelectedSquares === selectedSquares.length)
        return finishGame()

      if (setIndexes) {
        const [firstIndex] = setIndexes
        const squareValue = selectedSquares[firstIndex]
        return finishGame(squareValue)
      }

    }

  }, [selectedSquares, finishGame, verifyGameOver])



  const stopGame = () => setIsRunning(false)
  const defineWinner = (winnerValue: Winner) => setWinner(winnerValue)


  const addUserSelectedSquare = (position: Position) => {
    const selectedSquaresAux = [...selectedSquares]
    const index = position - 1
    selectedSquaresAux[index] = currentSquareValue.toString()

    setSelectedSquares(selectedSquaresAux)
  }

  const onNextTurn = () => {
    setCurrentTurn(prevValue => ++prevValue)
  }

  return (
    <GameContext.Provider
      children={children}
      value={[
        {
          currentTurn,
          currentSquareValue,
          isRunning,
          winner
        },
        {
          onNextTurn,
          addUserSelectedSquare
        }
      ]}
    />

  )
}