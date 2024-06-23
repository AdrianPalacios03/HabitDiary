import AsyncStorage from "@react-native-async-storage/async-storage";

export const setDayInfo = async (date: Date, data: any) => {
    try {
        await AsyncStorage.setItem(date.toDateString(), JSON.stringify(data));
    } catch (e) {
        console.error('Error saving day info', e);
    }
}