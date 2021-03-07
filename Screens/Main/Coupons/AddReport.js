import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
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
            size='large'
            label={() => <Text>Title of Incident</Text>}
            onChangeText={nextValue => this.setState({title: nextValue})}
          />
          <Divider />
          <Input
            style={styles.input}
            size='large'
            label={() => <Text>Place</Text>}
            onChangeText={nextValue => this.setState({place: nextValue})}
          />
          <Divider />
          <Input
            style={styles.input}
            label={() => <Text>Description</Text>}
            multiline={true}
            textStyle={{ minHeight: 64 }}
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
                  console.log('Success');
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

const AddReportStyles = StyleSheet.create({});

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
    paddingLeft: 20,
    paddingRight:20,
  },
});