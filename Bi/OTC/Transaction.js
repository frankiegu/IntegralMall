import React, { Component } from 'react';
import Echarts from 'native-echarts';
import StickyHeader from 'react-native-stickyheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from './i18n/index';
import OrderState from './OrderState';
import OrderPay from './OrderPay';

import Purchase from './OTC/Purchase';
import OrderShow from './OTC/OrderShow';
import Sell from './OTC/Sell';
import {
  Text,
  View,
  Image,
  Alert,
  Modal,
  StatusBar,
  SegmentedControl,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
  Animated,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

const TopTabNavigatorScreen = createMaterialTopTabNavigator({
  Purchase: {
    screen: Purchase,
    navigationOptions: {
      tabBarLabel: '购买',
    }
  },
  OrderShow: {
    screen: OrderShow,
    navigationOptions: {
      tabBarLabel: '出售'
    }
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#03d2a6',
    },
    labelStyle: {
      color: "#ffffff",
    },
    indicatorStyle: {
      backgroundColor: "#ffffff",
    },
  },
})

const stackNavigator = createStackNavigator({
  TopTabNavigatorScreen: {
    screen: TopTabNavigatorScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        I18n.t('nav_bar.transaction')
      ),
      tabBarVisible: false,
      headerStyle: {
        backgroundColor: '#03d2a6',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        flex: 1,
        color: '#FFFFFF',
        textAlign: 'center',
      },
      headerBackTitle: null,
      headerRight: (
        <TouchableHighlight
          style={{right: 10}}
          underlayColor='transparent'
          onPress={() => {
            navigation.navigate('Sell')
          }}
        >
          <Ionicons
            name={'md-add'}
            size={24}
            color='#FFF'
          />
        </TouchableHighlight>
      ),
    })
  },
  OrderState: { screen: OrderState },
  OrderPay: { screen: OrderPay },
});

module.exports = stackNavigator;
