import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  List,
  Icon,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {ReportCard} from '../../../src/component/Card';
import {FetchGet} from '../../../Utils/Fetch';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  SubscriptionWarningCard,
  FriendWarningCard,
} from '../../../src/component/Card2';

export default class CouponsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible2: false,
      refreshing: false,
      reportsData: [
        {
          type: 'report',
          data: {
            id: 0,
            name: 'First data!',
            description: 'This is a test data',
            place: 'Milky way galaxy.',
            date: 0,
          },
        },
        {type: 'verify', data: {report_id: 0, date: 0}},
      ],
    };
  }

  componentDidMount() {}

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
    if (item.type === 'report') {
      return ReportCard(item);
    }
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
