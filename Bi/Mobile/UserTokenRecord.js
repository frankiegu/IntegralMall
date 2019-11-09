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
  TouchableHighlight,
} from 'react-native';

class UserTokenRecord extends React.Component {
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
          }}>查询指定用户指定代币交易记录</Text>
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
      tokenKey: null,
      account: null,
      start: null,
      end: null,
    };
  }

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/token/userTokenRecord`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tokenKey": this.state.tokenKey || '0x403164f4758e11992a6bcbc95664d6f3a4e7f191',
        "account": this.state.key || '0x403164f4758e11992a6bcbc95664d6f3a4e7f191',
        "start": this.state.start || '0'
        "end": this.state.end || '2'
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
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <TextInput
            allowFontScaling={false}
            style={styles.textInput}
            placeholder="key"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            defaultValue="0x403164f4758e11992a6bcbc95664d6f3a4e7f191"
            onChangeText={(params) => {
              this.setState({
                tokenKey: params
              });
            }}
          />
          <TextInput
            allowFontScaling={false}
            style={styles.textInput}
            placeholder="key"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            defaultValue="0x403164f4758e11992a6bcbc95664d6f3a4e7f191"
            onChangeText={(params) => {
              this.setState({
                account: params
              });
            }}
          />
          <TextInput
            allowFontScaling={false}
            style={styles.textInput}
            placeholder="start"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            defaultValue="0"
            onChangeText={(params) => {
              this.setState({
                start: params
              });
            }}
          />
          <TextInput
            allowFontScaling={false}
            style={styles.textInput}
            placeholder="start"
            clearButtonMode="while-editing"
            keyboardType="numeric"
            defaultValue="2"
            onChangeText={(params) => {
              this.setState({
                end: params
              });
            }}
          />
        </View>
        <TouchableHighlight
          underlayColor='transparent'
          style={{backgroundColor: '#04c2ad', padding: 10, borderRadius: 20}}
          onPress={() => {
            this.fetch()
          }}
        >
          <>
            <Text allowFontScaling={false} numberOfLines={1} style={{
              fontSize: 14,
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginHorizontal: 16
            }}>查询</Text>
          </>
        </TouchableHighlight>
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
    padding: 20
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    margin: 20,
    borderRadius: 18,
    textAlign: 'center'
  }
}

module.exports = UserTokenRecord;
