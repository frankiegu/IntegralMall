import React, { Component } from 'react';
import iconStyle from './Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  SectionList,
  Platform,
  TextInput,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

class OrderShow extends React.Component {
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
          }}>卖单信息</Text>
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
      account: '0x83159d5c742fa2ae2cdef4b2fe93260fe9f16a34',
      record: [],
      loginfo: []
    };

    this.fetchLoginfo()
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
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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

              }}
              activeOpacity={1}
            >
              <>
                <View style={styles.lotteryHead}>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>数量：{item.PayNumber.toFixed(2)} {item.CoinName}</Text>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>下单时间 {this.timeFormat(item.Time)}</Text>
                </View>
                <View style={styles.lotteryFoot}>
                  <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.IsShip ? '收到付款并发币给买家' : '未收到付款'}</Text>
                  <Text allowFontScaling={false} style={[styles.lotteryFinish_quantity, {marginTop: 5}]}>{item.Status == 0 ? '订单待支付' : ''}{item.Status == 1 ? '已经成功' : ''}</Text>
                </View>
              </>
            </TouchableHighlight>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
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
