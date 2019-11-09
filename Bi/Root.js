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
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Home from './Home'
import Classify from './Classify'
import Trend from './Trend'
import LifeTab from './Life'
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
        }}>绿钻信用</Text>
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
      }}>市场</Text>
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

class CardScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>发现</Text>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerStyle: {
      borderBottomWidth: 0
    },
  });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Discover />
      </View>
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

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const CardStack = createStackNavigator({
  Card: CardScreen
});

const LifeStack = createStackNavigator({
  Life: LifeScreen
});

const UserStack = createStackNavigator({
  User: UserScreen,
});

const BottomNavigatorScreen = createBottomTabNavigator({
  Home: {
     screen: HomeStack,
     navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-home' : 'md-home'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  Life: {
     screen: LifeStack,
     navigationOptions: {
        tabBarLabel: '市场',
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
        tabBarLabel: '我的',
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
  }
});

const stackNavigator = createStackNavigator({
  BottomNavigatorScreen: {
    screen: BottomNavigatorScreen,
    navigationOptions: {
      header: null
    }
  },
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
})

module.exports = stackNavigator;
