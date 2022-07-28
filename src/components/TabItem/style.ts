import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@colors';
import customFont from '@utils/fonts';

export const animatedView = (scaleValue: any, opacityValue: any, width: any): ViewStyle => ({
  position: 'absolute',
  width: Platform.OS === 'ios' ? width - 4 : width,
  height: scaleValue ? Platform.OS === 'ios' ? width - 4 : width : 0,
  borderRadius: Platform.OS === 'ios' ? (width - 4) : width / 2,
  transform: [{ scale: scaleValue }],
  opacity: opacityValue,
  backgroundColor: colors.border,
});

export const labelStyle = (focused: boolean | undefined): TextStyle => ({
  color: focused ? colors.textPrimary : colors.border,
  fontSize: normalizeDimens(12),
  fontFamily: customFont.primary[400],
});

const style = StyleSheet.create({
  btnFieldWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
    paddingTop: normalizeDimens(10),
  },
  icon: {
    fontSize: normalizeDimens(22),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.red.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: normalizeDimens(15) / 2,
    top: -7,
    right: -15,
    width: normalizeDimens(15),
    height: normalizeDimens(15),
  },
  badgeText: {
    color: '#FFF',
    fontSize: normalizeDimens(10),
    textAlign: 'center',
  },
});

export default style;
