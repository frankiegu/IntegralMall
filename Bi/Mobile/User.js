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
  Platform,
  SectionList,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loginfo: [],
    };

    this.fetchLoginfo()
  }

  componentDidMount() {
    var self = this;
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.fetchLoginfo()
    });

    // DeviceEventEmitter.emit('homeFetch');
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  fetchLoginfo() {
    AsyncStorage.getItem('loginfo')
    .then((response) => {
      this.setState({
        loginfo: JSON.parse(response)
      })
    })
    .catch((error) => {
      this.setState({
        loginfo: null
      })
    })
    .done();
  }

  render() {
    if (this.state.loginfo) {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <View style={styles.backgroundSwiper}></View>
          <TouchableHighlight
            style={styles.userContainer}
            underlayColor="#1e88e5"
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('UserDetails', { address: this.state.loginfo.Address })
            }}
          >
            <View style={styles.userInfo}>
              <Ionicons
                name={'md-person'}
                size={30}
                color="#FFF"
              />
              <Text allowFontScaling={false} style={styles.userInfotext}>{this.state.loginfo.Phone}</Text>
              <Text allowFontScaling={false} style={styles.userInfoSubtext} numberOfLines={1}>{this.state.loginfo.Address}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.container}>
            <View style={styles.blocks}>
              <TouchableHighlight
                style={styles.block}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
                onPress={() => {

                }}
              >
                <View style={styles.blockRows}>
                  <Ionicons
                    name={'ios-paper'}
                    size={30}
                    style={{marginTop: 10, marginBottom: 10}}
                  />
                  <Text allowFontScaling={false} style={styles.text}>地址簿</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.block, {marginLeft: 10, marginRight: 10}]}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
                onPress={() => {
                  this.props.navigation.navigate('GrabRedEnvelopes', {account: this.state.loginfo.Address})
                }}
              >
                <View style={styles.blockRows}>
                  <Ionicons
                    name={'md-heart'}
                    size={30}
                    style={{marginTop: 10, marginBottom: 10}}
                  />
                  <Text allowFontScaling={false} style={styles.text}>领红包</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.block}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
                onPress={() => {
                  this.props.navigation.navigate('Message')
                }}
              >
                <View style={styles.blockRows}>
                  <Ionicons
                    name={'md-notifications-outline'}
                    size={30}
                    style={{marginTop: 10, marginBottom: 10}}
                  />
                  <Text allowFontScaling={false} style={styles.text}>消息</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.lists}>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
                onPress={() => {
                  this.props.navigation.navigate('RecordsRedEnvelopes', {account: this.state.loginfo.Address})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>红包记录</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.lists}>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
                onPress={() => {
                  this.props.navigation.navigate('Receivables', {address: this.state.loginfo.Address})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>扫描二维码</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.lists}>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>使用设置</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>用户协议</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>帮助中心</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>用户反馈</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.list}
                underlayColor="rgba(255, 255, 255, 1)"
                activeOpacity={1}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>关于我们</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <View style={styles.backgroundSwiper}></View>
          <TouchableHighlight
            style={styles.userContainer}
            underlayColor="#1e88e5"
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('Login')
            }}
          >
            <View style={styles.userInfo}>
              <Text allowFontScaling={false} style={styles.userInfotext}>登录</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.userContainer}
            underlayColor="#1e88e5"
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('Register')
            }}
          >
            <View style={styles.userInfo}>
              <Text allowFontScaling={false} style={styles.userInfotext}>注册</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  backgroundSwiper: {
    position: 'absolute',
    backgroundColor: '#1e88e5',
    top: -Dimensions.get('window').width * 1.4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.85,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1e88e5',
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfotext: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  userInfoSubtext: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    width: '85%',
    textAlign: 'center'
  },
  lists: {
    marginBottom: 10
  },
  listRows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockRows: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    position: 'relative',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.25)',
    // marginBottom: -1,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 14,
    overflow: 'hidden'
  },
  textRight: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    width: 200,
    overflow: 'hidden'
  },
  blocks: {
    margin: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  block: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#FFF'
  }
}

module.exports = User;
