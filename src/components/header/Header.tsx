import React from 'react'
import { useGame } from '../../hooks'


export const Header = () => {
  const [{ winner, currentTurn, currentSquareValue, isRunning }] = useGame()


  return (
    <div>
      <h3>{`Turno: ${currentTurn}`}</h3>
      <h3>{`Jogador: ${currentSquareValue}`}</h3>
      {winner && <h1>{`Vencedor: ${winner}`} </h1>}
      {!isRunning && !winner && <h1>Empate</h1>}
    </div>
  )
}