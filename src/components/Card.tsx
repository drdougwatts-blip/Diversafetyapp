import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  accentColor?: string;
}

export function Card({ title, children, onPress, style, accentColor }: CardProps) {
  const content = (
    <View
      style={[
        styles.card,
        accentColor ? { borderLeftColor: accentColor, borderLeftWidth: 4 } : null,
        style,
      ]}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.sm,
  },
});
