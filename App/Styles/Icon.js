import {
  StyleSheet,
  Dimensions
} from 'react-native';

const screenW = Dimensions.get('window').width / 2;
const screenH = Dimensions.get('window').height;
const Icon = StyleSheet.create({
  iconContainer: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  iconCon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGround: {
    width: 38,
    height: 38,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
    alignItems: 'center',
  },
  iconApps: {
    // backgroundColor: '#CCC',
    margin: 15,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconText: {
    fontSize: 12,
    width: 50,
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  number: {
    fontSize: 20,
    width: 50,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  numberText: {
    fontSize: 12,
    width: 50,
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  iconHeader: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconHeaderText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  iconHeaderTextMore: {
    fontSize: 14,
    color: '#aaaaaa',
    fontWeight: '600',
  }
});

export {Icon as default};
