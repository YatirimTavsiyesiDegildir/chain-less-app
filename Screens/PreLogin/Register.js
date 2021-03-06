import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';

export default class RegisterScreen extends Component {
  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            category={'h5'}
            status={'primary'}
            style={{width: '100%', textAlign: 'center', marginBottom: 40}}>
            Hesap acma fonksiyonumuz henuz bulunumuyor. Assagida bulunan
            bilgiler ile test hesabini deneyebilirsiniz.
          </Text>
          <Text category={'h6'} style={{width: '100%', textAlign: 'center'}}>
            Email: <Text>t@t.com</Text>
          </Text>
          <Text category={'h6'} style={{width: '100%', textAlign: 'center'}}>
            Sifre: <Text>123456</Text>
          </Text>
        </Layout>
      </SafeAreaView>
    );
  }
}
