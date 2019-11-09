import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import QRCode from 'react-native-qrcode-svg';
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
  Clipboard,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class GiveQRcode extends React.Component {
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
          }}>{navigation.state.params.title} 红包二维码</Text>
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
      QRCodeString: {
        type: 'red_envelopes',
        params: this.props.navigation.state.params
      }
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('changeBalance');
  }

  async clipboardString(string) {
    Clipboard.setString(string);
    let str = await Clipboard.getString()
    Alert.alert(
      `提示`,
      '已复制文本',
      [
        {text: '确定'},
      ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.QRCodeString}>
          <QRCode
            value={`http://47.94.150.170/resk/?reskid=${this.state.QRCodeString.params.red_envelopes_id}`}
            size={240}
          />
        </View>
        <View style={{marginTop: 100, alignItems: 'center'}}>
          <Text style={{fontSize: 18, marginBottom: 5}}>红包 ID</Text>
          <TouchableHighlight style={styles.swiperButtonInput}
            onPress={() => {
            this.clipboardString(`${this.state.QRCodeString.params.red_envelopes_id}`)
          }}>
            <Text allowFontScaling={false} style={styles.swiperButtonsText} numberOfLines={1}>
              {this.state.QRCodeString.params.red_envelopes_id}
            </Text>
          </TouchableHighlight>
          <Text style={{fontSize: 18, marginBottom: 5}}>红包链接</Text>
          <TouchableHighlight style={[styles.swiperButtonInput, {backgroundColor: 'rgb(255, 50, 50)'}]}
            onPress={() => {
            this.clipboardString(`http://47.94.150.170/resk/?reskid=${this.state.QRCodeString.params.red_envelopes_id}`)
          }}>
            <Text allowFontScaling={false} style={styles.swiperButtonsText} numberOfLines={1}>
              http://47.94.150.170/resk/?reskid={this.state.QRCodeString.params.red_envelopes_id}
            </Text>
          </TouchableHighlight>
          <View>
            <Text style={[styles.swiperDesText, {fontSize: 18}]} allowFontScaling={false}>扫描二维码，复制链接、ID 抢红包</Text>
          </View>
        </View>
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
  },
  QRCodeString: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 3
  },
  swiperButtonInput: {
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',
    backgroundColor: '#CCC',
    backgroundColor: '#999',
    borderRadius: 20,
    marginBottom: 20,
    width: '90%',
  },
  swiperButtonsText: {
    textAlign: 'center',
    color: '#FFF',
    height: 45,
    fontSize: 14,
    lineHeight: 45,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  swiperDesText: {
    textAlign: 'center',
  }
}

module.exports = GiveQRcode;
