import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, useColorScheme, Pressable, ActivityIndicator } from 'react-native';
import { getDayInfo } from '@/database/getDayInfo'
import capitalize from '@/util/home/capitalize'
import { LineChart } from 'react-native-chart-kit'
import { shortDayName } from '@/util/home/shortDayName'
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { IconReload } from '@tabler/icons-react-native';
import { useLanguage } from '@/hooks/useLanguage';


interface Props {
    isLoading: boolean;
    labels: any[];
    tableData: any[];
    loadChart: () => void;
}

export const WeekChart = ({
    isLoading,
    labels,
    tableData,
    loadChart
}: Props) => {

    const { lan } = useLanguage();
    const color = useColorScheme();


      if (isLoading) return (
        <View style={{height: 240, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={Colors.primary} size="large"/>
        </View>
    );

    return (
        <View>
            <View style={styles.chartTitle}>
                <ThemedText type='subtitle' style={{width: '90%'}}>
                    {lan.home.chartHeader}
                </ThemedText>
                <Pressable onPress={loadChart}>
                    <IconReload size={30} color={Colors[color ?? 'light'].text}/>
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
                        color: () => Colors.primary,
                        labelColor: () => Colors[color ?? 'light'].text,
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