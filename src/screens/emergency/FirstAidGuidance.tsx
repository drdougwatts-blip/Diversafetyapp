import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/theme';
import { CallButton } from '../../components/CallButton';

interface StepProps {
  number: number;
  text: string;
  isWarning?: boolean;
}

function Step({ number, text, isWarning }: StepProps) {
  return (
    <View style={[styles.step, isWarning && styles.stepWarning]}>
      <View style={[styles.stepNumber, isWarning && styles.stepNumberWarning]}>
        <Text style={styles.stepNumberText}>
          {isWarning ? '!' : number}
        </Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

export function FirstAidGuidance() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Immediate actions — suspected decompression illness
        </Text>
        <Text style={styles.subtitle}>
          Based on published guidance from DMAC, BSAC, and Edmonds.
        </Text>

        <Step number={1} text="Ensure your own safety first" />
        <Step
          number={2}
          text="Call for help — Coastguard 999 / BHA Helpline"
        />

        <View style={styles.callButtons}>
          <CallButton
            label="Call 999 Coastguard"
            phoneNumber="999"
            color={Colors.emergencyRed}
          />
          <CallButton
            label="BHA Helpline: 07831 151 523"
            phoneNumber="+447831151523"
            color={Colors.primaryNavy}
          />
        </View>

        <Step
          number={3}
          text="Lay the casualty flat (do NOT put in recovery position unless unconscious and vomiting)"
        />
        <Step
          number={4}
          text="Give high-flow oxygen (100%) via demand valve or non-rebreather mask if available"
        />
        <Step number={5} text="Give oral fluids — water, not alcohol" />
        <Step
          number={6}
          text="Keep the casualty warm and comfortable"
        />
        <Step
          number={7}
          text="Monitor breathing and consciousness — be prepared to give CPR"
        />
        <Step
          number={8}
          text="Do NOT recompress in water — this is extremely dangerous"
          isWarning
        />
        <Step
          number={9}
          text="Do NOT give aspirin or other painkillers (may mask symptoms)"
          isWarning
        />
        <Step
          number={10}
          text="Record the time symptoms started, dive profile details, and any changes"
        />
        <Step
          number={11}
          text="Keep all diving equipment — it may be needed for investigation"
        />

        {/* Additional notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>Important Notes</Text>
          <View style={styles.noteRow}>
            <Ionicons name="alert-circle" size={18} color={Colors.amber} />
            <Text style={styles.noteText}>
              Symptoms can appear up to 48 hours after diving
            </Text>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="alert-circle" size={18} color={Colors.amber} />
            <Text style={styles.noteText}>
              Symptoms may worsen — reassess regularly
            </Text>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="alert-circle" size={18} color={Colors.amber} />
            <Text style={styles.noteText}>
              Even "mild" symptoms warrant medical advice
            </Text>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="alert-circle" size={18} color={Colors.amber} />
            <Text style={styles.noteText}>
              If in doubt, call the BHA helpline — the duty doctor would rather
              take a precautionary call than miss a case
            </Text>
          </View>
        </View>

        <View style={styles.reviewDate}>
          <Text style={styles.reviewText}>
            Last reviewed: February 2026 — DDRC Healthcare Medical Team
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginBottom: Spacing.lg,
    fontStyle: 'italic',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  stepWarning: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: Colors.emergencyRed,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  stepNumberWarning: {
    backgroundColor: Colors.emergencyRed,
  },
  stepNumberText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSizes.sm,
  },
  stepText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.darkText,
    lineHeight: 24,
  },
  callButtons: {
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  notesCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.amber,
  },
  notesTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.md,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  noteText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  reviewDate: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  reviewText: {
    fontSize: FontSizes.xs,
    color: Colors.midGrey,
    fontStyle: 'italic',
  },
});
