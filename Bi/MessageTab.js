import React, { Component } from 'react';
import Echarts from 'native-echarts';
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

class FeedScreen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      data: [],
      list: [],
      active: '5d3912da9bbe3147969a4ad1',
      lotterys: []
    };
  }

  randomData() {
      now = new Date(+ now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
          name: now.toString(),
          value: [
              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
              Math.round(value)
          ]
      }
  }

  render() {
    let option = null;
    if (!this.state.data.length) {
      return (
        <View style={{backgroundColor: '#FFF', padding: 10}}>
          <Echarts option={option} height={250} />
        </View>
      );
    }

    if (this.state.data.length) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="small"
          />
        </View>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative'
  }
}

const MessageTab = createMaterialTopTabNavigator({
  FeedScreen1: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '转账通知',
    }
  },
  FeedScreen2: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '系统消息'
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#ffffff',
    },
    labelStyle: {
      color: "#000000",
    },
    indicatorStyle: {
      backgroundColor: "#000000",
    },
  },
});

module.exports = MessageTab;
