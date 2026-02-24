import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { UrgencyBanner } from '../../components/UrgencyBanner';

interface CheckItem {
  id: string;
  question: string;
  positiveAnswer: boolean; // true = "yes is good", false = "yes is bad"
  isCritical: boolean;
}

const checkItems: CheckItem[] = [
  {
    id: 'sleep',
    question: 'Did you sleep well last night?',
    positiveAnswer: true,
    isCritical: false,
  },
  {
    id: 'alcohol',
    question: 'Have you consumed alcohol in the last 12 hours?',
    positiveAnswer: false,
    isCritical: true,
  },
  {
    id: 'eating',
    question: 'Have you eaten and are you well hydrated?',
    positiveAnswer: true,
    isCritical: false,
  },
  {
    id: 'unwell',
    question: 'Are you feeling unwell, congested, or have a cold?',
    positiveAnswer: false,
    isCritical: true,
  },
  {
    id: 'medication',
    question: 'Are you on any new medication?',
    positiveAnswer: false,
    isCritical: false,
  },
  {
    id: 'stress',
    question: 'Are you feeling stressed, anxious, or distracted?',
    positiveAnswer: false,
    isCritical: false,
  },
  {
    id: 'fit',
    question: 'Do you feel physically fit to dive today?',
    positiveAnswer: true,
    isCritical: false,
  },
  {
    id: 'pressured',
    question: 'Do you feel pressured to dive (by buddy, group, or paid trip)?',
    positiveAnswer: false,
    isCritical: true,
  },
  {
    id: 'equipment',
    question: 'Is your equipment serviced and in good condition?',
    positiveAnswer: true,
    isCritical: false,
  },
  {
    id: 'conditions',
    question: 'Have you checked conditions (weather, tide, visibility)?',
    positiveAnswer: true,
    isCritical: false,
  },
];

export function PersonalFitnessCheck() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);

  const setAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allAnswered = checkItems.every((item) => answers[item.id] != null);

  const getConcerns = () => {
    return checkItems.filter((item) => {
      const answer = answers[item.id];
      if (answer == null) return false;
      return answer !== item.positiveAnswer;
    });
  };

  const hasCriticalConcern = () => {
    return getConcerns().some((item) => item.isCritical);
  };

  const evaluate = () => {
    setShowResult(true);
  };

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const concerns = getConcerns();
  const concernCount = concerns.length;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.disclaimer}>
          <Ionicons name="information-circle" size={18} color={Colors.teal} />
          <Text style={styles.disclaimerText}>
            This is not a medical assessment. It is a structured prompt to help
            you honestly evaluate your readiness to dive. No data is stored or
            transmitted.
          </Text>
        </View>

        {!showResult ? (
          <>
            <Text style={styles.title}>Should I dive today?</Text>

            {checkItems.map((item) => (
              <View key={item.id} style={styles.checkRow}>
                <Text style={styles.checkQuestion}>{item.question}</Text>
                <View style={styles.toggleRow}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      answers[item.id] === true && styles.toggleYes,
                    ]}
                    onPress={() => setAnswer(item.id, true)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        answers[item.id] === true && styles.toggleTextSelected,
                      ]}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      answers[item.id] === false && styles.toggleNo,
                    ]}
                    onPress={() => setAnswer(item.id, false)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        answers[item.id] === false && styles.toggleTextSelected,
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.evaluateButton, !allAnswered && styles.buttonDisabled]}
              onPress={evaluate}
              disabled={!allAnswered}
            >
              <Text style={styles.evaluateButtonText}>Evaluate</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Results */}
            {concernCount === 0 && (
              <UrgencyBanner
                level="caution"
                message="You're good to go. Dive safe!"
              />
            )}
            {concernCount >= 1 && concernCount <= 2 && !hasCriticalConcern() && (
              <UrgencyBanner
                level="caution"
                message="Consider these factors before diving. Discuss with your buddy."
              />
            )}
            {(concernCount >= 3 || hasCriticalConcern()) && (
              <UrgencyBanner
                level="urgent"
                message="Think carefully about whether today is the right day to dive. There's no shame in calling it."
              />
            )}

            {/* Override the banner color for the "good to go" case */}
            {concernCount === 0 && (
              <View style={styles.goodBanner}>
                <Ionicons name="checkmark-circle" size={48} color={Colors.green} />
                <Text style={styles.goodText}>
                  All checks passed. Have a great dive!
                </Text>
              </View>
            )}

            {concerns.length > 0 && (
              <View style={styles.concernsList}>
                <Text style={styles.concernsTitle}>Flagged items:</Text>
                {concerns.map((item) => (
                  <View key={item.id} style={styles.concernItem}>
                    <Ionicons
                      name={item.isCritical ? 'warning' : 'alert-circle'}
                      size={18}
                      color={item.isCritical ? Colors.emergencyRed : Colors.amber}
                    />
                    <Text style={styles.concernText}>{item.question}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetButtonText}>Start Over</Text>
            </TouchableOpacity>
          </>
        )}
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
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.teal,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.md,
  },
  checkRow: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  checkQuestion: {
    fontSize: FontSizes.md,
    color: Colors.darkText,
    marginBottom: Spacing.sm,
    lineHeight: 22,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    alignItems: 'center',
    minHeight: MinTapTarget,
    justifyContent: 'center',
  },
  toggleYes: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  toggleNo: {
    backgroundColor: Colors.emergencyRed,
    borderColor: Colors.emergencyRed,
  },
  toggleText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.darkText,
  },
  toggleTextSelected: {
    color: Colors.white,
  },
  evaluateButton: {
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.md,
    minHeight: MinTapTarget,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  evaluateButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  goodBanner: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  goodText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.green,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  concernsList: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  concernsTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.sm,
  },
  concernItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  concernText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  resetButton: {
    borderWidth: 2,
    borderColor: Colors.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    minHeight: MinTapTarget,
  },
  resetButtonText: {
    color: Colors.teal,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
