import React, { Component } from 'react';
import iconStyle from '../Styles/Icon'
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
  DeviceEventEmitter,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
const { width, height } = Dimensions.get('window')
class RecordDetail extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: (
      <TouchableHighlight
        underlayColor='transparent'
      >
        <>
          <Text allowFontScaling={false} numberOfLines={1} style={{
            fontSize: 17,
            fontWeight: '600',
            textAlign: 'center',
            marginHorizontal: 16
          }}>{navigation.state.params.title} 交易详细</Text>
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
  }

  stringify(string) {
    return string.substring(0, 7) + '...' + string.substring(string.length - 7);
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('changeBalance');
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={{position: 'relative', flex: 1}}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.lists}>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>交易时间</Text>
            <Text allowFontScaling={false} style={styles.text}>{this.props.navigation.state.params.time}</Text>
          </View>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>流水 ID</Text>
            <Text allowFontScaling={false} style={styles.textRight}>{this.props.navigation.state.params.txid}</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>金额</Text>
            <Text allowFontScaling={false} style={styles.text}>{this.props.navigation.state.params.amount} {this.props.navigation.state.params.title}</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>付款地址</Text>
            <Text allowFontScaling={false} style={styles.textRight}>{this.stringify(this.props.navigation.state.params.from)}</Text>
          </View>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>收款地址</Text>
            <Text allowFontScaling={false} style={styles.textRight}>{this.stringify(this.props.navigation.state.params.to)}</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <View style={styles.list}>
            <Text allowFontScaling={false} style={styles.text}>备注</Text>
            <Text allowFontScaling={false} style={styles.textRight}>{this.props.navigation.state.params.rec}</Text>
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

module.exports = RecordDetail;
