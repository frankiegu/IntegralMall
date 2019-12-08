import React, { Component } from 'react';
import iconStyle from './Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from './i18n/index';
import {
  Text,
  View,
  Image,
  Alert,
  Picker,
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

let PickerItem = Picker.Item

class Sell extends React.Component {
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
          }}>发起卖单</Text>
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
      coin: 'GDCC',
      status: false,
      statusLoading: false,
      category: [
        {
          "coinName": "GDCC",
          "tokenKey": "77bb9c8fd4016f3ced7a340a499e543a3837c09db2467ca8473d66172b272f21"
        },
        {
          "coinName": "A",
          "tokenKey": "a"
        },
        {
          "coinName": "B",
          "tokenKey": "b"
        },
        {
          "coinName": "C",
          "tokenKey": "c"
        },
      ],
      loginfo: [],
      total: null,
      limit_big: null,
      limit_small: null
    };

    this.fetchLoginfo()
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

  fetch() {
    let position = 0
    for (var i = 0; i < this.state.category.length; i++) {
      if (this.state.category[i] == this.state.coin) {
        position = index
        break
      }
    }
    this.setState({
      statusLoading: true
    })
    fetch(`http://47.94.150.170:8080/v1/otc/sell`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "address": this.state.loginfo.Address,
        "total": parseFloat(this.state.total),
        "limit_big": parseFloat(this.state.limit_big),
        "limit_small": parseFloat(this.state.limit_small),
        "coinName": this.state.category[position].coinName,
        "tokenKey": this.state.category[position].tokenKey
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
      this.setState({
        statusLoading: false
      })
      if (responseData.data.Code == 200) {
        this.props.navigation.goBack()
      }
    })
    .catch((error) => {
      console.log('err: ', error)
      Alert.alert(
        I18n.t('alert.title'),
        I18n.t('alert.content'),
        [
          {text: I18n.t('alert.prompt')}
        ]
      );
      this.setState({
        statusLoading: false
      })
    })
    .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={[styles.container, {padding: 10}]}>
          <View style={styles.textForm}>
            <Text allowFontScaling={false} style={styles.textLable}>总量</Text>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder={I18n.t('transfer.required')}
              keyboardType="numeric"
              defaultValue=""
              placeholderTextColor="#CCC"
              onChangeText={(params) => {
                this.setState({
                  total: params
                });
              }}
            />
          </View>
          <View style={styles.textForm}>
            <View style={styles.textContainer}>
              <Text allowFontScaling={false} style={styles.textLable}>最小值</Text>
              <Text allowFontScaling={false} style={styles.textLable}>最大值</Text>
            </View>
            <View style={styles.textContainer}>
              <TextInput
                allowFontScaling={false}
                style={[styles.textInput, {width: '50%'}]}
                placeholder={I18n.t('transfer.required')}
                keyboardType="numeric"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    limit_small: params
                  });
                }}
              />
              <TextInput
                allowFontScaling={false}
                style={[styles.textInput, {width: '50%', textAlign: 'right'}]}
                placeholder={I18n.t('transfer.required')}
                keyboardType="numeric"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    limit_big: params
                  });
                }}
              />
            </View>
          </View>
          <View style={[styles.textForm]}>
            <Text allowFontScaling={false} style={styles.textLable}>币种</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.state.coin}
              onValueChange={(value) => (
                this.setState({
                  coin: value
                })
              )}>
              {
                this.state.category.map((value, index) => (
                  <Picker.Item key={index} label={value.coinName.toString()} value={value.tokenKey.toString()} />
                ))
              }
            </Picker>
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            style={styles.touchableHighlight}
            onPress={() => {
              this.fetch()
            }}
          >
            <>
              <ActivityIndicator
                style={{display: this.state.statusLoading ? 'flex' : 'none'}}
                size="small"
                color="#FFF"
              />
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

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    height: '100%',
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
    width: '100%'
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
  }
}

module.exports = Sell;
