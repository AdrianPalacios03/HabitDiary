import React from 'react'
import { Stack } from "expo-router/stack";

const defaultOptions = {
    headerShown: false
}

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={defaultOptions}/>
            <Stack.Screen name="HomeScreen" options={defaultOptions}/>
            <Stack.Screen name="Notes" options={defaultOptions}/>
            <Stack.Screen name="Progress" options={defaultOptions}/>
            <Stack.Screen name="HabitSelector" options={defaultOptions}/>
            <Stack.Screen name="Settings" options={defaultOptions}/>
        </Stack>
    )
}

export default StackLayout