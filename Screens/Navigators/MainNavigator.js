import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfileScreen from '../Main/Profile';
import CouponsScreen from '../Main/Coupons/MainScreen';
import ShowQRScreen from '../Main/Coupons/ShowQR';
import AddBankAPI from '../Main/Coupons/AddBankAPI';
import FriendsScreen from '../Main/Friends/Friends';
import AddFriendsScreen from '../Main/Friends/AddFriends';
import PastPurchasesScreen from '../Main/Coupons/PastPurchases';

import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom tab icons
const PersonIcon = props => <Icon {...props} name="person" />;
const PeopleIcon = props => <Icon {...props} name="people-outline" />;
const CouponIcon = props => <Icon {...props} name="activity-outline" />;

const CouponsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="CouponsScreen" component={CouponsScreen} />
    <Stack.Screen name="ShowQRScreen" component={ShowQRScreen} />
    <Stack.Screen name="AddBankAPI" component={AddBankAPI} />
    <Stack.Screen name="PastPurchasesScreen" component={PastPurchasesScreen} />
  </Stack.Navigator>
);

const FriendsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
    <Stack.Screen name="AddFriendsScreen" component={AddFriendsScreen} />
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
    <Screen name="FriendsScreen" component={FriendsStack} />
    <Screen name="CouponsScreen" component={CouponsStack} />
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
