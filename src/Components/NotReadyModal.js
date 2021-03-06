import React from 'react';
import {Button, Card, Modal, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

export const NotReadyModal = (visible, closeModal) => (
  <Modal
    visible={visible}
    backdropStyle={styles.backdrop}
    onBackdropPress={() => closeModal()}>
    <Card disabled={true}>
      <Text>Doğu bu özelliği henüz yazmamış kusura bakmayın.</Text>
      <Button onPress={() => closeModal()}>Kapat</Button>
    </Card>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
