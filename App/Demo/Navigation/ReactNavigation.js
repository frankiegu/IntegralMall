import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Navigation from './Navigation'
import User from './User'
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
      <Navigation />
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
      <User />
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

const ClassifyStack = createStackNavigator({
  Settings: SettingsUpScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsUpScreen
});

const CartStack = createStackNavigator({
  Settings: SettingsUpScreen
});

const UserStack = createStackNavigator({
  User: UserScreen,
});

export default createBottomTabNavigator(
  {
    Home: {
       screen: HomeStack,
       navigationOptions: {
          tabBarLabel: '首页'
       },
    },
    ClassifyStack: {
       screen: SettingsStack,
       navigationOptions: {
          tabBarLabel: '分类'
       },
    },
    Settings: {
       screen: SettingsStack,
       navigationOptions: {
          tabBarLabel: '生活'
       },
    },
    CartStack: {
       screen: SettingsStack,
       navigationOptions: {
          tabBarLabel: '购物车'
       },
    },
    User: {
       screen: UserStack,
       navigationOptions: {
          tabBarLabel: '我的'
       },
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);
