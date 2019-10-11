import React, { Component } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carousel: [],
      lotterys: [],
      icons: [
        {
          text: '每日签到',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19510/99/1997173036/5986/e640aaee/5ae06136N2f38f602.png'
        },
        {
          text: '兑换商城',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t1/72208/35/9347/2600/5d70c50eE77b85cdb/7b6a9fec1067db06.png'
        },
        {
          text: '欢喜电影',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17422/194/2017793180/12782/83f66fd3/5ae13830N1e98ef9c.png'
        },
        {
          text: '幸运转盘',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
        },
        {
          text: '百币夺宝',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19948/66/3191014/6800/7429b1fd/5ae0629dN6ea95c15.png'
        }
      ]
    };

    this.fetchData();
    this.fetchDataLottery();
  }

  fetchData() {
    fetch(`https://www.baimapicture.com/wp-json/wp/v2/posts?_embed=true&page=1&per_page=5&filter[category_name]=carousel`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        carousel: responseData
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchDataLottery() {
    fetch(`https://api.baijiasz.com/lottery/`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        lotterys: responseData.data.lotterys
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    if (this.state.carousel.length) {
      return (
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <View style={styles.backgroundSwiper}></View>
          <View style={styles.swiperContainer}>
            <ViewSwiper
              autoplay
              autoplayTimeout={6}
              dot={<View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 20, height: 3}} />}
              activeDot={<View style={{backgroundColor: '#ffffff', width: 20, height: 3}} />}
              paginationStyle={{bottom: 10}}
            >
              {
                this.state.carousel.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={styles.swiperTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <Image resizeMode='cover' style={styles.swiperImage} source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes['medium_large'].source_url}} />
                    </TouchableHighlight>
                  )
                })
              }
            </ViewSwiper>
          </View>
          <View style={iconStyle.iconContainer}>
            <View style={iconStyle.iconApps}>
              {
                this.state.icons.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={iconStyle.iconTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <>
                        <Image resizeMode='cover' style={iconStyle.icon} source={{uri: item.img}} />
                        <Text style={iconStyle.iconText}>{item.text}</Text>
                      </>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          </View>
          <FlatList
            data={this.state.lotterys}
            style={styles.lotterysContainer}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.columnStyle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <TouchableHighlight
                style={index % 2 ? styles.lotteryTouchExten : styles.lotteryTouch}
                underlayColor="rgba(34, 26, 38, 0.5)"
              >
                <>
                  <Image resizeMode='cover' style={styles.lotteryLottery_img} source={{uri: item.lottery_img}} />
                  <View style={styles.lotteryFoot}>
                    <Text style={styles.lotteryLottery_name}>{item.lottery_name}</Text>
                    <View style={styles.lotteryFooter}>
                      <Text style={styles.lotteryFinish_quantity}>{'¥' + item.finish_quantity}</Text>
                      <View style={styles.lotteryBuy}>
                        <Text style={styles.lotteryBuyText}>看相似</Text>
                      </View>
                    </View>
                  </View>
                </>
              </TouchableHighlight>
            }
          />
        </ScrollView>
      );
    }

    if (!this.state.carousel.length) {
      return (
        <ScrollView style={styles.containerScrollView}>
          <ActivityIndicator
            size="small"
          />
        </ScrollView>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative'
  },
  containerScrollView: {
    position: 'relative',
    flex: 1
  },
  backgroundSwiper: {
    position: 'absolute',
    backgroundColor: '#ffd600',
    top: -Dimensions.get('window').width * 1.4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  swiperContainer: {
    height: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  swiperTouch: {
    borderRadius: 10,
  },
  swiperImage: {
    width: '100%',
    borderRadius: 10,
    height: Dimensions.get('window').width / 2
  },
  lotterysContainer: {},
  columnStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  lotteryTouch: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5 - 10,
  },
  lotteryTouchExten: {
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5 - 20,
  },
  lotteryLottery_img: {
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    width: Dimensions.get('window').width * 0.5 - 20,
    height: Dimensions.get('window').width * 0.5 - 20,
  },
  lotteryLottery_name: {
    fontSize: 17,
    marginBottom: 10
  },
  lotteryFoot: {
    padding: 10
  },
  lotteryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lotteryFinish_quantity: {
    fontSize: 19,
    color: '#ff1b4b',
    fontWeight: '600'
  },
  lotteryBuy: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ff1b4b',
    borderRadius: 16,
    backgroundColor: '#ffe6eb',
  },
  lotteryBuyText: {
    color: '#ff1b4b'
  },
}

module.exports = Navigation;
