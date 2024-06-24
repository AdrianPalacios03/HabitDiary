import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'

interface Props {
    text: string,
    children: React.ReactNode,
    url: string,
    color: string
}

const Button = ({text, children, url, color}: Props) => {
    return (
        <Link href={url}>
            <View style={{...styles.button, borderColor: color}}>
                {children}
                <ThemedText>{text}</ThemedText>
            </View>
        </Link>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 5,
        gap: 10,
        borderWidth: 1,
        alignItems: 'center',
    }
})