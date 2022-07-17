import React from 'react'
import { useGame } from '../../hooks'


export const Header = () => {
  const [{ winner, currentTurn, currentSquareValue }] = useGame()


  return (
    <div>
      <h3>{`Turno: ${currentTurn}`}</h3>
      <h3>{`Jogador: ${currentSquareValue}`}</h3>
      {winner && <h1>{`Vencedor: ${winner}`} </h1>}
    </div>
  )
}