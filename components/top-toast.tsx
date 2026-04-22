import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSelector } from '@/store/hooks';

export function TopToast() {
  const { message, type, token } = useAppSelector((state) => state.toast);
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message || token === 0) {
      return;
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1400),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [message, opacity, token, translateY]);

  const toastStyle =
    type === 'success' ? styles.success : type === 'error' ? styles.error : styles.info;

  return (
    <View pointerEvents="none" style={[styles.wrapper, { top: insets.top + 18 }]}>
      <Animated.View style={[styles.toast, toastStyle, { opacity, transform: [{ translateY }] }]}>
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  toast: {
    width: '92%',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  info: {
    backgroundColor: '#0F172A',
  },
  success: {
    backgroundColor: '#166534',
  },
  error: {
    backgroundColor: '#B91C1C',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
});
