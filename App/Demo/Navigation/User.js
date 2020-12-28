import React, { Component } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
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
      icons: [
        {
          text: '我的积分',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png'
        },
        {
          text: '我的豆子',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png'
        },
        {
          text: '购中记录',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png'
        },
        {
          text: '全部抢购',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
        }
      ],
      order: [
        {
          text: '全部',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png'
        },
        {
          text: '待付款',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png'
        },
        {
          text: '待发货',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png'
        },
        {
          text: '待收货',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
        }
      ],
      other: [
        {
          text: '我的地址',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png'
        },
        {
          text: '我的收藏',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png'
        },
        {
          text: '联系客服',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png'
        },
        {
          text: '常见问题',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
        },
        {
          text: '分享下载',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png'
        },
        {
          text: '垂询联络',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png'
        },
        {
          text: '蜗牛隐私',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png'
        },
        {
          text: '关于蜗牛',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
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
      console.log(this.state.user);
    })
    .catch((error) => {
      this.setState({
        user: null
      })
    })
    .done();
  }

  render() {
    if (this.state.user) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.85)"
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate('UserLogin')
            }}
          >
            <>
              <Text allowFontScaling={false}>登录</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.85)"
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate('Web', { title: '注册', uri: 'https://taupd.ferer.net/mobile/user/register' })
            }}
          >
            <>
              <Text allowFontScaling={false}>注册</Text>
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
              underlayColor="rgba(34, 26, 38, 0.5)"
            >
              <Image resizeMode='cover' style={styles.userAvatar} source={{uri: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19948/66/3191014/6800/7429b1fd/5ae0629dN6ea95c15.png'}} />
            </TouchableHighlight>
            <View style={styles.userInfo}>
              <Text style={styles.userInfotext}>你是神的一手安排</Text>
              <View style={styles.userInfoSub}>
                <Text style={styles.userInfoSubtext}>账号ID 801823842</Text>
                <Text style={styles.userInfoSubtext}>青铜会员</Text>
              </View>
            </View>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconHeader}>
              <Text style={iconStyle.iconHeaderText}>玩在蜗牛</Text>
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.icons.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={iconStyle.iconTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <>
                        <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
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
              <Text style={iconStyle.iconHeaderText}>蜗牛订单</Text>
            </View>
            <View style={iconStyle.iconApps}>
              {
                this.state.order.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={iconStyle.iconTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <>
                        <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
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
              <Text style={iconStyle.iconHeaderText}>其他信息</Text>
            </View>
            <View style={iconStyle.iconApps}>
              <FlatList
                data={this.state.other}
                horizontal={false}
                numColumns={4}
                columnWrapperStyle={styles.iconColumnStyle}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                  <TouchableHighlight
                  style={[iconStyle.iconTouch4, index > 3 ? iconStyle.iconTouchTop20 : '']}
                    underlayColor="rgba(34, 26, 38, 0.5)"
                  >
                    <>
                      <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
                      <Text style={iconStyle.iconText}>{item.text}</Text>
                    </>
                  </TouchableHighlight>
                }
              />
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
  }
}

module.exports = User;
