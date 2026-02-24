import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../constants/theme';
import { BeforeYouDiveHome } from './BeforeYouDiveHome';
import { CanIDiveWith } from './CanIDiveWith';
import { PersonalFitnessCheck } from './PersonalFitnessCheck';
import { ConditionsAndTides } from './ConditionsAndTides';
import { BookConsultation } from './BookConsultation';

export type BeforeYouDiveStackParamList = {
  BeforeYouDiveHome: undefined;
  CanIDiveWith: undefined;
  PersonalFitnessCheck: undefined;
  ConditionsAndTides: undefined;
  BookConsultation: undefined;
};

const Stack = createNativeStackNavigator<BeforeYouDiveStackParamList>();

export function BeforeYouDiveStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryNavy },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="BeforeYouDiveHome"
        component={BeforeYouDiveHome}
        options={{ title: 'Before You Dive' }}
      />
      <Stack.Screen
        name="CanIDiveWith"
        component={CanIDiveWith}
        options={{ title: 'Can I Dive With...?' }}
      />
      <Stack.Screen
        name="PersonalFitnessCheck"
        component={PersonalFitnessCheck}
        options={{ title: 'Personal Fitness Check' }}
      />
      <Stack.Screen
        name="ConditionsAndTides"
        component={ConditionsAndTides}
        options={{ title: 'Conditions & Tides' }}
      />
      <Stack.Screen
        name="BookConsultation"
        component={BookConsultation}
        options={{ title: 'Book a Consultation' }}
      />
    </Stack.Navigator>
  );
}
