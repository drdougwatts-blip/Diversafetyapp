import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants/theme';

interface StatusBadgeProps {
  status: 'Fully operational' | 'No critical care' | 'Not operational';
}

const statusConfig = {
  'Fully operational': { color: Colors.statusGreen, label: 'Operational' },
  'No critical care': { color: Colors.statusAmber, label: 'No Critical Care' },
  'Not operational': { color: Colors.statusRed, label: 'Not Operational' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.label}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
});
