import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '@colors';
import customFont from '@fonts';
import normalizeDimens from '@utils/normalizeDimens';

export const textDaftar = (isPress: boolean): ViewStyle | TextStyle => ({
  fontSize: normalizeDimens(14),
  fontFamily: customFont.primary[600],
  marginLeft: 8,
  color: isPress ? colors.textPrimary : '#4F74DF',
});

const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: normalizeDimens(2),
  },
  wrapperLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: normalizeDimens(14),
    fontFamily: customFont.primary[500],
    color: colors.border,
  },
  wrapperLinkIcon: {
    flexDirection: 'row',
  },
});

export default style;
