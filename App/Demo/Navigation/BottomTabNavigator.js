import React from 'react';
import { Button, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from './Home'
import Classify from './Classify'
import User from './User'
import lotteryDetails from './lotteryDetails';
import BottomTabNavigatorScreen from './BottomTabNavigator';
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
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>首页</Text>
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

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class SettingsUpScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>列表</Text>
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
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class UserScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>我的</Text>
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
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>分类</Text>
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
  Home: HomeScreen,
  Details: DetailsScreen,
  lotteryDetails: { screen: lotteryDetails },
});

const SettingsStack = createStackNavigator({
  Settings: SettingsUpScreen
});

const CartStack = createStackNavigator({
  Settings: SettingsUpScreen
});

const ClassifyStack = createStackNavigator({
  Settings: ClassifyScreen
});

const UserStack = createStackNavigator({
  User: UserScreen,
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
       screen: HomeStack,
       navigationOptions: {
          tabBarLabel: '首页',
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={focused ? 'md-home' : 'md-home'}
              size={26}
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
              size={26}
              style={{color: tintColor}}
            />
          ),
       },
    },
    Settings: {
       screen: SettingsStack,
       navigationOptions: {
          tabBarLabel: '生活',
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={focused ? 'md-disc' : 'md-disc'}
              size={26}
              style={{color: tintColor}}
            />
          ),
       },
    },
    CartStack: {
       screen: SettingsStack,
       navigationOptions: {
          tabBarLabel: '购物车',
          tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
              name={focused ? 'md-cart' : 'md-cart'}
              size={26}
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
              size={26}
              style={{color: tintColor}}
            />
          ),
       },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);

export default HomeStack
