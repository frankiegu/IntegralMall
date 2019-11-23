import React, { Component } from 'react';
import Echarts from 'native-echarts';
import StickyHeader from 'react-native-stickyheader';
import { I18n } from './i18n/index';
import {
  Text,
  View,
  Image,
  Alert,
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

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinrank: null,
      isRefreshing: false
    };

    this.fetchDataDetail()
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    setTimeout(() => {
      this.fetchDataDetail();
      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }

  componentDidMount() {
    this.interval = this.props.navigation.addListener('didFocus', () => {
      this.fetchDataDetail();
    })
  }

  componentWillUnmount() {
    this.fetchDataDetail();
    this.interval.remove();
  }

  fetchDataDetail() {
    fetch(`http://47.94.150.170:8080/v1/price/coinRank`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "coinNames": ["BTC", "ETH", "XRP", "BCH", "USDT", "LTC", "EOS", "BNB", "BSV", "XLM", "TRX", "ADA", "XMR", "LEO", "OKB", "HT", "LINK", "MIOTA", "ALGO", "NEO"]
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        coinrank: responseData.data
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        refreshControl = {
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            tintColor="#000"
            title="下拉刷新"
          />
        }
      >
        <StatusBar backgroundColor="#03d2a6" barStyle="light-content" />
        <FlatList
          style={styles.items}
          data={this.state.coinrank != null ? this.state.coinrank.Data : null}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={({item, index}) =>
            <View style={styles.item}>
              <View style={styles.pnameercent}>
                <Text allowFontScaling={false} style={[styles.name, {fontSize: 12}]}>{I18n.t('market.classify')}</Text>
              </View>
              <View style={styles.vol}>
                <Text allowFontScaling={false} style={[styles.name, {fontSize: 12}]}>{I18n.t('market.amount')}</Text>
                <Text allowFontScaling={false} style={[styles.percent, {fontSize: 12, backgroundColor: '#FFF', padding: 0, color: '#000'}]}>{I18n.t('market.gain')}</Text>
              </View>
            </View>
          }
          renderItem={({item, index}) =>
            <TouchableHighlight
              style={styles.item}
              underlayColor="rgba(255, 255, 255, 1)"
              onPress={() => {
                // this.props.navigation.navigate('PnameDetail', {
                //   item: item
                // })
              }}
            >
              <>
                <View style={styles.pnameercent}>
                  <Text allowFontScaling={false} style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.vol}>
                  <Text allowFontScaling={false} style={styles.name}>¥ {item.current_price}</Text>
                  <Text allowFontScaling={false} style={[styles.percent, {backgroundColor: item.change_percent > 0 ? '#03d2a6' : 'rgb(255, 50, 50)'} ]}>{item.change_percent}%</Text>
                </View>
              </>
            </TouchableHighlight>
          }
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  name: {
    fontSize: 18
  },
  pnameercent: {

  },
  vol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percent: {
    padding: 8,
    marginLeft: 20,
    color: '#FFF',
    backgroundColor: '#555',
    width: 80,
    textAlign: 'center',
    borderRadius: 3,
    overflow: 'hidden'
  }
}

module.exports = Trend;
