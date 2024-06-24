import React from 'react'
import { Dimensions, StyleSheet, View, useColorScheme, Pressable, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { IconReload } from '@tabler/icons-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import useColorStore from '@/store';


interface Props {
    isLoading: boolean;
    labels: any[];
    tableData: any[];
    loadChart: () => void;
    color: string;
}

export const WeekChart = ({
    isLoading,
    labels,
    tableData,
    loadChart,
    color
}: Props) => {

    const { lan } = useLanguage();
    const colorScheme = useColorScheme();


      if (isLoading) return (
        <View style={{height: 240, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={color} size="large"/>
        </View>
    );

    return (
        <View>
            <View style={styles.chartTitle}>
                <ThemedText type='subtitle' style={{width: '90%'}}>
                    {lan.home.chartHeader}
                </ThemedText>
                <Pressable onPress={loadChart}>
                    <IconReload size={30} color={Colors[colorScheme ?? 'light'].text}/>
                </Pressable>
            </View>
            <View style={styles.chartContainer}>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: tableData.length === 0 ? [0, 0, 0, 0, 0, 0, 0] : tableData
                            }
                        ]
                    }}
                    width={Dimensions.get('window').width} 
                    height={220}
                    yAxisInterval={8} 
                    chartConfig={{
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 0, 
                        color: () => color,
                        labelColor: () => Colors[colorScheme ?? 'light'].text,
                        propsForDots: {
                            r: "4"
                        },
                        propsForLabels: {
                            fontSize: 15,
                        }
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chartTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 40,
    },
    chartContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
        paddingRight: 40

    }
})