import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Text, Icon, Spinner} from '@ui-kitten/components';

const Footer = props => (
  <View {...props} style={[props.style, CardStyles.footerContainer]}>
    <Button style={CardStyles.footerControl} size="small">
      FOLLOW
    </Button>
    <Button style={CardStyles.footerControl} size="small">
      ACCEPT
    </Button>
  </View>
);

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

const ReportCard = props => (
  <Card
    style={CardStyles.card}
    header={() => (
      <View style={CardStyles.header}>
        <Text category="h6">{props.data.title}</Text>
        <Text category="s1">from {props.data.place}</Text>
      </View>
    )}
    footer={Footer}>
    <Text>{props.data.description}</Text>
  </Card>
);

const CardStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  header: {
    margin: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
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

export {FriendCard, ReportCard};
