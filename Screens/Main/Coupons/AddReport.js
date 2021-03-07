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

export default class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
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
          <Input label={() => <Text>Title of Incident</Text>} />
          <Input label={() => <Text>Place</Text>} />
          <Input label={() => <Text>Description</Text>} multiline={true} />
          <Button>Submit</Button>
        </Layout>
      </SafeAreaView>
    );
  }
}

const AddReportStyles = StyleSheet.create({});
