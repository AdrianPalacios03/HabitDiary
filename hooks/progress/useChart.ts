import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

const useChart = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [chartValues, setChartValues] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [chartLength, setChartLength] = useState(0);

    const screenHeight = Dimensions.get('window').height - 100;

    const getAllDays = async () => {
        const keysToExclude = ['color', 'habitList', 'name', 'primary-color'];
    
        try {
            const keys = await AsyncStorage.getAllKeys();
            const filteredKeys = keys.filter(key => !keysToExclude.includes(key));
            // return filteredKeys;
            
            const result = await AsyncStorage.multiGet(filteredKeys);
    
            const days = result.map(([key, value]) => {
                if (value !== null) {
                    const data = JSON.parse(value);
                    const formattedDate = format(new Date(key), 'dd/MM/yyyy');
                    return {
                        ...data,
                        date: formattedDate,
                        originalDate: new Date(key)
                    };
                }
                return null;
            }).filter((item) => item !== null);
    
            days.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());
    
            const sortedDays = days.map(({ originalDate, ...rest }) => rest);
    
            return sortedDays;
        } catch (e) {
            console.error('Error retrieving notes', e);
            return [];
        }
    };

    const countTrueProperties = (obj: { [key: string]: any }): number => {
        return Object.values(obj).filter(value => value === true).length;
    };

    useEffect(() => {
      getAllDays().then(days => {
        let chartData: number[] = []
        let chartLabels: string[] = []
        days.map((day) => {
            chartData.push(countTrueProperties(day));
            chartLabels.push(day.date);
        });
        setChartValues(chartData);
        setLabels(chartLabels);

        let length = Math.round(screenHeight * ((days.length / 10) * 1.5));
        let max = Platform.OS === 'android' ? 8000 : 75000;
        if (length > max) 
            length = max;

        setChartLength(length);
        setIsLoading(false);
      }).catch((e) => {
        console.error('Error retrieving notes', e);
        setIsLoading(false);
        })
    }, []);



    return {
        isLoading,
        chartValues,
        labels,
        chartLength
    }
}

export const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    propsForVerticalLabels: {
        fontSize: 12,
    },
    propsForDots: {
        r: "4"
    },
    propsForLabels: {
        fontSize: 15,
    },
}

export default useChart;