import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, fontSize } from '../styles/tokens';
import { useAuth } from '../context/AuthContext';

import { TodayScreen } from '../screens/TodayScreen';
import { CurriculumScreen } from '../screens/CurriculumScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { TutorScreen } from '../screens/TutorScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';

// ─── Tab icons (text-based, no additional icon lib needed) ───────────────────
const TAB_ICONS: Record<string, string> = {
  Today: '⏱',
  Curriculum: '📖',
  Library: '🗂',
  Tutor: '💬',
  Profile: '👤',
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>
            {TAB_ICONS[route.name]}
          </Text>
        ),
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Curriculum" component={CurriculumScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Tutor" component={TutorScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingLogo}>🎓</Text>
      <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 20 }} />
    </View>
  );
}

export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        primary: colors.accent,
        background: colors.bg,
        card: colors.bgCard,
        text: colors.textPrimary,
        border: colors.border,
        notification: colors.accent,
      },
    }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bg,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: 8,
    height: 72,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    marginTop: 2,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    fontSize: 56,
  },
});
