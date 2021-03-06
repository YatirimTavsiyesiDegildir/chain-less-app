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
  TopNavigation,
  List,
  TopNavigationAction,
  Icon,
  Text,
  Card,
  Input,
  Button,
  Modal,
} from '@ui-kitten/components';
import {FetchGet, FetchPost} from '../../../src/utils/Fetch';
import {FriendCard} from '../../../src/component/Card';
import {client} from '../../../back-end/OurApi';
import {gql} from '@apollo/client';

const AddFriendIcon = props => <Icon {...props} name="person-add-outline" />;

export default class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friendRequests: [],
      refreshing: false,
      renderData: [],
      visible: false,
    };
  }
  componentDidMount() {
    this.getList();
  }

  getFriends() {
    if (global.friendsAdded) {
      client
        .query({
          query: gql`
            query MyQuery($id: Int) {
              followers(where: {follower_id: {_eq: $id}}) {
                followed_to_user {
                  name
                  id
                }
              }
            }
          `,
          variables: {
            id: global.userId,
          },
        })
        .then(result => {
          let followed = result.data.followers;
          this.setState({
            friends: followed,
            refreshing: false,
          });
        })
        .catch(result => {
          Alert.alert('Bir hata oluştu.');
        });
    }
  }

  getList() {
    this.setState({refreshing: true});
    this.getFriends();
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

  navigateAddFriends = () => (
    <TopNavigationAction
      icon={AddFriendIcon}
      onPress={() => this.setState({visible: true})}
    />
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Arkadaşlarım"
          alignment="center"
          accessoryRight={this.navigateAddFriends}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {global.friendsAdded ? (
            <List
              style={FriendsStyles.listContainer}
              data={this.state.friends}
              extraData={this.state.friends}
              renderItem={this.renderFriendCard}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.getFriends()}
                />
              }
            />
          ) : (
            <Text category={'h5'} style={{textAlign: 'center'}}>
              Henüz hiç arkadaşın yok.
            </Text>
          )}
        </Layout>
        <Modal
          visible={this.state.visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.setState({visible: false})}
          style={{width: '90%'}}>
          <Card disabled={true} style={{margin: 10}}>
            <Text category={'h6'}>
              Rehberinde bulunan arkadaşlarını eklemek ister misin?
            </Text>
            <View style={{height: 30}} />
            <Button
              size="small"
              appearance={'filled'}
              status={'success'}
              onPress={() => {
                global.friendsAdded = true;
                this.setState({visible: false});
                this.getFriends();
              }}>
              Rehbere İzin Ver
            </Button>
          </Card>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const FriendsStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
