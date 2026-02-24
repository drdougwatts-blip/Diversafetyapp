import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/theme';
import { safetyBriefings } from '../../data/safetyBriefings';

export function SafetyBriefingScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          Safety facts and tips every diver should know.
        </Text>

        {safetyBriefings.map((briefing) => (
          <View key={briefing.id} style={styles.briefingCard}>
            <View style={styles.briefingContent}>
              <Ionicons name="bulb" size={22} color={Colors.green} />
              <Text style={styles.briefingText}>{briefing.text}</Text>
            </View>
            {briefing.learnMoreUrl && (
              <TouchableOpacity
                style={styles.learnMore}
                onPress={() => WebBrowser.openBrowserAsync(briefing.learnMoreUrl!)}
              >
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons name="open-outline" size={14} color={Colors.teal} />
              </TouchableOpacity>
            )}
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
  briefingCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
  },
  briefingContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  briefingText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.darkText,
    lineHeight: 22,
  },
  learnMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    marginLeft: 34,
  },
  learnMoreText: {
    color: Colors.teal,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
});
