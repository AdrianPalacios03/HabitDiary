import React from 'react'
import { Colors } from '@/constants/Colors';
import useColorStore from '@/store';
import { ActivityIndicator, Dimensions,  View, useColorScheme, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useChart, { chartConfig } from '@/hooks/progress/useChart';

const Progress = () => {
    const colorScheme = useColorScheme();
    const color = useColorStore((state) => state.color);
    const screenWidth = Dimensions.get('window').width;

    const {
        isLoading,
        chartValues,
        labels,
        chartLength
    } = useChart();

    if (isLoading) return (
        <View style={{
            backgroundColor: Colors[colorScheme ?? 'light'].background, height: "100%", justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={color} size="large"/>
        </View>
    );
    

    return (
        <GestureHandlerRootView>
            <ScrollView
                style={{
                    ...StyleSheet.absoluteFillObject,   
                    ...styles.container,
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
            }}>
                <View style={{height: chartLength}}>
                    <LineChart
                        data={{
                            labels,
                            datasets: [{ data: chartValues }]
                        }}
                        width={chartLength}
                        height={screenWidth }
                        yAxisInterval={8}
                        fromZero
                        bezier
                        verticalLabelRotation={-10}
                        chartConfig={{
                            ...chartConfig,
                            color: () => color,
                            labelColor: () => Colors[colorScheme ?? 'light'].text,
                        }}
                        style={styles.chart}
                    />
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexGrow: 1, 
    },
    chart: {
        transform: [{
            rotate: '90deg',
        },
        {
            translateY: 30,
        },
        {
            translateX: -40,
        }]
    }

})

export default Progress;