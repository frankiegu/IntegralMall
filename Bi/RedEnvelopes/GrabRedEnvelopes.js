import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
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
        <Text allowFontScaling={false} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>{I18n.t('receive.title')}</Text>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTitleStyle: {
      color: '#FFFFFF'
    },
    headerStyle: {
      backgroundColor: '#ec6863',
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTintColor: '#FFFFFF'
  });

  constructor(props) {
    super(props);

    this.state = {
      tokenKey: null,
      account: this.props.navigation.state.params.account || this.props.navigation.state.params.address,
      red_envelopes_id: this.props.navigation.state.params.red_envelopes_id || null,
      detail: null,
      statusLoading: false
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
    this.setState({
      statusLoading: true
    })
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
      Alert.alert(
        I18n.t('alert.title'),
        responseData.data.Message,
        [
          {text: I18n.t('alert.prompt')}
        ]
      );
      let detail = [], i = 0
      Object.keys(responseData.data.Data.red_env_account_list).forEach((key) => {
        responseData.data.Data.red_env_account_list[key].time = this.timeFormat(responseData.data.Data.red_env_account_list[key].time)
        detail[i++] = responseData.data.Data.red_env_account_list[key]
      });
      this.setState({
        detail: detail,
        statusLoading: false
      })
    })
    .catch((error) => {
      console.log('err: ', error)
      this.setState({
        detail: null,
        statusLoading: false
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
        reskID: this.state.red_envelopes_id,
        account: this.state.account
      })
    })
    .then(response => response.json())
    .then(responseData => {
      Alert.alert(
        I18n.t('alert.title'),
        responseData.data.Message,
        [
          {text: I18n.t('alert.prompt')}
        ]
      );
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ec6863" barStyle="light-content" />
        <Image style={styles.backgroundImage} source={require('../imgs/back.jpeg')} />
        <View style={styles.backgroundColor}>
          <View style={styles.textForm}>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder={I18n.t('receive.input')}
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              defaultValue={this.state.red_envelopes_id}
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  red_envelopes_id: params
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
            <>
              <ActivityIndicator
                style={{display: this.state.statusLoading ? 'flex' : 'none'}}
                size="small"
                color="#FFF"
              />
              <Text allowFontScaling={false} allowFontScaling={false} numberOfLines={1} style={styles.buttonText}>{I18n.t('receive.packet')}</Text>
            </>
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
    height: Dimensions.get('window').height,
    backgroundColor: '#ec6863',
  },
  backgroundColor: {
    position: 'relative',
    top: -70
  },
  textForm: {
    backgroundColor: '#FFF',
    margin: 20
  },
  textInput: {
    textAlign: 'center',
    color: '#000',
    padding: 15,
  },
  button: {
    backgroundColor: 'rgb(255, 50, 50)',
    padding: 15,
    borderRadius: 0,
    margin: 20,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  containerMainContent: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  lotteryLottery_time: {
    color: '#CCC',
    marginTop: 5
  },
  lotteryFinish_quantity: {
    textAlign: 'right'
  },
  lotteryLottery_name: {
    color: '#FFF'
  },
  lotteryFinish_quantity: {
    color: '#FFF'
  }
}

module.exports = GrabRedEnvelopes;
