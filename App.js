import React, {Component} from 'react';
import {Alert, YellowBox} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import LoginNavigator from './Screens/Navigators/LoginNavigator';
import MainNavigator from './Screens/Navigators/MainNavigator';
import {FetchPost} from './Utils/Fetch';
import {StoreData, GetData} from './Utils/AsyncStorage';
import {call} from 'react-native-reanimated';
import theme from './src/themes/theme';
import {client} from './back-end/OurApi';
import {gql} from '@apollo/client';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

/**GLOBALS START*/
global.email = '';
global.userId = 0;
global.tckn = '';
global.realName = '';
global.password = '';
global.username = '';
global.friendsAdded = false;
global.subscriptionWarningEnabled = false;
/**GLOBALS END*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
    this.checkCredentials();
  }

  clearLoginInfo() {
    StoreData('email', '');
    StoreData('user_id', '');
    StoreData('tckn', '');
    StoreData('real_name', '');
    StoreData('password', '');
    StoreData('username', '');
    global.email = '';
    global.userId = '';
    global.tckn = '';
    global.realName = '';
    global.password = '';
    global.username = '';
    this.setState({isLoggedIn: false});
  }

  saveLoginInfo(user) {
    StoreData('email', user.email);
    StoreData('user_id', user.id);
    StoreData('tckn', user.tckn);
    StoreData('real_name', user.name);
    StoreData('password', user.password);
    StoreData('username', user.username);
    global.email = user.email;
    global.userId = user.id;
    global.tckn = user.tckn;
    global.realName = user.name;
    global.password = user.password;
    global.username = user.username;
    this.setState({isLoggedIn: true});
  }

  async checkCredentials() {
    let email = await GetData('email');
    let password = await GetData('password');
    if (
      email !== null &&
      email !== '' &&
      password !== null &&
      password !== ''
    ) {
      client
        .query({
          query: gql`
            query MyQuery($email: String, $password: String) {
              users(
                where: {
                  email: {_eq: $email}
                  _and: {_or: {password: {_eq: $password}}}
                }
              ) {
                email
                id
                tckn
                username
                name
                password
                phonenumber
              }
            }
          `,
          variables: {
            email: email,
            password: password,
          },
        })
        .then(result => {
          if (result.data.users.length === 1) {
            let user = result.data.users[0];
            this.saveLoginInfo(user);
          } else {
            this.clearLoginInfo();
          }
        })
        .catch(result => {
          this.clearLoginInfo();
        });
    }
  }

  logInUserWithPassword(email, password, callback) {
    client
      .query({
        query: gql`
          query MyQuery($email: String, $password: String) {
            users(
              where: {
                email: {_eq: $email}
                _and: {_or: {password: {_eq: $password}}}
              }
            ) {
              email
              id
              tckn
              username
              name
              password
              phonenumber
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      })
      .then(result => {
        if (result.data.users.length === 1) {
          let user = result.data.users[0];
          this.saveLoginInfo(user);
          callback();
        } else {
          Alert.alert('Email veya sifre yanlis.');
          callback();
        }
      })
      .catch(result => {
        Alert.alert('Bir hata olustu.');
        callback();
      });
  }

  logout = () => {
    this.clearLoginInfo();
    this.setState({isLoggedIn: false});
  };

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={theme.light}>
          {this.state.isLoggedIn ? (
            <MainNavigator
              mainFunctions={{
                logout: () => this.logout(),
              }}
            />
          ) : (
            <LoginNavigator
              mainFunctions={{
                logInUser: (email, password, callback) =>
                  this.logInUserWithPassword(email, password, callback),
              }}
            />
          )}
        </ApplicationProvider>
      </>
    );
  }
}
