import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes } from '../constants/theme';
import { EmergencyStack } from '../screens/emergency/EmergencyStack';
import { BeforeYouDiveStack } from '../screens/beforeYouDive/BeforeYouDiveStack';
import { ReportStack } from '../screens/report/ReportStack';
import { LearnStack } from '../screens/learn/LearnStack';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Emergency"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryNavy,
        tabBarInactiveTintColor: Colors.midGrey,
        tabBarLabelStyle: {
          fontSize: FontSizes.xs,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.lightGrey,
          paddingBottom: 4,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Emergency"
        component={EmergencyStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.emergencyRed,
        }}
      />
      <Tab.Screen
        name="Before You Dive"
        component={BeforeYouDiveStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.teal,
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.amber,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.green,
        }}
      />
    </Tab.Navigator>
  );
}
