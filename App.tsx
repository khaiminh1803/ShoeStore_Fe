/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContextProvider } from './src/utils/AppContext';
import AppNavigator from './src/utils/AppNavigator';

function App(): React.JSX.Element {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content" // or "dark-content"
          backgroundColor="#5b9ee1" // Change this color as you like
        />
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>
  )
};

export default App;
