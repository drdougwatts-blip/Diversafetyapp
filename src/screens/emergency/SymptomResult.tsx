import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyStackParamList } from './EmergencyStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { CallButton } from '../../components/CallButton';
import { UrgencyBanner } from '../../components/UrgencyBanner';
import { symptomCategories } from '../../data/symptoms';
import { DiveProfile } from '../../types';

type Props = NativeStackScreenProps<EmergencyStackParamList, 'SymptomResult'>;

export function SymptomResult({ route, navigation: nav }: Props) {
  const { diveProfile: dpStr, selectedSymptoms: ssStr, hasNeurological, timestamp } = route.params;
  const diveProfile: DiveProfile = JSON.parse(dpStr);
  const selectedSymptomIds: string[] = JSON.parse(ssStr);

  const formatTimestamp = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group selected symptoms by category
  const groupedSymptoms: { category: string; symptoms: string[] }[] = [];
  for (const cat of symptomCategories) {
    const matched = cat.symptoms
      .filter((s) => selectedSymptomIds.includes(s.id))
      .map((s) => s.label);
    if (matched.length > 0) {
      groupedSymptoms.push({ category: cat.name, symptoms: matched });
    }
  }

  const buildSummaryText = () => {
    let text = '=== DIVER SYMPTOM ASSESSMENT SUMMARY ===\n\n';
    text += `Generated: ${formatTimestamp(timestamp)}\n\n`;

    text += '--- DIVE PROFILE ---\n';
    text += `Last dive: ${diveProfile.lastDiveTime}\n`;
    if (diveProfile.maxDepthMetres) text += `Max depth: ${diveProfile.maxDepthMetres}m\n`;
    if (diveProfile.bottomTimeMinutes) text += `Bottom time: ${diveProfile.bottomTimeMinutes} min\n`;
    text += `Gas: ${diveProfile.gasMix}\n`;
    text += `Deco stops: ${diveProfile.decompStops}\n`;
    text += `Rapid ascent: ${diveProfile.rapidAscent}\n`;
    if (diveProfile.equipmentProblems === 'Yes') {
      text += `Equipment problems: ${diveProfile.equipmentDetails || 'Yes'}\n`;
    }
    text += `Dives today: ${diveProfile.divesToday}\n`;
    text += `Recent flying: ${diveProfile.flyingRecently}\n\n`;

    text += '--- SYMPTOMS ---\n';
    for (const group of groupedSymptoms) {
      text += `\n${group.category}:\n`;
      for (const symptom of group.symptoms) {
        text += `  - ${symptom}\n`;
      }
    }

    text += `\nNeurological symptoms present: ${hasNeurological ? 'YES' : 'No'}\n`;
    text += '\n--- FIRST AID REMINDERS ---\n';
    text += '- Lie flat\n- Give high-flow oxygen (100%) if available\n- Give fluids (water)\n- Do NOT recompress in water\n- Monitor and reassess\n';

    return text;
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: buildSummaryText(),
        title: 'Diver Symptom Assessment Summary',
      });
    } catch {
      // User cancelled
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Urgency banner */}
        {hasNeurological ? (
          <UrgencyBanner
            level="urgent"
            message="These symptoms need urgent assessment"
          />
        ) : (
          <UrgencyBanner
            level="caution"
            message="These symptoms may indicate decompression illness"
          />
        )}

        {/* Call buttons */}
        {hasNeurological ? (
          <View style={styles.callActions}>
            <CallButton
              label="CALL DDRC NOW"
              phoneNumber="+441752209999"
              color={Colors.emergencyRed}
            />
            <CallButton
              label="CALL 999 COASTGUARD"
              phoneNumber="999"
              color={Colors.primaryNavy}
            />
            <TouchableOpacity
              style={styles.chamberFinderButton}
              onPress={() => nav.navigate('ChamberFinder')}
            >
              <Ionicons name="locate" size={20} color={Colors.teal} />
              <Text style={styles.chamberFinderText}>Find nearest chamber</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.callActions}>
            <CallButton
              label="CALL DDRC FOR ADVICE"
              phoneNumber="+441752209999"
              color={Colors.amber}
            />
            <TouchableOpacity
              style={styles.chamberFinderButton}
              onPress={() => nav.navigate('ChamberFinder')}
            >
              <Ionicons name="locate" size={20} color={Colors.teal} />
              <Text style={styles.chamberFinderText}>Find nearest chamber</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Assessment Summary</Text>
          <Text style={styles.summaryTimestamp}>
            {formatTimestamp(timestamp)}
          </Text>

          <Text style={styles.sectionLabel}>Dive Profile</Text>
          <View style={styles.profileGrid}>
            <ProfileRow label="Last dive" value={diveProfile.lastDiveTime} />
            {diveProfile.maxDepthMetres && (
              <ProfileRow label="Max depth" value={`${diveProfile.maxDepthMetres}m`} />
            )}
            {diveProfile.bottomTimeMinutes && (
              <ProfileRow label="Bottom time" value={`${diveProfile.bottomTimeMinutes} min`} />
            )}
            <ProfileRow label="Gas" value={diveProfile.gasMix} />
            <ProfileRow label="Deco stops" value={diveProfile.decompStops} />
            <ProfileRow label="Rapid ascent" value={diveProfile.rapidAscent} />
            <ProfileRow label="Dives today" value={diveProfile.divesToday} />
            {diveProfile.equipmentProblems === 'Yes' && (
              <ProfileRow
                label="Equipment"
                value={diveProfile.equipmentDetails || 'Problems reported'}
              />
            )}
          </View>

          <Text style={styles.sectionLabel}>Symptoms</Text>
          {groupedSymptoms.map((group) => (
            <View key={group.category} style={styles.symptomGroup}>
              <Text style={styles.symptomCategory}>{group.category}</Text>
              {group.symptoms.map((s) => (
                <Text key={s} style={styles.symptomItem}>
                  {'\u2022'} {s}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* First Aid */}
        <View style={styles.firstAidCard}>
          <Text style={styles.firstAidTitle}>First Aid Actions</Text>
          <Text style={styles.firstAidItem}>{'\u2022'} Lie flat</Text>
          <Text style={styles.firstAidItem}>
            {'\u2022'} Give high-flow oxygen (100%) if available
          </Text>
          <Text style={styles.firstAidItem}>{'\u2022'} Give fluids (water)</Text>
          <Text style={styles.firstAidItem}>
            {'\u2022'} Do NOT recompress in water
          </Text>
          <Text style={styles.firstAidItem}>
            {'\u2022'} Monitor and reassess
          </Text>
        </View>

        {/* Share */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color={Colors.white} />
          <Text style={styles.shareButtonText}>Share this summary</Text>
        </TouchableOpacity>

        {/* Report prompt */}
        <View style={styles.reportPrompt}>
          <Text style={styles.reportPromptTitle}>Help improve diving safety</Text>
          <Text style={styles.reportPromptText}>
            Would you like to submit an anonymous safety report based on this
            incident? This helps improve UK diving safety.
          </Text>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => {
              // Navigate to Report tab — handled by parent navigator
              nav.getParent()?.navigate('Report');
            }}
          >
            <Text style={styles.reportButtonText}>Submit Anonymous Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value}</Text>
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
  callActions: {
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  chamberFinderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.teal,
    borderRadius: BorderRadius.md,
    minHeight: MinTapTarget,
  },
  chamberFinderText: {
    color: Colors.teal,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
  },
  summaryTimestamp: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primaryNavy,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  profileGrid: {
    gap: Spacing.xs,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  profileLabel: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
  },
  profileValue: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    fontWeight: '600',
  },
  symptomGroup: {
    marginBottom: Spacing.sm,
  },
  symptomCategory: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: 4,
  },
  symptomItem: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    marginLeft: Spacing.sm,
    lineHeight: 22,
  },
  firstAidCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
  },
  firstAidTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.sm,
  },
  firstAidItem: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    minHeight: MinTapTarget,
  },
  shareButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
  reportPrompt: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.amber,
  },
  reportPromptTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  reportPromptText: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  reportButton: {
    backgroundColor: Colors.amber,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    minHeight: MinTapTarget,
  },
  reportButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
});
