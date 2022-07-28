import { Platform, StyleSheet, ViewStyle } from 'react-native';
import customFont from '@utils/fonts';
import normalizeDimens from 'src/utils/normalizeDimens';

export const btnStyle = (value: number, color: string | undefined): ViewStyle => ({
  width: normalizeDimens(value),
  height: normalizeDimens(value),
  borderRadius: normalizeDimens(value) / 2,
  backgroundColor: color,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const animatedView = (scaleValue: any, opacityValue: any, width: number, color?: string): ViewStyle => ({
  position: 'absolute',
  width: normalizeDimens(width),
  height: scaleValue ? normalizeDimens(width) : 0,
  borderRadius: normalizeDimens(width) / 2,
  transform: [{ scale: scaleValue }],
  opacity: opacityValue,
  backgroundColor: color ? color : '#DEE2E6',
});

export const iconText = (color: string | undefined): ViewStyle => ({
  backgroundColor: color,
  flexDirection: 'row',
  alignSelf: 'baseline',
  paddingVertical: normalizeDimens(5),
  paddingHorizontal: normalizeDimens(10),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 49,
  overflow: 'hidden',
});

const style = StyleSheet.create({
  text: {
    fontFamily: customFont.primary[400],
    top: Platform.OS === 'android' ? 1 : 0,
  },
  loadingWrapper:   {
    opacity: 0.7,
  },
  icon: {
    fontSize: normalizeDimens(16),
  },
});

export default style;
