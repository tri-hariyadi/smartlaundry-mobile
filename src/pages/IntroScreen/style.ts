import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import customFont from '@utils/fonts';
import colors from '@utils/colors';
import normalizeDimens from '@utils/normalizeDimens';

const { width } = Dimensions.get('window');

export const paginationDots = (opacity: number): ViewStyle => ({
  height: 10,
  width: 10,
  borderRadius: 10 / 2,
  backgroundColor: '#0898A0',
  marginLeft: 10,
  opacity: opacity,
});

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  slideWrapp: {
    width,
    // height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    resizeMode: 'stretch',
    position: 'absolute',
    transform: [
      {
        rotate: '30deg',
      },
      {
        translateX: 110,
      },
      {
        translateY: 140,
      },
    ],
    zIndex: -1,
  },
  image: {
    height: normalizeDimens(185),
    width: normalizeDimens(185),
    resizeMode: 'contain',
  },
  textWrapper: {
    marginTop: normalizeDimens(20),
    paddingHorizontal: normalizeDimens(20),
  },
  title: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(27),
    color: '#F4973E',
    // color: colors.primary,
    marginBottom: normalizeDimens(20),
    textAlign: 'center',
  },
  textDesc: {
    fontFamily: customFont.primary[400],
    color: '#8E8E93',
    fontSize: normalizeDimens(16),
    textAlign: 'center',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: 5,
    position: 'absolute',
  },
  footer: {
    flex: 0.3,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnGroupWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkipWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnNext: {
    // backgroundColor: '#E6781F',
    backgroundColor: colors.primary,
    width: normalizeDimens(50),
    height: normalizeDimens(50),
    borderRadius: normalizeDimens(50) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNextIcon: {
    color: '#FFF',
    fontSize: normalizeDimens(30),
  },
  btnDoneIcon: {
    color: '#FFF',
    fontSize: normalizeDimens(20),
  },
  textSkip: {
    color: colors.textPrimary,
    fontSize: normalizeDimens(15),
    fontFamily: customFont.primary[600],
  },
});

export default style;
