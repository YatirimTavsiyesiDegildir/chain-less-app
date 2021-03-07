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
import {FetchGet} from '../../../src/utils/Fetch';

export default class CouponsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      reportsData: [],
    };
  }

  componentDidMount() {
    this.getBlockchain();
  }

  getBlockchain() {
    FetchGet(
      '/blocks',
      {},
      response => {
        let reports = [];
        response.forEach(element => {
          try {
            element = JSON.parse(element.data);
            if (element.type === 'report') {
              element.verification = 0;
              reports.push(element);
            }
          } catch (err) {
            console.error(err);
          }
        });
        // Add verifications
        response.forEach(element => {
          try {
            console.log('hey2');
            console.warn(typeof element);
            element = JSON.parse(element.data);
            console.log('hey3');
            console.warn(element);
            if (element.type === 'verification') {
              console.log(element);
              reports.forEach(element2 => {
                try {
                  if (element2.id === element.report_id) {
                    element2.verification += 1;
                  }
                } catch (err) {
                  console.error(err);
                }
              });
            }
          } catch (err) {
            console.error(err);
          }
        });
        console.log(reports);
        this.setState({reportsData: reports});
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
