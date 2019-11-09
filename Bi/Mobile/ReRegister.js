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
  ActivityIndicator,
  KeyboardAvoidingView,
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
          }}>注册</Text>
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
      password: null,
      smsCode: null,
    };
  }

  registered() {
    fetch(`http://47.94.150.170:8080/v1/user/registered`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone": this.props.navigation.state.params.phone,
        "password": this.state.password,
        "smsCode": this.state.smsCode
      })
    })
    .then(response => response.json())
    .then(responseData => {
      Alert.alert(
        `提示`,
        responseData.data.Message,
        [
          {text: '确定'}
        ]
      );
      if (responseData.data.Code == 200) {
        AsyncStorage.setItem('registerinfo', JSON.stringify(responseData.data.Data));
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
          <KeyboardAvoidingView
            behavior="padding"
            style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-around'}}
            keyboardVerticalOffset={60}
          >
          <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="请输入手机号"
              clearButtonMode="while-editing"
              keyboardType="numeric"
              defaultValue=""
              placeholderTextColor="#CCC"
              editable={false}
              value={this.props.navigation.state.params.phone}
            />
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="请输入密码"
              clearButtonMode="while-editing"
              keyboardType="numeric"
              defaultValue=""
              placeholderTextColor="#CCC"
              secureTextEntry
              onChangeText={(params) => {
                this.setState({
                  password: params
                });
              }}
            />
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="请输入验证码"
              clearButtonMode="while-editing"
              keyboardType="numeric"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  smsCode: params
                });
              }}
            />
          </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#04c2ad', padding: 10, borderRadius: 20}}
              onPress={() => {
                this.registered()
              }}
            >
              <>
                <Text allowFontScaling={false} numberOfLines={1} style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginHorizontal: 16
                }}>创建账户</Text>
              </>
            </TouchableHighlight>
          </KeyboardAvoidingView>
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
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    color: '#111',
    borderWidth: 1,
    padding: 12,
    margin: 20,
    borderRadius: 12,
    textAlign: 'center',
    height: 43,
  }
}

module.exports = Login;
