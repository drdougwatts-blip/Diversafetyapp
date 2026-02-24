import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';
import { diveConditions, furtherReading } from '../../data/conditions';

export function CanIDiveWith() {
  const [search, setSearch] = useState('');

  const filteredConditions = useMemo(() => {
    if (!search.trim()) return diveConditions;
    const query = search.toLowerCase();
    return diveConditions.filter((c) => c.name.toLowerCase().includes(query));
  }, [search]);

  const openUrl = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerNote}>
          <Ionicons name="information-circle" size={18} color={Colors.teal} />
          <Text style={styles.headerNoteText}>
            Guidance written by DDRC Healthcare's Diving Physicians. For
            personalised advice, book a Fitness to Dive consultation.
          </Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.midGrey} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conditions..."
            placeholderTextColor={Colors.midGrey}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color={Colors.midGrey} />
            </TouchableOpacity>
          )}
        </View>

        {/* Conditions list */}
        <Text style={styles.sectionTitle}>Conditions</Text>
        {filteredConditions.map((condition) => (
          <TouchableOpacity
            key={condition.name}
            style={styles.conditionRow}
            onPress={() => openUrl(condition.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.conditionName}>{condition.name}</Text>
            <Ionicons name="open-outline" size={18} color={Colors.teal} />
          </TouchableOpacity>
        ))}

        {filteredConditions.length === 0 && (
          <Text style={styles.noResults}>
            No conditions match your search. Try a different term, or contact
            DDRC for personalised advice.
          </Text>
        )}

        {/* Further Reading */}
        {!search.trim() && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>
              Further Reading
            </Text>
            <Text style={styles.sectionSubtitle}>
              Published articles by DDRC diving physicians
            </Text>
            {furtherReading.map((article) => (
              <TouchableOpacity
                key={article.title}
                style={styles.articleRow}
                onPress={() => openUrl(article.url)}
                activeOpacity={0.7}
              >
                <Ionicons name="document-text" size={18} color={Colors.teal} />
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Ionicons name="open-outline" size={16} color={Colors.midGrey} />
              </TouchableOpacity>
            ))}
          </>
        )}
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
  headerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.teal,
  },
  headerNoteText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    minHeight: MinTapTarget,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.darkText,
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    marginBottom: Spacing.sm,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
    minHeight: MinTapTarget,
  },
  conditionName: {
    fontSize: FontSizes.md,
    color: Colors.darkText,
    flex: 1,
  },
  noResults: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    textAlign: 'center',
    padding: Spacing.lg,
  },
  articleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
    minHeight: MinTapTarget,
  },
  articleTitle: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.darkText,
  },
});
