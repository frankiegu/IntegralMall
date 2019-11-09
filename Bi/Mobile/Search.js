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

class Search extends React.Component {
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
          }}>搜索</Text>
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
      channelId: '0',
      hash: null,
      data: null
    };
  }

  fetch() {
    fetch(`http://47.94.150.170:8080/v1/explorer/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "channelId": this.state.channelId,
        "hash": this.state.hash
      })
    })
    .then(response => response.json())
    .then(responseData => {
      // console.log(responseData.data)
      this.setState({
        data: responseData.data
      })

      if (responseData.data.Data.Format == 2) {
        let items = [], index = 0
        Object.keys(responseData.data.Data.Data.BalanceOf).forEach((key) => {
          let item = key.split('|'), keys = key
          Object.keys(lists).forEach((key) => {
            if (lists[key].name == item[1]) {
              items[index++] = {
                id: lists[key].id,
                icon: lists[key].icon,
                name: item[1],
                tokenKey: item[0],
                number: responseData.data.Data.BalanceOf[keys]
              }
            }
          })
        });

        console.log(items)

        this.setState({
          data: items
        })
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  // 时间戳转换日期格式
  timeFormat(nS) {
    let date = new Date(parseInt(nS) * 1000) // 时间戳为10位需乘1000，为13位则不用

    let Y = date.getFullYear() // 年
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) // 月
    let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '' // 日

    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒

    return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s // yyyy/mm/dd hh:mm:ss
  }

  render() {
    if (this.state.data == null) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={[styles.container, {padding: 10}]}>
            <View style={[styles.textForm, {display: 'none'}]}>
              <Text allowFontScaling={false} style={styles.textLable}>通道 ID</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    channelId: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>区块高度 / 区块、交易Hash / 用户Address</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    hash: params
                  });
                }}
              />
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#04c2ad', padding: 13, borderRadius: 0, marginBottom: 20}}
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
        </View>
      );
    } else if (this.state.data.Data.Format == 0) {
      return (
        <View style={[styles.container, ]}>
          <StatusBar barStyle="dark-content" />
          <View style={[styles.container, {padding: 10}]}>
            <View style={[styles.textForm, {display: 'none'}]}>
              <Text allowFontScaling={false} style={styles.textLable}>通道 ID</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    channelId: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>区块高度 / 区块、交易Hash / 用户Address</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    hash: params
                  });
                }}
              />
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#04c2ad', padding: 13, borderRadius: 0, marginBottom: 20}}
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
          <View style={{paddingLeft: 10, paddingRight: 10}}>
            <Text>查看交易列表</Text>
          </View>
          <View style={[styles.container, {padding: 10}]}>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>BlockHash</Text>
              <Text allowFontScaling={false} style={styles.textInput}>{this.state.data.Data.Block.BlockHash}</Text>
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>总区块数量</Text>
              <Text allowFontScaling={false} style={styles.textInput}>{this.state.data.Data.Block.Height}</Text>
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>前一个区块 Hash</Text>
              <Text allowFontScaling={false} style={styles.textInput}>{this.state.data.Data.Block.PreviousHash}</Text>
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>时间</Text>
              <Text allowFontScaling={false} style={styles.textInput}>{this.timeFormat(this.state.data.Data.Block.Timestamp)}</Text>
            </View>
          </View>
        </View>
      );
    } else if (this.state.data.Data.Format == 2) {
      return (
        <View style={[styles.container, ]}>
          <StatusBar barStyle="dark-content" />
          <View style={[styles.container, {padding: 10}]}>
            <View style={[styles.textForm, {display: 'none'}]}>
              <Text allowFontScaling={false} style={styles.textLable}>通道 ID</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    channelId: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>区块高度 / 区块、交易Hash / 用户Address</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder="选填"
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    hash: params
                  });
                }}
              />
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={{backgroundColor: '#04c2ad', padding: 13, borderRadius: 0, marginBottom: 20}}
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
          <View style={{paddingLeft: 10, paddingRight: 10}}>
            <Text>查看交易列表</Text>
          </View>
          <View style={[styles.container, {padding: 10}]}>
            {
              <View style={styles.textForm}>
                <Text allowFontScaling={false} style={styles.textLable}>BlockHash</Text>
                <Text allowFontScaling={false} style={styles.textInput}>{this.state.data.Data.Block.BlockHash}</Text>
              </View>
            }
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative',
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
  }
}

module.exports = Search;
