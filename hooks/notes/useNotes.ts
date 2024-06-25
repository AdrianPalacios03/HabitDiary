import useColorStore from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Note {
    date: string;
    feeling: string;
    originalDate: Date;
}

const useNotes = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState<any>();
    const color = useColorStore((state) => state.color);

    const getAllNotes = async (): Promise<Array<{ date: string, feeling: string }>> => {
        const keysToExclude = ['color', 'habitList', 'name', 'primary-color'];
    
        try {
            const keys = await AsyncStorage.getAllKeys();
            const filteredKeys = keys.filter(key => !keysToExclude.includes(key));
    
            const result = await AsyncStorage.multiGet(filteredKeys);
    
            const notes: Note[] = result.map(([key, value]) => {
                if (value !== null) {
                    const data = JSON.parse(value);
                    const formattedDate = format(new Date(key), 'dd/MM/yyyy');
                    return {
                        date: formattedDate,
                        feeling: data.feeling ?? '',
                        originalDate: new Date(key)
                    };
                }
                return null;
            }).filter((item): item is Note => item !== null && item.feeling !== null);
    
            notes.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());
    
            const sortedNotes = notes.map(({ originalDate, ...rest }) => rest);
    
            return sortedNotes;
        } catch (e) {
            console.error('Error retrieving notes', e);
            return [];
        }
    };

    useEffect(() => {
      getAllNotes().then(notes => {
        setNotes(notes);
        setIsLoading(false);
      });
    }, []);

    return {
        isLoading,
        notes,
        color
    }
}

export default useNotes;