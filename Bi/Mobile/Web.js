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
    )
  });

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
