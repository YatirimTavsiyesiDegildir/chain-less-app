import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfileScreen from '../Main/Profile';
import ReportsScreen from '../Main/ReportsMain/MainScreen';
import AddNewReport from '../Main/ReportsMain/AddNewReport';
import FollowedReportsScreen from '../Main/ReportsFollowed/Followed';

import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom tab icons
const PersonIcon = props => <Icon {...props} name="person" />;
const PeopleIcon = props => <Icon {...props} name="people-outline" />;
const CouponIcon = props => <Icon {...props} name="activity-outline" />;

const CouponsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
    <Stack.Screen name="AddBankAPI" component={AddNewReport} />
  </Stack.Navigator>
);

const FriendsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="FollowedReportsScreen"
      component={FollowedReportsScreen}
    />
  </Stack.Navigator>
);

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={PeopleIcon} />
    <BottomNavigationTab icon={CouponIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const TabNavigator = props => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="FollowedReportsScreen" component={FriendsStack} />
    <Screen name="ReportsScreen" component={CouponsStack} />
    <Screen
      name="ProfileScreen"
      component={ProfileScreen}
      initialParams={{
        mainFunctions: {logout: () => props.mainFunctions.logout()},
      }}
    />
  </Navigator>
);

const MainNavigator = props => (
  <NavigationContainer>
    <TabNavigator
      mainFunctions={{
        logout: () => props.mainFunctions.logout(),
      }}
    />
  </NavigationContainer>
);

export default MainNavigator;
