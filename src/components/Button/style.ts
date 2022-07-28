import { Dimensions, StyleSheet, Platform, ViewStyle } from 'react-native';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';

const { width } = Dimensions.get('window');

export const btnBackground = (color: string | undefined): ViewStyle => ({
  backgroundColor: color,
});

export const btnBlock = (isBlock: boolean | undefined): ViewStyle => ({
  alignSelf: isBlock ? 'stretch' : 'baseline',
  paddingVertical: normalizeDimens(isBlock ? 13 : 9),
});

export const animatedView = (scaleValue: any, opacityValue: any, color?: string): ViewStyle => ({
  position: 'absolute',
  width: normalizeDimens(width),
  height: scaleValue ? normalizeDimens(width) : 0,
  borderRadius: normalizeDimens(width) / 2,
  transform: [{ scale: scaleValue }],
  opacity: opacityValue,
  backgroundColor: color ? color : '#DEE2E6',
});

const style = StyleSheet.create({
  loadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 49,
    paddingHorizontal: normalizeDimens(13),
    opacity: 0.7,
  },
  btnText: {
    fontFamily: customFont.primary[500],
    color: '#FFF',
    marginLeft: normalizeDimens(5),
    fontSize: normalizeDimens(14),
    letterSpacing: 0.7,
    top: Platform.OS === 'android' ? 2 : 0,
  },
  btnIosWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 49,
    paddingHorizontal: normalizeDimens(13),
    overflow: 'hidden',
  },
  btnContentWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAndroidContainer: {
    overflow: 'hidden',
    borderRadius: 1000,
  },
  btnAndroidWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 49,
    paddingHorizontal: normalizeDimens(13),
  },
  childrenIcon: {
    color: '#FFF',
    fontSize: normalizeDimens(19),
  },
});

export default style;
