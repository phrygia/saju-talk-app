// SplashOverlay.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarBackground from '../StarBackground/StarBackground';
import { OrbitAnimation } from '../OrbitAnimation/OrbitAnimation';

interface Props {
  visible: boolean;
}

export default function Splash({ visible }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <LinearGradient
        colors={['#200f64', '#08071d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <StarBackground />
      <View style={styles.contentWrapper}>
        <OrbitAnimation />
        <Text style={styles.logoText}>SAJU TALK</Text>
        <Text style={styles.subText}>AI 사주 상담</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  logo: {
    width: 280,
    height: 280,
    marginTop: 30,
    resizeMode: 'contain',
  },
  logoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 40,
    fontWeight: 500,
    marginTop: 40,
    letterSpacing: 1.5,
  },
  subText: { color: '#dccdffa6', marginTop: 5, fontSize: 14 },
});
