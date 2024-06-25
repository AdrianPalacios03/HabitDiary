import React from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { IconBook, IconRocket, IconSettings } from '@tabler/icons-react-native';
import useColorStore from '@/store';
import Button from '@/components/home/Button';

const HomeScreen = () => {

    const { lan } = useLanguage();
    const colorScheme = useColorScheme();
    const color = useColorStore((state) => state.color);
    const textColor = Colors[colorScheme ?? 'light'].text;

    const {
        isTasksLoading,
        isChartLoading,
        labels,
        tableData,
        loadChart,
        habits,
        name
    } = useGetLocalStorage();

    const deleteLocalStorage = async () => {
        await AsyncStorage.clear();
    };
    
    return (
        <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject}}>
            <StatusBar style="auto" backgroundColor={Colors[colorScheme ?? 'light'].background} translucent/>

            <ScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1, paddingVertical: 20, paddingHorizontal: 20}}
            >
                <View style={styles.header}>
                    <ThemedText type='title' style={{...styles.title}}>
                        {lan.home.welcome + (name ? `, ${name}` : '')}
                    </ThemedText>
                    <Link href='/Settings'>
                        <IconSettings size={30} color={Colors[colorScheme ?? 'light'].text}/>
                    </Link>
                </View>
        
                {/* <Pressable onPress={deleteLocalStorage}><ThemedText>Clear local storage</ThemedText></Pressable> */}
                <View>
                    <Tasks
                        habits={habits}
                        isLoading={isTasksLoading}
                        color={color}
                    />
                    <Phrase/>

                    <View style={styles.buttonsContainer}>
                        <Button text={lan.home.progress} url='/Progress' color={textColor}>
                            <IconRocket size={30} color={textColor}/>
                        </Button>
                        <Button text={lan.home.notes} url='/Notes' color={textColor}>
                            <IconBook size={30} color={textColor}/>
                        </Button>
                    </View>

                    <WeekChart
                        isLoading={isChartLoading}
                        labels={labels}
                        tableData={tableData}
                        loadChart={loadChart}
                        color={color}
                    />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        marginVertical: 40
    },
    buttonsContainer: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    }

})