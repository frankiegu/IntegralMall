import React, { Component } from 'react';
import {
  Text,
  Alert,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import WebView from 'react-native-webview'

class Web extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <Text allowFontScaling={false} style={{
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, .9)',
        textAlign: 'center',
        marginHorizontal: 16
      }}>{navigation.state.params.title}</Text>
    ),
    headerRight: (
      <>
      {
        navigation.state.params.save != null ? (
          <TouchableHighlight
            style={{paddingLeft: 10, paddingRight: 10, display: 'none'}}
            onPress={() => {

            }}
          >
            <Text allowFontScaling={false}>保存</Text>
          </TouchableHighlight>
        ) : null
      }
      </>
    ),
  });

  constructor(props) {
    super(props);

    // CameraRoll.saveToCameraRoll(this.props.navigation.state.params.save)
    //   .then(function(result) {
    //     this.refs.toast.show("图片已保存至相册")
    //   }).catch(function(error) {
    //     this.refs.toast.show("保存失败")
    //   })
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <WebView
          source={{uri: this.props.navigation.state.params.uri ? this.props.navigation.state.params.uri : ''}}
        />
      </>
    );
  }
}

module.exports = Web;
