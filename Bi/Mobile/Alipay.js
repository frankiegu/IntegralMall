import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../i18n/index';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Text,
  View,
  Image,
  Alert,
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

class Alipay extends React.Component {
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
          }}>{I18n.t('alipay.title')}</Text>
        </>
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight
        style={{right: 10, display: 'none'}}
        underlayColor='transparent'
        onPress={() => {
          navigation.navigate('Receivables')
        }}
      >
        <Ionicons
          name={'md-qr-scanner'}
          size={24}
        />
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
      addr: this.props.navigation.state.params.address,
      user_name: null,
      pay_id: null,
      state: null,
      image: null,
      statusLoading: false
    };
  }

  renderImage(image) {
    return <Image style={styles.imageView} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  pickSingle(cropit, circular = false) {
    this.setState({
      statusLoading: true
    })
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 320,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      // console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime, type: 'multipart/form-data', name: image.filename,},
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  fetch() {
    this.setState({
      statusLoading: true
    });
    let formData = new FormData()
    formData.append('addr', this.props.navigation.state.params.account);
    formData.append('state', "0");
    formData.append('user_name', this.state.user_name);
    formData.append('pay_id', this.state.pay_id);
    formData.append('payImg', this.state.image);

    fetch(`http://47.94.150.170:8080/v1/user/putPay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        statusLoading: false
      });
      if (responseData.data.Code == 400) {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt'),
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          I18n.t('alert.title'),
          responseData.data.Message,
          [
            {
              text: I18n.t('alert.prompt')
            }
          ]
        );
      }
    })
    .catch((error) => {
      console.log('err: ', error)
      this.setState({
        statusLoading: false
      })
    })
    .done();
  }

  render() {
    if (!this.state.status) {
      return (
        <ScrollView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={[styles.container, {padding: 10}]}>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('wechat.username')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    user_name: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('wechat.account')}</Text>
              <TextInput
                allowFontScaling={false}
                style={styles.textInput}
                placeholder={I18n.t('transfer.required')}
                clearButtonMode="while-editing"
                keyboardType="ascii-capable"
                defaultValue=""
                placeholderTextColor="#CCC"
                onChangeText={(params) => {
                  this.setState({
                    pay_id: params
                  });
                }}
              />
            </View>
            <View style={styles.textForm}>
              <Text allowFontScaling={false} style={styles.textLable}>{I18n.t('alipay.code')}</Text>
              {this.state.image ? this.renderAsset(this.state.image) : <TouchableHighlight style={styles.imageView} underlayColor='transparent' onPress={() => { this.pickSingle() }}><Text style={styles.imageViewText} allowFontScaling={false}>上传图片</Text></TouchableHighlight>}
            </View>
            <TouchableHighlight
              underlayColor='transparent'
              style={styles.touchableHighlight}
              onPress={() => { this.fetch() }}
            >
              <>
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
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
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
  },
  imageView: {
    marginTop: 15,
    width: '100%',
    height: 170,
    borderColor: '#6c6c6c',
    borderWidth: 1,
  },
  imageViewText: {
    lineHeight: 168,
    height: 168,
    textAlign: 'center',
    width: '100%',
  }
}

module.exports = Alipay;
