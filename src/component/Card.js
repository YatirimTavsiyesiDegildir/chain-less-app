import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Text, Icon, Spinner} from '@ui-kitten/components';

const ReportCard = props => (
  <Card
    style={CardStyles.card}
    header={() => (
      <View style={CardStyles.header}>
        <Text category="h6">{props.title}</Text>
        <Text category="s1">from {props.place}</Text>
        <Text category="label">Verified by {props.verification} people</Text>
      </View>
    )}
    footer={
      props.isFollowed
        ? () => (
            <View style={CardStyles.footerContainer}>
              <Button
                appearance="outline"
                style={CardStyles.footerControl}
                size="small"
                onPress={() => props.unfollow()}>
                UNFOLLOW
              </Button>
              <Button
                style={CardStyles.footerControl}
                size="small"
                onPress={() => props.verify()}
                disabled={props.isVerified}>
                {props.isVerified ? 'VERIFIED' : 'VERIFY'}
              </Button>
            </View>
          )
        : () => (
            <View style={CardStyles.footerContainer}>
              <Button
                style={CardStyles.footerControl}
                size="small"
                onPress={() => props.follow()}>
                {'FOLLOW'}
              </Button>
              <Button
                style={CardStyles.footerControl}
                size="small"
                onPress={() => props.verify()}
                disabled={props.isVerified}
                status="success">
                {props.isVerified ? 'VERIFIED' : 'VERIFY'}
              </Button>
            </View>
          )
    }>
    <Text>{props.description}</Text>
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
    margin: 15,
  },
  footerControl: {
    marginHorizontal: 4,
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

export {ReportCard};
