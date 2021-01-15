import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      user: [],
      carts: []
    };

    this.fetch()
  }

  componentDidMount() {
    // console.log('params')
    const { params } = this.props.navigation.state;
    console.log(params);
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.fetch()
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  fetch() {
    AsyncStorage.getItem('user')
    .then((response) => {
      this.setState({
        user: JSON.parse(response)
      })
      if (this.state.user.id) {
        fetch(`http://0.0.0.0:8085/v1/api/carts?sign=` + this.state.user.token, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData) {
            this.setState({
              carts: responseData
            })
          }
        })
        .catch((error) => {
          console.log('err: ', error)
        })
        .done()
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .done();
  }

  setProductNumber(id, sum, state) {
    fetch(`https://taupd.ferer.net/v1/api/carts?submit=update&product_type=business&id=${ id }&product_number=${ sum }&state=${ state }&sign=${ this.state.user.token }`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData) {
        this.fetch()
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done()
  }

  setProductAllActive (active) {
    var carts = this.state.carts
    for (var i = 0; i < carts.length; i++) {
      carts[i].active = !active ? true : false
    }

    this.setState({
      carts
    })

    this.allActive()
  }

  setProductActive (key, cart_id) {
    var carts = this.state.carts
    carts[key].active = !carts[key].active
    this.setState({
      carts
    })

    this.allActive()
  }

  allActive () {
    var carts = this.state.carts, active = 0
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].active) {
        ++ active
      }
    }

    if (active == carts.length) {
      this.setState({
        active: true
      })
    } else {
      this.setState({
        active: false
      })
    }
  }

  orderAccount () {
    var cart_id = []
    for (var i = 0; i < this.state.carts.length; i++) {
      if (this.state.carts[i].active) {
        cart_id.push(this.state.carts[i].cart_id)
      }
    }

    if (cart_id.length) {
      this.props.navigation.navigate('ConfirmOrder', { cart_id: cart_id.toString() })
    } else {
      Alert.alert('提示', '您尚未勾选商品')
    }
  }

  render() {
    return (
      <>
        <ScrollView>
          {
            this.state.carts.map((item, key) => {
              return (
                <View style={styles.cartbox}>
                  <View style={styles.cartboxImageCon}>
                    <TouchableHighlight
                      activeOpacity={0.85}
                      underlayColor="none"
                      onPress={() => { this.setProductActive(key, item.cart_id) }}
                    >
                      <Ionicons name={item.active ? 'checkmark-circle-outline' : 'ellipse-outline'} size={22} color={item.active ? 'rgb(255, 140, 57)' : '#AAA'} />
                    </TouchableHighlight>
                    <Image resizeMode='cover' style={styles.cartboxImage} source={{uri: item.product_image}} />
                  </View>
                  <View style={styles.cartboxCon}>
                    <View style={styles.cartboxConHead}>
                      <Text allowFontScaling={false} style={styles.cartboxConTitle} numberOfLines={2}>{item.product_name}</Text>
                      <Text allowFontScaling={false} style={styles.cartboxConDetail}></Text>
                    </View>
                    <View style={styles.cartboxConFoot}>
                      <Text allowFontScaling={false} style={styles.cartboxConPrice}>¥{item.product_business_price}</Text>
                      <View style={styles.cartboxConFootSum}>
                        <TouchableHighlight
                          activeOpacity={0.85}
                          underlayColor="none"
                          onPress={() => { this.setProductNumber(item.cart_id, item.product_number, 'remove') }}
                        >
                          <Ionicons name={'remove-outline'} size={18} style={styles.cartboxConFootSumIcon} />
                        </TouchableHighlight>
                        <Text style={styles.cartboxConFootSumText}>{item.product_number}</Text>
                        <TouchableHighlight
                          activeOpacity={0.85}
                          underlayColor="none"
                          onPress={() => { this.setProductNumber(item.cart_id, item.product_number, 'add') }}
                        >
                          <Ionicons name={'add-outline'} size={18} style={styles.cartboxConFootSumIcon} />
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
        <View style={styles.cartboxTool}>
          <TouchableHighlight
            activeOpacity={0.85}
            underlayColor="none"
            style={styles.cartboxToolRow}
            onPress={() => { this.setProductAllActive(this.state.active) }}
          >
            <>
              <Ionicons name={this.state.active ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={this.state.active ? 'rgb(255, 140, 57)' : '#AAA'} />
              <Text allowFontScaling={false} style={styles.cartboxToolAll} numberOfLines={1}>{this.state.active ? '取消全选' : '全选'}</Text>
            </>
          </TouchableHighlight>
          <View style={styles.cartboxToolRow}>
            <Text allowFontScaling={false} style={styles.cartboxToolAll} numberOfLines={1}></Text>
            <TouchableHighlight
              activeOpacity={0.85}
              underlayColor="none"
              style={styles.cartboxToolButton}
              onPress={() => { this.orderAccount() }}
            >
              <Text allowFontScaling={false} style={{fontSize: 14, fontWeight: '500', color: '#FFF'}}>结算</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
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
  cartbox: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
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
    marginLeft: 10,
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
  cartboxConDetail: {
    marginTop: 5,
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
  cartboxConFootSum: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8
  },
  cartboxConFootSumIcon: {
    width: 30,
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
  },
  cartboxConFootSumText: {
    borderColor: '#CCC',
    textAlign: 'center',
    borderWidth: 1,
    width: 35,
    height: 30,
    lineHeight: 28,
  },
  cartboxTool: {
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
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
    marginLeft: 8
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

module.exports = Cart;
