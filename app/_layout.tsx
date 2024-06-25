import React from 'react'
import { Stack } from "expo-router/stack";
import { useLanguage } from '@/hooks/useLanguage';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const defaultOptions = {
    headerShown: false
}



const StackLayout = () => {

    const { lan } = useLanguage();
    const colorScheme = useColorScheme();

    const withHeaderOptions = (title: string) => {
        return {
            headerStyle: {
                backgroundColor: Colors[colorScheme ?? 'light'].background
            },
            headerTintColor: Colors[colorScheme ?? 'light'].text,
            title,
            headerBackTitle: lan.settings.back
        }
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={defaultOptions}/>
            <Stack.Screen name="HomeScreen" options={defaultOptions}/>
            <Stack.Screen name="Notes" options={withHeaderOptions(lan.home.notes)}/>
            <Stack.Screen name="Progress" options={withHeaderOptions(lan.home.progress)}/>
            <Stack.Screen name="HabitSelector" options={defaultOptions}/>
            <Stack.Screen name="Settings" options={defaultOptions}/>
            <Stack.Screen name="Export" options={withHeaderOptions(lan.settings.export)}/>
            <Stack.Screen name="Import" options={withHeaderOptions(lan.settings.import)}/>
        </Stack>
    )
}

export default StackLayout