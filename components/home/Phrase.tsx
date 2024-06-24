import React from 'react'
import { StyleSheet } from 'react-native'
import { getRandomQuote } from '@/util/home/getRandomQuote';
import { useLanguage } from '@/hooks/useLanguage';
import { ThemedText } from '../ThemedText';

export const Phrase = () => {
    const { lan } = useLanguage();
    const quote = getRandomQuote(lan);
    
    return (
      <ThemedText style={styles.phrase}>{quote}</ThemedText>
    )
}

const styles = StyleSheet.create({
    phrase: {
        fontSize: 17,
        textAlign: 'center'
    }
})