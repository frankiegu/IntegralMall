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
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';

class Information extends React.Component {
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
          }}>{I18n.t('my.information')}</Text>
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
      alipay: null,
      wechat: null,
      unionpay: null
    };

    this.fetch()
  }

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.address,
        "state": "0"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        alipay: responseData.data.Data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();

    console.log(JSON.stringify({
      "addr": this.props.navigation.state.params.address,
      "state": "1"
    }));
    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.address,
        "state": "1"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        wechat: responseData.data.Data
      })
      console.log(responseData.data);
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();

    fetch(`http://47.94.150.170:8080/v1/user/getPay`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": this.props.navigation.state.params.address,
        "state": "2"
      })
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        unionpay: responseData.data.Data
      })
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  renderAlipay() {
    return <View style={styles.slide}>
      <Image style={styles.image} source={{uri: this.state.alipay.AliPayImg}} />
      <View style={styles.texts}>
        <Text style={styles.text}>{this.state.alipay.UserName} {this.state.alipay.AliPayID}</Text>
        <Text style={styles.text}>{I18n.t('information.alipay')}</Text>
      </View>
    </View>
  }

  renderWeChat() {
    return <View style={styles.slide}>
      <Image style={styles.image} source={{uri: this.state.wechat.WeChatImg}} />
      <View style={styles.texts}>
        <Text style={styles.text}>{this.state.wechat.UserName} {this.state.wechat.WeChatID}</Text>
        <Text style={styles.text}>{I18n.t('information.wechat')}</Text>
      </View>
    </View>
  }

  renderUnionPay() {
    return <View style={styles.slide}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../imgs/bank.png')} />
        <Text style={styles.logoDec}>{this.state.unionpay.Bank}</Text>
      </View>
      <View style={styles.textForm}>
        <Text>{I18n.t('wechat.username')}</Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          editable={false}
          clearButtonMode="while-editing"
          defaultValue={this.state.unionpay.UserName}
          placeholderTextColor="#CCC"
        />
      </View>
      <View style={styles.textForm}>
        <Text>{I18n.t('unionpay.number')}</Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          editable={false}
          clearButtonMode="while-editing"
          defaultValue={this.state.unionpay.BankNumber}
          placeholderTextColor="#CCC"
        />
      </View>
      <View style={styles.textForm}>
        <Text>{I18n.t('unionpay.openAddr')}</Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          editable={false}
          clearButtonMode="while-editing"
          defaultValue={this.state.unionpay.OpenAddr}
          placeholderTextColor="#CCC"
        />
      </View>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ViewSwiper>
          {this.state.wechat != null ? this.renderWeChat() : null}
          {this.state.alipay != null ? this.renderAlipay() : null}
          {this.state.unionpay != null ? this.renderUnionPay() : null}
        </ViewSwiper>
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
  image: {
    width: '100%',
    height: '83%'
  },
  texts: {
    margin: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  },
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 40,
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
}

module.exports = Information;
