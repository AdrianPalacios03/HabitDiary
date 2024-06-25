import { IconArrowNarrowLeft } from '@tabler/icons-react-native';
import { router } from 'expo-router';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ThemedText } from './ThemedText';

interface Props {
    color: string;
    text: string;
}

const BackButton = ({color, text}: Props) => {
    return (
        <Pressable onPress={() => router.back()} style={styles.back}>
            <IconArrowNarrowLeft size={30} color={color}/>
            <ThemedText type='subtitle'>{text}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
        gap: 10,
        alignSelf: 'flex-start',
    },

})

export default BackButton;