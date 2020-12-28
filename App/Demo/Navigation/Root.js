import React from 'react';
import {
  Button,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import Home from './Home'
import Classify from './Classify'
import Web from './Web'
import Life from './Life'
import User from './User'
import Login from './Login'
import UserLogin from './UserLogin';
import LotteryDetails from './LotteryDetails';
import AnimatedTurnTableDraw from './AnimatedTurnTableDraw';
class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: (
      <TouchableHighlight
        style={{left: 10}}
        underlayColor='transparent'
      >
        <Ionicons
          name={'logo-apple'}
          size={30}
        />
      </TouchableHighlight>
    ),
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <View>
          <TextInput
            style={{ paddingLeft: 15, height: 33, width: Dimensions.get('window').width - 80, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 0 }}
            placeholder='搜索'
          />
        </View>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10}}
        underlayColor='transparent'
      >
        <Ionicons
          name={'md-notifications-outline'}
          size={26}
        />
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '#ffd600',
      borderBottomWidth: 0
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
    headerLeft: (
      <TouchableHighlight
        style={{left: 10}}
        underlayColor='transparent'
      >
        <MaterialIcons
          name={'search'}
          size={24}
        />
      </TouchableHighlight>
    ),
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>生活</Text>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10}}
        underlayColor='transparent'
      >
        <MaterialIcons
          name={'edit'}
          size={24}
        />
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '#ffd600',
      borderBottomWidth: 0
    },
  });

  render() {
    return (
      <Life />
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
      }}>购物车</Text>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '#ffd600',
      borderBottomWidth: 0
    },
  });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
      </View>
    );
  }
}

class UserScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: (
      <TouchableHighlight
        style={{left: 10}}
        underlayColor='transparent'
      >
        <Ionicons
          name={'md-settings'}
          size={28}
        />
      </TouchableHighlight>
    ),
    headerTitle: null,
    headerRight: (
      <TouchableHighlight
        style={{right: 10}}
        underlayColor='transparent'
      >
        <Ionicons
          name={'md-notifications-outline'}
          size={28}
        />
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '#ffd600',
      borderBottomWidth: 0
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
            inlineImageLeft='search_icon'
            style={{ paddingLeft: 15, height: 33, width: Dimensions.get('window').width - 20, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 0 }}
            placeholder='分类'
          />
        </View>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#000000'},
    headerStyle: {
      backgroundColor: '#ffd600',
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

const ClassifyStack = createStackNavigator({
  Classify: ClassifyScreen
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
  Classify: {
     screen: ClassifyStack,
     navigationOptions: {
        tabBarLabel: '分类',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-list' : 'md-list'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  Life: {
     screen: LifeStack,
     navigationOptions: {
        tabBarLabel: '生活',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-disc' : 'md-disc'}
            size={25}
            style={{color: tintColor}}
          />
        ),
     },
  },
  CartStack: {
     screen: CardStack,
     navigationOptions: {
        tabBarLabel: '购物车',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'md-cart' : 'md-cart'}
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
  headerMode: 'none',
  initialRouteName: 'Home'
});

const stackNavigator = createStackNavigator({
  BottomNavigatorScreen: {
    screen: BottomNavigatorScreen,
    navigationOptions: {
      header: null
    }
  },
  DetailsScreen: { screen: DetailsScreen },
  Web: { screen: Web },
  Login: { screen: Login },
  UserLogin: { screen: UserLogin },
  LotteryDetails: { screen: LotteryDetails },
  AnimatedTurnTableDraw: { screen: AnimatedTurnTableDraw },
})

module.exports = stackNavigator;
