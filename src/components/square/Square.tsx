import React, { useState } from 'react'
import { useGame } from '../../hooks'
import { SquareValue } from '../../types'
import './Square.css'


type SquareProps = {
	position: number
}

export const Square: React.FC<SquareProps> = ({ position }) => {
	const [value, setValue] = useState<SquareValue>()
	const [{ currentSquareValue }, { onNextTurn }] = useGame()

	const onPress = () => {
		if (!value) {
			setValue(currentSquareValue)
			onNextTurn()
		}
	}

	return (
		<div className='Square' onClick={onPress}>
			{value}
		</div>
	)
}