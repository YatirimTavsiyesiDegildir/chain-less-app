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
import AddReport from '../Main/Coupons/AddReport';
import FriendsScreen from '../Main/FollowedReports/Friends';
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
    <Stack.Screen
      name="CouponsScreen"
      component={CouponsScreen}
      initialParams={{
        setFollowing: following => {
          props.route.params.setFollowing(following);
        },
        getFollowing: () => props.route.params.getFollowing(),
      }}
    />
    <Stack.Screen name="ShowQRScreen" component={ShowQRScreen} />
    <Stack.Screen name="AddBankAPI" component={AddReport} />
    <Stack.Screen name="PastPurchasesScreen" component={PastPurchasesScreen} />
  </Stack.Navigator>
);

const FollowedReportsStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="FriendsScreen"
      component={FriendsScreen}
      initialParams={{
        setFollowing: following => props.route.params.setFollowing(following),
        getFollowing: () => props.route.params.getFollowing(),
      }}
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
    <Screen
      name="FriendsScreen"
      component={FollowedReportsStack}
      initialParams={{
        setFollowing: following => props.setFollowing(following),
        getFollowing: () => props.getFollowing(),
      }}
    />
    <Screen
      name="CouponsScreen"
      component={CouponsStack}
      initialParams={{
        setFollowing: following => {
          props.setFollowing(following);
        },
        getFollowing: () => props.getFollowing(),
      }}
    />
    <Screen
      name="ProfileScreen"
      component={ProfileScreen}
      initialParams={{
        mainFunctions: {logout: () => props.mainFunctions.logout()},
        isAnon: props.isAnon,
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
      isAnon={props.isAnon}
      getFollowing={() => props.getFollowing()}
      setFollowing={following => {
        props.mainFunctions.setFollowing(following);
      }}
    />
  </NavigationContainer>
);

export default MainNavigator;
