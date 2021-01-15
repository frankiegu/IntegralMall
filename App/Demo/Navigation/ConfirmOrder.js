import React, { Component, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import faker from 'faker';
import {
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

class ConfirmOrder extends React.PureComponent {
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
          }}>确认订单</Text>
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
      user: null,
      check: null,
      confirm: null,
      params: this.props.navigation.state.params
    };

    AsyncStorage.getItem('user')
    .then((response) => {
      this.setState({
        user: JSON.parse(response)
      })

      this.fetch(this.state.params.cart_id)
    })
    .catch((error) => {
      console.log(error);
    })
    .done();
  }

  fetch (cart_id) {
    fetch(`https://taupd.ferer.net/v1/api/carts/confirm?cart_id=${ cart_id }&sign=${ this.state.user.token }`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        confirm: responseData
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  setCheck (key) {
    this.setState({
      check: key
    })

    this.closeModal()
  }

  submitOrder () {
    fetch(`http://0.0.0.0:8085/v1/api/carts/submit`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sign: this.state.user.token,
        confirm: this.state.confirm
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(`http://0.0.0.0:8085/mobile/user/order/pay?id=${ responseData[0] }&sign=${ this.state.user.token }`)
      this.props.navigation.navigate('Web', { title: '支付订单', uri: `http://0.0.0.0:8085/mobile/user/order/pay?id=${ responseData[0] }&sign=${ this.state.user.token }` })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  modal = React.createRef();

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  }

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  }

  renderContent = () => {
    return (
      <View style={s.content}>
        <Text style={s.content__heading}>选择收货地址</Text>
        {
          this.state.confirm.user.user_address.map((item, key) => {
            return (
              <TouchableHighlight
                key={key}
                style={[styles.address, {backgroundColor: '#EEE', marginLeft: 0, marginRight: 0}]}
                underlayColor="none"
                onPress={() => {
                  this.setCheck(key)
                }}
              >
                <>
                  <View style={styles.flexBetween}>
                    <Text allowFontScaling={false} style={styles.cartboxConTitle} numberOfLines={1}>{item.name} {item.phone}</Text>
                    <Ionicons name={'chevron-forward-outline'} size={18} color='#AAA' style={{top: 0.5}} />
                  </View>
                  <Text allowFontScaling={false} style={styles.conDetailMeta} numberOfLines={2}>{(item.check == 'on' ? '[默认地址] ' : '') + item.address.province + item.address.city + item.address.county} {item.detail}</Text>
                </>
              </TouchableHighlight>
            )
          })
        }
        <Text style={s.content__heading}></Text>
        <Text style={s.content__heading}></Text>
      </View>
    );
  }

  render() {
    if (!this.state.confirm) {
      return (
        <></>
      )
    } else {
      return (
        <>
          <ScrollView>
            {
              this.state.confirm.user.user_address.map((item, key) => {
                if (this.state.check == null && item.check == 'on') {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={styles.address}
                      underlayColor="none"
                      onPress={() => {
                        this.openModal()
                      }}
                    >
                      <>
                        <View style={styles.flexBetween}>
                          <Text allowFontScaling={false} style={styles.cartboxConTitle} numberOfLines={1}>{item.name} {item.phone}</Text>
                          <Ionicons name={'chevron-forward-outline'} size={18} color='#AAA' style={{top: 0.5}} />
                        </View>
                        <Text allowFontScaling={false} style={styles.conDetailMeta} numberOfLines={2}>{(item.check == 'on' ? '[默认地址] ' : '') + item.address.province + item.address.city + item.address.county} {item.detail}</Text>
                      </>
                    </TouchableHighlight>
                  )
                } else if (this.state.check == key) {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={styles.address}
                      underlayColor="none"
                      onPress={() => {
                        this.openModal()
                      }}
                    >
                      <>
                        <View style={styles.flexBetween}>
                          <Text allowFontScaling={false} style={styles.cartboxConTitle} numberOfLines={1}>{item.name} {item.phone}</Text>
                          <Ionicons name={'chevron-forward-outline'} size={18} color='#AAA' style={{top: 0.5}} />
                        </View>
                        <Text allowFontScaling={false} style={styles.conDetailMeta} numberOfLines={2}>{(item.check == 'on' ? '[默认地址] ' : '') + item.address.province + item.address.city + item.address.county} {item.detail}</Text>
                      </>
                    </TouchableHighlight>
                  )
                }
              })
            }
            <View style={styles.cartboxs}>
            {
              this.state.confirm.carts.map((item, key) => {
                return (
                  <View key={key} style={[styles.cartbox, key > 0 ? {marginTop: 10, paddingTop: 10, borderColor: 'rgba(204, 204, 204, 0.3)', borderTopWidth: 1} : {}]} key>
                    <View style={styles.cartboxImageCon}>
                      <Image resizeMode='cover' style={styles.cartboxImage} source={{uri: item.product_image}} />
                    </View>
                    <View style={styles.cartboxCon}>
                      <View style={styles.cartboxConHead}>
                        <Text allowFontScaling={false} style={styles.cartboxConTitle} numberOfLines={2}>{item.product_name}</Text>
                        <Text allowFontScaling={false} style={styles.conDetailMeta} numberOfLines={1}>默认参数</Text>
                      </View>
                      <View style={styles.cartboxConFoot}>
                        <Text allowFontScaling={false} style={styles.cartboxConPrice}>¥{item.product_business_price}</Text>
                        <Text style={styles.cartboxConFootSumText}>×{item.product_number}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
            </View>
            <View style={styles.rows}>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.rowText} numberOfLines={1}>配送方式</Text>
                <Text allowFontScaling={false} style={styles.rowTextMeta} numberOfLines={1}>快递免邮</Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.rowText} numberOfLines={1}>退换订单</Text>
                <Text allowFontScaling={false} style={styles.rowTextMeta} numberOfLines={1}>-</Text>
              </View>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.rowText} numberOfLines={1}>开具发票</Text>
                <Text allowFontScaling={false} style={styles.rowTextMeta} numberOfLines={1}>-</Text>
              </View>
              <View style={[styles.row, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                <Text allowFontScaling={false} style={styles.rowText} numberOfLines={1}>订单备注</Text>
                <TextInput
                  style={styles.input}
                  placeholder='内容选填，请提前与平台协商一致'
                  multiline={true}
                  onChangeText={(text)=>{
                     this.setState({
                       searchText: text
                     })
                  }} />
              </View>
            </View>
            <View style={styles.rows}>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.rowText} numberOfLines={1}>金币抵扣</Text>
                <Ionicons name={'ellipse-outline'} size={20} color='#AAA' style={{position: 'absolute', top: -4, right: 0}} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.cartboxTool}>
            <Text allowFontScaling={false} numberOfLines={1}>共{this.state.confirm.order.count}件，实付款：¥{this.state.confirm.order.price}</Text>
            <View style={styles.cartboxToolRow}>
              <TouchableHighlight
                style={styles.cartboxToolButton}
                onPress={() => {
                  this.submitOrder()
                }}
              >
                <Text allowFontScaling={false} style={{fontSize: 14, fontWeight: '500', color: '#FFF'}}>提交订单</Text>
              </TouchableHighlight>
            </View>
          </View>
          <Modalize ref={this.modal} adjustToContentHeight scrollViewProps={{
              showsVerticalScrollIndicator: false
            }}>
            {this.renderContent()}
          </Modalize>
        </>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  flexBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // address
  address: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  // cartboxs
  cartboxs: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginBottom: 0,
    backgroundColor: '#FFF'
  },
  cartbox: {
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  cartboxImageCon: {
    // elevation: 0.1,
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartboxImage: {
    width: 85,
    height: 85,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'rgba(204, 204, 204, 0.3)',
  },
  cartboxCon: {
    flex: 1,
    height: 85,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cartboxConTitle: {
    fontSize: 14,
    fontWeight: '600'
  },
  conDetailMeta: {
    marginTop: 3,
    color: '#666'
  },
  cartboxConPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red'
  },
  cartboxConFoot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  cartboxConFootSumText: {
    textAlign: 'center',
    width: 35,
    fontWeight: '600'
  },
  // rows
  rows: {
    borderRadius: 10,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 10,
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    overflow: 'hidden'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingBottom: 15,
    borderColor: 'rgba(196, 196, 196, 0.3)',
    borderBottomWidth: 0.5
  },
  rowText: {
    fontSize: 14,
    fontWeight: '400',
  },
  rowTextMeta: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555'
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    height: 80,
    lineHeight: 20,
    width: '100%',
    textAlignVertical: 'top',
    backgroundColor: 'rgba(224, 222, 222, 0.3)'
  },
  // cartboxTool
  cartboxTool: {
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10 + 20,
    paddingRight: 20,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartboxToolAll: {
    marginLeft: 10
  },
  cartboxToolRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartboxToolButton: {
    backgroundColor: '#ff3636',
    paddingTop: 8,
    paddingLeft: 15,
    paddingBottom: 8,
    paddingRight: 15,
    marginLeft: 10,
  }
}

const s = {
  content: {
    padding: 20,
  },

  content__icon: {
    width: 32,
    height: 32,

    marginBottom: 20,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },

  content__heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666',
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 20,

    width: '100%',

    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#cdcdcd',
    borderRadius: 6,
  },

  content__button: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 15,
  },

  content__buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
};

module.exports = ConfirmOrder;
