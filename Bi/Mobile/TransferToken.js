import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  StatusBar,
  StatusBarManager,
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;

class TransferToken extends React.Component {
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
          }}>{navigation.state.params.title} 转账</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10, display: 'none'}}
        underlayColor='transparent'
        onPress={() => {
          navigation.navigate('Receivables')
        }}
      >
        <Ionicons
          name={'md-qr-scanner'}
          size={24}
        />
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
      from: this.props.navigation.state.params.address,
      to: null,
      symbol: this.props.navigation.state.params.tokenKey,
      amount: null,
      rec: null,
      balance: null,
      status: false
    };


    this.balance(this.props.navigation.state.params.tokenKey, this.props.navigation.state.params.address)
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
        balance: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/token/transferToken`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.state.from,
        to: this.state.to,
        symbol: this.state.symbol,
        amount: this.state.amount,
        rec: this.state.rec
      })
    })
    .then(response => response.json())
    .then(responseData => {
      alert(responseData.data.Message)
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.log('err: ', error)
      alert('请确认填写信息是否有误')
    })
    .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.container, {padding: 10}]}>
          <View style={styles.textForm}>
            <Text allowFontScaling={false} style={styles.textLable}>收款方</Text>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="收款方Address"
              clearButtonMode="while-editing"
              keyboardType="ascii-capable"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  to: params
                });
              }}
            />
          </View>
          <View style={styles.textForm}>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.textLable}>转账数量</Text>
              <Text allowFontScaling={false} style={styles.textLable}>{this.props.navigation.state.params.title} 余额：{this.state.balance != null ? this.state.balance.Data[this.props.navigation.state.params.tokenKey] : ''}</Text>
            </View>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="转账数量"
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
          <View style={styles.textForm}>
            <Text allowFontScaling={false} style={styles.textLable}>转账备注</Text>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="选填"
              clearButtonMode="while-editing"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  rec: params
                });
              }}
            />
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            style={{backgroundColor: '#1052fa', padding: 13, borderRadius: 0, marginBottom: 20}}
            onPress={() => {
              if (this.state.to && this.state.amount) {
                this.setState({
                  status: true
                })
              } else {
                alert('请确认填写信息是否有误')
                this.setState({
                  status: false
                })
              }
            }}
          >
            <>
              <Text allowFontScaling={false} numberOfLines={1} style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                marginHorizontal: 16
              }}>确认</Text>
            </>
          </TouchableHighlight>
        </View>
        <View
          style={[styles.container, {
            position: 'absolute',
            width: Dimensions.get('window').width,
            backgroundColor: 'rgba(0, 0, 0, 0.44)',
            display: this.state.status ? 'flex' : 'none'
          }]}
          onPress={() => {
            this.setState({
              status: false
            })
          }}
        >
          <View style={styles.footerMain}>
            <View style={styles.footerMainNumber}>
              <Text allowFontScaling={false} style={styles.footerMainCoin}>15</Text>
              <Text allowFontScaling={false} style={styles.footerMainText}>{this.props.navigation.state.params.title}</Text>
            </View>
            <View style={styles.footerMainList}>
              <Text allowFontScaling={false} style={styles.footerMainTitle}>支付信息</Text>
              <Text allowFontScaling={false} style={styles.footerMainSubTitle}>{this.props.navigation.state.params.title} 转账信息</Text>
            </View>
            <View style={styles.footerMainList}>
              <Text allowFontScaling={false} style={styles.footerMainTitle}>付款方</Text>
              <Text allowFontScaling={false} style={styles.footerMainSubTitleRight}>{this.props.navigation.state.params.address}</Text>
            </View>
            <View style={styles.footerMainList}>
              <Text allowFontScaling={false} style={styles.footerMainTitle}>收款方</Text>
              <Text allowFontScaling={false} style={styles.footerMainSubTitleRight}>{this.state.to}</Text>
            </View>
            <View style={styles.footerMainList}>
              <Text allowFontScaling={false} style={styles.footerMainTitle}>备注</Text>
              <Text allowFontScaling={false} style={styles.footerMainSubTitle}>{this.state.rec}</Text>
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#1052fa', padding: 13, borderRadius: 0, marginTop: 20, marginBottom: 20}}
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
                }}>确认转账</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    height: Dimensions.get('window').height - STATUSBAR_HEIGHT - 60,
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
  },
  footerMain: {
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
  footerMainNumber: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  footerMainCoin: {
    fontSize: 28,
    marginRight: 5,
    height: 30
  },
  footerMainText: {
    fontSize: 14,
  },
  footerMainList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45
  },
  footerMainSubTitleRight: {
    width: '70%',
    textAlign: 'right'
  }
}

module.exports = TransferToken;
