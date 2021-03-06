import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert, RefreshControl} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  List,
  ListItem,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {BankApiCard} from '../../../Components/Card';
import {FetchGet} from '../../../Utils/Fetch';

export default class AddBankAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: [
        {
          name: 'Yapı Kredi',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/yapi_kredi_bankasi.png',
          id: 'yapi_kredi',
          status: global.cardNumber != null ? 1 : 0,
        },
        {
          name: 'Ziraat Bankası',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/ziraatbank.png',
          id: 'ziraat_bankasi',
          status: 2,
        },
        {
          name: 'İş Bankası',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/isbank.jpg',
          id: 'is_bankasi',
          status: 2,
        },
        {
          name: 'Garanti BBVA',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/garanti.jpg',
          id: 'garanti_bbva',
          status: 2,
        },
        {
          name: 'QNB Finansbank',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/qnbfinans.png',
          id: 'qnb_finans',
          status: 2,
        },
        {
          name: 'Enpara',
          image:
            'https://project-lyda.s3.eu-central-1.amazonaws.com/Enpara.com_logo.png',
          id: 'enpara',
          status: 2,
        },
      ],
      refreshing: true,
    };
  }

  componentDidMount() {}

  renderItem = ({item, index}) => (
    <BankApiCard
      cardProps={item}
      openQRScreen={() => this.openQRScreen(item.code)}
    />
  );

  openQRScreen(code) {
    this.props.navigation.navigate('ShowQRScreen', {code: code});
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
          title="Banka Ekle"
          alignment="center"
          accessoryLeft={this.renderLeftActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={AddBankAPIStyles.listContainer}
            data={this.state.banks}
            extraData={this.state.banks}
            renderItem={this.renderItem}
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

const AddBankAPIStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
