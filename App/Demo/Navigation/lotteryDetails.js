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
  SectionList,
  Platform,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: null,
    };

    this.fetchData(this.props.navigation.state.params.lid);
  }

  fetchData(id) {
    fetch(`https://api.baijiasz.com/lottery/detail?lid=${ id }`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        details: responseData.data
      });
      console.log(responseData.data.gallerys);
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    if (this.state.details) {
      return (
        <View style={styles.container}>
          <View style={styles.swiperContainer}>
            <ViewSwiper
              autoplay
              autoplayTimeout={6}
              dot={<View style={{backgroundColor: 'rgba(0, 133, 255, 0.3)', width: 20, height: 3}} />}
              activeDot={<View style={{backgroundColor: 'rgba(0, 133, 255, 1)', width: 20, height: 3}} />}
              paginationStyle={{bottom: 10}}
            >
              {
                this.state.details.gallerys.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={styles.swiperTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <Image resizeMode='cover' style={styles.swiperImage} source={{uri: item.img}} />
                    </TouchableHighlight>
                  )
                })
              }
            </ViewSwiper>
          </View>
        </View>
      );
    }

    if (!this.state.details) {
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
    position: 'relative',
  },
  swiperContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#FFF'
  },
  swiperImage: {
    width: '100%',
    height: Dimensions.get('window').width
  },
}

module.exports = User;
