import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyStackParamList } from './EmergencyStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { symptomCategories } from '../../data/symptoms';
import { DiveProfile } from '../../types';

type NavigationProp = NativeStackNavigationProp<EmergencyStackParamList, 'SymptomChecker'>;

const DIVE_TIME_OPTIONS = [
  'Within last hour',
  '1-6 hours ago',
  '6-24 hours ago',
  '24-48 hours ago',
  'More than 48 hours ago',
];

const GAS_OPTIONS: DiveProfile['gasMix'][] = ['Air', 'Nitrox', 'Trimix', 'Other'];
const YES_NO = ['Yes', 'No'] as const;
const DECOMP_OPTIONS: DiveProfile['decompStops'][] = ['Yes', 'No', 'Planned but missed'];
const ASCENT_OPTIONS: DiveProfile['rapidAscent'][] = ['Yes', 'No', 'Unsure'];
const DIVE_COUNT_OPTIONS: DiveProfile['divesToday'][] = ['1', '2', '3+'];

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function OptionButton({ label, selected, onPress }: OptionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function SymptomChecker() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(1);

  // Step 1 — Dive Profile
  const [diveProfile, setDiveProfile] = useState<DiveProfile>({
    lastDiveTime: '',
    maxDepthMetres: '',
    bottomTimeMinutes: '',
    gasMix: 'Air',
    decompStops: 'Yes',
    rapidAscent: 'No',
    equipmentProblems: 'No',
    equipmentDetails: '',
    divesToday: '1',
    flyingRecently: 'No',
  });

  // Step 2 — Symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateProfile = <K extends keyof DiveProfile>(key: K, value: DiveProfile[K]) => {
    setDiveProfile((prev) => ({ ...prev, [key]: value }));
  };

  const goToStep2 = () => {
    if (!diveProfile.lastDiveTime) {
      Alert.alert('Missing Information', 'Please select when you last dived.');
      return;
    }
    setStep(2);
  };

  const goToResults = () => {
    if (selectedSymptoms.size === 0) {
      Alert.alert('No Symptoms Selected', 'Please select at least one symptom to continue.');
      return;
    }

    const hasNeurological = Array.from(selectedSymptoms).some((id) => {
      for (const category of symptomCategories) {
        const symptom = category.symptoms.find((s) => s.id === id);
        if (symptom?.isNeurological) return true;
      }
      return false;
    });

    navigation.navigate('SymptomResult', {
      diveProfile: JSON.stringify(diveProfile),
      selectedSymptoms: JSON.stringify(Array.from(selectedSymptoms)),
      hasNeurological,
      timestamp: new Date().toISOString(),
    });
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.disclaimer}>
            <Ionicons name="information-circle" size={20} color={Colors.teal} />
            <Text style={styles.disclaimerText}>
              This is a triage and communication tool, NOT a diagnostic tool. It helps you assess and communicate symptoms to medical professionals.
            </Text>
          </View>

          <Text style={styles.stepTitle}>Step 1 of 2: Dive Profile</Text>

          {/* When did you last dive? */}
          <Text style={styles.fieldLabel}>When did you last dive?</Text>
          <View style={styles.optionGroup}>
            {DIVE_TIME_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.lastDiveTime === option}
                onPress={() => updateProfile('lastDiveTime', option)}
              />
            ))}
          </View>

          {/* Max depth */}
          <Text style={styles.fieldLabel}>Maximum depth (metres)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="e.g. 30"
            placeholderTextColor={Colors.midGrey}
            value={diveProfile.maxDepthMetres}
            onChangeText={(v) => updateProfile('maxDepthMetres', v)}
          />

          {/* Bottom time */}
          <Text style={styles.fieldLabel}>Bottom time (minutes)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="e.g. 45"
            placeholderTextColor={Colors.midGrey}
            value={diveProfile.bottomTimeMinutes}
            onChangeText={(v) => updateProfile('bottomTimeMinutes', v)}
          />

          {/* Gas mix */}
          <Text style={styles.fieldLabel}>Gas mix</Text>
          <View style={styles.optionRow}>
            {GAS_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.gasMix === option}
                onPress={() => updateProfile('gasMix', option)}
              />
            ))}
          </View>

          {/* Decompression stops */}
          <Text style={styles.fieldLabel}>Did you do decompression stops?</Text>
          <View style={styles.optionGroup}>
            {DECOMP_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.decompStops === option}
                onPress={() => updateProfile('decompStops', option)}
              />
            ))}
          </View>

          {/* Rapid ascent */}
          <Text style={styles.fieldLabel}>Any rapid ascent?</Text>
          <View style={styles.optionRow}>
            {ASCENT_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.rapidAscent === option}
                onPress={() => updateProfile('rapidAscent', option)}
              />
            ))}
          </View>

          {/* Equipment problems */}
          <Text style={styles.fieldLabel}>Any equipment problems?</Text>
          <View style={styles.optionRow}>
            {YES_NO.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.equipmentProblems === option}
                onPress={() => updateProfile('equipmentProblems', option)}
              />
            ))}
          </View>
          {diveProfile.equipmentProblems === 'Yes' && (
            <TextInput
              style={styles.textInput}
              placeholder="Describe equipment problems"
              placeholderTextColor={Colors.midGrey}
              value={diveProfile.equipmentDetails}
              onChangeText={(v) => updateProfile('equipmentDetails', v)}
              multiline
            />
          )}

          {/* Dives today */}
          <Text style={styles.fieldLabel}>Number of dives today</Text>
          <View style={styles.optionRow}>
            {DIVE_COUNT_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.divesToday === option}
                onPress={() => updateProfile('divesToday', option)}
              />
            ))}
          </View>

          {/* Flying recently */}
          <Text style={styles.fieldLabel}>Flying within last 24 hours?</Text>
          <View style={styles.optionRow}>
            {YES_NO.map((option) => (
              <OptionButton
                key={option}
                label={option}
                selected={diveProfile.flyingRecently === option}
                onPress={() => updateProfile('flyingRecently', option)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={goToStep2}>
            <Text style={styles.nextButtonText}>Next: Symptoms</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Step 2 — Symptoms
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepTitle}>Step 2 of 2: Current Symptoms</Text>
        <Text style={styles.stepSubtitle}>
          Select all symptoms currently present. Tap to toggle.
        </Text>

        {symptomCategories.map((category) => (
          <View key={category.name} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.symptoms.map((symptom) => {
              const isSelected = selectedSymptoms.has(symptom.id);
              return (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomRow,
                    isSelected && styles.symptomRowSelected,
                    symptom.isNeurological && isSelected && styles.symptomRowNeurological,
                  ]}
                  onPress={() => toggleSymptom(symptom.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isSelected ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={
                      isSelected
                        ? symptom.isNeurological
                          ? Colors.emergencyRed
                          : Colors.teal
                        : Colors.midGrey
                    }
                  />
                  <Text
                    style={[
                      styles.symptomLabel,
                      isSelected && styles.symptomLabelSelected,
                    ]}
                  >
                    {symptom.label}
                  </Text>
                  {symptom.isNeurological && (
                    <View style={styles.neuroTag}>
                      <Text style={styles.neuroTagText}>Neuro</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(1)}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.teal} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={goToResults}>
            <Text style={styles.nextButtonText}>View Summary</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
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
  stepTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  stepSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  optionGroup: {
    gap: Spacing.xs,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  optionButton: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    minHeight: MinTapTarget,
    justifyContent: 'center',
  },
  optionButtonSelected: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  optionText: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
  },
  optionTextSelected: {
    color: Colors.white,
    fontWeight: '600',
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
  categoryContainer: {
    marginBottom: Spacing.md,
  },
  categoryTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  symptomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
    minHeight: MinTapTarget,
  },
  symptomRowSelected: {
    backgroundColor: '#E0F2F1',
  },
  symptomRowNeurological: {
    backgroundColor: '#FFEBEE',
  },
  symptomLabel: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.darkText,
  },
  symptomLabelSelected: {
    fontWeight: '600',
  },
  neuroTag: {
    backgroundColor: Colors.emergencyRed,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  neuroTagText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  nextButton: {
    flex: 1,
    backgroundColor: Colors.emergencyRed,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    minHeight: MinTapTarget,
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.teal,
    gap: Spacing.xs,
    minHeight: MinTapTarget,
  },
  backButtonText: {
    color: Colors.teal,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
