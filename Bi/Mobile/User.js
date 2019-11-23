import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.fetchLoginfo()
    });
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
          <StatusBar backgroundColor="#03d2a6" barStyle="light-content" />
          <View style={styles.backgroundSwiper}></View>
          <TouchableHighlight
            style={styles.userContainer}
            underlayColor="#03d2a6"
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
                  this.props.navigation.navigate('RecordsRedEnvelopes', {account: this.state.loginfo.Address})
                }}
              >
                <View style={styles.blockRows}>
                  <Ionicons
                    name={'ios-paper'}
                    size={30}
                    style={{marginTop: 10, marginBottom: 10, color: '#1052fa'}}
                  />
                  <Text allowFontScaling={false} style={[styles.text, {color: '#1052fa'}]}>{I18n.t('my.record')}</Text>
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
                    style={{marginTop: 10, marginBottom: 10, color: 'rgb(255, 50, 50)'}}
                  />
                  <Text allowFontScaling={false} style={[styles.text, {color: 'rgb(255, 50, 50)'}]}>{I18n.t('my.receive')}</Text>
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
                    style={{marginTop: 10, marginBottom: 10, color: '#18bba9'}}
                  />
                  <Text allowFontScaling={false} style={[styles.text, {color: '#18bba9'}]}>{I18n.t('my.message')}</Text>
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
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.scanning')}</Text>
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
                  this.props.navigation.navigate('Web', {title: I18n.t('my.agreement'), uri: 'http://47.94.150.170/html/useragreement.html'})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.agreement')}</Text>
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
                onPress={() => {
                  this.props.navigation.navigate('Web', {title: I18n.t('my.clause'), uri: 'http://47.94.150.170/html/privacy.html'})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.clause')}</Text>
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
                onPress={() => {
                  this.props.navigation.navigate('Web', {title: I18n.t('my.legal'), uri: 'http://47.94.150.170/html/legal.html'})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.legal')}</Text>
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
                onPress={() => {
                  this.props.navigation.navigate('Web', {title: I18n.t('my.help'), uri: 'http://47.94.150.170/html/help.html'})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.help')}</Text>
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
                onPress={() => {
                  this.props.navigation.navigate('Web', {title: I18n.t('my.about'), uri: 'http://47.94.150.170/html/about.html'})
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.about')}</Text>
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
                  this.props.navigation.navigate('UserDetails', { address: this.state.loginfo.Address })
                }}
              >
                <View style={styles.listRows}>
                  <Text allowFontScaling={false} style={styles.text}>{I18n.t('my.set')}</Text>
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
          contentContainerStyle={[{padding: 10, display: 'flex', justifyContent: 'space-between', flex: 1}]}
        >
          <View style={styles.containerLogo}>
            <Image style={styles.logo} source={require('../imgs/logo.png')} />
            <Text style={styles.logoDec}>{I18n.t('my.welcome')}</Text>
          </View>
          <View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#04c2ad', padding: 13, borderRadius: 0, marginBottom: 20}}
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <>
                <Text allowFontScaling={false} numberOfLines={1} style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginHorizontal: 16
                }}>{I18n.t('my.login')}</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#797979', padding: 13, borderRadius: 0, marginBottom: 20}}
              onPress={() => {
                this.props.navigation.navigate('Register')
              }}
            >
              <>
                <Text allowFontScaling={false} numberOfLines={1} style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginHorizontal: 16
                }}>{I18n.t('my.register')}</Text>
              </>
            </TouchableHighlight>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20%',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10
  },
  logoDec: {
    fontSize: 14
  },
  backgroundSwiper: {
    position: 'absolute',
    backgroundColor: '#03d2a6',
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
    backgroundColor: '#03d2a6',
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
