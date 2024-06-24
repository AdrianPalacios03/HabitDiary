import { useLanguage } from '@/hooks/useLanguage';
import useColorStore from '@/store';
import { IconCircleDashedCheck } from '@tabler/icons-react-native';
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';


const AnimatedView = Animated.createAnimatedComponent(View);

interface Props {
    onPress: () => void;
    color: string;
}

const ReadyButton = ({onPress, color}: Props) => {

    const translateY = useSharedValue(-30);
    const opacity = useSharedValue(0);
    const { lan } = useLanguage();

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) });
        opacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        };
    });

    return (
        <AnimatedView style={animatedStyle}>
            <Pressable onPress={onPress} style={{...styles.container, backgroundColor: color}}>
                <Text style={{color: 'white'}}>{lan.habitselector.ready}</Text>
                <IconCircleDashedCheck size={30} color="white"/>
            </Pressable>
        </AnimatedView>
    )
}

export default ReadyButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderRadius: 10,
    }

})