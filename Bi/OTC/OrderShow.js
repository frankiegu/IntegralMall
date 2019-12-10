import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
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
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class OrderShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
      loginfo: []
    };

    this.fetchLoginfo()
  }

  componentDidMount() {
    this.interval = this.props.navigation.addListener('didFocus', () => {
      this.fetchLoginfo()
    })
  }

  componentWillUnmount() {
    this.fetchLoginfo()
    this.interval.remove()
  }

  fetchData(address) {
    fetch(`http://47.94.150.170:8080/v1/otc/showPayOrder`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "address": address,
        "status": ""
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        record: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchLoginfo() {
    AsyncStorage.getItem('loginfo')
    .then((response) => {
      this.setState({
        loginfo: JSON.parse(response)
      })
      this.fetchData(this.state.loginfo.Address)
    })
    .catch((error) => {
      this.setState({
        loginfo: null
      })
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
        <FlatList
          data={this.state.record.Data}
          horizontal={false}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableHighlight
              underlayColor='transparent'
              style={styles.containerMainContent}
              onPress={() => {
                this.props.navigation.navigate('OrderPay', {data: item})
              }}
              activeOpacity={1}
            >
              <>
                <View style={styles.lotteryHead}>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>{I18n.t('orderShow.number')}{item.PayNumber.toFixed(2)} {item.CoinName}</Text>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>{I18n.t('orderShow.time')}{this.timeFormat(item.Time)}</Text>
                </View>
                <View style={styles.lotteryFoot}>
                  <Text allowFontScaling={false} style={styles.lotteryFinish_quantity} numberOfLines={1}>{item.IsShip == 0 ? '卖家未收到付款' : ''}{item.IsShip == 1 ? '收到付款并发币给买家' : ''}</Text>
                  <Text allowFontScaling={false} style={[styles.lotteryFinish_quantity, {marginTop: 5}]} numberOfLines={1}>{item.IsPay == 0 ? '买家未支付' : ''}{item.IsPay == 1 ? '买家已支付' : ''}</Text>
                </View>
              </>
            </TouchableHighlight>
          )}
        />
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
  containerMainContent: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 240, 240, 0.75)'
  },
  lotteryLottery_time: {
    color: '#CCC',
    marginTop: 5
  },
  lotteryFinish_quantity: {
    textAlign: 'right'
  }
}

module.exports = OrderShow;
