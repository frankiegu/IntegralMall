import React, { Component } from 'react';
import Echarts from 'native-echarts';
import StickyHeader from 'react-native-stickyheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from './i18n/index';
import OrderState from './OrderState';
import OrderPay from './OrderPay';
import OrderShow from './OrderShow';
import Sell from './Sell';
import {
  Text,
  View,
  Image,
  Alert,
  Modal,
  StatusBar,
  SegmentedControl,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Platform,
  Animated,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

class Trend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      index: null,
      tab: 'realPay',
      realPay: null,
      payNumber: null,
      detail: null,
      payOrder: null,
      coin: ['GDCC', 'BTC', 'ETH', 'USDT', 'HT']
    };

    this.fetchDataDetail()
  }

  fetchDataDetail() {
    fetch(`http://47.94.150.170:8080/v1/otc/showSell`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "coinName": "GDCC",
        "status": "0"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        detail: responseData.data
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  show(index) {
    this.setState({
      index: index,
      show: !this.state.show
    });
  }

  fetchDataPayOrder(data) {
    fetch(`http://47.94.150.170:8080/v1/otc/showPayOrder`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "address": data.Address,
        "status": ""
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.data);
      this.setState({
        payOrder: responseData.data,
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchDataCreateBuyOrder(data, create) {
    const body = create == 'realPay' ? JSON.stringify({
      "sellId": data.SellID,
      "payNumber": parseFloat((this.state.realPay / data.Sprice).toFixed(2)),
      "address": data.Address,
      "realPay": parseFloat(this.state.realPay)
    }) : JSON.stringify({
      "sellId": data.SellID,
      "payNumber": parseFloat(this.state.payNumber),
      "address": data.Address,
      "realPay": parseFloat((this.state.payNumber * data.Sprice).toFixed(2))
    })
    fetch(`http://47.94.150.170:8080/v1/otc/createBuyOrder`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.data.Code == 200) {
        this.props.navigation.navigate('OrderState', { data: responseData.data })
      } else {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {text: I18n.t('alert.prompt')}
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  // 时间戳转换日期格式
  timeFormat(nS) {
    let date = new Date(parseInt(nS) * 1000) // 时间戳为10位需乘1000，为13位则不用

    let Y = date.getFullYear() // 年
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
    let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日

    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒

    return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s // yyyy/mm/dd hh:mm:ss
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#03d2a6" barStyle="light-content" />
        <View style={styles.coins} horizontal={true}>
        {
          this.state.coin.map((item, index) => (
            <Text allowFontScaling={false} style={styles.coin}>{item}</Text>
          ))
        }
        </View>
        <FlatList
          data={this.state.detail != null ? this.state.detail.Data : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) =>
            <TouchableHighlight
              key={item.SellID}
              style={styles.item}
              underlayColor="rgba(255, 255, 255, 1)"
              onPress={() => {
                this.show(index)
              }}
            >
              <>
                <View style={styles.pnameercent}>
                  <Text allowFontScaling={false} style={styles.text}>剩余数量：{item.SurplusNumber.toFixed(2)} {item.CoinName}</Text>
                  <Text allowFontScaling={false} style={styles.text}>限额：¥{(item.Limit_small).toFixed(2)} - ¥{(item.Limit_big).toFixed(2)}</Text>
                  <Text allowFontScaling={false} style={styles.text}>创建时间：{this.timeFormat(item.Time)}</Text>
                </View>
                <View style={styles.vol}>
                  <Text allowFontScaling={false} style={styles.name}>¥ {item.Sprice}</Text>
                  <Text allowFontScaling={false} style={styles.percent}>购买</Text>
                </View>
              </>
            </TouchableHighlight>
          }
        />
        <View style={[styles.paymentContainer, {display: this.state.show ? 'flex': 'none'}]}>
          <TouchableHighlight style={styles.paymentBackgroundColor} onPress={() => {
            this.show(null)
          }}>
            <></>
          </TouchableHighlight>
          {
            this.state.index != null ?
                <KeyboardAvoidingView
                  keyboardVerticalOffset={140}
                  behavior="padding"
                  enabled
                  style={styles.payment}
                >
                  <View style={styles.paymentPrice}>
                    <Text allowFontScaling={false} style={styles.name}>单价 ¥ {this.state.detail.Data[this.state.index].Sprice}</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <TouchableHighlight
                        underlayColor="rgba(255, 255, 255, 1)"
                        style={{
                          borderColor: this.state.tab == 'realPay' ? '#333' : '#FFF',
                          borderBottomWidth: 2,
                          marginRight: 10
                        }}
                        onPress={() => {
                          this.setState({
                            tab: 'realPay'
                          })
                        }}
                      >
                        <Text allowFontScaling={false}>价格购买</Text>
                      </TouchableHighlight>
                      <TouchableHighlight
                        underlayColor="rgba(255, 255, 255, 1)"
                        style={{
                          borderColor: this.state.tab == 'payNumber' ? '#333' : '#FFF',
                          borderBottomWidth: 2,
                          marginLeft: 10
                        }}
                        onPress={() => {
                          this.setState({
                            tab: 'payNumber'
                          })
                        }}
                      >
                        <Text allowFontScaling={false}>数量购买</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View style={[styles.paymentFrom, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.textInput}
                      placeholder="请输入购买金额"
                      keyboardType="numeric"
                      defaultValue=""
                      placeholderTextColor="#CCC"
                      onChangeText={(params) => {
                        this.setState({
                          realPay: params
                        });
                      }}
                    />
                    <View style={styles.paymentFromText}>
                      <Text allowFontScaling={false} style={{paddingRight: 20, lineHeight: 43}}>CNY</Text>
                      <View style={{width: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#111'}}></View>
                      <Text allowFontScaling={false} style={{paddingLeft: 20, paddingRight: 20, lineHeight: 43}}>全部买入</Text>
                    </View>
                    <View style={styles.paymentFromFooter}>
                      <Text allowFontScaling={false} style={styles.text}>限额：¥{(this.state.detail.Data[this.state.index].Limit_small).toFixed(2)} - ¥{(this.state.detail.Data[this.state.index].Limit_big).toFixed(2)}</Text>
                    </View>
                  </View>
                  <View style={[styles.paymentFooter, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                    <Text allowFontScaling={false} style={styles.text}>实付款</Text>
                    <View style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                      <Text allowFontScaling={false}>交易数量 {(this.state.realPay / this.state.detail.Data[this.state.index].Sprice).toFixed(4)} {this.state.detail.Data[this.state.index].CoinName}</Text>
                      <View style={styles.paymentFooterPrice}>
                        <Text allowFontScaling={false} style={{height: 15, fontWeight: '600'}}>¥ </Text>
                        <Text allowFontScaling={false} style={{height: 25, fontSize: 24, fontWeight: '600'}}>{(this.state.realPay) || '0.00'}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.paymentButtons, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                    <TouchableHighlight
                      style={styles.paymentButton}
                      activeOpacity={0.9}
                      onPress={() => {
                        this.fetchDataCreateBuyOrder(this.state.detail.Data[this.state.index], 'realPay')
                      }}
                    >
                      <>
                        <Text allowFontScaling={false} style={{color: '#FFF'}}>GDCC 下单</Text>
                      </>
                    </TouchableHighlight>
                  </View>
                  <View style={[styles.paymentFrom, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.textInput}
                      placeholder="请输入购买数量"
                      keyboardType="numeric"
                      defaultValue=""
                      placeholderTextColor="#CCC"
                      onChangeText={(params) => {
                        this.setState({
                          payNumber: params
                        });
                      }}
                    />
                    <View style={styles.paymentFromText}>
                      <Text allowFontScaling={false} style={{paddingRight: 20, lineHeight: 43}}>{this.state.detail.Data[this.state.index].CoinName}</Text>
                      <View style={{width: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#111'}}></View>
                      <Text allowFontScaling={false} style={{paddingLeft: 20, paddingRight: 20, lineHeight: 43}}>全部买入</Text>
                    </View>
                    <View style={styles.paymentFromFooter}>
                      <Text allowFontScaling={false} style={styles.text}>限额：¥{(this.state.detail.Data[this.state.index].Limit_small).toFixed(2)} - ¥{(this.state.detail.Data[this.state.index].Limit_big).toFixed(2)}</Text>
                    </View>
                  </View>
                  <View style={[styles.paymentFooter, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                    <Text allowFontScaling={false} style={styles.text}>实付款</Text>
                    <View style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                      <Text allowFontScaling={false}>交易数量 {this.state.payNumber || '0.0000'} {this.state.detail.Data[this.state.index].CoinName}</Text>
                      <View style={styles.paymentFooterPrice}>
                        <Text allowFontScaling={false} style={{height: 15, fontWeight: '600'}}>¥ </Text>
                        <Text allowFontScaling={false} style={{height: 25, fontSize: 24, fontWeight: '600'}}>{(this.state.payNumber * this.state.detail.Data[this.state.index].Sprice).toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.paymentButtons, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                    <TouchableHighlight
                      style={styles.paymentButton}
                      activeOpacity={0.9}
                      onPress={() => {
                        this.fetchDataCreateBuyOrder(this.state.detail.Data[this.state.index], 'payNumber')
                      }}
                    >
                      <>
                        <Text allowFontScaling={false} style={{color: '#FFF'}}>GDCC 下单</Text>
                      </>
                    </TouchableHighlight>
                  </View>
                </KeyboardAvoidingView> : null
          }
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    minHeight: '100%',
  },
  coins: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row'
  },
  coin: {
    padding: 10,
    fontSize: 12,
    width: 60,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  name: {
    fontSize: 17
  },
  pnameercent: {
    justifyContent: 'space-between',
  },
  vol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  percent: {
    marginTop: 6,
    paddingTop: 7,
    paddingBottom: 7,
    marginLeft: 20,
    color: '#FFF',
    backgroundColor: '#555',
    width: 60,
    textAlign: 'center',
    borderRadius: 3,
    fontSize: 13,
    overflow: 'hidden'
  },
  paymentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  paymentBackgroundColor: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  payment: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 10,
    zIndex: 2
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  paymentButton: {
    width: '100%',
    backgroundColor: 'rgb(255, 50, 50)',
    paddingLeft: 5,
    paddingRight: 5,
    height: 43,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  paymentPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    color: '#111',
    borderWidth: 1,
    padding: 12,
    height: 43,
    marginBottom: 10,
    fontWeight: '700',
    color: '#111',
    textAlign: 'left'
  },
  paymentFrom: {
    position: 'relative',
    marginBottom: 10
  },
  paymentFromText: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-end'
  },
  paymentFooterPrice: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
}

const Transaction = createMaterialTopTabNavigator({
  Trend: {
    screen: Trend,
    navigationOptions: {
      tabBarLabel: '购买',
    }
  },
  FeedScreen: {
    screen: FeedScreen,
    navigationOptions: {
      tabBarLabel: '出售'
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#03d2a6',
    },
    labelStyle: {
      color: "#ffffff",
    },
    indicatorStyle: {
      backgroundColor: "#ffffff",
    },
  },
})

class TransactionScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>{I18n.t('nav_bar.transaction')}</Text>
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
      <Transaction />
    );
  }
}

const stackNavigator = createStackNavigator({
  TransactionScreen: {
    screen: TransactionScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        I18n.t('nav_bar.transaction')
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
      headerBackTitle: null,
      headerLeft: (
        <TouchableHighlight
          style={{left: 10}}
          underlayColor='transparent'
          onPress={() => {
            navigation.navigate('OrderShow')
          }}
        >
          <Ionicons
            name={'md-menu'}
            size={24}
            color='#FFF'
          />
        </TouchableHighlight>
      ),
      headerRight: (
        <TouchableHighlight
          style={{right: 10}}
          underlayColor='transparent'
          onPress={() => {
            navigation.navigate('Sell')
          }}
        >
          <Ionicons
            name={'md-add'}
            size={24}
            color='#FFF'
          />
        </TouchableHighlight>
      ),
    })
  },
  FeedScreen: { screen: FeedScreen },
  OrderState: { screen: OrderState },
  OrderPay: { screen: OrderPay },
  OrderShow: { screen: OrderShow },
  Sell: { screen: Sell },
});

module.exports = stackNavigator;
