import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ThemedText } from '../ThemedText';

interface Props {
    date: string;
    feeling: string;
    borderColor: string;
}

const Note = ({ date, feeling, borderColor }: Props) => {
    return (
        <View style={{...styles.note, borderColor: borderColor}}>
            <ThemedText type='subtitle'>{date}</ThemedText>
            <ThemedText type='defaultSemiBold'>{feeling}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    note: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        gap: 10
    }
})

export default Note;