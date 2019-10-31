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

var data = [];
var now = + new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;

class FeedScreen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      data: [],
      list: [],
      active: '5d3912da9bbe3147969a4ad1',
      lotterys: []
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('homeFetch');
  }

  randomData() {
      now = new Date(+ now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
          name: now.toString(),
          value: [
              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
              Math.round(value)
          ]
      }
  }

  render() {
    let option = null;
    if (!this.state.data.length) {
      var data = [];
      var now = + new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
          data.push(this.randomData());
      }
      option = {
          tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                  params = params[0];
                  var date = new Date(params.name);
                  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
              },
              axisPointer: {
                  animation: false
              }
          },
          xAxis: {
              type: 'time',
              splitLine: false,
          },
          yAxis: {
              type: 'value',
              show: false
          },
          grid: {
              top: '0',
              left: '-35',
              right: '0',
              bottom: '0',
              containLabel: true,
          },
          series: [{
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    colorStops: [{
                        offset: 0, color: 'rgba(255, 70, 131, 0.7)' // 0% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            data: data
          }]
      };
      return (
        <View style={{backgroundColor: '#FFF', padding: 10}}>
          <Echarts option={option} height={250} />
        </View>
      );
    }

    if (this.state.data.length) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="small"
          />
        </View>
      );
    }
  }
}

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinrank: null
    };

    this.fetchDataDetail()
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

const LifeTab = createMaterialTopTabNavigator({
  FeedScreen1: {
    screen: Trend,
    navigationOptions: {
      tabBarLabel: '自选',
    }
  },
  FeedScreen2: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '市值榜'
    }
  },
  FeedScreen3: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '涨跌榜',
    }
  },
  FeedScreen4: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '成交榜'
    }
  },
  FeedScreen5: {
    screen: FeedScreen1,
    navigationOptions: {
      tabBarLabel: '新币榜'
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#1e88e5',
    },
    labelStyle: {
      color: "#ffffff",
    },
    indicatorStyle: {
      backgroundColor: "#ffffff",
    },
  },
});

module.exports = LifeTab;
