import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';


/**
 * 自定义导航栏
 */
let height = (Platform.OS === 'ios' ? 20 : 0) + 90

export default class NavPage extends Component {

    static defaultProps = {
        title: 'title',
    };

    render() {
        let { title } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.item} onPress={() => {
                    alert('返回')
                }}>
                    // <Image style={styles.icon} source={require('./arrow.png')} />
                </TouchableOpacity>

                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: '#FFF', fontSize: 17 }}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.item} onPress={() => {
                    alert('更多')
                }}>
                    // <Image style={[styles.icon, { width: 25, height: 5 }]} source={require('./more.png')} />
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        paddingHorizontal: 10,
        position: 'absolute',
    },
    icon: {
        width: 21,
        height: 21,
        color: "white",
    },
    item: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
