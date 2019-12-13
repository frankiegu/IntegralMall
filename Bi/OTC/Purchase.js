import React, { Component } from 'react';
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
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

class Purchase extends React.Component {
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
      status: 'GDCC',
      coin: ['GDCC']
    };

    this.fetchDataDetail(this.state.status)
  }

  componentDidMount() {
    this.interval = this.props.navigation.addListener('didFocus', () => {
      this.fetchDataDetail(this.state.status)
    })
  }

  componentWillUnmount() {
    this.fetchDataDetail(this.state.status)
    this.interval.remove()
  }

  fetchDataDetail(coin) {
    fetch(`http://47.94.150.170:8080/v1/otc/showSell`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "coinName": coin,
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
      show: !this.state.show,
      realPay: null,
      payOrder: null
    })
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
      this.setState({
        payOrder: responseData.data,
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchDataCreateBuyOrder(data, create, cion) {
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
        this.setState({
          show: false,
          realPay: null,
          payOrder: null
        });
        this.props.navigation.navigate('OrderState', { data: responseData.data, cion: cion, sell: data })
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
            <TouchableHighlight
              underlayColor="rgba(255, 255, 255, 1)"
              onPress={() => {
                this.fetchDataDetail(item)
              }}>
              <Text
                allowFontScaling={false}
                style={[styles.coin, {
                  fontWeight: this.state.status == item ? '800' : '400'
                }]}
              >{item}</Text>
            </TouchableHighlight>
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
                  <Text allowFontScaling={false} style={[styles.text, {color: '#333'}]}>{I18n.t('purchase.remaining')}{item.SurplusNumber.toFixed(2)} {item.CoinName}</Text>
                  <Text allowFontScaling={false} style={[styles.text, {color: '#333'}]}>{I18n.t('purchase.quota')}¥{(item.Limit_small).toFixed(2)} - ¥{(item.Limit_big).toFixed(2)}</Text>
                  <Text allowFontScaling={false} style={[styles.text, {color: '#333'}]}>{I18n.t('purchase.created')}{this.timeFormat(item.Time)}</Text>
                </View>
                <View style={styles.vol}>
                  <Text allowFontScaling={false} style={styles.name}>¥ {item.Sprice}</Text>
                  <Text allowFontScaling={false} style={styles.percent}>{I18n.t('purchase.purchase')}</Text>
                </View>
              </>
            </TouchableHighlight>
          }
        />
        {
          this.state.show ? (
            <View style={styles.paymentContainer}>
              <TouchableHighlight
                style={styles.paymentBackgroundColor}
                underlayColor="transparent"
                onPress={() => {
                this.show(null)
              }}>
                <></>
              </TouchableHighlight>
              {
                this.state.index != null ?
                    <KeyboardAvoidingView
                      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                      behavior={Platform.OS === 'ios' ? "padding" : null}
                      enabled
                      style={styles.payment}
                    >
                      <View style={styles.paymentPrice}>
                        <Text allowFontScaling={false} style={styles.name}>{I18n.t('purchase.paymentPriceName')} ¥ {this.state.detail.Data[this.state.index].Sprice}</Text>
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
                            <Text allowFontScaling={false} style={{color: this.state.tab == 'realPay' ? '#000' : '#666'}}>{I18n.t('purchase.paymentPrice')}</Text>
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
                            <Text allowFontScaling={false} style={{color: this.state.tab == 'payNumber' ? '#000' : '#666'}}>{I18n.t('purchase.paymentPriceNum')}</Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                      <View style={[styles.paymentFrom, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.textInput}
                          placeholder={I18n.t('purchase.paymentPricePlaceholderPay')}
                          keyboardType="numeric"
                          defaultValue={this.state.realPay}
                          placeholderTextColor="#CCC"
                          onChangeText={(params) => {
                            this.setState({
                              realPay: params
                            });
                          }}
                        />
                        <View style={styles.paymentFromText}>
                          <Text allowFontScaling={false} style={{paddingRight: 20, lineHeight: 43}}>CNY</Text>
                          <View style={{width: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#111', display: 'none'}}></View>
                          <Text allowFontScaling={false} style={{paddingLeft: 20, paddingRight: 20, lineHeight: 43, display: 'none'}}>{I18n.t('purchase.paymentPriceAll')}</Text>
                        </View>
                        <View style={styles.paymentFromFooter}>
                          <Text allowFontScaling={false} style={styles.text}>{I18n.t('purchase.quota')}¥{(this.state.detail.Data[this.state.index].Limit_small).toFixed(2)} - ¥{(this.state.detail.Data[this.state.index].Limit_big).toFixed(2)}</Text>
                        </View>
                      </View>
                      <View style={[styles.paymentFooter, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                        <Text allowFontScaling={false} style={styles.text}>{I18n.t('purchase.actual')}</Text>
                        <View style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                          <Text allowFontScaling={false}>{I18n.t('purchase.volume')} {(this.state.realPay / this.state.detail.Data[this.state.index].Sprice).toFixed(2)} {this.state.detail.Data[this.state.index].CoinName}</Text>
                          <View style={styles.paymentFooterPrice}>
                            <Text allowFontScaling={false} style={{height: 20, fontWeight: '600'}}>¥ </Text>
                            <Text allowFontScaling={false} style={{height: 30, fontSize: 24, fontWeight: '600'}}>{(this.state.realPay) || '0.00'}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.paymentButtons, {display: this.state.tab == 'realPay' ? 'flex' : 'none'}]}>
                        <TouchableHighlight
                          style={styles.paymentButton}
                          activeOpacity={0.9}
                          onPress={() => {
                            this.fetchDataCreateBuyOrder(this.state.detail.Data[this.state.index], 'realPay', this.state.detail.Data[this.state.index])
                          }}
                        >
                          <>
                            <Text allowFontScaling={false} style={{color: '#FFF'}}>{this.state.detail.Data[this.state.index].CoinName} {I18n.t('purchase.button')}</Text>
                          </>
                        </TouchableHighlight>
                      </View>
                      <View style={[styles.paymentFrom, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                        <TextInput
                          allowFontScaling={false}
                          style={styles.textInput}
                          placeholder={I18n.t('purchase.paymentPricePlaceholderNum')}
                          keyboardType="numeric"
                          defaultValue={this.state.payNumber}
                          placeholderTextColor="#CCC"
                          onChangeText={(params) => {
                            this.setState({
                              payNumber: params
                            });
                          }}
                        />
                        <View style={styles.paymentFromText}>
                          <Text allowFontScaling={false} style={{paddingRight: 20, lineHeight: 43}}>{this.state.detail.Data[this.state.index].CoinName}</Text>
                          <View style={{width: 1, marginTop: 15, marginBottom: 15, backgroundColor: '#111', display: 'none'}}></View>
                          <Text allowFontScaling={false} style={{paddingLeft: 20, paddingRight: 20, lineHeight: 43, display: 'none'}}>{I18n.t('purchase.paymentPriceAll')}</Text>
                        </View>
                        <View style={styles.paymentFromFooter}>
                          <Text allowFontScaling={false} style={styles.text}>{I18n.t('purchase.quota')}¥{(this.state.detail.Data[this.state.index].Limit_small).toFixed(2)} - ¥{(this.state.detail.Data[this.state.index].Limit_big).toFixed(2)}</Text>
                        </View>
                      </View>
                      <View style={[styles.paymentFooter, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                        <Text allowFontScaling={false} style={styles.text}>{I18n.t('purchase.actual')}</Text>
                        <View style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                          <Text allowFontScaling={false}>{I18n.t('purchase.volume')} {this.state.payNumber || '0.00'} {this.state.detail.Data[this.state.index].CoinName}</Text>
                          <View style={styles.paymentFooterPrice}>
                            <Text allowFontScaling={false} style={{height: 20, fontWeight: '600'}}>¥ </Text>
                            <Text allowFontScaling={false} style={{height: 30, fontSize: 24, fontWeight: '600'}}>{(this.state.payNumber * this.state.detail.Data[this.state.index].Sprice).toFixed(2)}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.paymentButtons, {display: this.state.tab == 'payNumber' ? 'flex' : 'none'}]}>
                        <TouchableHighlight
                          style={styles.paymentButton}
                          activeOpacity={0.9}
                          onPress={() => {
                            this.fetchDataCreateBuyOrder(this.state.detail.Data[this.state.index], 'payNumber', this.state.detail.Data[this.state.index])
                          }}
                        >
                          <>
                            <Text allowFontScaling={false} style={{color: '#FFF'}}>{this.state.detail.Data[this.state.index].CoinName} {I18n.t('purchase.button')}</Text>
                          </>
                        </TouchableHighlight>
                      </View>
                    </KeyboardAvoidingView> : null
              }
            </View>
          ) : null
        }
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
    color: '#666'
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
    paddingLeft: 10,
    paddingRight: 10,
    color: '#FFF',
    backgroundColor: '#555',
    textAlign: 'center',
    borderRadius: 3,
    fontSize: 13,
    overflow: 'hidden'
  },
  paymentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    marginBottom: 100
  },
  paymentButton: {
    width: '100%',
    backgroundColor: '#04c2ad',
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
    textIndent: 12,
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
    alignItems: 'center'
  }
}

module.exports = Purchase;
