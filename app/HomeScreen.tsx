import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Tasks } from '@/components/home/Tasks';
import { Phrase } from '@/components/home/Phrase';
import { WeekChart } from '@/components/home/WeekChart';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useGetLocalStorage } from '@/hooks/home/useGetLocalStorage';
import { useLanguage } from '@/hooks/useLanguage';

const HomeScreen = () => {

    const { lan } = useLanguage();
    const color = useColorScheme();
    const [reload, setReload] = useState(false);

    const {
        isTasksLoading,
        isChartLoading,
        labels,
        tableData,
        loadChart,
        habits
    } = useGetLocalStorage();

    const deleteLocalStorage = async () => {
        try {
            await AsyncStorage.clear();
            setReload(!reload);
        } catch (e) {
            console.error('Error deleting local storage', e);
        }
    };
    
    return (
        <GestureHandlerRootView>
            <StatusBar style="auto" backgroundColor={Colors[color ?? 'light'].background} translucent/>

            {/* <Pressable onPress={deleteLocalStorage}>
                <ThemedText>Eliminar datos locales</ThemedText>
            </Pressable> */}

            <ScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: Colors[color ?? 'light'].background, flex: 1, paddingVertical: 20, paddingHorizontal: 20}}
            >
        
                <ThemedText type='title' style={{...styles.title}}>{lan.home.welcome}</ThemedText>
                <View>
                    <Tasks
                        habits={habits}
                        isLoading={isTasksLoading}
                    />
                    <Phrase/>
                    <WeekChart
                        isLoading={isChartLoading}
                        labels={labels}
                        tableData={tableData}
                        loadChart={loadChart}
                    />

                    
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 40
    }

})