import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

export function OrbitAnimation() {
  const ring1Rotation = useRef(new Animated.Value(0)).current;
  const ring3Rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ring 2 rotation
    Animated.loop(
      Animated.timing(ring1Rotation, {
        toValue: 360,
        duration: 12000,
        useNativeDriver: true,
      }),
    ).start();

    // Ring 3 reverse rotation
    Animated.loop(
      Animated.timing(ring3Rotation, {
        toValue: -360,
        duration: 14000,
        useNativeDriver: true,
      }),
    ).start();
  }, [ring1Rotation, ring3Rotation]);

  const ring2RotateStyle = {
    transform: [
      {
        rotate: ring1Rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const ring3RotateStyle = {
    transform: [
      {
        rotate: ring3Rotation.interpolate({
          inputRange: [-360, 0],
          outputRange: ['-360deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Ring 1 - static */}
      <View style={[styles.ring, styles.ring1]} />

      {/* Ring 2 - rotating */}
      <Animated.View style={[styles.ring, styles.ring2, ring2RotateStyle]}>
        <View style={styles.ringDot} />
      </Animated.View>

      {/* Ring 3 - reverse rotating */}
      <Animated.View style={[styles.ring, styles.ring3, ring3RotateStyle]}>
        <View style={[styles.ringDot, styles.ringDotGold]} />
      </Animated.View>

      {/* Center content */}
      <View style={styles.ringCenter}>
        <Text style={styles.ringHanja}>사주</Text>
        <Text style={styles.ringHanja}>팔자</Text>
        {/* <Text style={styles.ringSub}>AI</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  ring: {
    position: 'absolute',
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 999,
  },

  ring1: {
    width: 100,
    height: 100,
  },

  ring2: {
    width: 210,
    height: 210,
  },

  ring3: {
    width: 330,
    height: 330,
  },

  ringDot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#a78bfa',
    top: -3.5,
    left: '50%',
    marginLeft: -3.5,
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },

  ringDotGold: {
    backgroundColor: '#f0c060',
    shadowColor: '#f0c060',
  },

  ringCenter: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
  },

  ringHanja: {
    fontSize: 22,
    fontWeight: '600',
    color: '#a78bfa',
    lineHeight: 24,
  },

  ringSub: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: 'rgba(180, 155, 255, 0.4)',
    marginTop: 4,
    textAlign: 'center',
  },
});
