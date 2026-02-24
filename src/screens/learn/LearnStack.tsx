import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../constants/theme';
import { LearnHome } from './LearnHome';
import { DCIExplained } from './DCIExplained';
import { ResearchHighlights } from './ResearchHighlights';
import { CoursesAndEvents } from './CoursesAndEvents';
import { SafetyBriefingScreen } from './SafetyBriefingScreen';

export type LearnStackParamList = {
  LearnHome: undefined;
  DCIExplained: undefined;
  ResearchHighlights: undefined;
  CoursesAndEvents: undefined;
  SafetyBriefing: undefined;
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export function LearnStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryNavy },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="LearnHome"
        component={LearnHome}
        options={{ title: 'Learn' }}
      />
      <Stack.Screen
        name="DCIExplained"
        component={DCIExplained}
        options={{ title: 'DCI Explained' }}
      />
      <Stack.Screen
        name="ResearchHighlights"
        component={ResearchHighlights}
        options={{ title: 'Research Highlights' }}
      />
      <Stack.Screen
        name="CoursesAndEvents"
        component={CoursesAndEvents}
        options={{ title: 'Courses & Events' }}
      />
      <Stack.Screen
        name="SafetyBriefing"
        component={SafetyBriefingScreen}
        options={{ title: 'Safety Briefings' }}
      />
    </Stack.Navigator>
  );
}
