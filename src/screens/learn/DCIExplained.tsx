import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../constants/theme';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function LinkButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.linkButton} onPress={onPress}>
      <Ionicons name="arrow-forward-circle" size={18} color={Colors.teal} />
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function DCIExplained() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="What is DCI?">
          <Text style={styles.bodyText}>
            Decompression Illness (DCI) is a term that covers two conditions:
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Decompression Sickness (DCS)</Text> —
            caused by dissolved gases (mainly nitrogen) coming out of solution
            and forming bubbles in blood and tissues as a diver ascends and
            pressure reduces.
          </Text>
          <Text style={styles.bodyText}>
            <Text style={styles.bold}>Arterial Gas Embolism (AGE)</Text> — caused
            by gas bubbles entering the arterial blood supply, usually from
            lung over-expansion during ascent. This is the more immediately
            dangerous form.
          </Text>
          <Text style={styles.bodyText}>
            Both conditions are treated the same way: with hyperbaric oxygen
            therapy in a recompression chamber.
          </Text>
        </Section>

        <Section title="How does it happen?">
          <Text style={styles.bodyText}>
            When you dive, the increased pressure causes your body to absorb
            more nitrogen (or other inert gases) into your blood and tissues.
            During a normal ascent with appropriate stops, this gas is safely
            released through your lungs.
          </Text>
          <Text style={styles.bodyText}>
            If you ascend too quickly, miss decompression stops, or have
            predisposing factors (dehydration, fatigue, PFO), the gas can form
            bubbles. These bubbles can damage tissues, block blood vessels, and
            cause a range of symptoms from joint pain to paralysis.
          </Text>
        </Section>

        <Section title="What are the symptoms?">
          <Text style={styles.bodyText}>
            Symptoms can appear within minutes of surfacing or up to 48 hours
            after a dive. Common symptoms include:
          </Text>
          <Text style={styles.bulletItem}>{'\u2022'} Joint and limb pain (the "bends")</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Numbness or tingling</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Dizziness or vertigo</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Unusual fatigue</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Difficulty walking or weakness</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Visual disturbances</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Skin rash or mottling</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Chest pain or shortness of breath</Text>

          <LinkButton
            label="Use the Symptom Checker"
            onPress={() => {
              navigation.getParent()?.navigate('Emergency', {
                screen: 'SymptomChecker',
              });
            }}
          />
        </Section>

        <Section title="What should I do?">
          <Text style={styles.bodyText}>
            If you suspect DCI after diving, even if symptoms are mild:
          </Text>
          <Text style={styles.bulletItem}>{'\u2022'} Lie the casualty flat</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Give 100% oxygen if available</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Give fluids (water, not alcohol)</Text>
          <Text style={styles.bulletItem}>{'\u2022'} Call for help immediately</Text>

          <LinkButton
            label="View full First Aid guidance"
            onPress={() => {
              navigation.getParent()?.navigate('Emergency', {
                screen: 'FirstAidGuidance',
              });
            }}
          />
          <LinkButton
            label="Emergency Contacts"
            onPress={() => {
              navigation.getParent()?.navigate('Emergency', {
                screen: 'EmergencyContacts',
              });
            }}
          />
        </Section>

        <Section title="How is it treated?">
          <Text style={styles.bodyText}>
            DCI is treated with Hyperbaric Oxygen Therapy (HBOT). The patient
            is placed in a recompression chamber where they breathe pure oxygen
            at increased pressure. This reduces bubble size, improves oxygen
            delivery to damaged tissues, and accelerates the elimination of
            inert gas.
          </Text>
          <Text style={styles.bodyText}>
            Treatment is most effective when started early. This is why it is
            critical to seek medical advice promptly — even for mild symptoms.
            Delays in treatment can lead to permanent damage.
          </Text>
        </Section>

        <Section title="Returning to diving after DCI">
          <Text style={styles.bodyText}>
            After a DCI event, returning to diving requires medical clearance
            from a diving physician. The timing depends on the severity of the
            DCI and how well you have recovered.
          </Text>
          <Text style={styles.bodyText}>
            DDRC Healthcare can advise on return-to-diving assessments.
          </Text>
          <LinkButton
            label="Read more on the DDRC website"
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://www.ddrc.org/diving/fitness-to-dive/decompression-illness/'
              )
            }
          />
        </Section>

        <View style={styles.reviewDate}>
          <Text style={styles.reviewText}>
            Content sourced from DDRC Healthcare. Last reviewed: February 2026.
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
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
  },
  bodyText: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  bold: {
    fontWeight: '700',
  },
  bulletItem: {
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 24,
    marginLeft: Spacing.sm,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  linkText: {
    color: Colors.teal,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  reviewDate: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  reviewText: {
    fontSize: FontSizes.xs,
    color: Colors.midGrey,
    fontStyle: 'italic',
  },
});
