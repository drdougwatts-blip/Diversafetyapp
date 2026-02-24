import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';

interface ResearchItem {
  title: string;
  summary: string;
  url: string;
  category: string;
}

const researchItems: ResearchItem[] = [
  {
    title: 'Immersion Pulmonary Oedema (IPO) Research',
    summary:
      'DDRC is at the forefront of research into IPO, a potentially life-threatening condition where fluid accumulates in the lungs during immersion.',
    url: 'https://www.ddrc.org/diving/fitness-to-dive/ipo/',
    category: 'Clinical Research',
  },
  {
    title: 'Health of Divers Survey',
    summary:
      'Ongoing research into the long-term health effects of recreational and professional diving in the UK.',
    url: 'https://www.ddrc.org/research/',
    category: 'Population Health',
  },
  {
    title: "Women's Health in Diving",
    summary:
      'Research into how diving affects women differently, including menstrual cycle considerations and hormonal factors.',
    url: 'https://www.ddrc.org/diving/fitness-to-dive/menstrual-cycle/',
    category: 'Clinical Research',
  },
  {
    title: 'Vestibular Decompression Sickness',
    summary:
      'Inner ear DCS (vestibular DCS) can cause severe vertigo and hearing loss. DDRC provides specialist diagnosis and treatment.',
    url: 'https://www.ddrc.org/diving/fitness-to-dive/inner-ear/',
    category: 'Clinical Research',
  },
  {
    title: 'Patent Foramen Ovale (PFO) and Diving',
    summary:
      'Research into the role of PFO (a hole in the heart present in ~25% of people) as a risk factor for decompression illness.',
    url: 'https://www.ddrc.org/diving/fitness-to-dive/pfo/',
    category: 'Clinical Research',
  },
];

export function ResearchHighlights() {
  const openUrl = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          DDRC Healthcare contributes to diving medicine research and publishes
          educational resources for the diving community.
        </Text>

        {researchItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.card}
            onPress={() => openUrl(item.url)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary}>{item.summary}</Text>
            <View style={styles.readMore}>
              <Text style={styles.readMoreText}>Read more</Text>
              <Ionicons name="open-outline" size={16} color={Colors.teal} />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.allResearchButton}
          onPress={() => openUrl('https://www.ddrc.org/research/')}
        >
          <Text style={styles.allResearchText}>View all DDRC research</Text>
          <Ionicons name="open-outline" size={18} color={Colors.white} />
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
  header: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: MinTapTarget,
  },
  categoryTag: {
    backgroundColor: Colors.green,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  categoryText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  cardSummary: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  readMoreText: {
    color: Colors.teal,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  allResearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.green,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    minHeight: MinTapTarget,
  },
  allResearchText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
