import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import Note from '@/components/notes/Note';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import useNotes from '@/hooks/notes/useNotes';
import { Colors } from '@/constants/Colors';

const Notes = () => {

    const {
        isLoading,
        notes,
        color
    } = useNotes();
    
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    return (
        <GestureHandlerRootView style={{...StyleSheet.absoluteFillObject , backgroundColor: theme.background}}>

            {
                isLoading && <ActivityIndicator size="large" color={color} style={{paddingTop: 10}}/>
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