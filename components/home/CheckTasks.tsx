import Checkbox from 'expo-checkbox';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText';
import useColorStore from '@/store';

interface Props {
    title: string,
    defChecked: boolean,
    onChange: () => void,
    color: string
}

export const CheckTasks = ({title, defChecked, onChange, color}: Props) => {

    return (
        <View style={styles.checkBoxContainer}>
            <Checkbox
                onValueChange={onChange}
                value={defChecked}
                color={color}
                style={{transform: [{scale: 0.9}], }}
            />
            <ThemedText style={styles.checkBoxText} onPress={onChange}>{title}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    checkBoxText: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        width: '100%',
    }
})