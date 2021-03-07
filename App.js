import React, {Component} from 'react';
import {Alert} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import LoginNavigator from './Screens/Navigators/LoginNavigator';
import MainNavigator from './Screens/Navigators/MainNavigator';
import {StoreData, GetData} from './src/utils/AsyncStorage';
import theme from './src/themes/theme';
import {client} from './back-end/OurApi';
import {gql} from '@apollo/client';
import auth from '@react-native-firebase/auth';

/**GLOBALS START*/
global.apiUrl = 'https://truereport.ey.r.appspot.com';
global.email = '';
global.uid = '';
global.password = '';
/**GLOBALS END*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAnon: false,
      following: [],
      verified: [],
    };
  }

  componentDidMount() {
    this.checkCredentials();
  }

  clearLoginInfo() {
    StoreData('email', '');
    StoreData('uid', '');
    StoreData('password', '');
    StoreData('isAnon', false);
    global.email = '';
    global.uid = '';
    global.password = '';
    this.setState({isLoggedIn: false});
  }

  saveLoginInfo(user) {
    StoreData('email', user.email);
    StoreData('uid', user.uid);
    StoreData('password', user.password);
    global.email = user.email;
    global.uid = user.uid;
    global.password = user.password;
    this.setState({isLoggedIn: true});
  }

  async checkCredentials() {
    let email = await GetData('email');
    let password = await GetData('password');
    let isAnon = await GetData('isAnon');
    if (
      email !== null &&
      email !== '' &&
      password !== null &&
      password !== ''
    ) {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User account created & signed in!');
          let user = {};
          user.email = email;
          user.password = password;
          user.uid = res.user.uid;
          this.saveLoginInfo(user);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email already in use, please try sign-in.');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Email address is invalid');
          } else {
            Alert.alert('A problem occurred.');
          }
          console.error(error);
        });
    } else if (isAnon !== null && isAnon === true) {
      let verified = await GetData('verified');
      let following = await GetData('following');
      if (verified !== null) {
        this.setState({verified: verified});
      }
      if (following !== null) {
        this.setState({following: following});
      }
      this.setState({isAnon: true, isLoggedIn: true});
    }
  }

  logInUserAnon() {
    this.setState({isLoggedIn: true, isAnon: true});
    StoreData('isAnon', true);
  }

  async logInUserWithPassword(email, password, callback) {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User account created & signed in!');
        let user = {};
        user.email = email;
        user.password = password;
        user.uid = res.user.uid;
        this.saveLoginInfo(user);
        callback();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use, please try sign-in.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Email address is invalid');
        } else {
          Alert.alert('A problem occurred.');
        }
        callback();
        console.error(error);
      });
  }

  async register(email, password, callback) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User account created & signed in!');
        let user = {};
        user.email = email;
        user.password = password;
        user.uid = res.user.uid;
        this.saveLoginInfo(user);
        callback();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use, please try sign-in.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Email address is invalid');
        } else {
          Alert.alert('A problem occurred.');
        }
        callback();
        console.error(error);
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
                setFollowing: newFollowing => {
                  this.setState({following: newFollowing});
                  StoreData('following', newFollowing);
                },
                register: (email, password, callback) =>
                  this.register(email, password, callback),
              }}
              isAnon={this.state.isAnon}
              getFollowing={() => this.state.following}
              getVerified={() => this.state.verified}
              setVerified={verified => {
                this.setState({verified: verified});
                StoreData('verified', verified);
              }}
            />
          ) : (
            <LoginNavigator
              mainFunctions={{
                logInUser: (email, password, callback) =>
                  this.logInUserWithPassword(email, password, callback),
                logInUserAnon: () => this.logInUserAnon(),
                register: (email, password, callback) =>
                  this.register(email, password, callback),
              }}
            />
          )}
        </ApplicationProvider>
      </>
    );
  }
}
