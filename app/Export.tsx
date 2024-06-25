import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/home/Button';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconDatabaseExport } from '@tabler/icons-react-native';
import React, { useState } from 'react'
import { View, useColorScheme, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const Export = () => {

    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    const { lan } = useLanguage();
    const theme = Colors[colorScheme ?? 'light'];

    const onExportPress = async() => {
        setIsLoading(true);
        const keysToExclude = ['color', 'name', 'primary-color'];
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
    
            const data = result.reduce((acc: any, [key, value]: any) => {
                if (!keysToExclude.includes(key)) {
                    acc[key] = JSON.parse(value);
                }
                return acc;
            }, {});
    
            const jsonString = JSON.stringify(data);
            await Clipboard.setStringAsync(jsonString);
    
            Alert.alert("", lan.settings.exported)
        } catch (e) {
            Alert.alert(JSON.stringify(e), lan.settings.errorExported)
        }
        setIsLoading(false);
    }

    return (
        <View style={{...StyleSheet.absoluteFillObject, backgroundColor: theme.background, padding: 20}}>
            <ThemedText type='defaultSemiBold'>{lan.settings.tutorialExport}</ThemedText>

            <Pressable onPress={onExportPress}>
                <View style={{...styles.button, borderColor: theme.text}}>
                    {
                        isLoading ?
                            <>
                                <ActivityIndicator size='small' color={theme.text} />
                                <ThemedText type='defaultSemiBold'>{lan.settings.loading}</ThemedText>
                            </>
                        :   <>
                                <IconDatabaseExport size={30} color={theme.text} />
                                <ThemedText type='defaultSemiBold'>{lan.settings.export}</ThemedText>
                            </>
                    }
                </View>
            </Pressable>
        </View>
    )
}

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
        marginTop: 20,
        justifyContent: 'center'
    }
})

export default Export;