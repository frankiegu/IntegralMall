import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

class GrabRedEnvelopes extends React.Component {
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
          }}>红包记录</Text>
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
      account: this.props.navigation.state.params.account,
      record: []
    };

    this.redEnvelopeRecords()
  }

  redEnvelopeRecords() {
    fetch(`http://47.94.150.170:8080/v1/resk/redEnvelopeRecords`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: this.state.account
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.data)
      this.setState({
        record: responseData.data
      })
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
                this.props.navigation.navigate('GiveQRcode', {
                  title: item.TokenSymbol,
                  // tokenKey: this.props.navigation.state.params.tokenKey,
                  address: this.props.navigation.state.params.account,
                  red_envelopes_id: item.red_envelopes_id
                })
              }}
              activeOpacity={1}
            >
              <>
                <View style={styles.lotteryHead}>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>{item.TokenSymbol} 红包金额 {item.red_env_total_amount}</Text>
                  <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>{this.timeFormat(item.creation_time)}</Text>
                </View>
                <View style={styles.lotteryFoot}>
                  <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>红包总量 {item.red_env_total_quantity}</Text>
                  <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>余额红包 {item.red_env_remaining_quantity}</Text>
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

module.exports = GrabRedEnvelopes;
