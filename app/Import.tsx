import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconAlertCircle, IconDatabaseImport } from '@tabler/icons-react-native';
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Pressable, StyleSheet, View, useColorScheme } from 'react-native'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

const Import = () => {

    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    const { lan } = useLanguage();
    const theme = Colors[colorScheme ?? 'light'];
    const [fieldValue, setFieldValue] = useState('');

    const onImportPress = async() => {
        setIsLoading(true);
        if (fieldValue.length === 0) return Alert.alert('Error', lan.settings.errorText);

        try {
            const data = JSON.parse(fieldValue);
    
            if (typeof data !== 'object' || data === null) {
                throw new Error('Invalid data format');
            }

            await AsyncStorage.clear();
    
            const entries = Object.entries(data);
            await AsyncStorage.multiSet(entries.map(([key, value]) => [key, JSON.stringify(value)]));
            
            Alert.alert("", lan.settings.imported)
        } catch (e) {
            Alert.alert("", lan.settings.errorImported)
        }
        setIsLoading(false);
    }

    return (
        <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject, backgroundColor: theme.background, padding: 20}}>
            <ThemedText type='defaultSemiBold'>{lan.settings.tutorialImport}</ThemedText>

            <View style={styles.alert}>
                <IconAlertCircle size={20} color="#004da6" />
                <ThemedText type='defaultSemiBold' style={{color: "#004da6", flex: 1}}>{lan.settings.importAlert}</ThemedText>
            </View>

            <View style={styles.alert}>
                <IconAlertCircle size={20} color="#004da6" />
                <ThemedText type='defaultSemiBold' style={{color: "#004da6", flex: 1}}>{lan.settings.importAlert2}</ThemedText>
            </View>

            <TextInput
                style={{backgroundColor: theme.grey, color: theme.background, padding: 10, borderRadius: 5, marginTop: 20}}
                placeholderTextColor={theme.background}
                placeholder="Paste the text here"
                value={fieldValue}
                onChangeText={setFieldValue}
            />

            <Pressable onPress={onImportPress}>
                <View style={{...styles.button, borderColor: theme.text}}>
                    {
                        isLoading ?
                            <>
                                <ActivityIndicator size='small' color={theme.text} />
                                <ThemedText type='defaultSemiBold'>{lan.settings.loading}</ThemedText>
                            </>
                        :   <>
                                <IconDatabaseImport size={30} color={theme.text} />
                                <ThemedText type='defaultSemiBold'>{lan.settings.import}</ThemedText>
                            </>
                    }
                </View>
            </Pressable>
        </GestureHandlerRootView>
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
    },
    alert: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
        backgroundColor: "#91c5ff",
        padding: 10,
        textAlign: 'center',
        borderRadius: 10,
    }
})

export default Import;