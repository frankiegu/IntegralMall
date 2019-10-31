import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import QRCode from 'react-native-qrcode-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  TextInput,
  RefreshControl,
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

class QRcodeReceivables extends React.Component {
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
          }}>{navigation.state.params.title} 收款</Text>
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
        type: 'transfer_accounts',
        title: this.props.navigation.state.params.title,
        tokenKey: this.props.navigation.state.params.tokenKey,
      }
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('changeBalance');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.QRCodeString}>
          <QRCode
            value={JSON.stringify(this.state.QRCodeString)}
            size={240}
          />
        </View>
        <View>
          <Text allowFontScaling={false}>扫描二维码付款</Text>
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
  }
}

module.exports = QRcodeReceivables;
