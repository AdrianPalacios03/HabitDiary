import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/hooks/useLanguage';
import { IconCircleDashedCheck, IconDeviceFloppy, IconRocket } from '@tabler/icons-react-native';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Pressable, View, Animated } from 'react-native';

interface Props {
  title?: string,
  onClick: () => void,
  isSaving: boolean,
  isSaveButton?: boolean
}

export const SaveButton = ({ title, onClick, isSaving, isSaveButton }: Props) => {
  const { lan } = useLanguage();
  const [isPressed, setIsPressed] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setIsPressed(true);
    onClick();

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => setIsPressed(false));
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary, '#00b55e']
  });

  return (
    <Pressable onPress={handlePress} disabled={isSaving || isPressed}>
      <Animated.View style={{ ...styles.saveButton, backgroundColor }}>
        <View style={styles.checkIcon}>
          {isSaveButton ?
            isSaving || isPressed
              ? <IconCircleDashedCheck size={20} color='white' />
              : <IconDeviceFloppy size={22} color='aliceblue' />
            : <IconRocket />
          }
          <Text style={styles.saveButtonText}>{isPressed ? lan.home.saved : (title || lan.home.save)}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: 'center',
  },
  checkIcon: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10
  },
  saveButtonText: {
    color: 'aliceblue',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 0,
  }
});
