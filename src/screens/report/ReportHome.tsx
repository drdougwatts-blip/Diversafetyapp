import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ReportStackParamList } from './ReportStack';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { OfflineBanner } from '../../components/OfflineBanner';

type NavigationProp = NativeStackNavigationProp<ReportStackParamList, 'ReportHome'>;

export function ReportHome() {
  const navigation = useNavigation<NavigationProp>();
  const isConnected = useNetworkStatus();

  return (
    <View style={styles.container}>
      <OfflineBanner isConnected={isConnected} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Anonymous Safety Reporting</Text>
        <Text style={styles.subtitle}>
          Your reports help make diving safer for everyone. All reports are
          anonymous — no personal information is collected or stored.
        </Text>

        <TouchableOpacity
          style={styles.reportCard}
          onPress={() => navigation.navigate('IncidentReport')}
          activeOpacity={0.7}
        >
          <View style={[styles.reportIcon, { backgroundColor: Colors.emergencyRed }]}>
            <Ionicons name="warning" size={32} color={Colors.white} />
          </View>
          <Text style={styles.reportTitle}>Incident Report</Text>
          <Text style={styles.reportDescription}>
            Report a diving incident including injury, illness, or equipment
            failure. Structured form to capture key details.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reportCard}
          onPress={() => navigation.navigate('NearMissReport')}
          activeOpacity={0.7}
        >
          <View style={[styles.reportIcon, { backgroundColor: Colors.amber }]}>
            <Ionicons name="alert-circle" size={32} color={Colors.white} />
          </View>
          <Text style={styles.reportTitle}>Near-Miss Report</Text>
          <Text style={styles.reportDescription}>
            Something nearly went wrong? Near-miss reports are vital for
            identifying patterns and preventing future incidents.
          </Text>
        </TouchableOpacity>

        <View style={styles.privacyNote}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.green} />
          <Text style={styles.privacyText}>
            This report is anonymous. No personal information is collected or
            stored. Reports are forwarded to BSAC's national incident database.
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
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: MinTapTarget,
  },
  reportIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  reportTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  reportDescription: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    textAlign: 'center',
    lineHeight: 20,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
    gap: Spacing.sm,
  },
  privacyText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
  },
});
