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
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

class GiveRedEnvelopes extends React.Component {
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
          }}>{navigation.state.params.title} 红包发放</Text>
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
      tokenKey: this.props.navigation.state.params.tokenKey,
      account: this.props.navigation.state.params.address,
      balance: null,
      amount: null,
      balanceData: null
    };

    this.balance(this.state.tokenKey, this.state.account)
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('changeBalance');
  }

  balance(tokenKey, account) {
    fetch(`http://47.94.150.170:8080/v1/token/balance`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: account,
        tokenKey: tokenKey
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        balanceData: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/resk/hairRedEnvelopes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenKey: this.state.tokenKey,
        account: this.state.account,
        balance: this.state.balance,
        amount: this.state.amount
      })
    })
    .then(response => response.json())
    .then(responseData => {
      // {
      //   "Code": 200,
      //   "Data": {
      //     "TokenSymbol": "ETH",
      //     "creation_time": 1571993566,
      //     "currency_key": "cd31d018981e80b07b89315e09845a6814a3610bd457b2810a925d91fb26fe38",
      //     "expiration_state": false,
      //     "expiration_time": 1572079966,
      //     "is_complete": false,
      //     "issuer_address": "0x758a70adbe79a864e52cd05636fc173d86848d50",
      //     "red_env_account_list": {},
      //     "red_env_balance": 5.987654209136963,
      //     "red_env_remaining_quantity": 3,
      //     "red_env_total_amount": 5.987654209136963,
      //     "red_env_total_quantity": 3,
      //     "red_envelopes_id": "4ce57ac3441040ae54c4c08bd80e953c7b6624a0c9697f18567fb8b1104405a2"
      //   },
      //   "Message": "红包发放成功",
      //   "Status": false
      // }
      if (responseData.data.Code) {
        this.props.navigation.navigate('GiveQRcode', {
          title: this.props.navigation.state.params.title,
          tokenKey: this.props.navigation.state.params.tokenKey,
          address: this.props.navigation.state.params.address,
          red_envelopes_id: responseData.data.Data.red_envelopes_id
        })
      } else {
        alert('失败')
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <KeyboardAvoidingView behavior='height' style={styles.behavior}>
          <View style={styles.textForm}>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.textLable}>发放金额</Text>
              <Text allowFontScaling={false} style={styles.textLable}>{this.props.navigation.state.params.title} 余额：{this.state.balanceData != null ? this.state.balanceData.Data[this.props.navigation.state.params.tokenKey] : ''}</Text>
            </View>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="balance"
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  balance: params
                });
              }}
            />
          </View>
          <View style={styles.textForm}>
            <Text allowFontScaling={false} style={styles.textLable}>红包数量</Text>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="红包数量"
              clearButtonMode="while-editing"
              keyboardType="numeric"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  amount: params
                });
              }}
            />
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            style={{backgroundColor: '#1052fa', padding: 13, borderRadius: 0, marginBottom: 20}}
            onPress={() => {
              this.fetch()
            }}
          >
            <>
              <Text allowFontScaling={false} allowFontScaling={false} numberOfLines={1} style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                marginHorizontal: 16
              }}>发红包</Text>
            </>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    padding: 10
  },
  textForm: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 20
  },
  textInput: {
    marginTop: 20,
    textAlign: 'left',
    color: '#000',
  },
  behavior: {

  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

module.exports = GiveRedEnvelopes;
