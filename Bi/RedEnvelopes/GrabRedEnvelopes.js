import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <Text allowFontScaling={false} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>领红包</Text>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerStyle: {
      backgroundColor: '#1e88e5',
      borderBottomWidth: 0,
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      tokenKey: null,
      account: this.props.navigation.state.params.account || this.props.navigation.state.params.address,
      red_envelopes_id: this.props.navigation.state.params.red_envelopes_id || null,
      detail: null
    };
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

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/resk/receiveRedEnvelopes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reskID: this.state.red_envelopes_id,
        account: this.state.account
      })
    })
    .then(response => response.json())
    .then(responseData => {
      alert(responseData.data.Message)
      let detail = [], i = 0
      Object.keys(responseData.data.Data.red_env_account_list).forEach((key) => {
        responseData.data.Data.red_env_account_list[key].time = this.timeFormat(responseData.data.Data.red_env_account_list[key].time)
        console.log(responseData.data.Data.red_env_account_list[key])
        detail[i++] = responseData.data.Data.red_env_account_list[key]
      });
      console.log(detail)
      this.setState({
        detail: detail
      })
    })
    .catch((error) => {
      console.log('err: ', error)
      this.setState({
        detail: null
      })
    })
    .done();
  }

  redEnvelopeRecords() {
    fetch(`http://47.94.150.170:8080/v1/resk/redEnvelopeRecords`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reskID: this.state.reskID,
        account: this.state.account
      })
    })
    .then(response => response.json())
    .then(responseData => {
      alert(responseData.data.Message)
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={styles.backgroundColor}>
          <View style={styles.textForm}>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="输入红包 ID"
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              defaultValue={this.state.red_envelopes_id}
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  reskID: params
                });
              }}
            />
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={() => {
              this.fetch()
            }}
          >
            <Text allowFontScaling={false} allowFontScaling={false} numberOfLines={1} style={styles.buttonText}>抢红包</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.detail != null ?
          (
            <FlatList
              data={this.state.detail}
              horizontal={false}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableHighlight
                  underlayColor='transparent'
                  style={styles.containerMainContent}
                  activeOpacity={1}
                >
                  <>
                    <View style={styles.lotteryHead}>
                      <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>红包金额 {item.amount}</Text>
                    </View>
                    <View style={styles.lotteryFoot}>
                      <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.time}</Text>
                    </View>
                  </>
                </TouchableHighlight>
              )}
            />
          ) : null
        }
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    height: Dimensions.get('window').height,
  },
  backgroundColor: {
    backgroundColor: '#1e88e5',
  },
  textForm: {
    backgroundColor: '#FFF',
    margin: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInput: {
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#1052fa',
    padding: 15,
    borderRadius: 0,
    margin: 20,
    marginTop: 0
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  containerMainContent: {
    backgroundColor: '#FFF',
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width
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
