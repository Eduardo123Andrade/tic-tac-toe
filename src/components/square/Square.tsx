import React, { useState } from 'react'
import { useGame } from '../../hooks'
import { Position, SquareValue } from '../../types'
import './Square.css'

type SquareProps = {
	position: Position
}

export const Square: React.FC<SquareProps> = ({ position }) => {
	const [value, setValue] = useState<SquareValue>()
	const [{ currentSquareValue, isRunning }, { onNextTurn, addUserSelectedSquare }] = useGame()

	const onPress = () => {
		if (!value && isRunning) {
			setValue(currentSquareValue)
			addUserSelectedSquare(position)
			onNextTurn()
		}
	}

	return (
		<div className='Square' onClick={onPress}>
			{value}
		</div>
	)
}