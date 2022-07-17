import React, { createContext, useEffect, useState } from 'react'
import { SquareValue } from '../types'



type GameProviderProps = {
  children: React.ReactNode
}

type GameStates = {
  currentTurn: number
  currentSquareValue: SquareValue
}

type GameActions = {
  onNextTurn: () => void
}

type GameProviderData = [
  state: GameStates,
  actions: GameActions,
]

export const GameContext = createContext<GameProviderData | null>(null)

export const GameProvider: React.FC<GameProviderProps> = ({
  children
}) => {
  const [currentTurn, setCurrentTurn] = useState(1)
  const [currentSquareValue, setCurrentSquareValue] = useState<SquareValue>(SquareValue.X)


  useEffect(() => {
    changeCurrentSquareValue()
  }, [currentTurn])

  const changeCurrentSquareValue = () => {
    if (currentTurn % 2 === 0)
      return setCurrentSquareValue(SquareValue.O)

    setCurrentSquareValue(SquareValue.X)
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
          currentSquareValue
        },
        {
          onNextTurn
        }
      ]}
    />

  )
}