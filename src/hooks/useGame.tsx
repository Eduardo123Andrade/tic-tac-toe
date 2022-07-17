import { GameContext } from '../providers'
import { useContext } from 'react'

export const useGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('This hook need to be wrapped by GameProvider')
  }

  return context
}
