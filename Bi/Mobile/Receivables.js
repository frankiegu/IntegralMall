import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import { RNCamera } from 'react-native-camera';
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
  Animated,
  Easing,
  InteractionManager,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
const { width, height } = Dimensions.get('window')
class Receivables extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            fontSize: 17,
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            marginHorizontal: 16
          }}>扫描二维码</Text>
        </>
      </TouchableHighlight>
    ),
    tabBarVisible: false,
    headerTransparent: true,
    headerStyle: {
      elevation: 0,
    },
    headerTintColor: '#FFFFFF'
  });

  constructor(props) {
    super(props);

    this.state = {
      animate: new Animated.Value((width - 200) / 2, (height - 340) / 2),
      transCode: '', // 条码
      type: '', // 条码类型
      show: true
    };
  }

  onBarCodeRead(e) {
    if(this.state.show) {
      let transCode = JSON.parse(e.data)
      this.setState({
        transCode,
        type: e.type,
        show: false
      })

      switch (transCode.type) {
        case 'transfer_accounts':
          this.props.navigation.navigate('TransferToken', {
            title: transCode.title,
            tokenKey: transCode.tokenKey,
            address: this.props.navigation.state.params.address
          })
          break;
        case 'red_envelopes':
          this.props.navigation.navigate('GrabRedEnvelopes', {
            title: transCode.params.title,
            tokenKey: transCode.params.tokenKey,
            address: this.props.navigation.state.params.address,
            red_envelopes_id: transCode.params.red_envelopes_id
          })
          break;
        default:

      }
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.startAnimation()
    })
  }

  // 动画开始
  startAnimation() {
    if(this.state.show) {
      this.state.animate.setValue(0);
      Animated.timing(this.state.animate, {
        toValue: 1,   // 运动终止位置，比值
        duration: 2500,  // 动画时长
        easing: Easing.linear,  // 线性的渐变函数
        delay: 0.5,// 在一段时间之后开始动画（单位是毫秒），默认为0
      }).start(() => this.startAnimation())
    }
  }

  componentWillUnmount() {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
        >
          <View style={styles.rectangleContainer}>
            <Animated.View style={{
              transform: [{
                translateY: this.state.animate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200]
                })
              }]
            }}>
              <Text allowFontScaling={false} style={{width: 200, height: 1, backgroundColor: '#00ff00'}}></Text>
            </Animated.View>
            <View style={styles.rectangle} />
            <Text allowFontScaling={false} style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
        <Text allowFontScaling={false} style={[styles.rectangleText, styles.rectangleTextTitle]}>{this.state.transCode.title}</Text>
        <Text allowFontScaling={false} style={[styles.rectangleText, styles.rectangleTextInfo]}>{this.state.transCode.tokenKey}</Text>
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
  rectangleContainer: {
    flex: 1,
    width: 800,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'transparent'
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 15
  },
  rectangleTextTitle: {
    position: 'absolute',
    bottom: 120,
    width: '80%',
    textAlign: 'center',
    display: 'none'
  },
  rectangleTextInfo: {
    position: 'absolute',
    bottom: 100,
    width: '80%',
    textAlign: 'center',
    display: 'none'
  },
}

module.exports = Receivables;
