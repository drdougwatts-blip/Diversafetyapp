import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LearnStackParamList } from './LearnStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { OfflineBanner } from '../../components/OfflineBanner';

type NavigationProp = NativeStackNavigationProp<LearnStackParamList, 'LearnHome'>;

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

export function LearnHome() {
  const navigation = useNavigation<NavigationProp>();
  const isConnected = useNetworkStatus();

  return (
    <View style={styles.container}>
      <OfflineBanner isConnected={isConnected} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Diving Safety Knowledge</Text>

        <MenuItem
          icon="body"
          title="DCI Explained"
          subtitle="What is decompression illness, its symptoms, and treatment"
          color={Colors.green}
          onPress={() => navigation.navigate('DCIExplained')}
        />

        <MenuItem
          icon="flask"
          title="Research Highlights"
          subtitle="Published research and findings from DDRC"
          color={Colors.green}
          onPress={() => navigation.navigate('ResearchHighlights')}
        />

        <MenuItem
          icon="calendar"
          title="Courses & Events"
          subtitle="DDRC training courses and diving safety events"
          color={Colors.green}
          onPress={() => navigation.navigate('CoursesAndEvents')}
        />

        <MenuItem
          icon="bulb"
          title="Safety Briefings"
          subtitle="Quick safety facts and tips for divers"
          color={Colors.green}
          onPress={() => navigation.navigate('SafetyBriefing')}
        />
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
});
