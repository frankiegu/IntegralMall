import React, { Component } from 'react';
import { I18n } from './i18n/index';
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

class OrderState extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>交易状态</Text>
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

    this.state = {
      order: null
    };
    this.fetchData()
  }

  fetchData() {
    fetch(`http://47.94.150.170:8080/v1/otc/orderBuyState`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "oId": this.props.navigation.state.params.data.Data.orderer_id
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.data)
      this.setState({
        order: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Image style={styles.image} source={require('./imgs/loading.png')} />
        <View>
          <Text allowFontScaling={false}>{this.state.order != null ? this.state.order.Message : null}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    padding: 20,
    alignItems: 'center',
  }
}

module.exports = OrderState;
