import { Square } from "../square/Square"
import './Board.css'

export const Board = () => {
  return (
    <div className='Board'>
      <div className='Column'>
        <Square position={1} />
        <Square position={2} />
        <Square position={3} />
      </div>

      <div className='Column'>
        <Square position={4} />
        <Square position={5} />
        <Square position={6} />
      </div>

      <div className='Column'>
        <Square position={7} />
        <Square position={8} />
        <Square position={9} />
      </div>

    </div>
  )
}