import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Alert, StyleSheet, useColorScheme } from 'react-native'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLanguage } from '@/hooks/useLanguage'
import useColorStore from '@/store'

const LoadingScreen = () => {
    const colorScheme = useColorScheme();
    const { lan } = useLanguage();
    const { color, setColor } = useColorStore((state) => state);

    const getColors = async () => {
        const color = await AsyncStorage.getItem('primary-color') || Colors.primary;
        setColor(color);
    };

    const loadHabitList = async () => {
        try {
            const habitListString = await AsyncStorage.getItem('habitList');
            const habits = habitListString ? JSON.parse(habitListString) : [];

            if (habits.length === 0) {
                router.replace('/HabitSelector');
                return;
            } else {
                router.replace('/HomeScreen');
            }
        } catch (e) {
            Alert.alert('Error', lan.loading.restart);
            return [];
        }
    };

    useEffect(() => {
        loadHabitList();
        getColors();
    }, []);

    return (
        <>
            <StatusBar style="auto" backgroundColor={Colors[colorScheme ?? 'light'].background} />
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" color={color} />
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LoadingScreen;