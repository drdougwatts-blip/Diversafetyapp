import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { CallButton } from '../../components/CallButton';

export function BookConsultation() {
  const openBooking = () => {
    WebBrowser.openBrowserAsync('https://www.ddrc.org/recreational-sports-diving-medical/');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Ionicons name="medical" size={40} color={Colors.teal} />
          <Text style={styles.heroTitle}>Fitness to Dive Consultation</Text>
          <Text style={styles.heroText}>
            Not sure if you're fit to dive? DDRC's diving physicians offer
            telephone consultations for UK recreational divers.
          </Text>
        </View>

        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Service & Pricing</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Telephone consultation</Text>
            <Text style={styles.priceValue}>{'\u00A3'}20</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Remote sign-off (if doctor can clear you)
            </Text>
            <Text style={styles.priceValue}>{'\u00A3'}40</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Face-to-face medical (if required)
            </Text>
            <Text style={styles.priceValue}>Additional</Text>
          </View>

          <Text style={styles.pricingNote}>
            The service is subsidised by DDRC Healthcare (charity no. 279652).
          </Text>
        </View>

        <View style={styles.noteCard}>
          <Ionicons name="alert-circle" size={20} color={Colors.amber} />
          <Text style={styles.noteText}>
            Over 60 or have a significant medical condition? You will need an
            in-person sports diver medical.
          </Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={openBooking}>
          <Ionicons name="calendar" size={22} color={Colors.white} />
          <Text style={styles.bookButtonText}>Book a Consultation</Text>
        </TouchableOpacity>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Have questions?</Text>
          <CallButton
            label="Call DDRC: 01752 209999"
            phoneNumber="+441752209999"
            color={Colors.teal}
            variant="secondary"
          />
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
  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.darkText,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  heroText: {
    fontSize: FontSizes.md,
    color: Colors.midGrey,
    marginTop: Spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  pricingCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  pricingTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  priceLabel: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
  },
  priceValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.teal,
  },
  pricingNote: {
    fontSize: FontSizes.xs,
    color: Colors.midGrey,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.amber,
  },
  noteText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    minHeight: MinTapTarget,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  contactSection: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.darkText,
  },
});
