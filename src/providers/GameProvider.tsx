import React, { createContext, useEffect, useState } from 'react'
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

export const GameContext = createContext<GameProviderData | null>(null)

export const GameProvider: React.FC<GameProviderProps> = ({
  children
}) => {
  const [isRunning, setIsRunning] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(1)
  const [currentSquareValue, setCurrentSquareValue] = useState<SquareValue>(SquareValue.X)
  const [selectedSquares, setSelectedSquares] = useState(new Array(9).fill(undefined))
  const [winner, setWinner] = useState<Winner>()

  useEffect(() => {
    changeCurrentSquareValue()
  }, [currentTurn])


  useEffect(() => {
    console.log({
      isRunning,
      selectedSquares,
    })
  }, [isRunning, selectedSquares])


  useEffect(() => {
    const quantityOfSelectedSquares = selectedSquares.filter(square => square).length
    if (quantityOfSelectedSquares >= MINIMUM_NUMBER_OF_SQUARES_TO_FINISH_THE_GAME) {

      if (
        !!selectedSquares[0]
        && selectedSquares[0] === selectedSquares[1]
        && selectedSquares[0] === selectedSquares[2]
      )
        return finishGame(selectedSquares[0])

      if (
        !!selectedSquares[3]
        && selectedSquares[3] === selectedSquares[4]
        && selectedSquares[3] === selectedSquares[5]
      )
        return finishGame(selectedSquares[3])

      if (
        !!selectedSquares[6]
        && selectedSquares[6] === selectedSquares[7]
        && selectedSquares[6] === selectedSquares[8]
      )
        return finishGame(selectedSquares[6])

      if (
        !!selectedSquares[0]
        && selectedSquares[0] === selectedSquares[3]
        && selectedSquares[0] === selectedSquares[6]
      )
        return finishGame(selectedSquares[0])

      if (
        !!selectedSquares[1]
        && selectedSquares[1] === selectedSquares[4]
        && selectedSquares[1] === selectedSquares[7]
      )
        return finishGame(selectedSquares[1])

      if (
        !!selectedSquares[2]
        && selectedSquares[2] === selectedSquares[5]
        && selectedSquares[2] === selectedSquares[8]
      )
        return finishGame(selectedSquares[2])

      if (
        !!selectedSquares[0]
        && selectedSquares[0] === selectedSquares[4]
        && selectedSquares[0] === selectedSquares[8]
      )
        return finishGame(selectedSquares[0])

      if (
        !!selectedSquares[2]
        && selectedSquares[2] === selectedSquares[4]
        && selectedSquares[2] === selectedSquares[6]
      )
        return finishGame(selectedSquares[2])
    }

  }, [selectedSquares])

  const finishGame = (winnerValue: SquareValue) => {
    stopGame()
    defineWinner(winnerValue)
  }


  const stopGame = () => setIsRunning(false)
  const defineWinner = (winnerValue: SquareValue) => setWinner(winnerValue)

  const changeCurrentSquareValue = () => {
    if (currentTurn % 2 === 0)
      return setCurrentSquareValue(SquareValue.O)

    setCurrentSquareValue(SquareValue.X)
  }

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