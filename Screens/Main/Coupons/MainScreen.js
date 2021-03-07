import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  List,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ReportCard} from '../../../src/component/Card';
import {FetchGet, FetchPost} from '../../../src/utils/Fetch';

export default class CouponsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      reportsData: [],
      verified: [],
    };
  }

  componentDidMount() {
    this.getBlockchain();
  }

  verify(reportId) {
    console.warn('hey');
    FetchPost(
      '/addBlock',
      {
        report_id: reportId,
        type: 'verification',
      },
      () => {
        console.warn('Success');
        let verified = this.state.verified;
        verified.push(reportId);
        this.setState({verified: verified}, () => this.getBlockchain());
      },
      err => {
        console.warn('Verify error.');
      },
    );
  }

  getBlockchain() {
    FetchGet(
      '/blocks',
      {},
      response => {
        let reports = {};
        // FIND REPORTS
        response.forEach(element => {
          try {
            element = element.data;
            if (element.type === 'report') {
              element.verification = 0;
              element.isVerified = false;
              reports[element.id] = element;
            }
          } catch (err) {
            console.error(err);
          }
        });
        // ADD VERIFICATION
        response.forEach(element => {
          try {
            element = element.data;
            if (element.type === 'verification') {
              reports[element.report_id].verification += 1;
            }
          } catch (err) {
            console.error(err);
          }
        });
        // DISABLED ALREADY VERIFIED
        this.state.verified.forEach(element => {
          reports[element].isVerified = true;
        });

        let resultList = [];

        for (let key in reports) {
          resultList.push(reports[key]);
        }
        console.log(resultList);
        this.setState({reportsData: resultList});
      },
      err => console.log(err),
    );
  }

  PlusIcon = props => <Icon {...props} name="plus-outline" />;

  renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.PlusIcon}
        onPress={() => {
          this.props.navigation.navigate('AddBankAPI');
          this.setState({visible: true});
        }}
      />
    </React.Fragment>
  );

  renderItem = ({item, index}) => {
    item.verify = () => this.verify(item.id);
    return ReportCard(item);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Reports"
          alignment="center"
          accessoryRight={this.renderRightActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={CouponsStyles.listContainer}
            data={this.state.reportsData}
            renderItem={this.renderItem}
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

const CouponsStyles = StyleSheet.create({
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
