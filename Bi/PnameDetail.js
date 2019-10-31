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

class PnameDetail extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        style={{right: 10}}
        underlayColor='transparent'
        onPress={() => {

        }}
      >
        <View>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            fontSize: 17,
            fontWeight: '600',
            color: 'rgba(0, 0, 0, .9)',
            textAlign: 'center',
            marginHorizontal: 16
          }}>{navigation.state.params.item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 3}}>
            <Text allowFontScaling={false} style={{ marginRight: 5, fontSize: 11.5, textAlign: 'center', color: 'rgba(0, 0, 0, .8)' }}>24小时成交额 {navigation.state.params.item.vol}</Text>
          </View>
        </View>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 0
    },
  });

  constructor(props) {
    super(props);

    this.setState({
      item: this.props.navigation.state.params.item
    })

    console.log(this.props.navigation.state.params.item);
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.head}>
          <View style={styles.headTitle}>
            <Text style={styles.currentPrice}>¥ {this.props.navigation.state.params.item.current_price}</Text>
            <Text style={[styles.turnoverrate, {color: this.props.navigation.state.params.item.change_percent > 0 ? 'blue' : 'rgb(255, 50, 50)'}]}>涨跌 {this.props.navigation.state.params.item.change_percent}%</Text>
            <Text style={[styles.turnoverrate]}>换手 {this.props.navigation.state.params.item.turnoverrate}%</Text>
          </View>
          <View style={styles.headSubTitle}>
            <Text style={styles.currentPriceUsd}>$ {this.props.navigation.state.params.item.current_price_usd}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  head: {
    padding: '5%',
    backgroundColor: '#FFF'
  },
  headTitle: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  currentPrice: {
    fontSize: 24,
    height: 25
  },
  turnoverrate: {
    marginLeft: 15
  },
  currentPriceUsd: {
    fontSize: 14,
    marginTop: '5%',
    color: '#666'
  }
}

module.exports = PnameDetail;
