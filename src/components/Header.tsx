import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>UK Diver Safety Toolkit</Text>
      {title && <Text style={styles.subtitle}>{title}</Text>}
      <Text style={styles.charity}>DDRC Healthcare — Charity No. 279652</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryNavy,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  appName: {
    color: Colors.white,
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.lightTeal,
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  charity: {
    color: Colors.midGrey,
    fontSize: FontSizes.xs,
    marginTop: 2,
  },
});
