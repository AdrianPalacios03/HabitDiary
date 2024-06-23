import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Alert, StyleSheet, useColorScheme } from 'react-native'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLanguage } from '@/hooks/useLanguage'

const LoadingScreen = () => {
    const color = useColorScheme();
    const { lan } = useLanguage();

    const loadHabitList = async () => {
        try {
            const habitListString = await AsyncStorage.getItem('habitList');
            const habits = habitListString ? JSON.parse(habitListString) : [];

            if (habits.length === 0) {
                router.push('/HabitSelector');
                return;
            } else {
                router.push('/HomeScreen');
            }
        } catch (e) {
            Alert.alert('Error', lan.loading.restart);
            return [];
        }
    };

    useEffect(() => {
        loadHabitList();
    }, []);

    return (
        <>
            <StatusBar style="auto" backgroundColor={Colors[color ?? 'light'].background} />
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
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