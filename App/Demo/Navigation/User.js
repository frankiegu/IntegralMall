import React, { Component } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from './assets/Icons';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  SectionList,
  RefreshControl,
  AsyncStorage,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      user: [],
      number: [
        {
          text: '积分'
        },
        {
          text: '悦豆'
        },
        {
          text: '收藏'
        },
        {
          text: '喜欢'
        },
        {
          text: '浏览'
        }
      ],
      order: {
        payment: [
          {
            text: '待付款',
            img: Icon.waitPayment
          },
          {
            text: '待发货',
            img: Icon.sendGoods
          },
          {
            text: '待收货',
            img: Icon.deliveryGoods
          },
          {
            text: '售后',
            img: Icon.service
          }
        ],
        lottery: [
          {
            text: '积分记录',
            img: Icon.integral
          },
          {
            text: '抢购记录',
            img: Icon.purchase
          },
          {
            text: '购中记录',
            img: Icon.winning
          },
          {
            text: '全部抢购',
            img: Icon.all
          }
        ]
      },
      rows: [
        {
          text: '我的地址',
          color: '#fff',
          backgroundColor: '#4b98fe',
          name: 'location-sharp',
          uri: 'https://taupd.ferer.net/mobile/user/address'
        },
        {
          text: '我的收藏',
          color: '#fff',
          backgroundColor: '#ffb000',
          name: 'star',
          uri: ''
        },
        {
          text: '反馈联络',
          color: '#fff',
          backgroundColor: '#20c160',
          name: 'chatbubbles',
          uri: 'https://taupd.ferer.net/mobile/user/feedback'
        },
        {
          text: '分享下载',
          color: '#fff',
          backgroundColor: '#fe4b52',
          name: 'arrow-redo',
          uri: 'https://taupd.ferer.net/mobile/user/address'
        },
        {
          text: '常见问题',
          color: '#fff',
          backgroundColor: '#2095c1',
          name: 'help-circle',
          size: 25,
          uri: 'https://taupd.ferer.net/mobile/user/address'
        },
        {
          text: '常见问题',
          color: '#fff',
          backgroundColor: '#9cc120',
          name: 'alert-circle',
          size: 25,
          style: { left: 1 },
          uri: 'https://taupd.ferer.net/mobile/user/address'
        },
        {
          text: '隐私',
          color: '#FFF',
          backgroundColor: '#ff6b00',
          name: 'shield-checkmark',
          uri: ''
        },
        {
          text: '设置',
          color: '#FFF',
          backgroundColor: '#666666',
          name: 'settings-sharp',
          uri: ''
        }
      ],
    };

    this.fetchLoginfo()
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.fetchLoginfo()
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  fetchLoginfo() {
    AsyncStorage.getItem('user')
    .then((response) => {
      this.setState({
        user: JSON.parse(response)
      })
    })
    .catch((error) => {
      this.setState({
        user: null
      })
    })
    .done();
  }

  render() {
    if (!this.state.user.id) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.85)"
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate('Login')
            }}
          >
            <>
              <Text allowFontScaling={false}>登录</Text>
            </>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <View style={styles.backgroundSwiper}></View>
          <View style={styles.userContainer}>
            <TouchableHighlight
              style={styles.userAvatarTouch}
              underlayColor="none"
              onPress={() => {
                this.props.navigation.navigate('Web', { title: '编辑个人信息', uri: `https://taupd.ferer.net/mobile/user/profile/${ this.state.user.id }/edit` })
              }}
            >
              <Image resizeMode='cover' style={styles.userAvatar} source={{uri: this.state.user.avator}} />
            </TouchableHighlight>
            <View style={styles.userInfo}>
              <Text style={styles.userInfotext}>{this.state.user.user_nickname}</Text>
              <View style={styles.userInfoSub}>
                <Text style={styles.userInfoSubtext}>{this.state.user.user_phone}</Text>
                <Text style={styles.userInfoSubtext}>青铜会员</Text>
              </View>
            </View>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconApps}>
              {
                this.state.number.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      underlayColor="none"
                    >
                      <>
                        <Text style={iconStyle.number}>{key}</Text>
                        <Text style={iconStyle.numberText}>{item.text}</Text>
                      </>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconHeader}>
              <Text style={iconStyle.iconHeaderText}>支付订单</Text>
              <View style={styles.textArrow}>
                <Text style={iconStyle.iconHeaderTextMore}>查看订单</Text>
                <Ionicons name={'chevron-forward-outline'} size={20} color='#AAA' />
              </View>
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.order.payment.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      underlayColor="none"
                    >
                      <>
                        <View style={iconStyle.iconCon}>
                          <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
                        </View>
                        <Text style={iconStyle.iconText}>{item.text}</Text>
                      </>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconHeader}>
              <Text style={iconStyle.iconHeaderText}>订购订单</Text>
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.order.lottery.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      underlayColor="none"
                    >
                      <>
                        <View style={iconStyle.iconCon}>
                          <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
                        </View>
                        <Text style={iconStyle.iconText}>{item.text}</Text>
                      </>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconHeader}>
              <Text style={iconStyle.iconHeaderText}>其他服务</Text>
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.rows.map((item, key) => {
                  if (key < 4) {
                    return (
                      <TouchableHighlight
                        key={key}
                        underlayColor="none"
                        onPress={() => {
                          this.props.navigation.navigate('Web', { title: item.text, uri: item.uri + '?sign=' + this.state.user.token })
                        }}
                      >
                        <>
                          <View style={[iconStyle.iconGround, {backgroundColor: item.backgroundColor}]}>
                            <Ionicons name={item.name} size={20} color={item.color} />
                          </View>
                          <Text style={iconStyle.iconText}>{item.text}</Text>
                        </>
                      </TouchableHighlight>
                    )
                  }
                })
              }
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.rows.map((item, key) => {
                  if (key > 3 && key < 8) {
                    return (
                      <TouchableHighlight
                        key={key}
                        underlayColor="none"
                        onPress={() => {
                          this.props.navigation.navigate('Web', { title: item.text, uri: item.uri + '?sign=' + this.state.user.token })
                        }}
                      >
                        <>
                          <View style={[iconStyle.iconGround, {backgroundColor: item.backgroundColor}]}>
                            <Ionicons name={item.name} size={20} color={item.color} style={item.style} />
                          </View>
                          <Text style={iconStyle.iconText}>{item.text}</Text>
                        </>
                      </TouchableHighlight>
                    )
                  }
                })
              }
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  containerScrollView: {
    position: 'relative',
    flex: 1
  },
  backgroundSwiper: {
    position: 'absolute',
    backgroundColor: '#ffd600',
    top: -Dimensions.get('window').width * 1.4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  userAvatarTouch: {

  },
  userAvatar: {
    marginRight: 10,
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  userInfo: {

  },
  userInfotext: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  userInfoSub: {
    flexDirection: 'row'
  },
  userInfoSubtext: {
    fontSize: 14,
    marginRight: 10,
    fontWeight: '400'
  },
  textArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}

module.exports = User;
