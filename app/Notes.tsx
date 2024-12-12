import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import Note from '@/components/notes/Note';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import useNotes, { Note as NoteType } from '@/hooks/notes/useNotes';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';

const Notes = () => {

    const {
        isLoading,
        notes,
        color
    } = useNotes();
    
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    const { lan } = useLanguage();

    return (
        <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject , backgroundColor: theme.background}}>

            {
                isLoading && <ActivityIndicator size="large" color={color} style={{paddingTop: 10}}/>
            }
            {
                !isLoading && notes.filter((n: NoteType) => n.feeling !== '').length === 0 && <Note feeling={lan.notes.empty} borderColor={'transparent'} date=''/>
            }
            <FlatList
                data={notes}
                renderItem={({item}) => (
                    item.feeling && <Note {...item} borderColor={theme.grey}/>
                )}
                keyExtractor={(_, index) => index.toString()}
                style={{
                    paddingTop: 20
                }}
            />
        </GestureHandlerRootView>
    )
}

export default Notes;