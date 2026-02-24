import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ReportStackParamList } from './ReportStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';

type Props = NativeStackScreenProps<ReportStackParamList, 'SubmissionConfirmation'>;

export function SubmissionConfirmation({ route, navigation }: Props) {
  const { reference } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color={Colors.green} />
        </View>

        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.message}>
          Your anonymous report has been submitted and will be forwarded to
          BSAC's national incident database.
        </Text>
        <Text style={styles.message}>
          Reports like yours help make diving safer for everyone.
        </Text>

        {reference && reference !== 'Submitted' && (
          <View style={styles.referenceBox}>
            <Text style={styles.referenceLabel}>Reference</Text>
            <Text style={styles.referenceValue}>{reference}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            navigation.getParent()?.navigate('Emergency');
          }}
        >
          <Ionicons name="home" size={20} color={Colors.white} />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSizes.md,
    color: Colors.midGrey,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  referenceBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
  },
  referenceValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primaryNavy,
    marginTop: Spacing.xs,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryNavy,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
    minHeight: MinTapTarget,
  },
  homeButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
