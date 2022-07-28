import { Dimensions, Platform, StyleSheet } from 'react-native';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';

const { height, width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  contentContainer: {
    width: '65%',
    borderRadius: 12,
    backgroundColor: 'white',
    padding: normalizeDimens(10),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalizeDimens(5),
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: -2,
  },
  title: {
    fontFamily: customFont.primary[600],
    paddingVertical: normalizeDimens(9),
    paddingHorizontal: normalizeDimens(10),
    color: '#626262',
    fontSize: normalizeDimens(14),
  },
  message: {
    fontFamily: customFont.primary[400],
    marginTop: normalizeDimens(-4),
    color: '#7b7b7b',
    fontSize: normalizeDimens(12),
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: normalizeDimens(11),
    paddingVertical: normalizeDimens(7),
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: customFont.primary[400],
    color: '#fff',
    fontSize: normalizeDimens(12),
    marginBottom: Platform.OS === 'android' ? -3 : 0,
  },
  imageProfile: {
    width: normalizeDimens(55),
    height: normalizeDimens(55),
    resizeMode: 'contain',
  },
});

export default style;
