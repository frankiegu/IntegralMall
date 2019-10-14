import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import StickyHeader from 'react-native-stickyheader';
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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="small"
        />
      </View>
    );
  }
}

class Home extends React.Component {
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

  render() {
    if (this.state.data.length) {
      return (
        <View>

        </View>
      );
    }

    if (!this.state.data.length) {
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

const LifeTab = createMaterialTopTabNavigator({
  FeedScreen1: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '品牌精选',
    }
  },
  FeedScreen2: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '智能家具'
    }
  },
  FeedScreen3: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '生活日用',
    }
  },
  FeedScreen4: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '手机数码'
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#ffd600',
    },
    labelStyle: {
      color: "#000",
    },
    indicatorStyle: {
      backgroundColor: "#000",
    },
  },
});

module.exports = LifeTab;
