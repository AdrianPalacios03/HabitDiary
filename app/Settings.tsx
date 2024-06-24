import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ColorSelector from '@/components/settings/ColorSelector';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import useColorStore from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconArrowNarrowLeft, IconArrowRight, IconDeviceFloppy } from '@tabler/icons-react-native';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsPage = () => {

    const { top: paddingTop } = useSafeAreaInsets();
    const { lan } = useLanguage();
    const colorScheme = useColorScheme();
    const color = useColorStore((state) => state.color);

    const [nameValue, setNameValue] = useState("");

    const onNameSave = async() => {
        try {
            await AsyncStorage.setItem('name', nameValue);
            Alert.alert('', lan.settings.saved);
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', lan.settings.error);
        }
    }

    const loadName = async() => {
        try {
            const name = await AsyncStorage.getItem('name');
            if (name) setNameValue(name);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      loadName();
    }, [])
    

    return (
        <GestureHandlerRootView>
            <ThemedView style={{...StyleSheet.absoluteFillObject, paddingTop, ...styles.container}}>
                <Pressable onPress={() => router.back()} style={styles.back}>
                    <IconArrowNarrowLeft size={30} color={Colors[colorScheme ?? 'light'].text}/>
                    <ThemedText type='subtitle'>{lan.settings.back}</ThemedText>
                </Pressable>
            
                <ThemedText type='title'>{lan.settings.title}</ThemedText>
                <ThemedText type='subtitle' style={styles.subtitle}>{lan.settings.name}</ThemedText>
                <View style={styles.nameInput}>
                    <TextInput
                        style={{...styles.input, color: Colors[colorScheme ?? 'light'].text}}
                        placeholder={lan.settings.name}
                        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                        value={nameValue}
                        onChangeText={setNameValue}
                    />
                    <Pressable onPress={onNameSave}>
                        <IconDeviceFloppy size={30} color={Colors[colorScheme ?? 'light'].text}/>
                    </Pressable>
                </View>
                <ThemedText type='subtitle' style={styles.subtitle}>{lan.settings.color}</ThemedText>
                
                <ColorSelector/>

                <Link href='/HabitSelector' style={{marginVertical:30, width: '100%'
                }}>
                    <View style={{...styles.habitsButton, borderColor: color}}>
                        <ThemedText type='subtitle'>
                            {lan.settings.habitSelector}
                        </ThemedText>
                        <IconArrowRight size={30} color={Colors[colorScheme ?? 'light'].text}/>
                    </View>
                </Link>
            </ThemedView>
        </GestureHandlerRootView>
    )
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
        gap: 10,
        alignSelf: 'flex-start',
    },
    subtitle: {
        marginVertical: 20
    },
    nameInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16
    },
    habitsButton: {
        marginTop: 20,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,    
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})