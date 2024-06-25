import BackButton from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/home/Button';
import ColorSelector from '@/components/settings/ColorSelector';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import useColorStore from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconArrowNarrowLeft, IconArrowRight, IconDatabaseExport, IconDatabaseImport, IconDeviceFloppy, IconList } from '@tabler/icons-react-native';
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
    const textColor = Colors[colorScheme ?? 'light'].text;

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
                <BackButton
                    color={textColor}
                    text={lan.settings.back}
                />
            
                <ThemedText type='title'>{lan.settings.title}</ThemedText>
                <ThemedText type='subtitle' style={styles.subtitle}>{lan.settings.name}</ThemedText>
                <View style={styles.nameInput}>
                    <TextInput
                        style={{...styles.input, color: textColor}}
                        placeholder={lan.settings.name}
                        placeholderTextColor={textColor}
                        value={nameValue}
                        onChangeText={setNameValue}
                    />
                    <Pressable onPress={onNameSave}>
                        <IconDeviceFloppy size={30} color={textColor}/>
                    </Pressable>
                </View>
                <ThemedText type='subtitle' style={styles.subtitle}>{lan.settings.color}</ThemedText>
                
                <ColorSelector/>

                <View style={styles.buttonsContainer}>
                    <Button text={lan.settings.export} url='/Export' color={textColor}>
                        <IconDatabaseExport size={20} color={textColor}/>
                    </Button>
                    <Button text={lan.settings.import} url='/Import' color={textColor}>
                        <IconDatabaseImport size={20} color={textColor}/>
                    </Button>
                    <Button text={lan.settings.habitSelector} url='/HabitSelector' color={textColor}>
                        <IconList size={20} color={textColor}/>
                    </Button>
                </View>
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
    buttonsContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        flexWrap: 'wrap'
    }
})