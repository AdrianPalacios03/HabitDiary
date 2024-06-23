import { Colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import React from 'react'
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { ThemedText } from '../ThemedText';

interface Props {
    title: string,
    defChecked: boolean,
    onChange: () => void
}

export const CheckTasks = ({title, defChecked, onChange}: Props) => {

    const color = useColorScheme();
    const colorText = Colors[color ?? 'light'].text

    return (
        <View style={styles.checkBoxContainer}>
            <Checkbox
                onValueChange={onChange}
                value={defChecked}
                color={Colors.primary}
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