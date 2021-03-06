/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from './src/Theme/theme.json';
import {default as mapping} from './src/assets/mapping.json';

import MatchesScreen from './src/Screens/MatchesScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import QuestionScreen from './src/Screens/QuestionScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

//Icons
const ProfileIcon = (props) => (
  <Icon {...props} name="person-outline" fill="#918980" />
);

const QuestionIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" fill="#918980" />
);
const MatchIcon = (props) => (
  <Icon {...props} name="message-square-outline" fill="#918980" />
);

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={MatchIcon} />
    <BottomNavigationTab icon={QuestionIcon} />
    <BottomNavigationTab icon={ProfileIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Matches" component={MatchesScreen} />
    <Screen name="Questions" component={QuestionScreen} />
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      customMapping={mapping}
      theme={{...eva.light, ...theme}}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
