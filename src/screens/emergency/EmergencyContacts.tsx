import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/theme';
import { CallButton } from '../../components/CallButton';
import { emergencyContacts } from '../../data/emergencyContacts';

export function EmergencyContacts() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          Key emergency numbers for diving incidents. All contacts work offline
          if your phone has signal.
        </Text>

        {emergencyContacts.map((contact, index) => (
          <View
            key={index}
            style={[
              styles.contactCard,
              contact.isPrimary && styles.contactCardPrimary,
            ]}
          >
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
            <Text style={styles.contactDescription}>{contact.description}</Text>
            <CallButton
              label={`Call ${contact.number}`}
              phoneNumber={contact.dialNumber}
              color={contact.isPrimary ? Colors.emergencyRed : Colors.teal}
              variant={contact.isPrimary ? 'primary' : 'secondary'}
            />
          </View>
        ))}
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
  header: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contactCardPrimary: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.emergencyRed,
  },
  contactName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
  },
  contactNumber: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.emergencyRed,
    marginVertical: Spacing.xs,
  },
  contactDescription: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
});
