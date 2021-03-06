import React, {Component} from 'react';
import {
  SafeAreaView,
  Alert,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  List,
  Icon,
  Input,
} from '@ui-kitten/components';
import {FetchGet, FetchPost} from '../../../src/utils/Fetch';
import {FriendCard} from '../../../src/component/Card';

export default class AddFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      searchedPeople: [],
      refreshing: false,
      input: '',
    };
  }

  SearchIcon = style => <Icon {...style} name="search" />;

  componentDidMount() {
    this.getPeople();
  }

  getPeople() {
    this.setState({refreshing: true, input: ''});
    FetchGet(
      '/get_users_by_search',
      {user_id: global.userId, search_phrase: ''},
      response => {
        this.setState({refreshing: false});
        let users = JSON.parse(response.users);
        if (response.status === 'OK') {
          this.setState({
            users: users,
            people: users,
            searchedPeople: users,
          });
        } else {
          Alert.alert('Bir hata olustu.');
        }
      },
      () => {
        this.setState({refreshing: false});
        Alert.alert('Bir hata olustu.');
      },
    );
  }

  renderFriendCard = ({item, index}) => {
    return (
      <FriendCard
        cardProps={item}
        functions={{
          respondToFriendRequest: (target, response) =>
            this.respondToFriendRequest(target, response),
        }}
        refreshing={this.state.refreshing}
      />
    );
  };

  respondToFriendRequest(target, response) {
    FetchPost(
      '/respond_to_friend_request',
      {
        access_token: global.accessToken,
        target_user_id: target,
        response: response,
      },
      () => {
        this.getList();
      },
      () => {
        Alert.alert('Bir hata olustu!');
      },
    );
  }

  searchPeople(text) {
    let tmpList = [];
    this.state.people.forEach((item, index) => {
      if (item.real_name.indexOf(text) !== -1) {
        tmpList.push(item);
      }
    });
    this.setState({searchedPeople: tmpList});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation title="MyApp" alignment="center" />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Input
            placeholder="Search"
            accessoryLeft={this.SearchIcon}
            onChangeText={text => this.searchPeople(text)}
          />
          <List
            style={AddFriendsStyles.listContainer}
            data={
              this.state.searchedPeople.length > 15
                ? this.state.searchedPeople.slice(0, 15)
                : this.state.searchedPeople.slice()
            }
            extraData={this.state.searchedPeople}
            renderItem={this.renderFriendCard}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.getPeople()}
              />
            }
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

const AddFriendsStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
