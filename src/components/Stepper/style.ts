import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@utils/colors';
import customFont from '@utils/fonts';

export const lineStepDone = (status?: string | boolean ): ViewStyle => ({
  backgroundColor: status === '1'
    ? '#0d9488'
    : '#a1a1aa',
});

export const bulletStepDone = (status?: string, prevStatus?: string | boolean): ViewStyle => ({
  backgroundColor: status === '1' ? '#2dd4bf' : '#FFF',
  borderColor: status === '1'
    ? '#0d9488'
    : prevStatus === '1'
      ? '#0d9488'
      : '#a1a1aa',
});

export const textStepDone = (status?: string): TextStyle => ({
  color: status === '1' ? '#2dd4bf' : colors.textPrimary,
});

const style = StyleSheet.create({
  stepContent: {
    flexDirection: 'row',
  },
  line: {
    width: normalizeDimens(4) - 0.5,
    backgroundColor: colors.border,
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    bottom: -normalizeDimens(23),
  },
  bulletLineWrapp: {
    alignItems: 'center',
    marginTop: normalizeDimens(15),
  },
  bullet: {
    width: normalizeDimens(34),
    height: normalizeDimens(34),
    borderRadius: normalizeDimens(34) / 2,
    borderWidth: 3,
    backgroundColor: 'transparent',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descContainer: {
    flex: 1,
    marginLeft: normalizeDimens(28),
  },
  descWrapp: {
    alignSelf: 'baseline',
    justifyContent: 'center',
  },
  imgSource: {
    resizeMode: 'contain',
    width: normalizeDimens(29),
    height: normalizeDimens(29),
  },
  textName: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(14),
    color: colors.textPrimary,
    marginBottom: Platform.OS === 'ios' ? normalizeDimens(3) : -normalizeDimens(2),
  },
  textDesc: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
});

export default style;
