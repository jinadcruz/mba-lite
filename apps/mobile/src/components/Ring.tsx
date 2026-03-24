import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../styles/tokens';

interface RingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}

export function Ring({ pct, size = 52, stroke = 4, color = colors.accent }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(Math.max(pct, 0), 1));

  return (
    <Svg
      width={size}
      height={size}
      style={{ transform: [{ rotate: '-90deg' }] }}
    >
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colors.border}
        strokeWidth={stroke}
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
}
