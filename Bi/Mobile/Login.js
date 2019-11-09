import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  AsyncStorage,
  RefreshControl,
  KeyboardAvoidingView,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

class Login extends React.Component {
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
          }}>登录</Text>
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
      mobile: "",
      password: "",
      smsCode: "",
      status: 'phone',
      smsCodeStatus: false
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  sendSms() {
    fetch(`http://47.94.150.170:8080/v1/user/sendSms`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone": this.state.mobile
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.data)
      if (responseData.data.Code == 200) {
        this.setState({
          smsCodeStatus: true
        })
      } else {
        Alert.alert(
          `提示`,
          responseData.data.Message,
          [
            {text: '确定'}
          ]
        );
        this.setState({
          smsCodeStatus: false
        })
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchLogin() {
    fetch(`http://47.94.150.170:8080/v1/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone": this.state.mobile,
        "password": this.state.password,
        "smsCode": this.state.smsCode
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(JSON.stringify(responseData.data.Data));
      if (responseData.data.Code == 200) {
        AsyncStorage.setItem('loginfo', JSON.stringify(responseData.data.Data));
        this.props.navigation.goBack();
        // this.props.navigation.state.params.refresh();
      } else {
        Alert.alert(
          `提示`,
          responseData.data.Message,
          [
            {text: '确定'}
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        {
          this.state.status == 'phone' ? (
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                keyboardVerticalOffset={200}
              >
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="请输入手机号"
                  clearButtonMode="while-editing"
                  keyboardType="numeric"
                  defaultValue=""
                  placeholderTextColor="#CCC"
                  onChangeText={(params) => {
                    this.setState({
                      mobile: params
                    });
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="请输入密码"
                  clearButtonMode="while-editing"
                  password={true}
                  defaultValue=""
                  placeholderTextColor="#CCC"
                  secureTextEntry
                  onChangeText={(params) => {
                    this.setState({
                      password: params
                    });
                  }}
                  onSubmitEditing={this.fetchLogin.bind(this)}
                />
                <View style={styles.textSubmitFoot}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    style={{backgroundColor: '#04c2ad', padding: 10, borderRadius: 20}}
                    onPress={() => {
                      this.fetchLogin()
                    }}
                  >
                    <>
                      <Text allowFontScaling={false} numberOfLines={1} style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        marginHorizontal: 16
                      }}>登录</Text>
                    </>
                  </TouchableHighlight>
                  <Text onPress={() => {
                    this.setState({
                      status: 'sms'
                    })
                  }}>短信登录</Text>
                </View>
              </KeyboardAvoidingView>
            </View>
          ) : (
            <View style={styles.container}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                keyboardVerticalOffset={120}
              >
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="请输入手机号"
                  clearButtonMode="while-editing"
                  keyboardType="numeric"
                  defaultValue=""
                  placeholderTextColor="#CCC"
                  onChangeText={(params) => {
                    this.setState({
                      mobile: params
                    });
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  style={[styles.textInput, {opacity: this.state.smsCodeStatus ? 1 : 0}]}
                  placeholder="请输入验证码"
                  editable={this.state.smsCodeStatus}
                  clearButtonMode="while-editing"
                  defaultValue=""
                  placeholderTextColor="#CCC"
                  onChangeText={(params) => {
                    this.setState({
                      smsCode: params
                    });
                  }}
                  onSubmitEditing={this.fetchLogin.bind(this)}
                />
                <View style={styles.textSubmitFoot}>
                  <TouchableHighlight
                    underlayColor='transparent'
                    style={{backgroundColor: '#04c2ad', padding: 10, borderRadius: 20, display: this.state.smsCodeStatus ? 'none' : 'flex'}}
                    onPress={() => {
                      this.sendSms()
                    }}
                  >
                    <>
                      <Text allowFontScaling={false} numberOfLines={1} style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        marginHorizontal: 16
                      }}>获取验证码</Text>
                    </>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor='transparent'
                    style={{backgroundColor: '#04c2ad', padding: 10, borderRadius: 20, display: this.state.smsCodeStatus ? 'flex' : 'none'}}
                    onPress={() => {
                      this.fetchLogin()
                    }}
                  >
                    <>
                      <Text allowFontScaling={false} numberOfLines={1} style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        marginHorizontal: 16
                      }}>登录</Text>
                    </>
                  </TouchableHighlight>
                  <Text onPress={() => {
                    this.setState({
                      status: 'phone'
                    })
                  }}>密码登录</Text>
                </View>
              </KeyboardAvoidingView>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    color: '#111',
    borderWidth: 1,
    padding: 12,
    margin: 20,
    height: 43,
    borderRadius: 12,
    textAlign: 'center'
  },
  textSubmitFoot: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
}

module.exports = Login;
