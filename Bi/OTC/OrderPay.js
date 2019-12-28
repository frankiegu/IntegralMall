import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
  Platform,
  Alert,
  Switch,
  Clipboard,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class OrderPay extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            fontSize: 17,
            fontWeight: '600',
            color: 'rgba(0, 0, 0, .9)',
            textAlign: 'center',
            marginHorizontal: 16
          }}>{I18n.t('pay.title')}</Text>
        </>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerStyle: {
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params.data,
      state: null,
      statusLoading: false
    };
  }

  async clipboardString(string) {
    Clipboard.setString(string);
    let str = await Clipboard.getString()
    Alert.alert(
      I18n.t('alert.title'),
      I18n.t('alert.text'),
      [
        {text: I18n.t('alert.prompt')}
      ]
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
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

  orderPayState(id, isShip) {
    this.setState({
      statusLoading: true
    })
    fetch(`http://47.94.150.170:8080/v1/otc/orderPayState`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "oId": id,
        "isShip": isShip.toString()
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        statusLoading: false
      })
      if (responseData.data.Code == 200) {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt'),
              onPress: () => this.setState({
                state: responseData.data
              })
            }
          ]
        );
      } else {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt')
            }
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
      this.setState({
        statusLoading: false
      })
    })
    .done();
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={{position: 'relative', flex: 1}}
      >
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={[styles.lists, {display: 'none'}]}>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.data.OrderId)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.id')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.OrderId}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.coin')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.CoinName}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.num')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.PayNumber}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.price')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.RealPay}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.unit')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.Sprice}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.time')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.timeFormat(this.state.data.Time)}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.data.BuyAddr)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.buyer')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.BuyAddr}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.buyerStatus')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.IsPay == 0 ? '未支付' : ''}{this.state.data.IsPay == 1 ? '已支付' : ''}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.data.PayAddr)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.seller')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.PayAddr}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.data.PayAddr)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.isShip')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.data.IsShip == 0 ? '未收到付款' : ''}{this.state.data.IsShip == 1 ? '收到付款并发币给买家' : ''}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.shipTime')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.timeFormat(this.state.data.ShipTime)}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {

              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('pay.shipStatus')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>
                  {this.state.data.Status == 0 ? '订单待支付' : ''}
                  {this.state.data.Status == 1 ? '已经成功' : ''}
                  {this.state.data.Status == 2 ? '订单超时' : ''}
                  {this.state.data.Status == 3 ? '已撤销' : ''}
                  {this.state.data.Status == 4 ? '订单失败' : ''}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={[styles.lists, {display: this.state.data.Status == 0 && this.state.state == null ? 'flex' : 'none'}]}>
            <View style={styles.paymentButtons}>
              <TouchableHighlight
                style={[styles.paymentButton, {backgroundColor: this.state.data.IsPay ? 'rgb(255, 50, 50)' : '#999'}]}
                activeOpacity={0.9}
                onPress={() => {
                  this.state.data.IsPay ? this.orderPayState(this.state.data.OrderId, 1) : this.orderPayState(this.state.data.OrderId, 0)
                }}
              >
                <>
                  <ActivityIndicator
                    style={{display: this.state.statusLoading ? 'flex' : 'none'}}
                    size="small"
                    color="#FFF"
                  />
                  <Text allowFontScaling={false} style={{color: '#FFF'}}>{this.state.data.IsPay ? I18n.t('pay.confirm') : I18n.t('pay.buy')}</Text>
                </>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  lists: {
    marginBottom: 10
  },
  list: {
    position: 'relative',
    paddingRight: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.25)',
    // marginBottom: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    overflow: 'hidden'
  },
  textRight: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    width: 200,
    overflow: 'hidden',
    textAlign: 'right'
  },
  textRed: {
    color: 'red'
  },
  listRows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    paddingTop: 0
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
    justifyContent: 'center',
  },
}

module.exports = OrderPay;
