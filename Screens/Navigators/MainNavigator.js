import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ProfileScreen from '../Main/Profile';
import CouponsScreen from '../Main/Reports/MainScreen';
import AddReport from '../Main/Reports/AddReport';
import FriendsScreen from '../Main/FollowedReports/FollowedReports';
import RegisterScreen from '../PreLogin/Register';

import {createStackNavigator} from '@react-navigation/stack';
import {call} from 'react-native-reanimated';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom tab icons
const PersonIcon = props => <Icon {...props} name="person" />;
const StarIcon = props => <Icon {...props} name="star" />;
const ShakeIcon = props => <Icon {...props} name="shake" />;

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
        getVerified: () => props.route.params.getVerified(),
        setVerified: verified => props.route.params.setVerified(verified),
      }}
    />
    <Stack.Screen name="AddBankAPI" component={AddReport} />
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
        getVerified: () => props.route.params.getVerified(),
        setVerified: verified => props.route.params.setVerified(verified),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = props => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      initialParams={{
        mainFunctions: {
          logout: () => props.route.params.mainFunctions.logout(),
        },
        isAnon: props.route.params.isAnon,
      }}
    />
    <Screen
      name="RegisterScreen"
      component={RegisterScreen}
      initialParams={{
        mainFunctions: {
          register: (email, password, callback) =>
            props.route.params.mainFunctions.logout(email, password, callback),
        },
      }}
    />
  </Stack.Navigator>
);

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={StarIcon} />
    <BottomNavigationTab icon={ShakeIcon} />
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
        getVerified: () => props.getVerified(),
        setVerified: verified => props.setVerified(verified),
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
        getVerified: () => props.getVerified(),
        setVerified: verified => props.setVerified(verified),
      }}
    />
    <Screen
      name="ProfileScreen"
      component={ProfileStack}
      initialParams={{
        mainFunctions: {
          logout: () => props.mainFunctions.logout(),
          register: (email, password, callback) =>
            props.mainFunctions.register(email, password, callback),
        },
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
        register: (email, password, callback) =>
          props.mainFunctions.register(email, password, callback),
      }}
      isAnon={props.isAnon}
      getFollowing={() => props.getFollowing()}
      setFollowing={following => {
        props.mainFunctions.setFollowing(following);
      }}
      getVerified={() => props.getVerified()}
      setVerified={verified => props.setVerified(verified)}
    />
  </NavigationContainer>
);

export default MainNavigator;
