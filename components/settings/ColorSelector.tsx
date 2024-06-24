import React, { useState } from 'react'
import { View } from 'react-native'
import Color from './Color';
import useColorStore from '@/store';

const colors = ["#8855e0", "#d0021b", "#4a90e2", "#6db51f", "#f5a623"];

const ColorSelector = () => {

    const activeColor = useColorStore((state) => state.color);

    return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {
                colors.map((color) => (
                    <Color
                        key={color}
                        bgColor={color}
                        active={color === activeColor}
                    />
                ))
            }
        </View>
    )
}

export default ColorSelector