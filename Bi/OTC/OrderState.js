import React, { Component, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
import Modalize from 'react-native-modalize';
import TouchID from 'react-native-touch-id';
import Communications from 'react-native-communications';
import {
  Text,
  View,
  Alert,
  Layout,
  Image,
  Linking,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  Animated,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class OrderState extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>{I18n.t('status.title')}</Text>
    ),
    tabBarVisible: false,
    headerTitleStyle: {color: '#FFFFFF'},
    headerLeft: null,
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 0,
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);
    this.modal = React.createRef();

    this.state = {
      time: '15:00',
      order: null,
      alipay: null,
      wechat: null,
      union: null,
      status: 'union',
      payStatus: 'normal',
    }

    this.getAliPay()
    this.getWechat()
    this.getUnion()
  }

  onClosed = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.onClosed();
    }
  }

  openModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.open();
    }
  }

  closeModal = () => {
    const modal = this.modal.current;
    if (modal) {
      modal.close();
    }
  }

  switch(sta) {
    this.setState({
      status: sta
    })

    setTimeout(() => {
      this.closeModal()
    }, 300)
  }

  tel() {
    let tel = 'tel:' + this.props.navigation.state.params.data.Data.phone
    Alert.alert(
      I18n.t('alert.title'),
      '是否拨打？',
      [
        {
          text: I18n.t('alert.cancel'),
          onPress: () => { console.log('取消') }
        },
        {
          text: I18n.t('alert.prompt'),
          onPress: () => {
            Communications.phonecall(this.props.navigation.state.params.data.Data.phone, true)
            // Linking.canOpenURL(tel).then((supported) => {
            //   if (!supported) {
            //     console.log('Can not handle tel:' + tel)
            //   } else {
            //     return Linking.openURL(tel)
            //   }
            // }).catch(error => console.log('tel error', error))
          }
        }
      ]
    );
  }

  orderBuyState(id) {
    fetch(`http://47.94.150.170:8080/v1/otc/orderBuyState`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "oId": id
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        order: responseData.data
      })
      Alert.alert(
        I18n.t('alert.title'),
        responseData.data.Message,
        [
          {
            text: I18n.t('alert.prompt'),
            onPress: () => {
              console.log('ok')
              this.setState({
                payStatus: 'success'
              })
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000)
            }
          }
        ]
      );
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  getAliPay() {
    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.sell.Address,
        "state": "0"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        alipay: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  getWechat() {
    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.sell.Address,
        "state": "1"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        wechat: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  getUnion() {
    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.sell.Address,
        "state": "2"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        union: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  modifyOrderStatus(state) {
    fetch(`http://47.94.150.170:8080/v1/otc/modifyOrderStatus`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "oId": this.props.navigation.state.params.data.Data.orderer_id,
        "state": state
      })
    })
    .then(response => response.json())
    .then(responseData => {
      clearInterval(this.interval)
      Alert.alert(
        I18n.t('alert.title'),
        responseData.data.Message,
        [
          {
            text: I18n.t('alert.prompt'),
            onPress: () => {
              console.log('ok')
              this.setState({
                payStatus: 'error'
              })
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000)
            }
          }
        ]
      );
      this.setState({
        order: responseData.data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  end() {
    clearInterval(this.interval)
    this.modifyOrderStatus("2")
    this.setState({
      time: '00:00'
    })
  }

  componentDidMount() {
    var a = 0, m = 0, s = 1, limitMinute = 15
    this.interval = setInterval(() => {
      if (m * 60 + s == 0) {
        this.end()
      } else {
        a ++
        m = parseInt((limitMinute * 60 - a) / 60)
        s = parseInt((limitMinute * 60 - a) % 60)
        this.setState({
          time: (m < 10 ? ('0' + m.toString()) : m) + ':' + (s < 10 ? ('0' + s.toString()) : s)
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    if (this.state.payStatus == 'normal') {
      return (
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={styles.loadingPay}>
            <View style={styles.loadingLeft}>
              <View style={styles.loadingHead}>
                <Image style={styles.loadingImage} source={require('../imgs/loading.png')} />
                <Text allowFontScaling={false} style={styles.loadingText}>请确定付款</Text>
              </View>
              <View style={styles.loadingFoot}>
                <Text allowFontScaling={false} style={styles.loadingTime}>请在 {this.state.time} 内确认付款给卖家</Text>
              </View>
            </View>
            <TouchableHighlight
              style={styles.loadingRight}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
              onPress={() => {
                this.tel()
              }}
            >
              <>
                <Ionicons
                  name={'ios-call'}
                  size={25}
                  style={[styles.loadingImage, {marginBottom: 8, marginRight: 0}]}
                />
                <Text allowFontScaling={false} style={styles.loadingTime}>联系卖家</Text>
              </>
            </TouchableHighlight>
          </View>
          <View style={styles.payNumber}>
            <Text allowFontScaling={false} style={styles.loadingText}>¥ {this.props.navigation.state.params.data.Data.real_pay.toFixed(2)}</Text>
            <View style={styles.payInfo}>
              <View style={styles.payInfoText}>
                <Text allowFontScaling={false}>单价：¥ {this.props.navigation.state.params.data.Data.sprice.toFixed(2)}</Text>
                <Text allowFontScaling={false}>数量：{this.props.navigation.state.params.data.Data.pay_number} GDCC</Text>
              </View>
              <View style={[styles.payInfoCoin, {display: 'none'}]}>
                <Image style={[styles.loadingImage, {marginBottom: 5, marginRight: 0}]} source={require('../imgs/loading.png')} />
                <Text allowFontScaling={false} style={styles.loadingTime}>GDCC</Text>
              </View>
            </View>
          </View>
          <View style={styles.payUser}>
            <Text allowFontScaling={false}>请购买本人确认以下转账信息是否有误</Text>
          </View>
          {
            this.state.union && this.state.status == 'union' ? (
              <View style={styles.lists}>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                  onPress={this.openModal}
                >
                  <>
                    <Text allowFontScaling={false} style={[styles.text, {fontWeight: '800'}]}>银行卡</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>收款人</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.union.Data ? this.state.union.Data.UserName : null}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>银行卡号</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.union.Data ? this.state.union.Data.BankNumber : null}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>开户银行</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.union.Data ? this.state.union.Data.Bank : null}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>开户地址</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.union.Data ? this.state.union.Data.OpenAddr : null}</Text>
                  </>
                </TouchableHighlight>
              </View>
            ) : null
          }
          {
            this.state.alipay && this.state.status == 'alipay' ? (
              <View style={styles.lists}>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                  onPress={this.openModal}
                >
                  <>
                    <Text allowFontScaling={false} style={[styles.text, {fontWeight: '800'}]}>支付宝</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>收款人</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.alipay.Data.UserName}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>支付宝账户</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.alipay.Data.AliPayID}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                  onPress={() => {
                    this.props.navigation.navigate('Web', {title: '收款码', uri: this.state.alipay.Data.AliPayImg, save: this.state.alipay.Data.AliPayImg})
                  }}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>收款码</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </>
                </TouchableHighlight>
              </View>
            ) : null
          }
          {
            this.state.wechat && this.state.status == 'wechat' ? (
              <View style={styles.lists}>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                  onPress={this.openModal}
                >
                  <>
                    <Text allowFontScaling={false} style={[styles.text, {fontWeight: '800'}]}>微信</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>收款人</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.wechat.Data.UserName}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>微信账户</Text>
                    <Text allowFontScaling={false} style={styles.text}>{this.state.wechat.Data.WeChatID}</Text>
                  </>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.list, styles.listRows]}
                  underlayColor="rgba(255, 255, 255, 1)"
                  activeOpacity={1}
                  onPress={() => {
                    this.props.navigation.navigate('Web', {title: '收款码', uri: this.state.wechat.Data.WeChatImg, save: this.state.wechat.Data.WeChatImg})
                  }}
                >
                  <>
                    <Text allowFontScaling={false} style={styles.text}>收款码</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </>
                </TouchableHighlight>
              </View>
            ) : null
          }
          <View style={styles.payButton}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
              onPress={() => {
                this.modifyOrderStatus("3")
              }}
            >
              <Text allowFontScaling={false} style={[styles.buttonText, {backgroundColor: 'rgb(255, 50, 50)'}]}>取消订单</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
              onPress={() => {
                this.orderBuyState(this.props.navigation.state.params.data.Data.orderer_id)
              }}
            >
              <Text allowFontScaling={false} style={[styles.buttonText, {backgroundColor: '#04c2ad'}]}>确认付款</Text>
            </TouchableHighlight>
          </View>
          <Modalize
            ref={this.modal}
            adjustToContentHeight
            handlePosition="inside"
          >
            <View style={s.content}>
              <Text style={s.content__subheading}>切换收款方式</Text>
              <View style={s.content__checks}>
                <TouchableOpacity style={s.content__check} activeOpacity={0.9} onPress={() => this.state.union ? this.switch('union') : null}>
                  <View style={s.content__checkSource}>
                    <Image style={s.content__checkImage} source={require('../../Bi/imgs/card.png')} />
                    <View style={s.content__checkTexts}>
                      <Text allowFontScaling={false} style={s.content__checkText}>银行卡</Text>
                      <Text allowFontScaling={false} style={s.content__checkTextSub}>{this.state.union ? '已配置' : '尚未配置'}</Text>
                    </View>
                  </View>
                  <View style={s.content__checkRight}>
                    <Text allowFontScaling={false} style={[s.content__checkTextSub, {color: '#000'}]}>{this.state.status == 'union' ? '已选择' : ''}</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={s.content__check} activeOpacity={0.9} onPress={() => this.state.wechat ? this.switch('wechat') : null}>
                  <View style={s.content__checkSource}>
                    <Image style={s.content__checkImage} source={require('../../Bi/imgs/wechat.png')} />
                    <View style={s.content__checkTexts}>
                      <Text allowFontScaling={false} style={s.content__checkText}>微信</Text>
                      <Text allowFontScaling={false} style={s.content__checkTextSub}>{this.state.wechat ? '已配置' : '尚未配置'}</Text>
                    </View>
                  </View>
                  <View style={s.content__checkRight}>
                    <Text allowFontScaling={false} style={[s.content__checkTextSub, {color: '#000'}]}>{this.state.status == 'wechat' ? '已选择' : ''}</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={s.content__check} activeOpacity={0.9} onPress={() => this.state.alipay ? this.switch('alipay') : null}>
                  <View style={s.content__checkSource}>
                    <Image style={s.content__checkImage} source={require('../../Bi/imgs/alipay.png')} />
                    <View style={s.content__checkTexts}>
                      <Text allowFontScaling={false} style={s.content__checkText}>支付宝</Text>
                      <Text allowFontScaling={false} style={s.content__checkTextSub}>{this.state.alipay ? '已配置' : '尚未配置'}</Text>
                    </View>
                  </View>
                  <View style={s.content__checkRight}>
                    <Text allowFontScaling={false} style={[s.content__checkTextSub, {color: '#000'}]}>{this.state.status == 'alipay' ? '已选择' : ''}</Text>
                    <Ionicons
                      name={'ios-arrow-forward'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </>
      );
    } else {
      return (
        <>
          <View style={[styles.container, {display: this.state.payStatus == 'success' ? 'flex' : 'none'}]}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <Image style={styles.containerImage} source={require('../imgs/success.png')} />
            <View>
              <Text allowFontScaling={false}>已确认订单</Text>
            </View>
          </View>
          <View style={[styles.container, {display: this.state.payStatus == 'error' ? 'flex' : 'none'}]}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <Image style={styles.containerImage} source={require('../imgs/error.png')} />
            <View>
              <Text allowFontScaling={false}>已取消订单</Text>
            </View>
          </View>
        </>
      );
    }
  }
}

