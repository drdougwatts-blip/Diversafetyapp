import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../constants/theme';

interface OfflineBannerProps {
  isConnected: boolean;
}

export function OfflineBanner({ isConnected }: OfflineBannerProps) {
  if (isConnected) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        You're offline. Some features require an internet connection.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.amber,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  text: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
});
