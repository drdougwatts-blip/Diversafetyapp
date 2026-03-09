import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyStackParamList } from './EmergencyStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { OfflineBanner } from '../../components/OfflineBanner';
import { safetyBriefings } from '../../data/safetyBriefings';

type NavigationProp = NativeStackNavigationProp<EmergencyStackParamList, 'EmergencyHome'>;

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

function MenuItem({ icon, title, subtitle, color, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.menuIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color={Colors.white} />
      </View>
      <View style={styles.menuText}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.midGrey} />
    </TouchableOpacity>
  );
}

export function EmergencyHome() {
  const navigation = useNavigation<NavigationProp>();
  const isConnected = useNetworkStatus();

  // Pick a random safety briefing
  const briefing = safetyBriefings[Math.floor(Math.random() * safetyBriefings.length)];

  return (
    <View style={styles.container}>
      <OfflineBanner isConnected={isConnected} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Safety briefing banner */}
        <View style={styles.briefingBanner}>
          <Ionicons name="information-circle" size={20} color={Colors.teal} />
          <Text style={styles.briefingText}>{briefing.text}</Text>
        </View>

        <Text style={styles.sectionTitle}>What do you need?</Text>

        <MenuItem
          icon="locate"
          title="Find Nearest Chamber"
          subtitle="Locate your nearest hyperbaric chamber by postcode or GPS"
          color={Colors.emergencyRed}
          onPress={() => navigation.navigate('ChamberFinder')}
        />

        <MenuItem
          icon="clipboard"
          title="Symptom Checker"
          subtitle="Assess symptoms and generate a handover summary"
          color={Colors.emergencyRed}
          onPress={() => navigation.navigate('SymptomChecker')}
        />

        <MenuItem
          icon="call"
          title="Emergency Contacts"
          subtitle="Key phone numbers for diving emergencies"
          color={Colors.emergencyRed}
          onPress={() => navigation.navigate('EmergencyContacts')}
        />

        <MenuItem
          icon="medkit"
          title="First Aid Guidance"
          subtitle="What to do for suspected decompression illness"
          color={Colors.emergencyRed}
          onPress={() => navigation.navigate('FirstAidGuidance')}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            DDRC Healthcare — Charity No. 279652
          </Text>
          <Text style={styles.footerText}>
            24hr BHA Diving Accident Helpline: 07831 151 523
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
  briefingBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.teal,
  },
  briefingText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    minHeight: MinTapTarget,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginTop: 2,
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSizes.xs,
    color: Colors.midGrey,
    marginTop: 2,
  },
});
