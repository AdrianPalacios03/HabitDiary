import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ThemedText } from '../ThemedText';
import { getTaskCompletionRate } from '@/util/statistics/getTaskCompletionRate';
import useColorStore from '@/store';
interface Props {
    taskName: string;
    days?: any[];
}

export const TaskStats = ({ taskName, days }: Props) => {
    const color = useColorStore((state) => state.color);
    if (!days) {
        return (
            <View testID="stats-loading">
                <ActivityIndicator color={color} />
            </View>
        );
    }
    const completionRate = getTaskCompletionRate(taskName, days);
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <ThemedText type="defaultSemiBold">{taskName}:</ThemedText>
            <ThemedText>{completionRate}%</ThemedText>
        </View>
    );
};