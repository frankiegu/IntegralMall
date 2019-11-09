import React, { Component } from 'react';
import iconStyle from './Styles/Icon'
import icons from './Styles/Icons'
import AnimatedTurnTableDraw from './AnimatedTurnTableDraw';
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
  SafeView,
  AsyncStorage,
  SectionList,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      lists: [
        {
          id: 0,
          icon: icons['btc'],
          name: 'BTC',
          tokenKey: null,
          number: 0
        },
        {
          id: 1,
          icon: icons.usdt,
          name: 'USDT',
          tokenKey: null,
          number: 0
        },
        {
          id: 2,
          icon: icons.xrp,
          name: 'XRP',
          tokenKey: null,
          number: 0
        },
        {
          id: 3,
          icon: icons.eth,
          name: 'ETH',
          tokenKey: null,
          number: 0
        },
        {
          id: 4,
          icon: icons.eos,
          name: 'EOS',
          tokenKey: null,
          number: 0
        },
        {
          id: 5,
          icon: icons.ltc,
          name: 'LTC',
          tokenKey: null,
          number: 0
        },
        {
          id: 6,
          icon: icons.ada,
          name: 'ADA',
          tokenKey: null,
          number: 0
        },
      ],
      loginfo: null,
      data: [],
      account: [],
      isRefreshing: false
    };

    this.loginfo()
  }

  loginfo() {
    AsyncStorage.getItem('loginfo')
    .then((response) => {
      response = JSON.parse(response)
      if (response == null) {
        this.setState({
          loginfo: null,
          lists: [
            {
              id: 0,
              icon: icons['btc'],
              name: 'BTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 1,
              icon: icons.usdt,
              name: 'USDT',
              tokenKey: null,
              number: 0
            },
            {
              id: 2,
              icon: icons.xrp,
              name: 'XRP',
              tokenKey: null,
              number: 0
            },
            {
              id: 3,
              icon: icons.eth,
              name: 'ETH',
              tokenKey: null,
              number: 0
            },
            {
              id: 4,
              icon: icons.eos,
              name: 'EOS',
              tokenKey: null,
              number: 0
            },
            {
              id: 5,
              icon: icons.ltc,
              name: 'LTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 6,
              icon: icons.ada,
              name: 'ADA',
              tokenKey: null,
              number: 0
            },
          ],
        })
      }

      if (this.state.loginfo != null) {
        this.setState({
          loginfo: response,
          lists: [
            {
              id: 0,
              icon: icons['btc'],
              name: 'BTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 1,
              icon: icons.usdt,
              name: 'USDT',
              tokenKey: null,
              number: 0
            },
            {
              id: 2,
              icon: icons.xrp,
              name: 'XRP',
              tokenKey: null,
              number: 0
            },
            {
              id: 3,
              icon: icons.eth,
              name: 'ETH',
              tokenKey: null,
              number: 0
            },
            {
              id: 4,
              icon: icons.eos,
              name: 'EOS',
              tokenKey: null,
              number: 0
            },
            {
              id: 5,
              icon: icons.ltc,
              name: 'LTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 6,
              icon: icons.ada,
              name: 'ADA',
              tokenKey: null,
              number: 0
            },
          ]
        })
        this.fetchUserinfo(response.Address, this.state.lists);
        return
      }

      if (response != null) {
        this.setState({
          loginfo: response,
          lists: [
            {
              id: 0,
              icon: icons['btc'],
              name: 'BTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 1,
              icon: icons.usdt,
              name: 'USDT',
              tokenKey: null,
              number: 0
            },
            {
              id: 2,
              icon: icons.xrp,
              name: 'XRP',
              tokenKey: null,
              number: 0
            },
            {
              id: 3,
              icon: icons.eth,
              name: 'ETH',
              tokenKey: null,
              number: 0
            },
            {
              id: 4,
              icon: icons.eos,
              name: 'EOS',
              tokenKey: null,
              number: 0
            },
            {
              id: 5,
              icon: icons.ltc,
              name: 'LTC',
              tokenKey: null,
              number: 0
            },
            {
              id: 6,
              icon: icons.ada,
              name: 'ADA',
              tokenKey: null,
              number: 0
            },
          ],
        })
        this.fetchUserinfo(response.Address, this.state.lists);
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .done();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true,
      loginfo: null
    });

    setTimeout(() => {
      AsyncStorage.getItem('loginfo')
      .then((response) => {
        this.setState({
          loginfo: JSON.parse(response)
        })
        // this.fetchUserinfo(this.state.loginfo.Address, this.state.lists);
      })
      .catch((error) => {
        this.setState({
          isRefreshing: false,
          loginfo: null
        })
      })
      .done();

      this.setState({
        isRefreshing: false
      });
    }, 1000);
  }

  componentDidMount() {
    this.interval = this.props.navigation.addListener('didFocus', () => {
      this.loginfo()
    })
  }

  componentWillUnmount() {
    this.loginfo()
    this.interval.remove();
  }

  fetchUserinfo(address, lists) {
    let items = [], index = 0, other = [], otherIndex = 0
    // let items = lists
    fetch(`http://47.94.150.170:8080/v1/token/showAccount`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "account": address
      })
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.data.Code == 200) {
        Object.keys(responseData.data.Data.BalanceOf).forEach((key) => {
          let item = key.split('|'), keys = key
          Object.keys(lists).forEach((key) => {
            if (lists[key].name == item[1]) {
              items[index++] = {
                id: lists[key].id,
                icon: lists[key].icon,
                name: item[1],
                tokenKey: item[0],
                number: responseData.data.Data.BalanceOf[keys]
              }
            }
          })
        });

        for(var i in items) {
          for(var j in lists) {
            if(items[i].id == lists[j].id) {
              lists.splice(j, 1)
            }
          }
        }

        this.setState({
          data: items.concat(lists),
          lists: [],
          account: responseData.data.Data
        })
      } else {
        console.log(responseData.data.Message)
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    if (this.state.loginfo == null) {
      return (
        <ScrollView>
          <StatusBar backgroundColor="#03d2a6" barStyle="light-content" />
          <Animated.ScrollView
            onScroll={
              Animated.event(
                [{
                  nativeEvent: { contentOffset: { y: this.state.scrollY } }
                }],
                { useNativeDriver: true }
              )
            }
            scrollEventThrottle={1}
            style={styles.container}
          >
            <View style={styles.backgroundSwiper}></View>
            <View style={styles.swiperContainer}>
              <View
              >
                <TouchableHighlight
                  style={[styles.swiperTouch, styles.swiperAssets]}
                  activeOpacity={0.9}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.swiperTotal}>GDCC 资产</Text>
                    <Text allowFontScaling={false} style={styles.swiperTotal}></Text>
                    <View style={styles.swiperCoin}>
                      <Text allowFontScaling={false} style={styles.swiperCoinNumber}>0.00</Text>
                      <Text allowFontScaling={false} style={styles.swiperCoinMark}></Text>
                    </View>
                  </>
                </TouchableHighlight>
              </View>
            </View>
            <FlatList
              data={this.state.lists}
              horizontal={false}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                <TouchableHighlight
                  underlayColor='transparent'
                  style={[styles.lotteryTouch]}
                  onPress={() => {
                    this.state.loginfo != null ? this.props.navigation.navigate('LotteryDetails', { lid: item.id, title: item.name, tokenKey: item.tokenKey, address: this.state.loginfo.Address }) : null
                  }}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <View style={styles.lotteryHead}>
                      <Image resizeMode='cover' style={styles.lotteryLottery_img} source={{uri: item.icon}} />
                      <Text allowFontScaling={false} style={styles.lotteryLottery_name}>{item.name}</Text>
                    </View>
                    <View style={styles.lotteryFoot}>
                      <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.number}</Text>
                      <View style={styles.lotteryBuy}>
                        <Text allowFontScaling={false} style={styles.lotteryBuyText}>0</Text>
                      </View>
                    </View>
                  </>
                </TouchableHighlight>
              }
            />
          </Animated.ScrollView>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <StatusBar backgroundColor="#03d2a6" barStyle="light-content" />
          <Animated.ScrollView
            onScroll={
              Animated.event(
                [{
                  nativeEvent: { contentOffset: { y: this.state.scrollY } }
                }],
                { useNativeDriver: true }
              )
            }
            scrollEventThrottle={1}
            style={styles.container}
          >
            <View style={styles.backgroundSwiper}></View>
            <View style={styles.swiperContainer}>
              <View
              >
                <TouchableHighlight
                  style={[styles.swiperTouch, styles.swiperAssets]}
                  activeOpacity={0.9}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.swiperTotal}>GDCC 资产</Text>
                    <View style={styles.swiperCoin}>
                      <Text allowFontScaling={false} style={styles.swiperCoinNumber}>0.00</Text>
                      <Text allowFontScaling={false} style={styles.swiperCoinMark}></Text>
                    </View>
                  </>
                </TouchableHighlight>
              </View>
            </View>
            <FlatList
              data={this.state.data}
              horizontal={false}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                <TouchableHighlight
                  underlayColor='transparent'
                  style={[styles.lotteryTouch]}
                  onPress={() => {
                    item.number != 0.00 ? this.props.navigation.navigate('LotteryDetails', { lid: item.id, title: item.name, tokenKey: item.tokenKey, address: this.state.loginfo.Address }) : null
                  }}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <View style={styles.lotteryHead}>
                      <Image resizeMode='cover' style={styles.lotteryLottery_img} source={{uri: item.icon}} />
                      <Text allowFontScaling={false} style={styles.lotteryLottery_name}>{item.name}</Text>
                    </View>
                    <View style={styles.lotteryFoot}>
                      <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.number.toFixed(2)}</Text>
                      <View style={styles.lotteryBuy}>
                        <Text allowFontScaling={false} style={styles.lotteryBuyText}>0</Text>
                      </View>
                    </View>
                  </>
                </TouchableHighlight>
              }
            />
          </Animated.ScrollView>
        </ScrollView>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  containerScrollView: {
    position: 'relative',
    flex: 1
  },
  backgroundSwiper: {
    position: 'absolute',
    backgroundColor: '#03d2a6',
    top: -Dimensions.get('window').width * 1.4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  swiperContainer: {
    height: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  swiperTouch: {
    borderRadius: 10,
  },
  swiperTotal: {
    color: '#EEE',
    fontWeight: '800'
  },
  swiperCoin: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  swiperCoinNumber: {
    height: 55,
    lineHeight: 55,
    fontSize: 56,
    marginRight: 10,
    color: '#FFF',
    fontWeight: '400',
  },
  swiperCoinMark: {
    height: 60,
    color: '#FFF',
    fontWeight: '800'
  },
  swiperAssets: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 2,
  },
  swiperImage: {
    width: '100%',
    borderRadius: 10,
    height: Dimensions.get('window').width / 2
  },
  columnStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  lotteryTouch: {
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 20,
  },
  lotteryLottery_img: {
    borderRadius: 10,
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10
  },
  lotteryLottery_name: {
    fontSize: 17,
    overflow: 'hidden',
  },
  lotteryHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lotteryFoot: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotteryFinish_quantity: {
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'right'
  },
  lotteryBuy: {
    display: 'none',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
  },
  lotteryBuyText: {
    color: '#555',
    fontSize: 12,
  },
  listContainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  listContainerDidWill: {
    backgroundColor: '#03d2a6',
    borderRadius: 0,
    marginLeft: 0,
    width: Dimensions.get('window').width
  },
  listTouch: {
    margin: 10
  },
  listTouchActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#555',
    marginBottom: 5
  },
  listName: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center'
  },
  listNameActive: {
    fontWeight: '800'
  }
}

module.exports = Home;
