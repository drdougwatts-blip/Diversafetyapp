import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, BorderRadius, MinTapTarget } from '../../constants/theme';

interface CourseItem {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  url: string;
}

const courses: CourseItem[] = [
  {
    title: 'Dive Accident Responder Course',
    description:
      'Annual event covering how to deal with a diving incident. Includes 40m dry dive experience, BLS refresher, and DCI awareness training.',
    icon: 'medkit',
    url: 'https://www.ddrc.org/training/courses/region-UK/',
  },
  {
    title: 'Professional Dive Boat Skipper Day',
    description:
      'Annual event for skippers and crew on managing diving incidents from the boat. Covers emergency procedures, communication, and casualty management.',
    icon: 'boat',
    url: 'https://www.ddrc.org/training/courses/region-UK/',
  },
  {
    title: 'Talks & Tours',
    description:
      'Visit DDRC to see the hyperbaric chambers, meet the team, and learn about the work we do treating divers and other patients.',
    icon: 'people',
    url: 'https://www.ddrc.org/training/courses/region-UK/',
  },
  {
    title: 'Diver Medic Training',
    description:
      'Professional diver medic training courses for commercial and recreational diving operations.',
    icon: 'school',
    url: 'https://www.ddrc.org/training/courses/region-UK/',
  },
];

export function CoursesAndEvents() {
  const openUrl = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          DDRC Healthcare offers training courses and events for divers,
          instructors, and maritime professionals.
        </Text>

        {courses.map((course) => (
          <TouchableOpacity
            key={course.title}
            style={styles.courseCard}
            onPress={() => openUrl(course.url)}
            activeOpacity={0.7}
          >
            <View style={styles.courseIcon}>
              <Ionicons name={course.icon} size={28} color={Colors.green} />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
              <View style={styles.courseAction}>
                <Text style={styles.courseActionText}>Find out more</Text>
                <Ionicons name="open-outline" size={16} color={Colors.teal} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.allCoursesButton}
          onPress={() =>
            openUrl('https://www.ddrc.org/training/courses/region-UK/')
          }
        >
          <Ionicons name="list" size={20} color={Colors.white} />
          <Text style={styles.allCoursesText}>View all courses</Text>
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
  courseCard: {
    flexDirection: 'row',
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
  courseIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.darkText,
    marginBottom: Spacing.xs,
  },
  courseDescription: {
    fontSize: FontSizes.sm,
    color: Colors.midGrey,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  courseAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  courseActionText: {
    color: Colors.teal,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  allCoursesButton: {
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
  allCoursesText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
