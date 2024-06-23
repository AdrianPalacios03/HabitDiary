import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconTrash } from '@tabler/icons-react-native';
import { Colors } from '@/constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Props {
    name: string;
    onDelete: (name: string) => void;
}

const Habit = ({name, onDelete}: Props) => {
    const color = useColorScheme();
    const translateY = useSharedValue(-30);
    const opacity = useSharedValue(0);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) });
        opacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
    }, []);

    const handleDelete = () => {
        opacity.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) }, () => {
            runOnJS(setIsDeleted)(true);
            runOnJS(onDelete)(name); 
        });
        translateY.value = withTiming(-30, { duration: 300, easing: Easing.in(Easing.ease) });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        };
    });

    if (isDeleted) {
        return null;
    }

    return (
        <AnimatedView style={[styles.container, animatedStyle, { borderColor: Colors[color ?? 'light'].grey }]}>
            <ThemedText>{name}</ThemedText>
            <Pressable onPress={handleDelete}>
                <IconTrash size={30} color="#e66960" />
            </Pressable>
        </AnimatedView>
    );
};

export default Habit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
});
