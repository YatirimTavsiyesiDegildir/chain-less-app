import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Button,
  Card,
  Text,
  Icon,
  Popover,
  Layout,
  Modal,
  Input,
} from '@ui-kitten/components';

const CouponCardFooter = props => {
  return (
    <View style={[CardStyles.footerContainer]}>
      <Text category={'h5'}>{props.cardProps.name}</Text>
      <Text category={'h5'} style={CardStyles.amountText} appearance="hint" />
      {AddBankApiButton(props)}
    </View>
  );
};

export const BankApiCard = props => (
  <Card style={CardStyles.card} footer={() => CouponCardFooter(props)}>
    <View style={CardStyles.cardInnerContainer}>
      <Image style={CardStyles.image} source={{uri: props.cardProps.image}} />
    </View>
  </Card>
);

export const AddBankApiButton = props => {
  const [visible, setVisible] = React.useState(false);
  const [cardNo, setCardNo] = React.useState(null);
  const [status, setStatus] = React.useState(props.cardProps.status);
  return (
    <>
      <Button
        style={CardStyles.footerControl}
        size="small"
        appearance={status === 0 || status === 2 ? 'outline' : 'filled'}
        status={status === 0 ? 'danger' : status === 1 ? 'success' : 'grey'}
        disabled={status === 2}
        onPress={() => {
          if (status === 0) {
            setVisible(true);
          }
        }}>
        {status === 0 ? 'EKLE' : status === 1 ? 'EKLENDI' : 'MEVCUT DEGIL'}
      </Button>
      {visible ? (
        <View style={styles.container}>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
            style={{width: '90%'}}>
            <Card disabled={true} style={{margin: 10}}>
              <Input
                placeholder="Kart Numaraniz: "
                value={cardNo}
                onChangeText={nextValue => setCardNo(nextValue)}
              />
              <Button
                style={CardStyles.footerControl}
                size="small"
                appearance={'filled'}
                status={'success'}
                disabled={status === 3}
                onPress={() => {
                  global.cardNumber = cardNo;
                  setStatus(1);
                  setVisible(false);
                }}>
                EKLE
              </Button>
            </Card>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export const SubscriptionWarningCard = () => {
  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Card style={CardStyles.smallCard} onPress={() => setVisible(true)}>
      <View style={CardStyles.smallCardInnerContainer}>
        <View
          style={{
            height: '100%',
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            style={CardStyles.icon}
            fill="#FFF"
            name="alert-circle-outline"
          />
        </View>
        <Text category={'h6'} style={{flex: 1, color: '#FFF'}}>
          3 gün sonra Spotify ödemen gerçekleşecek, aboneliğe devam etmek istiyor
          musun?
        </Text>
      </View>
    </Card>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={CardStyles.backdrop}>
      <Layout style={CardStyles.content}>
        <Text>
          Henüz bankanızın API'i buna izin vermiyor, lütfen diğer yollarla
          aboneliğinizi iptal edin.
        </Text>
      </Layout>
    </Popover>
  );
};

export const FriendWarningCard = props => {
  return (
    <Card
      style={[CardStyles.smallCard, {backgroundColor: '#FFAA00', height: 120}]}>
      <View style={[CardStyles.smallCardInnerContainer]}>
        <View
          style={{
            height: '100%',
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            style={CardStyles.icon}
            fill="#FFF"
            name="alert-triangle-outline"
          />
        </View>
        <Text style={{flex: 1, color: '#FFF'}}>
          Ev dışındaki harcamaların arkdaşlarindan %35 daha fazla. Bu
          harcamalardan kısarak birikimlerine odaklanabilirsin.
        </Text>
      </View>
    </Card>
  );
};

export const PurchaseCard = props => {
  const [visible, setVisible] = React.useState(false);
  const renderPurchaseInfo = () => (
    <Card
      style={[
        CardStyles.smallCard,
        {backgroundColor: props.subscription ? '#FFF1C2' : '#FFF', height: 60},
      ]}
      onPress={() => {
        if (props.subscription === 1) {
          setVisible(true);
        }
      }}>
      <View style={[CardStyles.smallCardInnerContainer]}>
        <Text category={'h6'} style={{flex: 1}}>
          {props.name}
        </Text>
        <Text>{props.amount}TL</Text>
      </View>
    </Card>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderPurchaseInfo}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={CardStyles.backdrop}>
      <Layout style={CardStyles.content}>
        <Text>
          Bu harcamanın abonelik olma ihtimali var. Uyarı eklemek ister misiniz?
        </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Button
            style={CardStyles.subscriptionButton}
            appearance="outline"
            status="danger"
            onPress={() => setVisible(false)}>
            Hayır
          </Button>
          <Button
            style={CardStyles.subscriptionButton}
            appearance="filled"
            status="success"
            onPress={() => {
              global.subscriptionWarningEnabled = true;
              setVisible(false);
            }}>
            Evet
          </Button>
        </View>
      </Layout>
    </Popover>
  );
};

const CardStyles = StyleSheet.create({
  subscriptionButton: {
    width: 150,
    margin: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
  },
  smallCard: {
    width: '100%',
    height: 100,
    backgroundColor: '#FF3D71',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  smallCardInnerContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    color: '#FFF',
  },
  cardInnerContainer: {
    height: 100,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    padding: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  footerControl: {},
  amountText: {alignSelf: 'flex-end', flex: 1},
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
