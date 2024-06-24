import { Colors } from '@/constants/Colors';
import React from 'react'
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native'
import useColorStore from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    active: boolean;
    bgColor: string;
}

const Color = ({active, bgColor}: Props) => {
    const color = useColorScheme();

    const saveColor = async () => {
        try {
            await AsyncStorage.setItem('primary-color', bgColor);
        } catch (error) {
            console.log(error);
        }
    }

    const setColor = (color: string) => {
        useColorStore.getState().setColor(color);
        saveColor();
    }

    const handlePress = (event: GestureResponderEvent) => {
        setColor(bgColor);
      };

    return (
        <Pressable
            onPress={handlePress}
            style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: bgColor,
                marginHorizontal: 5,
                borderWidth: active ? 2 : 0,
                borderColor: Colors[color ?? 'light'].text
            }}
        />
    )
}

export default Color