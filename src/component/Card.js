import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Text, Icon, Spinner} from '@ui-kitten/components';

const FriendCard = props => (
  <Card style={CardStyles.card}>
    <View
      style={[
        CardStyles.cardInnerContainer,
        CardStyles.cardInnerContainerFriend,
      ]}>
      <View style={CardStyles.friendAvatarContainer}>
        <Image
          style={CardStyles.friendAvatar}
          source={{
            uri:
              'https://project-lyda.s3.eu-central-1.amazonaws.com/pp/' +
              props.cardProps.followed_to_user.id +
              '.png',
          }}
        />
      </View>
      <Text category={'h6'} style={CardStyles.nameText}>
        {props.cardProps.followed_to_user.name}
      </Text>
      <Icon
        style={{width: 32, height: 32, marginRight: 20}}
        fill="#008F72"
        name="checkmark-circle-outline"
      />
    </View>
  </Card>
);

const CardStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cardInnerContainer: {
    marginHorizontal: -24,
    marginVertical: -16,
    height: 200,
  },
  cardInnerContainerFriend: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -14,
  },
  friendAvatarContainer: {
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  friendAvatar: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  footerControl: {},
  amountText: {alignSelf: 'flex-end', flex: 1},
  nameText: {
    marginLeft: 20,
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
  },
  button: {
    height: 30,
    width: 70,
    marginHorizontal: 5,
  },
});

export {FriendCard};
