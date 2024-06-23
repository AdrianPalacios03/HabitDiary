import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { useLanguage } from '@/hooks/useLanguage'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, StyleSheet, useColorScheme, Pressable, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { FlatList, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { IconPlus } from '@tabler/icons-react-native';
import Habit from '@/components/habitselector/Habit'
import ReadyButton from '@/components/habitselector/ReadyButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'

const HabitSelector = () => {
    
    const { lan } = useLanguage();
    const color = useColorScheme();

    const [ habitValue, setHabitValue ] = useState('');
    const [ habitList, setHabitList ] = useState<{name: string}[]>([]);

    const deleteHabit = (name: string) => {
        setHabitList(habitList.filter(habit => habit.name !== name));
    }

    const onAddPress = () => {
        if (!habitValue) {
            Alert.alert('Error', lan.habitselector.errorDescription);
            return;
        }

        if (habitList.find(habit => habit.name === habitValue)) {
            Alert.alert('Error', lan.habitselector.errorExists);
            return;
        }

        setHabitList([...habitList, {name: habitValue}]);
        setHabitValue('');
    }

    const saveHabitList = async () => {
        try {
            await AsyncStorage.setItem('habitList', JSON.stringify(habitList));
            router.push('/HomeScreen');
        } catch (e) {
            console.error('Error saving habit list', e);
        }
    };

    return (
        <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject}}>
            <StatusBar style="auto" backgroundColor={Colors[color ?? 'light'].background} translucent/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "height" : "height"} keyboardVerticalOffset={0}>
                    <ThemedView style={styles.container}>
                        <ThemedText type='title' style={{paddingTop: 20, paddingBottom: 20, marginBottom: 20, borderBottomWidth: 2, borderColor: Colors.primary}}>{lan.habitselector.welcome}</ThemedText>
                        <FlatList
                            data={habitList}
                            renderItem={({ item }) => (
                                <Habit
                                    name={item.name}
                                    onDelete={deleteHabit}
                                />
                            )}
                            keyExtractor={(item) => item.name}
                            ListFooterComponent={habitList.length > 0 ? <ReadyButton onPress={saveHabitList}/> : <></>}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                                placeholder={lan.habitselector.placeholder}
                                style={{...styles.input, borderColor: Colors[color ?? 'light'].grey,
                                color: Colors[color ?? 'light'].grey
                                }}
                                value={habitValue}
                                onChangeText={setHabitValue}
                                placeholderTextColor={Colors[color ?? 'light'].grey}
                                onSubmitEditing={onAddPress}
                            />
                            <Pressable
                                onPress={onAddPress}
                                style={styles.button}
                            >
                                <IconPlus size={30} color="white"/>
                            </Pressable>
                        </View>
                    </ThemedView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    )
}

export default HabitSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60
    },
    input: {
        borderWidth: 1,
        width: 200,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        flex: 1
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        margin: 10
    }
})
