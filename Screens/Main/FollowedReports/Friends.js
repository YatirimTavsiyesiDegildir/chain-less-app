import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Divider, Layout, TopNavigation, List} from '@ui-kitten/components';
import {ReportCard} from '../../../src/component/Card';

export default class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  renderItem = ({item, index}) => {
    if (item.type === 'report') {
      item.isFollowed = true;
      return ReportCard(item);
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Followed Reports"
          alignment="center"
          accessoryRight={this.renderRightActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={FriendsStyles.listContainer}
            data={this.state.reportsData}
            renderItem={this.renderItem}
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

const FriendsStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
