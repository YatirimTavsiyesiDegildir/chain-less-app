import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View, Alert,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  Text,
  List,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';

import {PurchaseCard} from '../../../Components/Card';

export default class PastPurchasesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {transactions: [], refreshing: false};
  }

  updateTransactions(transactions) {
    console.log(transactions[0].txnInfo.transactionDetails.txnDscr);
    this.setState({transactions: transactions});
  }

  getTransactions() {
    if (global.cardNumber != null) {
      let updateTransactions = t => this.updateTransactions(t);
      var xhr = new XMLHttpRequest();
      var url =
        'https://api.yapikredi.com.tr/api/creditcard/v1/creditCardTransactions';
      xhr.open('POST', url);
      xhr.setRequestHeader(
        'Authorization',
        'Bearer a4b26dd5-ee9d-481d-b5e2-e64bc5a37f39',
      );
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          updateTransactions(
            JSON.parse(this.responseText).response.return.listResult.cycleList
              .transactionList,
          );
        }
      };
      xhr.send(
        ' {  "request": {    "cardNo": "' +
          global.cardNumber +
          '",    "cycle": "0"  }}   ',
      );
    } else {
      Alert.alert('Lütfen bir banka ekleyiniz.');
    }
  }

  componentDidMount() {
    this.getTransactions();
  }

  GoBackIcon = props => <Icon {...props} name="arrow-back-outline" />;

  renderLeftActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.GoBackIcon}
        onPress={() => this.props.navigation.goBack()}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Harcamalarım"
          alignment="center"
          accessoryLeft={this.renderLeftActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.state.transactions.length > 1 ? (
            <List
              style={PastPurchasesStyles.listContainer}
              data={this.state.transactions}
              extraData={this.state.transactions}
              renderItem={item => (
                <PurchaseCard
                  name={item.item.txnInfo.transactionDetails.txnDscr.txnDscr1}
                  amount={Math.abs(
                    item.item.txnInfo.transactionDetails.txnAmount,
                  )}
                  subscription={
                    ['Amazon Prime', 'Netflix', 'Spotify'].indexOf(
                      item.item.txnInfo.transactionDetails.txnDscr.txnDscr1,
                    ) !== -1
                      ? 1
                      : 0
                  }
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.getTransactions()}
                />
              }
            />
          ) : null}
        </Layout>
      </SafeAreaView>
    );
  }
}

const PastPurchasesStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    textAlign: 'center',
  },
});
