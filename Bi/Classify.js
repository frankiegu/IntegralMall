import React, { Component } from 'react';
import iconStyle from './Styles/Icon'
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
      list: [],
      details: [],
      active: '5d3912da9bbe3147969a4ad1'
    };
    this.fetchDataList();
    this.fetchDataDetail(this.state.active);
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

  fetchDataDetail(catId) {
    fetch(`https://app.xiaomiyoupin.com/mtop/mf/cat/detail`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{},{"catId":catId}])
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        details: responseData.data,
        active: catId,
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  render() {
    if (this.state.list.length) {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.list}
            style={styles.listContainer}
            horizontal={false}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <TouchableHighlight
                style={[styles.listTouch, this.state.active === item.id ? styles.listTouchActive : '']}
                underlayColor="rgba(34, 26, 38, 0.5)"
                onPress={() => this.fetchDataDetail(item.id)}
              >
                <>
                  <Text allowFontScaling={false} style={[styles.listName, this.state.active == item.id ? styles.listNameActive : '']}>{item.name}</Text>
                </>
              </TouchableHighlight>
            }
          />
          <ScrollView style={styles.detailContainer}>
            <View style={styles.detailBanner}>
              <Image style={styles.detailBannerUrl} source={{uri: this.state.details.banner}} />
            </View>
            <FlatList
              data={this.state.details.children}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) =>
                <View style={iconStyle.iconContainerBottom0}>
                  <View style={iconStyle.iconHeader}>
                    <Text allowFontScaling={false} style={iconStyle.iconHeaderText}>{item.name}</Text>
                  </View>
                  <FlatList
                    data={item.children}
                    horizontal={false}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                      <TouchableHighlight
                        style={[iconStyle.iconTouch3, styles.iconTouch3, iconStyle.iconTouchBottom20]}
                        underlayColor="rgba(34, 26, 38, 0.5)"
                      >
                        <>
                          <Image resizeMode='cover' style={[iconStyle.icon, styles.icon]} source={{uri: item.smallImgCard.img}} />
                          <Text allowFontScaling={false} style={[iconStyle.iconText, styles.iconText]}>{item.smallImgCard.name}</Text>
                        </>
                      </TouchableHighlight>
                    }
                  />
                </View>
              }
            />
          </ScrollView>
        </View>
      );
    }

    if (!this.state.list.length) {
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
    flexDirection: 'row'
  },
  listContainer: {
    width: Dimensions.get('window').width * 0.25,
    backgroundColor: '#FFF',
  },
  listTouch: {
    margin: 10,
    borderRadius: 15,
  },
  listTouchActive: {
    backgroundColor: 'linear-gradient(to right, rgb(223, 20, 15), rgb(241, 83, 56))'
  },
  listName: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#000',
    textAlign: 'center'
  },
  listNameActive: {
    color: '#FFF'
  },
  detailContainer: {
  },
  detailBannerUrl: {
    width: Dimensions.get('window').width * 0.75 - 20,
    height: 80,
    borderRadius: 10,
    margin: 10
  },
  iconTouch3: {
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width * 0.75 - 20) / 3
  },
  icon: {
    backgroundColor: '#FFF',
    width: (Dimensions.get('window').width * 0.75 - 20) / 3 - 30,
    height: (Dimensions.get('window').width * 0.75 - 20) / 3 - 30
  },
  iconText: {
    textAlign: 'center',
    width: (Dimensions.get('window').width * 0.75 - 20) / 3
  },
}

module.exports = User;
