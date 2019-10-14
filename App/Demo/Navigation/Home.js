import React, { Component } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import StickyHeader from 'react-native-stickyheader';
import lotteryDetails from './lotteryDetails';
import AnimatedTurnTableDraw from './AnimatedTurnTableDraw';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  Animated,
  SectionList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      data: [],
      list: [],
      active: '5d3912da9bbe3147969a4ad1',
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
          route: 'AnimatedTurnTableDraw',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t17722/111/1521695125/7007/bc139a6f/5acdb918N430b92ab.png'
        },
        {
          text: '百币夺宝',
          img: 'https://m.360buyimg.com/mobilecms/s80x80_jfs/t19948/66/3191014/6800/7429b1fd/5ae0629dN6ea95c15.png'
        },
      ]
    };

    this.fetchData();
    this.fetchDataList();
    this.fetchDataLottery();
  }

  fetchData() {
    fetch(`https://www.baimapicture.com/wp-json/wp/v2/posts?_embed=true&page=1&per_page=5&filter[category_name]=carousel`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        data: responseData
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  fetchDataList() {
    fetch(`https://app.xiaomiyoupin.com/mtop/mf/cat/list`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{},{}])
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        list: responseData.data
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
    if (this.state.data.length) {
      return (
        <View>
          <Animated.ScrollView
            onScroll={
              Animated.event(
                [{
                  nativeEvent: { contentOffset: { y: this.state.scrollY } }
                }],
                { useNativeDriver: true }
              )
            }
            scrollEventThrottle={1}
            style={styles.container}
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
                  this.state.data.map((item, key) => {
                    return (
                      <TouchableHighlight
                        key={key}
                        style={styles.swiperTouch}
                        underlayColor='transparent'
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
                        underlayColor='transparent'
                        onPress={() => {
                          this.props.navigation.navigate(item.route)
                        }}
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
            <StickyHeader
              style={styles.listContainer}
              stickyHeaderstyleDidWill={styles.listContainerDidWill}
              stickyHeaderY={Dimensions.get('window').width / 2 + Dimensions.get('window').width * 0.14 + 65} // 滑动到多少悬浮
              stickyScrollY={this.state.scrollY}
            >
              <FlatList
                data={this.state.list}
                horizontal={true}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                  <TouchableHighlight
                    style={[styles.listTouch, this.state.active === item.id ? styles.listTouchActive : '']}
                    underlayColor="rgba(34, 26, 38, 0.5)"
                    onPress={() => this.fetchDataDetail(item.id)}
                  >
                    <>
                      <Text style={[styles.listName, this.state.active == item.id ? styles.listNameActive : '']}>{item.name}</Text>
                    </>
                  </TouchableHighlight>
                }
              />
            </StickyHeader>
            <FlatList
              data={this.state.lotterys}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={styles.columnStyle}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                <TouchableHighlight
                underlayColor='transparent'
                  style={[styles.lotteryTouch, index % 2 ? styles.lotteryTouchmarginLeft10 : '']}
                  onPress={() => {
                    this.props.navigation.navigate('lotteryDetails', { lid: item.lottery_id })
                  }}
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
          </Animated.ScrollView>
        </View>
      );
    }

    if (!this.state.data.length) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="small"
          />
        </View>
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
    paddingTop: 3,
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
  columnStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  lotteryTouch: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    width: (Dimensions.get('window').width - 30) / 2,
  },
  lotteryTouchmarginLeft10: {
    marginLeft: 10
  },
  lotteryLottery_img: {
    borderRadius: 10,
    backgroundColor: '#fbfbfb',
    width: (Dimensions.get('window').width - 30) / 2,
    height: (Dimensions.get('window').width - 30) / 2,
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
  listContainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  listContainerDidWill: {
    backgroundColor: '#ffd600',
    borderRadius: 0,
    marginLeft: 0,
    width: Dimensions.get('window').width
  },
  listTouch: {
    margin: 10
  },
  listTouchActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#555',
    marginBottom: 5
  },
  listName: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center'
  },
  listNameActive: {
    fontWeight: '800'
  }
}

module.exports = Home;
