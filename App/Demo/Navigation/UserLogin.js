import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
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

class UserLogin extends React.Component {
  static navigationOptions ({ navigation, screenProps }) {
    const { params } = navigation.state;

    return {
      headerTitle: (
        <Text allowFontScaling={false} numberOfLines={1} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(0, 0, 0, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>登录</Text>
      )
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: "17725386753",
      password: ""
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  fetchLogin() {
    fetch(`https://taupd.ferer.net/v1/api/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phone": this.state.phone,
        "password": this.state.password
      })
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.id) {
        console.log(responseData);
        console.log(this.props.navigation.state.params);
        AsyncStorage.setItem('user', JSON.stringify(responseData));
        this.props.navigation.goBack();
        this.props.navigation.state.params.refresh();
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
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            keyboardVerticalOffset={10}
          >
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>手机号</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="请输入手机号"
                clearButtonMode="while-editing"
                keyboardType="numeric"
                defaultValue={this.state.phone}
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    phone: params
                  });
                }}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text allowFontScaling={false}>密码</Text>
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
            </View>
            <View style={styles.textSubmitFoot}>
              <TouchableHighlight
                underlayColor='transparent'
                style={{backgroundColor: '#5e5e5e', padding: 10, borderRadius: 20}}
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
            </View>
          </KeyboardAvoidingView>
        </View>
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
    padding: 10,
    width: '100%'
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    color: '#111',
    borderWidth: 1,
    padding: 12,
    height: 43,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 12,
    color: '#111',
    textAlign: 'center'
  },
  textSubmitFoot: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 30
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10
  },
  logoDec: {
    fontSize: 14
  },
}

module.exports = UserLogin;
