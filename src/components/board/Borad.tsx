import { Position } from "../../types"
import { Square } from "../square/Square"
import './Board.css'

const SQUARES_POSITIONS: Position[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

const renderSquare = (position: Position) => {
  return <Square key={`${position}`} position={position} />
}

const renderColumn = (column: Position[], index: number) => {
  return (
    <div key={`${index}`} className='Column'>
      {column.map(renderSquare)}
    </div>
  )
}

export const Board = () => {
  return (
    <div className='Board'>
      {SQUARES_POSITIONS.map(renderColumn)}
    </div>
  )
}