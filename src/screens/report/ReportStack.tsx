import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../constants/theme';
import { ReportHome } from './ReportHome';
import { IncidentReport } from './IncidentReport';
import { NearMissReport } from './NearMissReport';
import { SubmissionConfirmation } from './SubmissionConfirmation';

export type ReportStackParamList = {
  ReportHome: undefined;
  IncidentReport: undefined;
  NearMissReport: undefined;
  SubmissionConfirmation: { reference: string };
};

const Stack = createNativeStackNavigator<ReportStackParamList>();

export function ReportStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryNavy },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="ReportHome"
        component={ReportHome}
        options={{ title: 'Report' }}
      />
      <Stack.Screen
        name="IncidentReport"
        component={IncidentReport}
        options={{ title: 'Incident Report' }}
      />
      <Stack.Screen
        name="NearMissReport"
        component={NearMissReport}
        options={{ title: 'Near-Miss Report' }}
      />
      <Stack.Screen
        name="SubmissionConfirmation"
        component={SubmissionConfirmation}
        options={{ title: 'Report Submitted', headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}
