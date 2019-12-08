import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  StatusBarManager,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
  Platform,
  TextInput,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

class UnionPay extends React.Component {
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
          }}>{I18n.t('unionpay.title')}</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10, display: 'none'}}
        underlayColor='transparent'
        onPress={() => {
          navigation.navigate('Receivables')
        }}
      >
        <Ionicons
          name={'md-qr-scanner'}
          size={24}
        />
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
      addr: this.props.navigation.state.params.account,
      userName: null,
      bankNumber: null,
      bank: null,
      openAddr: null,
      statusLoading: false
    };
  }

  fetch() {
    this.setState({
      statusLoading: true
    });

    console.log(JSON.stringify({
      "addr": this.state.addr,
      "userName": this.state.userName,
      "bankNumber": this.state.bankNumber,
      "bank": this.state.bank,
      "openAddr": this.state.openAddr
    }));

    fetch(`http://47.94.150.170:8080/v1/user/putBankCard`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.state.addr,
        "userName": this.state.userName,
        "bankNumber": this.state.bankNumber,
        "bank": this.state.bank,
        "openAddr": this.state.openAddr
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        statusLoading: false
      });
      if (responseData.data.Code == 500) {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt'),
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt')
            }
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
      this.setState({
        statusLoading: false
      })
    })
    .done();
  }

  render() {
    if (!this.state.status) {
      return (
        <ScrollView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={[styles.container, {padding: 10}]}>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('wechat.username')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    userName: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('unionpay.number')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                keyboardType="ascii-capable"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    bankNumber: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('unionpay.bank')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                keyboardType="ascii-capable"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    bank: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('unionpay.openAddr')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                keyboardType="ascii-capable"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    openAddr: params
                  });
                }}
              />
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={styles.touchableHighlight}
              onPress={() => { this.fetch() }}
            >
              <>
                <Text allowFontScaling={false} numberOfLines={1} style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginHorizontal: 16
                }}>{I18n.t('transfer.prompt')}</Text>
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
    flex: 1,
  },
  textForm: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 20
  },
  textInput: {
    marginTop: 20,
    textAlign: 'left',
    color: '#000',
  },
  behavior: {

  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerMain: {
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
  footerMainNumber: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  footerMainCoin: {
    fontSize: 28,
    marginRight: 5,
    height: 30
  },
  footerMainText: {
    fontSize: 14,
  },
  footerMainList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45
  },
  footerMainSubTitleRight: {
    width: '70%',
    textAlign: 'right'
  },
  touchableHighlight: {
    backgroundColor: '#1052fa',
    padding: 13,
    borderRadius: 0,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageView: {
    marginTop: 15,
    width: '100%',
    height: 170,
    borderColor: '#6c6c6c',
    borderWidth: 1,
  },
  imageViewText: {
    lineHeight: 168,
    height: 168,
    textAlign: 'center',
    width: '100%',
  }
}

module.exports = UnionPay;
