import React from 'react';
import {
  Button,
  View,
  Text,
  Alert,
  TouchableHighlight,
  TextInput,
  Dimensions,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { I18n } from './i18n/index';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Home from './Home'
import Classify from './Classify'
import Trend from './Trend'
import PnameDetail from './PnameDetail'
import Web from './Mobile/Web'
import User from './Mobile/User'
import Login from './Mobile/Login'
import Search from './Mobile/Search'
import Balance from './Mobile/Balance'
import Register from './Mobile/Register'
import ReRegister from './Mobile/ReRegister'
import UserDetails from './Mobile/UserDetails';
import TransferToken from './Mobile/TransferToken';
import GiveRedEnvelopes from './RedEnvelopes/GiveRedEnvelopes';
import GrabRedEnvelopes from './RedEnvelopes/GrabRedEnvelopes';
import RecordsRedEnvelopes from './RedEnvelopes/RecordsRedEnvelopes';
import GiveQRcode from './RedEnvelopes/GiveQRcode';
import QRcodeReceivables from './Mobile/QRcodeReceivables';
import RecordDetail from './Mobile/RecordDetail';
import LotteryDetails from './LotteryDetails';
import Receivables from './Mobile/Receivables';
import Discover from './Discover';
import Message from './Message';
import MessageTab from './MessageTab';
import AnimatedTurnTableDraw from './AnimatedTurnTableDraw';
import Change from './Mobile/Change';
import ReChange from './Mobile/ReChange';
import PrimaryFirst from './Certification/Primary/First';
import SeniorFirst from './Certification/Senior/First';
import SeniorSecond from './Certification/Senior/Second';
import WeChat from './Mobile/WeChat';
import Alipay from './Mobile/Alipay';
import UnionPay from './Mobile/UnionPay';
import Information from './Mobile/Information';
import { i18n } from './i18n/index';

import Purchase from './OTC/Purchase';
import OrderShow from './OTC/OrderShow';
import Sell from './OTC/Sell';
import OrderState from './OTC/OrderState';
import OrderPay from './OTC/OrderPay';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <Text allowFontScaling={false} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>{I18n.t('nav_bar.home')}</Text>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10}}
        underlayColor='transparent'
        onPress={() => {
          navigation.navigate('Message')
        }}
      >
        <Ionicons
          name={'md-notifications-outline'}
          size={24}
          color='#FFF'
        />
      </TouchableHighlight>
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
  });

  render() {
    return (
      <Home {...this.props} />
    );
  }
}

class LifeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>{I18n.t('nav_bar.classify')}</Text>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10, display: 'none'}}
        underlayColor='transparent'
      >
        <Ionicons
          name={'ios-search'}
          size={24}
          color='#FFF'
        />
      </TouchableHighlight>
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
  });

  render() {
    return (
      <Trend {...this.props} />
    );
  }
}

class TransactionScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <Text allowFontScaling={false} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>{I18n.t('nav_bar.transaction')}</Text>
      </TouchableHighlight>
    ),
    headerLeft: (
      <TouchableHighlight
        style={{left: 10, paddingRight: 24}}
        underlayColor='transparent'
        onPress={() => {
          navigation.navigate('OrderShow')
        }}
      >
        <Ionicons
          name={'md-menu'}
          size={24}
          color='#FFF'
        />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10, paddingLeft: 24}}
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
    tabBarVisible: false,
    headerStyle: {
      backgroundColor: '#03d2a6',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      flex: 1,
      color: '#FFFFFF',
      alignSelf: 'center',
    },
  });

  render() {
    return (
      <Purchase {...this.props} />
    );
  }
}

class UserScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: null,
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
  });

  render() {
    return (
      <User {...this.props} />
    );
  }
}

class ClassifyScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <View>
          <TextInput
            allowFontScaling={false}
            inlineImageLeft='search_icon'
            style={{ paddingLeft: 15, height: 33, width: Dimensions.get('window').width - 20, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 0 }}
            placeholder='分类'
          />
        </View>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerStyle: {
      backgroundColor: '#03d2a6',
      borderBottomWidth: 0
    },
  });

  render() {
    return (
      <Classify {...this.props} />
    );
  }
}

class TrendScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: null,
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
  });

  render() {
    return (
      <Trend {...this.props} />
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const TransactionStack = createStackNavigator({
  Transaction: TransactionScreen
});

const LifeStack = createStackNavigator({
  Life: LifeScreen
});

const UserStack = createStackNavigator({
  User: UserScreen,
});

const TrendStack = createStackNavigator({
  Trend: TrendScreen,
});

const BottomNavigatorScreen = createBottomTabNavigator({
  Home: {
     screen: HomeStack,
     navigationOptions: {
        tabBarLabel: I18n.t('tab_bar.home'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-home' : 'md-home'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  Transaction: {
     screen: TransactionStack,
     navigationOptions: {
        tabBarLabel: I18n.t('tab_bar.transaction'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-card' : 'md-card'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  Life: {
     screen: LifeStack,
     navigationOptions: {
        tabBarLabel: I18n.t('tab_bar.classify'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-podium' : 'md-podium'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  User: {
     screen: UserStack,
     navigationOptions: {
        tabBarLabel: I18n.t('tab_bar.my'),
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-person' : 'md-person'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
},
{
  mode: 'card',
  headerMode: 'screen',
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: '#07969c',
    showLabel: true
  }
});

const stackNavigator = createStackNavigator({
  BottomNavigatorScreen: {
    screen: BottomNavigatorScreen,
    navigationOptions: {
      header: null
    }
  },
  Information: { screen: Information },
  LotteryDetails: { screen: LotteryDetails },
  AnimatedTurnTableDraw: { screen: AnimatedTurnTableDraw },
  Balance: { screen: Balance },
  Discover: { screen: Discover },
  Login: { screen: Login },
  Register: { screen: Register },
  ReRegister: { screen: ReRegister },
  UserDetails: { screen: UserDetails },
  TransferToken: { screen: TransferToken },
  Receivables: { screen: Receivables },
  QRcodeReceivables: { screen: QRcodeReceivables },
  Message: { screen: Message },
  MessageTab: { screen: MessageTab },
  GiveRedEnvelopes: { screen: GiveRedEnvelopes },
  GrabRedEnvelopes: { screen: GrabRedEnvelopes },
  RecordsRedEnvelopes: { screen: RecordsRedEnvelopes },
  RecordDetail: { screen: RecordDetail },
  PnameDetail: { screen: PnameDetail },
  Trend: { screen: Trend },
  Search: { screen: Search },
  GiveQRcode: { screen: GiveQRcode },
  Web: { screen: Web },
  Change: { screen: Change },
  ReChange: { screen: ReChange },
  PrimaryFirst: { screen: PrimaryFirst },
  SeniorFirst: { screen: SeniorFirst },
  SeniorSecond: { screen: SeniorSecond },
  WeChat: { screen: WeChat },
  Alipay: { screen: Alipay },
  UnionPay: { screen: UnionPay },
  Sell: { screen: Sell },
  OrderState: { screen: OrderState },
  OrderPay: { screen: OrderPay },
  OrderShow: { screen: OrderShow },
}, {
  // navigationOptions: ({ navigation }) => {
  //   const routeName = navigation.state.routeName;
  //   console.log('navigation 对象', navigation.state);
  //   return {
  //     title: routeName,
  //   };
  // },
  // transitionConfig: () => ({
  //   screenInterpolator: (props) => {
  //     return StackViewTransitionConfigs.SlideFromRightIOS.screenInterpolator(props);
  //   },
  // }),
})

module.exports = stackNavigator;
