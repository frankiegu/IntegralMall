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
  iconContainerBottom0: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  iconTouch: {
    width: Dimensions.get('window').width * 0.14,
  },
  iconTouch4: {
    width: (Dimensions.get('window').width - 40) / 4,
    alignItems: 'center',
  },
  iconTouchTop20: {
    marginTop: 20
  },
  iconTouchBottom20: {
    marginBottom: 20
  },
  iconColumnStyle: {
    margin: 10,
    marginRight: 10
  },
  icon: {
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').width * 0.14,
    borderRadius: Dimensions.get('window').width * 0.14,
    backgroundColor: '#d1d1d1',
    alignItems: 'center',
  },
  iconApps: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    width: Dimensions.get('window').width * 0.14,
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
  iconHeader: {
    padding: 10
  },
  iconHeaderText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  }
});

export {Icon as default};
