import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../PreLogin/Login';
import RegisterScreen from '../PreLogin/Register';

const {Navigator, Screen} = createStackNavigator();

class HomeNavigator extends Component {
  render() {
    return (
      <Navigator headerMode="none">
        <Screen
          name="Login"
          component={LoginScreen}
          initialParams={{
            mainFunctions: {
              logInUser: (email, password, callback) =>
                this.props.mainFunctions.logInUser(email, password, callback),
              logInUserAnon: () => this.props.mainFunctions.logInUserAnon(),
              register: (email, password) =>
                this.props.mainFunctions.register(email, password),
            },
          }}
        />
        <Screen
          name="Register"
          component={RegisterScreen}
          initialParams={{
            mainFunctions: {
              register: (email, password, callback) =>
                this.props.mainFunctions.register(email, password, callback),
            },
          }}
        />
      </Navigator>
    );
  }
}

export default class LoginNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <HomeNavigator
          mainFunctions={{
            logInUser: (email, password, callback) =>
              this.props.mainFunctions.logInUser(email, password, callback),
            logInUserAnon: () => this.props.mainFunctions.logInUserAnon(),
            register: (email, password, callback) =>
              this.props.mainFunctions.register(email, password, callback),
          }}
        />
      </NavigationContainer>
    );
  }
}
