import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Modal,
  Button,
  Card,
} from '@ui-kitten/components';
const LogoutIcon = props => <Icon {...props} name="log-out" />;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, badgeText: ''};
    console.log(this.props.route.params);
  }

  BackAction = () => (
    <TopNavigationAction
      icon={LogoutIcon}
      onPress={() => this.props.route.params.mainFunctions.logout()}
    />
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Profile"
          alignment="center"
          accessoryRight={this.BackAction}
        />
        <Divider />
        <Layout style={ProfileStyles.container}>
          {this.props.route.params.isAnon ? (
            <>
              <Text
                category={'h6'}
                style={{textAlign: 'center', marginBottom: 20}}>
                You are currently anonymous. You can create an account to save
                your data among devices. Even when you create an account,both
                your reports and verifications will be kept anonymous.
              </Text>

              <Button
                style={ProfileStyles.button}
                onPress={() =>
                  this.props.navigation.navigate('RegisterScreen')
                }>
                Create an Account
              </Button>
            </>
          ) : (
            <>
              <View style={ProfileStyles.avatarContainer}>
                <View style={ProfileStyles.avatarInnerContainer}>
                  <Image
                    style={ProfileStyles.avatar}
                    source={{
                      uri:
                        'https://project-lyda.s3.eu-central-1.amazonaws.com/pp/' +
                        global.userId +
                        '.png',
                    }}
                  />
                </View>
              </View>
              <View style={ProfileStyles.infoContainer}>
                <Text category={'h1'}>{global.realName}</Text>
                <Text category={'label'} appearance={'hint'}>
                  {'@' + global.username}
                </Text>
              </View>
            </>
          )}
        </Layout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    flex: 2,
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logoutContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  avatar: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    padding: 10,
    zIndex: 10,
    borderRadius: 1000,
  },
  avatarInnerContainer: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
