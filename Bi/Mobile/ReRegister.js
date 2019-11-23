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
          }}>{I18n.t('create.title')}</Text>
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
        I18n.t('alert.title'),
        responseData.data.Message,
        [
          {text: I18n.t('alert.prompt')}
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
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            keyboardVerticalOffset={10}
          >
          <View style={styles.containerLogo}>
            <Image style={styles.logo} source={require('../imgs/logo.png')} />
            <Text style={styles.logoDec}>{I18n.t('my.welcome')}</Text>
          </View>
          <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
            <View style={styles.textInputContainer}>
              <Text>{I18n.t('login.phone')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('login.phone_required')}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                defaultValue=""
                placeholderTextColor="#CCC"
                editable={false}
                value={this.props.navigation.state.params.phone}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Text>{I18n.t('login.password')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('login.password_required')}
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
            </View>
            <View style={styles.textInputContainer}>
              <Text>{I18n.t('login.verification')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('login.verification_required')}
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
                }}>{I18n.t('create.text')}</Text>
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
    marginBottom: 30,
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

module.exports = Login;
