import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';

interface ExternalLink {
  name: string;
  description: string;
  url: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const links: ExternalLink[] = [
  {
    name: 'Met Office Marine Forecast',
    description: 'Official marine weather forecasts including wind, wave, and visibility for UK coastal waters.',
    url: 'https://www.metoffice.gov.uk/weather/specialist-forecasts/coast-and-sea/shipping-forecast',
    icon: 'cloud',
  },
  {
    name: 'Windy.com',
    description: 'Interactive visual map showing wind, waves, temperature, and more. Excellent for dive planning.',
    url: 'https://www.windy.com',
    icon: 'map',
  },
  {
    name: 'UKHO Admiralty EasyTide',
    description: 'Official UK tide times and heights from the UK Hydrographic Office.',
    url: 'https://easytide.admiralty.co.uk/',
    icon: 'water',
  },
  {
    name: 'Magic Seaweed',
    description: 'Surf and sea conditions including swell, wind, and tide information for UK coastal locations.',
    url: 'https://magicseaweed.com',
    icon: 'analytics',
  },
];

export function ConditionsAndTides() {
  const openUrl = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          Check environmental conditions before you dive. These links open
          external services for weather, tide, and sea state information.
        </Text>

        {links.map((link) => (
          <TouchableOpacity
            key={link.name}
            style={styles.linkCard}
            onPress={() => openUrl(link.url)}
            activeOpacity={0.7}
          >
            <View style={styles.linkIcon}>
              <Ionicons name={link.icon} size={24} color={Colors.teal} />
            </View>
            <View style={styles.linkContent}>
              <Text style={styles.linkName}>{link.name}</Text>
              <Text style={styles.linkDescription}>{link.description}</Text>
            </View>
            <Ionicons name="open-outline" size={18} color={Colors.midGrey} />
          </TouchableOpacity>
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
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    minHeight: MinTapTarget,
  },
  linkIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContent: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  linkName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
  },
  linkDescription: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginTop: 2,
    lineHeight: 18,
  },
});
