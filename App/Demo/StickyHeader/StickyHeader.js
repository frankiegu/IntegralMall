/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SectionList,
  Animated,
  ScrollView
} from 'react-native';

import StickyHeader from 'react-native-stickyheader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollY: new Animated.Value(0) }
    this.data = []
    for (let index = 0; index < 10; index++) {
      this.data.push(index)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60, backgroundColor: 'gray' }}></View>
        <Animated.ScrollView
          onScroll={
            Animated.event(
              [{
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }],
              { useNativeDriver: true }
            )
          }
          scrollEventThrottle={1}
        >
          <View style={{ height: 60, backgroundColor: 'yellow' }} />
          <StickyHeader
            stickyHeaderY={60} // 滑动到多少悬浮
            stickyScrollY={this.state.scrollY}
          >
            <View style={{ height: 60, backgroundColor: 'red' }} />
          </StickyHeader>
          <FlatList
            ref={flatList => this._flatList = flatList}
            data={this.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <View
                style={{ height: 60, backgroundColor: '#ffffff' }}>
                <Text>{index + 1}</Text>
              </View>
            }
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});
