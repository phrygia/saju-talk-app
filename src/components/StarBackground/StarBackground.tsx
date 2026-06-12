import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function StarBackground() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
  }));

  return (
    <View style={styles.container}>
      {stars.map(star => (
        <View
          key={star.id}
          style={[
            styles.star,
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'rgba(200, 180, 255, 0.6)',
    borderRadius: 999,
  },
});
