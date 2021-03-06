import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Divider, Layout, Text, TopNavigation} from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';

export default class ShowQRScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title={this.props.route.params.code}
          alignment="center"
        />
        <Divider />
        <Layout style={QRStyles.container}>
          <View style={QRStyles.qrCodeContainer}>
            <QRCode
              style={QRStyles.qrCode}
              value={this.props.route.params.code}
              size={250}
            />
          </View>
        </Layout>
      </SafeAreaView>
    );
  }
}

const QRStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  qrCodeContainer: {
    width: 300,
    borderRadius: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    backgroundColor: 'white',
    elevation: 5,
  },
  qrCode: {
    width: '100%',
    aspectRatio: 1,
  },
});
