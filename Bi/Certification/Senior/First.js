import React, { Component } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { I18n } from '../../i18n/index';
import ImagePicker from 'react-native-image-crop-picker';
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
  DeviceEventEmitter,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

class First extends React.Component {
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
          }}>{I18n.t('certification.senior')}</Text>
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
      image: null,
      images: null,
      statusLoading: false
    };
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
      compressImageQuality: 0.2,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      // console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null,
        statusLoading: false
      });

      let formData = new FormData()
      formData.append('addr', this.props.navigation.state.params.address);
      formData.append('state', 0);
      formData.append('idImage', {uri: image.path, type: 'multipart/form-data', name: image.filename, mime: image.mime});

      fetch(`http://47.94.150.170:8080/v1/user/certificationSenior`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      })
      .then(response => response.json())
      .then(responseData => {
        this.props.navigation.navigate('SeniorSecond', {address: this.props.navigation.state.params.address})
      })
      .catch((error) => {
        console.log('err: ', error)
        this.setState({
          statusLoading: false
        })
      })
      .done();
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

   renderImage(image) {
     return <Image style={styles.imageView} source={image} />
   }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View>
            <View style={styles.title}>
              <Text allowFontScaling={false} style={styles.titleText}>{I18n.t('certification.front')}</Text>
            </View>
            {this.state.image ? this.renderAsset(this.state.image) : <View style={styles.imageView} onPress={() => this.pickSingle(false)}></View>}
          </View>
          <TouchableHighlight
            underlayColor='transparent'
            style={[styles.touchableHighlight, {backgroundColor: 'rgb(242, 46, 46)', marginBottom: 40}]}
            onPress={() => this.pickSingle(false)}
          >
            <>
              <ActivityIndicator
                style={{display: this.state.statusLoading ? 'flex' : 'none'}}
                size="small"
                color="#FFF"
              />
              <Text allowFontScaling={false} allowFontScaling={false} numberOfLines={1} style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                marginHorizontal: 16
              }}>{I18n.t('certification.front')}</Text>
            </>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    padding: 10,
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
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
  touchableHighlight: {
    backgroundColor: 'rgb(255, 50, 50)',
    padding: 13,
    borderRadius: 0,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageView: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#6c6c6c',
    borderWidth: 1,
  },
  title: {
    marginTop: 20,
    marginBottom: 40
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600'
  }
}

module.exports = First;
