import { getDayInfo } from '@/database/getDayInfo'
import capitalize from '@/util/home/capitalize'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage';
import { shortDayName } from '@/util/home/shortDayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetLocalStorage = () => {

    const [isChartLoading, setIsChartLoading] = useState(true);
    const [isTasksLoading, setIsTasksLoading] = useState(true);
    const [labels, setlabels] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const { languageTag } = useLanguage();
    const [habits, setHabits] = useState([]);
    const [name, setName] = useState<string | null>(null);


    const getLastDaysData = async (fechas: any[]) => {
        let values: any = [];
        for (let i = 0; i < fechas.length; i++) {
        await getDayInfo(fechas[i]).then((res: any) => {
            let contador = 0;
            if (!res) return values.push(contador); 
            for (const [_, value] of Object.entries(res)) {
                try{
                    if (value === true) {
                        contador++;
                    }
                }catch(e){
                    console.log(e)
                }
            }
            values.push(contador);
        })
        }
        setTableData(values);
        setIsChartLoading(false);
    }

    const loadChart = () => {
        setIsChartLoading(true);
        let fechas: any = [];
        let hoy = new Date();
        let semanaPasada = new Date();
        semanaPasada.setDate(semanaPasada.getDate() - 7);

        for (let fecha = hoy; fecha >= semanaPasada; fecha.setDate(fecha.getDate() - 1)) {
          fechas.push(new Date(fecha));
        }

        let tempLabels: any = [];
        fechas.forEach((fecha: any) => {
          tempLabels.push(capitalize(fecha.toLocaleDateString(languageTag, { weekday: 'long' })));
        });

        setlabels(tempLabels.reverse().map((label: string) => shortDayName(label)));
        getLastDaysData(fechas.reverse());
    }

    useEffect(() => {
      loadChart();
      loadHabitList();
      loadName();
    }, []);

    const loadHabitList = async () => {
        try {
            const habitListString = await AsyncStorage.getItem('habitList');
            setHabits(habitListString ? JSON.parse(habitListString) : []);
        } catch (e) {
            console.error('Error loading habit list', e);
            return [];
        }
        setIsTasksLoading(false);
    }

    const loadName = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            setName(name);
        } catch (e) {
            console.error('Error loading name', e);
        }
    }

    return {
        isChartLoading,
        isTasksLoading,
        labels,
        tableData,
        loadChart,
        habits,
        name
    }
    
}