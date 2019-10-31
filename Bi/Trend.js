import React, { Component } from 'react';
import Echarts from 'native-echarts';
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

  fetchDataDetail() {
    fetch(`http://47.94.150.170:8080/v1/price/coinRank`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "coinNames": ["ETH", "BTC", "LTC", "BHC"]
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
        <FlatList
          style={styles.items}
          data={this.state.coinrank != null ? this.state.coinrank.Data : null}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={({item, index}) =>
            <View style={styles.item}>
              <View style={styles.pnameercent}>
                <Text allowFontScaling={false} style={[styles.name, {fontSize: 12}]}>币种</Text>
              </View>
              <View style={styles.vol}>
                <Text allowFontScaling={false} style={[styles.name, {fontSize: 12}]}>最新价格</Text>
                <Text allowFontScaling={false} style={[styles.percent, {fontSize: 12, backgroundColor: '#FFF', padding: 0, color: '#000'}]}>涨跌 24h</Text>
              </View>
            </View>
          }
          renderItem={({item, index}) =>
            <TouchableHighlight
              style={styles.item}
              underlayColor="rgba(255, 255, 255, 1)"
              onPress={() => {
                this.props.navigation.navigate('PnameDetail', {
                  item: item
                })
              }}
            >
              <>
                <View style={styles.pnameercent}>
                  <Text allowFontScaling={false} style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.vol}>
                  <Text allowFontScaling={false} style={styles.name}>¥ {item.current_price}</Text>
                  <Text allowFontScaling={false} style={[styles.percent, {backgroundColor: item.change_percent > 0 ? 'blue' : 'rgb(255, 50, 50)'} ]}>{item.change_percent}%</Text>
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
