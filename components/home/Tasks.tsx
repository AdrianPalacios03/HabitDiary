import React from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native'
import useTask from '@/hooks/home/useTasks';
import { dateToString } from '@/util/home/dateToString';
import { SaveButton } from '@/components/home/SaveButton';
import { getNextDay, getPreviousDay } from '@/util/home/getPreviousDate';
import { CheckTasks } from '@/components/home/CheckTasks';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react-native';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import { checkSameDay } from '@/util/home/checkSameDay';

interface Props {
    habits: any[];
    isLoading: boolean;
    color: string;
}

export const Tasks = ({habits, isLoading, color}: Props) => {

    const { lan, languageCode } = useLanguage();
    const colorScheme = useColorScheme();
    const colorText = Colors[colorScheme ?? 'light'].text
    const colorGrey = Colors[colorScheme ?? 'light'].grey

    const { taskDate, setTaskDate, checkedFields, onCheckChange, onSaveClick, isSaving } = useTask()

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 120 : 0


    if (!taskDate) return <ActivityIndicator color='aliceblue' size={30} style={{marginTop: 20}}/>;
    
    if (isLoading) return <ActivityIndicator color='aliceblue' size={30} style={{marginTop: 20}}/>;

    return (
    
        <KeyboardAvoidingView 
            behavior='position' 
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{flex: 1}}
        >
            <View style={{...styles.taskContainer, borderColor: colorText}}>
                <View style={{...styles.tasksHeader, borderColor: colorText}}>
                    <Pressable
                        onPress={() => {
                            if (taskDate <= new Date('2023-04-14')) return 
                            setTaskDate(getPreviousDay(taskDate))
                        }} 
                        style={styles.pressable}
                    >
                        <IconChevronLeft 
                            disabled= {taskDate  <= new Date('2023-04-14') }
                            color={taskDate  <= new Date('2023-04-14')  ? '#6b6969' :colorText}
                            size={30}                       
                            onPress={() => {
                                if (taskDate <= new Date('2023-04-14')) return 
                                setTaskDate(getPreviousDay(taskDate))
                            }}  
                    />
                    </Pressable>
                    <Text style={{...styles.tasksHeaderTitle, color:colorText}}>{dateToString(taskDate, languageCode ?? 'en')}</Text>
                    <Pressable
                        onPress={() => {
                            if (checkSameDay(taskDate, new Date())) return 
                            setTaskDate(getNextDay(taskDate))
                        }} 
                        style={styles.pressable}
                    >
                        <IconChevronRight 
                            disabled={checkSameDay(taskDate, new Date())}
                            color={checkSameDay(taskDate, new Date()) ? '#6b6969' : colorText}
                            size={30}
                            onPress={() => {
                                if (checkSameDay(taskDate, new Date())) return 
                                setTaskDate(getNextDay(taskDate))
                            }} 
                        />
                    </Pressable>
                </View>
                <View style={styles.checkboxContainer}>

                    {
                        habits.map((habit) => {
                            return <CheckTasks 
                                title={habit.name}
                                onChange={() => {onCheckChange(habit.name)}}
                                key={habit.name}
                                defChecked={checkedFields[habit.name]}
                                color={color}
                            />
                        })

                    }

                    <TextInput 
                        style={{...styles.feelingInput, borderColor: colorGrey, color: colorText}} 
                        placeholder={lan.home.placeholder}
                        placeholderTextColor={colorGrey}
                        multiline={true}
                        value={checkedFields.feeling}
                        onChangeText={(text) => {onCheckChange('feeling', text)}}
                        autoCorrect
                    />

                    <SaveButton 
                        onClick={onSaveClick} 
                        isSaving={isSaving} 
                        isSaveButton
                        bgColor={color}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    taskContainer: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 20
    },
    tasksHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    pressable: {
        width: 30,
        flex: 1,
        alignItems: 'center'
    },
    tasksHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    checkboxContainer: {
        padding: 20
    },
    checkText: {
        color: 'aliceblue', 
        fontSize: 19, 
        textDecorationLine: 'none',
    },
    feelingInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 15,
        height: 100,
        textAlignVertical: 'top',
        fontWeight: 'bold'
    }
})