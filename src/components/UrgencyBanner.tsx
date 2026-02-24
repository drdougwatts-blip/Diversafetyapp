import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface UrgencyBannerProps {
  level: 'urgent' | 'caution';
  message: string;
}

export function UrgencyBanner({ level, message }: UrgencyBannerProps) {
  const isUrgent = level === 'urgent';

  return (
    <View
      style={[
        styles.banner,
        { backgroundColor: isUrgent ? Colors.emergencyRed : Colors.amber },
      ]}
    >
      <Ionicons
        name={isUrgent ? 'warning' : 'alert-circle'}
        size={24}
        color={Colors.white}
        style={styles.icon}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '700',
    flex: 1,
  },
});
