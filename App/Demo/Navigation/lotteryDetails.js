import React, { Component, useRef } from 'react';
import iconStyle from '../../Styles/Icon'
import ViewSwiper from 'react-native-swiper';
import HTMLView from 'react-native-htmlview';
import Modalize from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import faker from 'faker';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  SectionList,
  Platform,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

function renderNode(node, index) {
  if (node.name == 'iframe') {
    return (
      <View key={index}>
        <Text>{node.attribs.src}</Text>
      </View>
    );
  }
}

class LotteryDetails extends React.Component {
  static navigationOptions ({ navigation, screenProps }) {
    const { params } = navigation.state;

    return {
      headerTitle: (
        <Text allowFontScaling={false} numberOfLines={1} style={{
          fontSize: 17,
          fontWeight: '600',
          color: 'rgba(0, 0, 0, 1)',
          textAlign: 'center',
          marginHorizontal: 16
        }}>{ params.title }</Text>
      )
    }
  };

  modal = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      details: null,
      detailss: 'null',
    };

    this.fetchData(this.props.navigation.state.params.id);
  }

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  }

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  }

  fetchData(id) {
    fetch(`https://taupd.ferer.net/v1/api/products/${ id }?type=business`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        details: responseData.data
      });
    })
    .catch((error) => {
      console.log('err: ', error)
    })
    .done();
  }

  renderContent = () => {
    return (
      <View style={s.content}>
        <Text style={s.content__subheading}>{'Last step'.toUpperCase()}</Text>
        <Text style={s.content__heading}>Send the message?</Text>
        <Text style={s.content__description}>{faker.lorem.paragraph()}</Text>
        <Text style={s.content__description}>{faker.lorem.paragraph()}</Text>

        <TouchableOpacity
          style={s.content__button}
          activeOpacity={0.9}
          onPress={this.closeModal}
        >
          <Text style={s.content__buttonText}>{'Send'.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.details) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.swiperContainer}>
            <ViewSwiper
              autoplay
              autoplayTimeout={6}
              dot={<View style={{backgroundColor: 'rgba(0, 133, 255, 0.3)', width: 20, height: 3}} />}
              activeDot={<View style={{backgroundColor: 'rgba(0, 133, 255, 1)', width: 20, height: 3}} />}
              paginationStyle={{bottom: 10}}
            >
              {
                this.state.details.product_image_gallerys.map((item, key) => {
                  return (
                    <TouchableHighlight
                      key={key}
                      style={styles.swiperTouch}
                      underlayColor="rgba(34, 26, 38, 0.5)"
                    >
                      <Image resizeMode='cover' style={styles.swiperImage} source={{uri: item}} />
                    </TouchableHighlight>
                  )
                })
              }
            </ViewSwiper>
          </View>
          <View style={styles.productHeaderContainer}>
            <View style={[styles.productHeader, {paddingBottom: 0, paddingRight: 15, marginTop: 1, alignItems: 'flex-end'}]}>
              {
                this.state.details.product_business_discount ?
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text allowFontScaling={false} style={styles.productHeaderDiscount} numberOfLines={1}>¥{this.state.details.product_business_discount}</Text>
                    <Text allowFontScaling={false} style={styles.productHeaderPrice} numberOfLines={1}>¥{this.state.details.product_business_price}</Text>
                  </View>
                :
                  <Text allowFontScaling={false} style={styles.productHeaderDiscount} numberOfLines={1}>¥{this.state.details.product_business_price}</Text>
              }
              {
                this.state.details.product_business_quantity ? (
                  <Text allowFontScaling={false} style={styles.productHeaderQuantity} numberOfLines={1}>限购{this.state.details.product_business_quantity}份</Text>
                ) : ''
              }
            </View>
            <View style={styles.productHeader}>
              <View style={styles.productHeaderTitle}>
                <Text allowFontScaling={false} style={styles.productHeaderName} numberOfLines={2}>{this.state.details.product_name}</Text>
                <Text allowFontScaling={false} style={styles.productHeaderDescription} numberOfLines={1}>{this.state.details.product_business_description}</Text>
              </View>
              <View style={styles.productHeaderShare}>
                <Text allowFontScaling={false} style={{fontSize: 12, marginRight: 5}} numberOfLines={2}>分享</Text>
                <Ionicons
                  name={'ios-share-alt-outline'}
                  size={15}
                />
              </View>
            </View>
            <TouchableHighlight
              style={[styles.list, {marginTop: 1}]}
              underlayColor="rgba(255, 255, 255, 1)"
              activeOpacity={1}
              onPress={this.openModal}
            >
              <View style={styles.listRows}>
                <Text allowFontScaling={false} style={styles.text}>配送服务 • 购买须知</Text>
                <View style={styles.textArrow}>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={20}
                    color='#AAA'
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <Modalize
            modalStyle={{ zIndex: 9999, backgroundColor: '#FFF', position: 'absolute', bottom: -100, width: '100%' }}
            ref={this.modal}
            adjustToContentHeight
            onClosed={this.onClosed}
            // modalHeight={450}
          >
            {this.renderContent()}
          </Modalize>
          <View style={styles.productHeaderContainer}>
            <View style={styles.decorationLine}>
              <Text allowFontScaling={false} style={styles.decorationLineText} numberOfLines={1}>———  </Text>
              <Text allowFontScaling={false} style={styles.decorationLineText} numberOfLines={1}>详细资料</Text>
              <Text allowFontScaling={false} style={styles.decorationLineText} numberOfLines={1}>  ———</Text>
            </View>
            <View style={[styles.productHeader, {paddingRight: 15}]}>
              <View style={styles.productHeaderTitle}>
                <Text allowFontScaling={false} style={styles.productHeaderName} numberOfLines={2}>产品参数</Text>
              </View>
              <View style={styles.textArrow}>
                <Text allowFontScaling={false} style={styles.textDesc} numberOfLines={1}>更多</Text>
                <Ionicons
                  name={'ios-arrow-forward'}
                  size={20}
                  color='#AAA'
                />
              </View>
            </View>
            {
              this.state.details.product_field.parameters && this.state.details.product_field.parameters.map((item, key) => {
                return (
                  <TouchableHighlight
                    style={[styles.list, {marginTop: 0.5}]}
                    underlayColor="rgba(255, 255, 255, 1)"
                    activeOpacity={1}
                  >
                    <View style={styles.listRows}>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.text}>{item.parameter_name}</Text>
                      <Text allowFontScaling={false} numberOfLines={1} style={[styles.textArrow, styles.textDesc]}>{item.parameter_value}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
            {
              this.state.details.product_detail ? (
                <Text allowFontScaling={false}>
                  <HTMLView value={this.state.details.product_detail} renderNode={renderNode} />
                </Text>
              ) : ''
            }
          </View>
        </ScrollView>
      );
    }

    if (!this.state.details) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="small"
          />
        </View>
      );
    }
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  swiperContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: '#FFF'
  },
  swiperImage: {
    width: '100%',
    height: Dimensions.get('window').width
  },
  productHeader: {
    padding: 15,
    paddingRight: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productHeaderTitle: {
    width: '78%'
  },
  productHeaderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productHeaderDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
    marginTop: 5
  },
  productHeaderShare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D5D5D5',
    padding: 5,
    paddingLeft: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  productHeaderPrice: {
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 24,
    color: '#a3a3a3',
    fontWeight: '400',
    textDecorationLine: 'line-through'
  },
  productHeaderQuantity: {
    marginLeft: 8,
    lineHeight: 24,
    color: '#a3a3a3',
    fontWeight: '400',
    letterSpacing: 0.5
  },
  productHeaderDiscount: {
    fontSize: 24,
    lineHeight: 24,
    color: '#ff6300',
    fontWeight: '600'
  },
  decorationLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  decorationLineText: {
    color: '#BBB'
  },
  lists: {
    marginTop: 10
  },
  listRows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    position: 'relative',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.25)',
    // marginBottom: -1,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 14,
    overflow: 'hidden'
  },
  textArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textDesc: {
    fontSize: 14,
    color: '#aaa',
    marginRight: 5,
    textAlign: 'right'
  }
}

const s = {
  content: {
    padding: 20,
  },

  content__icon: {
    width: 32,
    height: 32,

    marginBottom: 20,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },

  content__heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666',
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 20,

    width: '100%',

    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#cdcdcd',
    borderRadius: 6,
  },

  content__button: {
    paddingVertical: 15,

    width: '100%',

    backgroundColor: '#333',
    borderRadius: 6,
  },

  content__buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
};

module.exports = LotteryDetails;
