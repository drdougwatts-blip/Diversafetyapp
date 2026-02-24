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

type NavigationProp = NativeStackNavigationProp<ReportStackParamList, 'IncidentReport'>;

const INCIDENT_TYPES = [
  'Decompression illness',
  'Rapid ascent',
  'Out of gas',
  'Free flow',
  'Equipment failure',
  'Lost buddy',
  'Entanglement',
  'Buoyancy problem',
  'Boat/surface incident',
  'Medical event',
  'Other',
];

const SEVERITY_OPTIONS = [
  'No injury',
  'Minor injury (no medical treatment)',
  'Medical treatment required',
  'Hospitalisation',
  'Fatality',
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

const OUTCOME_OPTIONS = [
  'Self-resolved',
  'Treated and recovered',
  'Ongoing treatment',
  'Unknown',
];

const ROLE_OPTIONS = [
  'I was the diver',
  'I was the buddy',
  'I was the dive leader',
  'I was an observer',
];

const EXPERIENCE_OPTIONS = [
  'Trainee',
  'Sports Diver-equivalent',
  'Dive Leader-equivalent',
  'Instructor',
  'Technical diver',
];

const AGENCY_OPTIONS = ['BSAC', 'PADI', 'SSI', 'RAID', 'Other'];

const GAS_OPTIONS = ['Air', 'Nitrox', 'Trimix', 'Other'];

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

function SingleSelect({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}) {
  return (
    <View style={styles.multiSelectContainer}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option)}
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

export function IncidentReport() {
  const navigation = useNavigation<NavigationProp>();
  const [submitting, setSubmitting] = useState(false);

  // Dive Profile
  const [diveDate, setDiveDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  const [bottomTime, setBottomTime] = useState('');
  const [gasMix, setGasMix] = useState('Air');
  const [decompCompleted, setDecompCompleted] = useState('Yes');
  const [rapidAscent, setRapidAscent] = useState('No');

  // What happened
  const [incidentTypes, setIncidentTypes] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [contributingFactors, setContributingFactors] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  // Outcome
  const [medicalAdvice, setMedicalAdvice] = useState('');
  const [hyperbaricTreatment, setHyperbaricTreatment] = useState('');
  const [outcome, setOutcome] = useState('');

  // Reporter context (optional)
  const [reporterRole, setReporterRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [trainingAgency, setTrainingAgency] = useState('');

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
      Alert.alert('Description Required', 'Please provide a brief description of what happened.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        type: 'incident' as const,
        data: {
          diveDate,
          location,
          maxDepth,
          bottomTime,
          gasMix,
          decompCompleted,
          rapidAscent,
          incidentTypes,
          severity,
          contributingFactors,
          description,
          medicalAdviceSought: medicalAdvice,
          hyperbaricTreatment,
          outcome,
          reporterRole,
          experienceLevel,
          trainingAgency,
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
            This report is anonymous. No personal information is collected or stored.
          </Text>
        </View>

        {/* Dive Profile */}
        <Text style={styles.sectionTitle}>Dive Profile</Text>

        <Text style={styles.fieldLabel}>Date and time of dive</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 24 Feb 2026, 14:30"
          placeholderTextColor={Colors.midGrey}
          value={diveDate}
          onChangeText={setDiveDate}
        />

        <Text style={styles.fieldLabel}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. The Manacles, Cornwall"
          placeholderTextColor={Colors.midGrey}
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.fieldLabel}>Maximum depth (metres)</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="e.g. 30"
          placeholderTextColor={Colors.midGrey}
          value={maxDepth}
          onChangeText={setMaxDepth}
        />

        <Text style={styles.fieldLabel}>Bottom time (minutes)</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="e.g. 45"
          placeholderTextColor={Colors.midGrey}
          value={bottomTime}
          onChangeText={setBottomTime}
        />

        <Text style={styles.fieldLabel}>Gas mix</Text>
        <SingleSelect options={GAS_OPTIONS} selected={gasMix} onSelect={setGasMix} />

        <Text style={styles.fieldLabel}>Decompression stops completed?</Text>
        <SingleSelect
          options={['Yes', 'No', 'Missed']}
          selected={decompCompleted}
          onSelect={setDecompCompleted}
        />

        <Text style={styles.fieldLabel}>Rapid or uncontrolled ascent?</Text>
        <SingleSelect
          options={['Yes', 'No']}
          selected={rapidAscent}
          onSelect={setRapidAscent}
        />

        {/* What Happened */}
        <Text style={styles.sectionTitle}>What Happened</Text>

        <Text style={styles.fieldLabel}>Incident type (select all that apply)</Text>
        <MultiSelect
          options={INCIDENT_TYPES}
          selected={incidentTypes}
          onToggle={(o) => toggleMulti(incidentTypes, setIncidentTypes, o)}
        />

        <Text style={styles.fieldLabel}>Severity</Text>
        <SingleSelect options={SEVERITY_OPTIONS} selected={severity} onSelect={setSeverity} />

        <Text style={styles.fieldLabel}>Contributing factors (select all that apply)</Text>
        <MultiSelect
          options={CONTRIBUTING_FACTORS}
          selected={contributingFactors}
          onToggle={(o) => toggleMulti(contributingFactors, setContributingFactors, o)}
        />

        <Text style={styles.fieldLabel}>What happened (brief description)</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Describe the incident..."
          placeholderTextColor={Colors.midGrey}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        {/* Outcome */}
        <Text style={styles.sectionTitle}>Outcome</Text>

        <Text style={styles.fieldLabel}>Was medical advice sought?</Text>
        <SingleSelect
          options={['Yes', 'No']}
          selected={medicalAdvice}
          onSelect={setMedicalAdvice}
        />

        <Text style={styles.fieldLabel}>Was hyperbaric treatment required?</Text>
        <SingleSelect
          options={['Yes', 'No']}
          selected={hyperbaricTreatment}
          onSelect={setHyperbaricTreatment}
        />

        <Text style={styles.fieldLabel}>Outcome</Text>
        <SingleSelect options={OUTCOME_OPTIONS} selected={outcome} onSelect={setOutcome} />

        {/* Reporter Context */}
        <Text style={styles.sectionTitle}>About You (optional)</Text>

        <Text style={styles.fieldLabel}>Your role</Text>
        <SingleSelect options={ROLE_OPTIONS} selected={reporterRole} onSelect={setReporterRole} />

        <Text style={styles.fieldLabel}>Experience level</Text>
        <SingleSelect
          options={EXPERIENCE_OPTIONS}
          selected={experienceLevel}
          onSelect={setExperienceLevel}
        />

        <Text style={styles.fieldLabel}>Training agency</Text>
        <SingleSelect
          options={AGENCY_OPTIONS}
          selected={trainingAgency}
          onSelect={setTrainingAgency}
        />

        {/* Submit */}
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
              <Text style={styles.submitButtonText}>Submit Anonymous Report</Text>
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
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primaryNavy,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGrey,
  },
  fieldLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.darkText,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
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
    minHeight: 100,
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
