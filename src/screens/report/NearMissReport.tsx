import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ReportStackParamList } from './ReportStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { API_ENDPOINTS } from '../../constants/api';

type NavigationProp = NativeStackNavigationProp<ReportStackParamList, 'NearMissReport'>;

const NEAR_MISS_TYPES = [
  'Rapid ascent caught in time',
  'Free flow',
  'Out of gas warning',
  'Lost buddy (reunited)',
  'Equipment malfunction (managed)',
  'Entanglement (freed)',
  'Buoyancy incident',
  'Missed deco (completed extra stops)',
  'Boat/surface issue',
  'Other',
];

const CONTRIBUTING_FACTORS = [
  'Equipment failure',
  'Poor planning',
  'Conditions (weather/tide/current)',
  'Fitness/health',
  'Training/experience',
  'Communication',
  'Peer pressure',
  'Complacency',
  'Other',
];

const EXPERIENCE_OPTIONS = [
  'Trainee',
  'Sports Diver-equivalent',
  'Dive Leader-equivalent',
  'Instructor',
  'Technical diver',
];

function MultiSelect({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <View style={styles.multiSelectContainer}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onToggle(option)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function NearMissReport() {
  const navigation = useNavigation<NavigationProp>();
  const [submitting, setSubmitting] = useState(false);

  const [dateLocation, setDateLocation] = useState('');
  const [whatHappened, setWhatHappened] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [whatPreventedIt, setWhatPreventedIt] = useState('');
  const [contributingFactors, setContributingFactors] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('');

  const toggleMulti = (
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    option: string
  ) => {
    if (list.includes(option)) {
      setter(list.filter((o) => o !== option));
    } else {
      setter([...list, option]);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert(
        'Description Required',
        'Please provide a brief description of what happened.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        type: 'near-miss' as const,
        data: {
          dateLocation,
          whatHappened,
          description,
          whatPreventedIt,
          contributingFactors,
          experienceLevel,
        },
      };

      const response = await fetch(API_ENDPOINTS.reportSubmit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');
      const result = await response.json();

      navigation.replace('SubmissionConfirmation', {
        reference: result.reference || 'Submitted',
      });
    } catch {
      Alert.alert(
        'Submission Failed',
        'Unable to submit your report. Please check your internet connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.privacyBanner}>
          <Ionicons name="shield-checkmark" size={18} color={Colors.green} />
          <Text style={styles.privacyText}>
            This report is anonymous. No personal information is collected or
            stored.
          </Text>
        </View>

        <Text style={styles.intro}>
          Something nearly went wrong? Near-miss reports are vital for
          identifying patterns and preventing future incidents.
        </Text>

        <Text style={styles.fieldLabel}>Date and location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 24 Feb 2026, The Manacles, Cornwall"
          placeholderTextColor={Colors.midGrey}
          value={dateLocation}
          onChangeText={setDateLocation}
        />

        <Text style={styles.fieldLabel}>What happened? (select all that apply)</Text>
        <MultiSelect
          options={NEAR_MISS_TYPES}
          selected={whatHappened}
          onToggle={(o) => toggleMulti(whatHappened, setWhatHappened, o)}
        />

        <Text style={styles.fieldLabel}>Brief description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Describe what happened..."
          placeholderTextColor={Colors.midGrey}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <Text style={styles.fieldLabel}>
          What prevented it becoming serious?
        </Text>
        <Text style={styles.fieldHint}>
          This is the most valuable field for safety learning.
        </Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          multiline
          numberOfLines={3}
          placeholder="What actions or factors prevented a worse outcome?"
          placeholderTextColor={Colors.midGrey}
          value={whatPreventedIt}
          onChangeText={setWhatPreventedIt}
          textAlignVertical="top"
        />

        <Text style={styles.fieldLabel}>
          Contributing factors (select all that apply)
        </Text>
        <MultiSelect
          options={CONTRIBUTING_FACTORS}
          selected={contributingFactors}
          onToggle={(o) =>
            toggleMulti(contributingFactors, setContributingFactors, o)
          }
        />

        <Text style={styles.fieldLabel}>Experience level (optional)</Text>
        <View style={styles.multiSelectContainer}>
          {EXPERIENCE_OPTIONS.map((option) => {
            const isSelected = experienceLevel === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setExperienceLevel(isSelected ? '' : option)}
              >
                <Text
                  style={[styles.chipText, isSelected && styles.chipTextSelected]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <Ionicons name="send" size={20} color={Colors.white} />
              <Text style={styles.submitButtonText}>
                Submit Anonymous Report
              </Text>
            </>
          )}
        </TouchableOpacity>
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
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
    gap: Spacing.sm,
  },
  privacyText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 18,
  },
  intro: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  fieldHint: {
    fontSize: FontSizes.xs,
    color: Colors.midGrey,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
    marginTop: -Spacing.xs,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.darkText,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    minHeight: MinTapTarget,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  multiSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    minHeight: 40,
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: Colors.amber,
    borderColor: Colors.amber,
  },
  chipText: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
  },
  chipTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.amber,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
    minHeight: MinTapTarget,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
