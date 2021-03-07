import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  Icon,
  Input,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';

import {FetchPost} from '../../../src/utils/Fetch';

export default class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      title: '',
      description: '',
      place: '',
    };
  }

  componentDidMount() {}

  GoBackIcon = props => <Icon {...props} name="arrow-back-outline" />;

  renderLeftActions = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={this.GoBackIcon}
        onPress={() => this.props.navigation.goBack()}
      />
    </React.Fragment>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Report Your Issue"
          alignment="center"
          accessoryLeft={this.renderLeftActions}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Input
            style={styles.input}
            size="large"
            label={() => <Text category={'h4'}>Title of Incident</Text>}
            onChangeText={nextValue => this.setState({title: nextValue})}
            value={this.state.title}
          />
          <Divider />
          <Input
            style={styles.input}
            size="large"
            label={() => <Text category={'h5'}>Place</Text>}
            value={this.state.place}
            onChangeText={nextValue => this.setState({place: nextValue})}
          />
          <Divider />
          <Input
            style={styles.multilineInput}
            label={() => <Text category={'h5'}>Description</Text>}
            multiline={true}
            textStyle={{minHeight: 250}}
            value={this.state.description}
            onChangeText={nextValue => this.setState({description: nextValue})}
          />
          <Divider />
          <Button
            onPress={() => {
              FetchPost(
                '/addBlock',
                {
                  title: this.state.title,
                  description: this.state.description,
                  place: this.state.place,
                  type: 'report',
                },
                () => {
                  Alert.alert(
                    'You successfully added your report to Chainless Blockchain',
                  );
                  this.setState({
                    title: '',
                    description: '',
                    place: '',
                  });
                },
                err => {
                  console.log(JSON.stringify(err));
                },
              );
            }}>
            Submit
          </Button>
        </Layout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
  },
  multilineInput: {
    marginVertical: 2,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    minHeight: 250,
  },
});
