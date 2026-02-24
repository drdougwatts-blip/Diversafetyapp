import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../constants/theme';
import { EmergencyHome } from './EmergencyHome';
import { ChamberFinder } from './ChamberFinder';
import { SymptomChecker } from './SymptomChecker';
import { SymptomResult } from './SymptomResult';
import { EmergencyContacts } from './EmergencyContacts';
import { FirstAidGuidance } from './FirstAidGuidance';

export type EmergencyStackParamList = {
  EmergencyHome: undefined;
  ChamberFinder: { postcode?: string } | undefined;
  SymptomChecker: undefined;
  SymptomResult: {
    diveProfile: string;
    selectedSymptoms: string;
    hasNeurological: boolean;
    timestamp: string;
  };
  EmergencyContacts: undefined;
  FirstAidGuidance: undefined;
};

const Stack = createNativeStackNavigator<EmergencyStackParamList>();

export function EmergencyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryNavy },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="EmergencyHome"
        component={EmergencyHome}
        options={{ title: 'Emergency' }}
      />
      <Stack.Screen
        name="ChamberFinder"
        component={ChamberFinder}
        options={{ title: 'Find Nearest Chamber' }}
      />
      <Stack.Screen
        name="SymptomChecker"
        component={SymptomChecker}
        options={{ title: 'Symptom Checker' }}
      />
      <Stack.Screen
        name="SymptomResult"
        component={SymptomResult}
        options={{ title: 'Assessment Summary' }}
      />
      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContacts}
        options={{ title: 'Emergency Contacts' }}
      />
      <Stack.Screen
        name="FirstAidGuidance"
        component={FirstAidGuidance}
        options={{ title: 'First Aid Guidance' }}
      />
    </Stack.Navigator>
  );
}
