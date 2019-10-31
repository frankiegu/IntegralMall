import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  Animated,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import {
  createMaterialTopTabNavigator
} from 'react-navigation';

class Message extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>消息</Text>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 0,
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative'
  }
}

module.exports = Message;
