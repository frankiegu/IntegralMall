import React, { Component } from 'react';
import iconStyle from './Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from './i18n/index';
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
  Switch,
  Alert,
  Clipboard,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class LotteryDetails extends React.Component {
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
          }}>{navigation.state.params.title}</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{paddingLeft: 10, paddingRight: 10, display: 'none'}}
        underlayColor='transparent'
        underlayColor="rgba(255, 255, 255, 1)"
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('GiveRedEnvelopes', {
            title: navigation.state.params.title,
            tokenKey: navigation.state.params.tokenKey,
            address: navigation.state.params.address
          })
        }}
      >
        <Ionicons
          name={'md-document'}
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
      stateOn: false,
      loginfo: null,
      record: [],
      balance: null,
      status: 'all'
    };

    this.fetchLoginfo()
    this.balance(this.props.navigation.state.params.tokenKey, this.props.navigation.state.params.address)
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('changeBalance', () => {
      this.balance(this.props.navigation.state.params.tokenKey, this.props.navigation.state.params.address)
    });
  }

  // componentWillUnmount() {
  //   DeviceEventEmitter.emit('userChange');
  // }

  fetchUserTokenRecord(tokenKey, key, start, end, status) {
    fetch(`http://47.94.150.170:8080/v1/token/userTokenRecord`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tokenKey": tokenKey,
        "account": key,
        "start": start || '0',
        "end": end || '0'
      })
    })
    .then(response => response.json())
    .then(responseData => {
      let address = this.props.navigation.state.params.address
      Object.keys(responseData.data.Data).forEach((key) => {
        responseData.data.Data[key].Time = this.timeFormat(responseData.data.Data[key].Time)
        responseData.data.Data[key].Value = JSON.parse(responseData.data.Data[key].Value)

        // if (status == 'give' && responseData.data.Data[key].Value && JSON.parse(responseData.data.Data[key].Value).From == address) {
        //   console.log(JSON.parse(responseData.data.Data[key].Value).From);
        //   responseData.data.Data[key].Value = JSON.parse(responseData.data.Data[key].Value)
        // }
      });

      this.setState({
        record: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
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

  fetchLoginfo() {
    AsyncStorage.getItem('loginfo')
    .then((response) => {
      this.setState({
        loginfo: JSON.parse(response)
      })
      this.fetchUserTokenRecord(this.props.navigation.state.params.tokenKey, this.state.loginfo.Address, "0", null, "all")
    })
    .catch((error) => {
      this.setState({
        loginfo: null
      })
    })
    .done();
  }

  stringify(string) {
    return string.substring(0, 7) + '...' + string.substring(string.length - 7);
  }

  switchValue() {
    this.setState({
      stateOn: !this.state.stateOn
    })
  }

  render() {
    return (
      <ScrollView>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.swiperContainer}>
          <TouchableHighlight
            style={[styles.swiperTouch, styles.swiperAssets]}
            activeOpacity={0.9}
          >
            <>
              <View style={styles.swiperCoin}>
                <Text allowFontScaling={false} style={styles.swiperCoinNumber} numberOfLines={3}>{this.state.balance != null ? this.state.balance.Data[this.props.navigation.state.params.tokenKey].toFixed(2) : '0.00'}</Text>
                <Text allowFontScaling={false} style={styles.swiperCoinMark}></Text>
              </View>
              <Text allowFontScaling={false} style={styles.swiperTotal}>{I18n.t('lottery_details.title')} {this.props.navigation.state.params.cny}</Text>

              <TouchableHighlight style={styles.swiperButtonInput}
                onPress={() => {
                this.clipboardString(this.props.navigation.state.params.tokenKey)
              }}>
                <Text allowFontScaling={false} style={styles.swiperButtonsText} numberOfLines={1}>{this.props.navigation.state.params.tokenKey != null ? this.props.navigation.state.params.tokenKey : ''}</Text>
              </TouchableHighlight>
              <View style={styles.swiperButtons}>
                <TouchableHighlight
                  style={[styles.swiperButton, styles.swiperButtonTransferAccounts]}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.state.loginfo != null ? this.props.navigation.navigate('TransferToken', {
                      title: this.props.navigation.state.params.title + ' ' + I18n.t('lottery_details.transfer_token'),
                      record_detail: I18n.t('lottery_details.record_detail'),
                      tokenKey: this.props.navigation.state.params.tokenKey || '',
                      address: this.props.navigation.state.params.address
                    }) : null
                  }}
                >
                  <>
                    <Ionicons
                      name={'md-paper-plane'}
                      size={18}
                      color='#FFF'
                    />
                    <Text allowFontScaling={false} style={{color: '#FFF'}}>{I18n.t('lottery_details.transfer_token')}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.swiperButton, styles.swiperButtonReceivables]}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.state.loginfo != null ? this.props.navigation.navigate('QRcodeReceivables', {
                      title: this.props.navigation.state.params.title + ' ' + I18n.t('lottery_details.receivables'),
                      record_detail: I18n.t('lottery_details.record_detail'),
                      tokenKey: this.props.navigation.state.params.tokenKey || '',
                      address: this.props.navigation.state.params.address
                    }) : null
                  }}
                >
                  <>
                    <Text allowFontScaling={false} style={{color: '#FFF'}}>{I18n.t('lottery_details.receivables')}</Text>
                    <Ionicons
                      name={'md-qr-scanner'}
                      size={18}
                      color='#FFF'
                    />
                  </>
                </TouchableHighlight>
              </View>
              <View style={styles.swiperButtons}>
                <TouchableHighlight
                  style={[styles.swiperButton, styles.swiperButtonTransferAccounts, {width: '100%', justifyContent: 'center', backgroundColor: 'rgb(255, 50, 50)'}]}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.navigation.navigate('GiveRedEnvelopes', {
                      title: this.props.navigation.state.params.title + ' ' + I18n.t('lottery_details.packet'),
                      record_detail: I18n.t('lottery_details.record_detail'),
                      tokenKey: this.props.navigation.state.params.tokenKey,
                      address: this.props.navigation.state.params.address
                    })
                  }}
                >
                  <>
                    <Ionicons
                      name={'md-document'}
                      size={20}
                      color='#FFF'
                    />
                    <Text allowFontScaling={false} style={{color: '#FFF', marginLeft: 30}}>{this.props.navigation.state.params.title} {I18n.t('lottery_details.packet')}</Text>
                  </>
                </TouchableHighlight>
              </View>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.subTitle}>{I18n.t('lottery_details.record.title')}</Text>
          <View style={styles.containerMain}>
            <View style={styles.containerMainList}>
              <Text allowFontScaling={false} style={[styles.subTitleText, this.state.status == 'all' ? styles.subTitleTextActive : '']} onPress={() => {
                this.setState({
                  status: 'all'
                })
              }}>{I18n.t('lottery_details.record.transaction_classification.classification_0')}</Text>
              <Text allowFontScaling={false} style={[styles.subTitleText, this.state.status == 'give' ? styles.subTitleTextActive : '']} onPress={() => {
                this.setState({
                  status: 'give'
                })
              }}>{I18n.t('lottery_details.record.transaction_classification.classification_1')}</Text>
              <Text allowFontScaling={false} style={[styles.subTitleText, this.state.status == 'grab' ? styles.subTitleTextActive : '']} onPress={() => {
                this.setState({
                  status: 'grab'
                })
              }}>{I18n.t('lottery_details.record.transaction_classification.classification_2')}</Text>
            </View>
            <View style={styles.containerFlatList}>
              <FlatList
                data={this.state.record.Data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                  (
                    this.state.status == 'all' ?
                    (
                      <TouchableHighlight
                        underlayColor='transparent'
                        style={styles.containerMainContent}
                        onPress={() => {
                          this.state.loginfo != null ? this.props.navigation.navigate('RecordDetail', {
                            title: this.props.navigation.state.params.title,
                            record_detail: I18n.t('lottery_details.record_detail'),
                            tokenKey: this.props.navigation.state.params.tokenKey,
                            address: this.props.navigation.state.params.address,
                            time: item.Time,
                            txid: item.Txid,
                            from: item.Value.From,
                            to: item.Value.To,
                            amount: item.Value.Amount,
                            rec: item.Value.Rec,
                          }) : null
                        }}
                        activeOpacity={1}
                      >
                        <View style={[styles.lotteryHeadMain]}>
                          <View style={styles.lotteryHead}>
                            <View style={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? styles.iconsUndo : styles.icons}>
                              <Ionicons
                                name={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? 'ios-share-alt' : 'ios-undo'}
                                size={20}
                                color='#FFF'
                              />
                            </View>
                            <View style={styles.lotteryLottery}>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>{this.stringify(item.Txid)}</Text>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>{item.Time}</Text>
                            </View>
                          </View>
                          <View style={styles.lotteryFoot}>
                            <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? '+' : '-'}{item.Value.Amount.toFixed(2)}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    ) : this.state.status == 'give' ? (
                      <TouchableHighlight
                        underlayColor='transparent'
                        style={[styles.containerMainContent, {
                          display: item.Value.To.toUpperCase() != this.state.loginfo.Address.toUpperCase() ? null : 'none'
                        }]}
                        onPress={() => {
                          this.state.loginfo != null ? this.props.navigation.navigate('RecordDetail', {
                            title: this.props.navigation.state.params.title,
                            record_detail: I18n.t('lottery_details.record_detail'),
                            tokenKey: this.props.navigation.state.params.tokenKey,
                            address: this.props.navigation.state.params.address,
                            time: item.Time,
                            txid: item.Txid,
                            from: item.Value.From,
                            to: item.Value.To,
                            amount: item.Value.Amount,
                            rec: item.Value.Rec,
                          }) : null
                        }}
                        activeOpacity={1}
                      >
                        <View style={[styles.lotteryHeadMain]}>
                          <View style={styles.lotteryHead}>
                            <View style={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? styles.iconsUndo : styles.icons}>
                              <Ionicons
                                name={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? 'ios-share-alt' : 'ios-undo'}
                                size={20}
                                color='#FFF'
                              />
                            </View>
                            <View style={styles.lotteryLottery}>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>{this.stringify(item.Txid)}</Text>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>{item.Time}</Text>
                            </View>
                          </View>
                          <View style={styles.lotteryFoot}>
                            <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? '+' : '-'}{item.Value.Amount.toFixed(2)}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        underlayColor='transparent'
                        style={[styles.containerMainContent, {
                          display: item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? null : 'none'
                        }]}
                        onPress={() => {
                          this.state.loginfo != null ? this.props.navigation.navigate('RecordDetail', {
                            title: this.props.navigation.state.params.title,
                            record_detail: I18n.t('lottery_details.record_detail'),
                            tokenKey: this.props.navigation.state.params.tokenKey,
                            address: this.props.navigation.state.params.address,
                            time: item.Time,
                            txid: item.Txid,
                            from: item.Value.From,
                            to: item.Value.To,
                            amount: item.Value.Amount,
                            rec: item.Value.Rec
                          }) : null
                        }}
                        activeOpacity={1}
                      >
                        <View style={[styles.lotteryHeadMain]}>
                          <View style={styles.lotteryHead}>
                            <View style={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? styles.iconsUndo : styles.icons}>
                              <Ionicons
                                name={item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? 'ios-share-alt' : 'ios-undo'}
                                size={20}
                                color='#FFF'
                              />
                            </View>
                            <View style={styles.lotteryLottery}>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_name} numberOfLines={1}>{this.stringify(item.Txid)}</Text>
                              <Text allowFontScaling={false} style={styles.lotteryLottery_time} numberOfLines={1}>{item.Time}</Text>
                            </View>
                          </View>
                          <View style={styles.lotteryFoot}>
                            <Text allowFontScaling={false} style={styles.lotteryFinish_quantity}>{item.Value && item.Value.To.toUpperCase() == this.state.loginfo.Address.toUpperCase() ? '+' : '-'}{item.Value.Amount.toFixed(2)}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )
                  )
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    marginBottom: '5%'
  },
  swiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    backgroundColor: '#FFF',
    position: 'relative',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').width - 50,
  },
  swiperTouch: {
    borderRadius: 10
  },
  swiperTotal: {
    color: '#999',
    fontWeight: '800'
  },
  swiperCoin: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperCoinNumber: {
    height: 55,
    lineHeight: 55,
    fontSize: 50,
    color: '#000',
    fontWeight: '400',
  },
  swiperCoinMark: {
    height: 60,
    color: '#000',
    fontWeight: '800'
  },
  swiperAssets: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swiperImage: {
    width: '100%',
    borderRadius: 10,
    height: Dimensions.get('window').width / 2
  },
  swiperButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20
  },
  swiperButton: {
    width: '45%',
    paddingLeft: 5,
    paddingRight: 5,
    height: 45,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  swiperButtonReceivables: {
    backgroundColor: '#04c2ad'
  },
  swiperButtonTransferAccounts: {
    backgroundColor: '#1052fa'
  },
  swiperButtonInput: {
    textAlign: 'center',
    backgroundColor: '#CCC',
    backgroundColor: '#999',
    borderRadius: 20,
    marginTop: 60,
    marginBottom: 20,
    width: '90%',
  },
  swiperButtonsText: {
    textAlign: 'center',
    color: '#FFF',
    height: 45,
    fontSize: 14,
    lineHeight: 45,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  subTitle: {
    margin: '5%',
    fontWeight: '600',
    fontSize: 18,
  },
  containerMainList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
  },
  containerMainContent: {
    margin: '5%',
    marginBottom: '2%',
    height: 35,
  },
  subTitleText: {
    fontSize: 14,
    color: '#555',
    marginRight: '8%'
  },
  subTitleTextActive: {
    backgroundColor: '#ccc',
    color: '#000',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  lotteryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%'
  },
  lotteryFoot: {
    width: '30%'
  },
  lotteryHeadMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    backgroundColor: '#1052fa',
    height: 35,
    width: 35,
    marginRight: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconsUndo: {
    backgroundColor: '#04c2ad',
    height: 35,
    width: 35,
    marginRight: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lotteryLottery: {
    width: '65%',
  },
  lotteryLottery_name: {
    width: '100%'
  },
  lotteryLottery_time: {
    color: '#CCC',
    marginTop: 5
  },
  lotteryFinish_quantity: {
    textAlign: 'right'
  },
  containerFlatList: {
    marginBottom: 12
  }
}

module.exports = LotteryDetails;
