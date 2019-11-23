import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
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
  Alert,
  Switch,
  Clipboard,
  AsyncStorage,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class UserDetails extends React.Component {
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
          }}>{I18n.t('set.title')}</Text>
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
      loginfo: [],
      account: [],
      switch: false
    };

    AsyncStorage.getItem('loginfo')
    .then((response) => {
      this.setState({
        loginfo: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .done();

    AsyncStorage.getItem('switch')
    .then((response) => {
      console.log(response)
      this.setState({
        switch: JSON.parse(response)
      })
    })
    .catch((error) => {
      console.log(error);
    })
    .done();

    this.fetchUserinfo();
  }

  async clipboardString(string) {
    Clipboard.setString(string);
    let str = await Clipboard.getString()
    Alert.alert(
      I18n.t('alert.title'),
      I18n.t('alert.text'),
      [
        {text: I18n.t('alert.prompt')}
      ]
    );
  }

  fetchUserinfo() {
    fetch(`http://47.94.150.170:8080/v1/token/showAccount`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "account": this.props.navigation.state.params.address
      })
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.data.Code == 200) {
        this.setState({
          account: responseData.data.Data
        })
      } else {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {text: I18n.t('alert.prompt')}
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  clearStorage() {
    AsyncStorage.clear();
    this.props.navigation.goBack();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  out() {
    Alert.alert(
      I18n.t('alert.cancellation'),
      '',
      [
        {text: I18n.t('alert.cancel')},
        {text: I18n.t('alert.prompt'), onPress: () => this.clearStorage()},
      ]
    );
  }

  switchValue() {
    this.setState({
      switch: !this.state.switch
    })

    console.log(!this.state.switch)

    !this.state.switch ? I18n.locale = 'en' : I18n.locale = 'zh';
    AsyncStorage.setItem('switch', !this.state.switch ? JSON.stringify(true) : JSON.stringify(false));
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={{position: 'relative', flex: 1}}
      >
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.lists}>
            <View style={styles.list}>
              <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.phone')}</Text>
              <Text allowFontScaling={false} style={styles.text}>{this.state.loginfo.Phone}</Text>
            </View>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.loginfo.PrivateKeyStr)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.private')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.loginfo.PrivateKeyStr}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.loginfo.PublicKeyStr)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.public')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.loginfo.PublicKeyStr}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.lists}>
            <View style={styles.list}>
              <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.lock')}</Text>
              <Text allowFontScaling={false} style={styles.text}>{this.state.account.Frozen ? 'TRUE' : 'FALSE'}</Text>
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={[styles.lotteryTouch]}
              onPress={() => {
                this.clipboardString(this.state.account.Name)
              }}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <View style={styles.list}>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.address')}</Text>
                <Text allowFontScaling={false} style={styles.textRight} numberOfLines={1}>{this.state.account.Name}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              style={[styles.list, styles.listRows]}
              onPress={this.out.bind(this)}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <>
                <Text allowFontScaling={false} style={styles.text}>{I18n.t('set.swtich')}</Text>
                <Switch
                 trackColor='#18bba9'
                 value={this.state.switch == true}
                 onValueChange={(e) => this.switchValue(e)}
               />
              </>
            </TouchableHighlight>
          </View>
          <View style={styles.lists}>
            <TouchableHighlight
              style={[styles.list, styles.listRows]}
              onPress={this.out.bind(this)}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
            >
              <>
                <Text allowFontScaling={false} style={[styles.text, styles.textRed]}>{I18n.t('set.logout')}</Text>
                <Ionicons
                  style={styles.textRed}
                  name={'ios-arrow-forward'}
                  size={20}
                />
              </>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  lists: {
    marginBottom: 10
  },
  list: {
    position: 'relative',
    paddingRight: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.25)',
    // marginBottom: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    overflow: 'hidden'
  },
  textRight: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    width: 200,
    overflow: 'hidden',
    textAlign: 'right'
  },
  textRed: {
    color: 'red'
  },
  listRows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}

module.exports = UserDetails;
