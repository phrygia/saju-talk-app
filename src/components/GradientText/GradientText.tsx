import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface GradientTextProps {
  text: string;
  fontSize: number;
  fontWeight?: string;
  letterSpacing?: number;
  colors: string[];
  width?: number;
  height?: number;
}

export function GradientText({
  text,
  fontSize,
  fontWeight = '700',
  letterSpacing = 0,
  colors,
  width = 300,
  height = 60,
}: GradientTextProps) {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            {colors.map((color, idx) => (
              <Stop
                key={`${color}-${idx}`}
                offset={`${(idx / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>
        <SvgText
          x={width / 2}
          y={height / 2 + fontSize / 3}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fill="url(#grad)"
          textAnchor="middle"
        >
          {text}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
