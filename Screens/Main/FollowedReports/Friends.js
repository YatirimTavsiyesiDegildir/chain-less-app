import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, RefreshControl} from 'react-native';
import {Divider, Layout, TopNavigation, List} from '@ui-kitten/components';
import {ReportCard} from '../../../src/component/Card';
import {FetchGet, FetchPost} from '../../../src/utils/Fetch';

export default class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      reportsData: [],
      verified: [],
      following: [],
    };
  }
  componentDidMount() {
    this.getBlockchain();
  }

  verify(reportId) {
    FetchPost(
      '/addBlock',
      {
        report_id: reportId,
        type: 'verification',
      },
      () => {
        console.log('Success');
        let verified = this.state.verified;
        verified.push(reportId);
        this.props.route.params.setVerified(verified);
        this.setState({verified: verified}, () => this.getBlockchain());
      },
      err => {
        console.log('Verify error.');
      },
    );
  }

  follow(reportId) {
    let following = this.state.following;
    following.push(reportId);
    this.props.route.params.setFollowing(following);
    this.setState({following: following}, () => this.getBlockchain());
  }

  unfollow(reportId) {
    let following = this.state.following;
    const index = following.indexOf(reportId);
    if (index > -1) {
      following.splice(index, 1);
    }
    this.props.route.params.setFollowing(following);
    this.setState({following: following}, () => this.getBlockchain());
  }

  getBlockchain() {
    this.setState({
      refreshing: true,
      following: this.props.route.params.getFollowing(),
      verified: this.props.route.params.getVerified(),
    });
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
              element.isFollowed = false;
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
        // DISABLE ALREADY FOLLOWED
        this.state.following.forEach(element => {
          reports[element].isFollowed = true;
        });

        let resultList = [];

        for (let key in reports) {
          console.log(reports[key].isFollowed);
          if (reports[key].isFollowed) {
            resultList.push(reports[key]);
          }
        }
        this.setState({reportsData: resultList, refreshing: false});
      },
      err => {
        console.log(err);
        this.setState({refreshing: false});
      },
    );
  }

  renderItem = ({item, index}) => {
    item.verify = () => this.verify(item.id);
    item.follow = () => this.follow(item.id);
    item.unfollow = () => this.unfollow(item.id);
    return ReportCard(item);
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
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.getBlockchain()}
              />
            }
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