const styles = {
  loadingPay: {
    backgroundColor: '#FFF',
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loadingRight: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingHead: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8
  },
  loadingImage: {
    width: 25,
    height: 25,
    marginRight: 8,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '800',
    height: 25,
    lineHeight: 25
  },
  payInfoText: {
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
  },
  payNumber: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFF'
  },
  payInfo: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  payInfoCoin: {
    display: 'flex',
    alignItems: 'center'
  },
  payUser: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.25)',
  },
  list: {
    position: 'relative',
    borderBottomWidth: 1,
    paddingRight: 15,
    paddingLeft: 15,
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
  listRows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 15,
    width: '42%',
    backgroundColor: '#333'
  },
  buttonText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    color: '#FFF'
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  containerImage: {
    width: 150,
    height: 150,
    padding: 20,
    alignItems: 'center',
  }
}

const s = {
  content: {
    padding: 20,
    marginTop: 10,
    marginBottom: 20
  },
  content__subheading: {
    fontSize: 16,
    fontWeight: '600'
  },
  content__heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  content__check: {
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content__checkSource: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content__checkRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  content__checkImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  content__checkText: {
    marginLeft: 15,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: '800'
  },
  content__checkTextSub: {
    marginLeft: 15,
    fontSize: 12,
    color: '#666',
    marginRight: 5
  }
}

module.exports = OrderState;
