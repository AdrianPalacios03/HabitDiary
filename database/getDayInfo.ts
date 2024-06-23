import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDayInfo = async (date: Date) => {
    try {
        const data = await AsyncStorage.getItem(date.toDateString());
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading day info', e);
        return null;
    }
}