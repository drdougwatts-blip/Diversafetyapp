import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../constants/theme';

interface CallButtonProps {
  label: string;
  phoneNumber: string;
  color?: string;
  variant?: 'primary' | 'secondary';
}

export function CallButton({
  label,
  phoneNumber,
  color = Colors.emergencyRed,
  variant = 'primary',
}: CallButtonProps) {
  const handlePress = async () => {
    const url = `tel:${phoneNumber}`;
    if (Platform.OS === 'web') {
      // tel: links work in most mobile browsers; on desktop show the number
      window.open(url, '_self');
      return;
    }
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert('Unable to Call', `Please dial ${phoneNumber} manually.`);
    }
  };

  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: color }
          : { backgroundColor: 'transparent', borderWidth: 2, borderColor: color },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="call"
        size={20}
        color={isPrimary ? Colors.white : color}
        style={styles.icon}
      />
      <Text style={[styles.label, { color: isPrimary ? Colors.white : color }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    minHeight: MinTapTarget,
    marginVertical: Spacing.xs,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
