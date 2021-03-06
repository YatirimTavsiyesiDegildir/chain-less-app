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
  }

  BackAction = () => (
    <TopNavigationAction
      icon={LogoutIcon}
      onPress={() => this.props.route.params.mainFunctions.logout()}
    />
  );

  ModalWithBackdropShowcase = (badgeString, imgUri) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.setState({visible: true, badgeText: badgeString})
          }>
          <Image
            style={{height: 100, width: 100, margin: 15}}
            source={{
              uri: imgUri,
            }}
          />
        </TouchableOpacity>

        <Modal
          visible={this.state.visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.setState({visible: false})}>
          <Card disabled={true} style={{margin: 10}}>
            <Text>{this.state.badgeText}</Text>
          </Card>
        </Modal>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Profilim"
          alignment="center"
          accessoryRight={this.BackAction}
        />
        <Divider />
        <Layout style={ProfileStyles.container}>
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
          <View style={ProfileStyles.logoutContainer}>
            <Text category={'h3'}>Başarılarım</Text>
            <View
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {this.ModalWithBackdropShowcase(
                'Tebrikler! Tüm aboneliklerin için hatırlatıcı kurdun.',
                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/clap.jpeg',
              )}
              {this.ModalWithBackdropShowcase(
                'Tebrikler! Bir hafta boyunca arkadaşlarından daha tasarruflu davrandın.',
                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/flag.jpg',
              )}
              {this.ModalWithBackdropShowcase(
                'Tebrikler! Lyda hesabını bir banka hesabına bağladın.',
                'https://project-lyda.s3.eu-central-1.amazonaws.com/badges/natural.jpeg',
              )}
            </View>
          </View>
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
