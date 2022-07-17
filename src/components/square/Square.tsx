import React, { useState } from 'react'
import { SquareValue } from '../../types'
import './Square.css'


type SquareProps = {
    position: number
    value?: SquareValue
}

export const Square: React.FC<SquareProps> = ({ position }) => {
    const [currentValue, setValue] = useState('')

    const onPress = () => {
        setValue(SquareValue.X)
    }

    return (
        <div className='Square' onClick={onPress}>
            {currentValue}
        </div>
    )
}