import { ColorValue, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '@colors';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@fonts';

const ios = Platform.OS === 'ios';

export const lineInput = (error: boolean, isFocus: boolean): ViewStyle => ({
  borderWidth: isFocus ? 2 : 1,
  borderColor: ((): ColorValue => {
    if (error) return colors.red.primary;
    if (isFocus) return colors.primary;
    return colors.border;
  })(),
});

export const androidInputText = (): ViewStyle => ({
  position: 'relative',
  bottom: -3,
});

export const getSizeIcon = (icSize: number | undefined): TextStyle => {
  if (!icSize) return {
    fontSize: normalizeDimens(20),
  };
  return {};
};

export const textAreaContainer = (contentHeight: {first: number, last: number}): ViewStyle => ({
  borderRadius: contentHeight.last > contentHeight.first
    ? 25 : 49,
});

export const textAreaWrappStyle = (contentHeight: {first: number, last: number}): ViewStyle => ({
  alignItems: contentHeight.last > contentHeight.first ? 'flex-end' : 'center',
});

export const textAreaStyle = (contentHeight: {first: number, last: number}): ViewStyle => ({
  minHeight: contentHeight.first === 0 ? undefined : contentHeight.last < contentHeight.first * (ios ? 6 : 3)
    ? contentHeight.last
    : contentHeight.first * (ios ? 6 : 3),
  maxHeight: contentHeight.first === 0 ? undefined : contentHeight.first * (ios ? 6 : 3),
});

export const iconTextArea = (contentHeight: {first: number, last: number}, btnDel?: boolean): ViewStyle => ({
  marginBottom: contentHeight.last > contentHeight.first
    ? btnDel ? normalizeDimens(5) : normalizeDimens(10)
    : 0,
});

const style = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 49,
    paddingHorizontal: normalizeDimens(10),
    alignSelf: 'stretch',
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    color: colors.textBlack,
    fontFamily: customFont.primary[400],
    letterSpacing: 0.7,
    marginLeft: normalizeDimens(9),
    paddingVertical: normalizeDimens(12),
    fontSize: normalizeDimens(14),
  },
  labelStyle: {
    marginLeft: normalizeDimens(32),
    fontSize: normalizeDimens(14),
    fontFamily: customFont.primary[400],
    backgroundColor: '#FFF',
    alignSelf: 'baseline',
    paddingHorizontal: 2,
    zIndex: -1,
  },
  floatingWrapp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  iconVisibility: {
    fontSize: normalizeDimens(20),
    color: colors.textPrimary,
  },
  iconWrapper: {
    minWidth: normalizeDimens(20),
    maxWidth: normalizeDimens(20),
    marginLeft: normalizeDimens(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconField: {
    color: colors.border,
  },
  btnFieldWrapper: {
    borderRadius: normalizeDimens(30) / 2,
    backgroundColor: 'transparent',
    width: normalizeDimens(30),
    height: normalizeDimens(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  exclamation: {
    color: colors.red.primary,
    marginRight: normalizeDimens(8),
  },
  errorHelper: {
    fontSize: normalizeDimens(12),
    color: colors.red.primary,
    marginLeft: normalizeDimens(20),
    marginTop: normalizeDimens(5),
  },

  //Text Area
  textAreaWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAreaLabelWrapp: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 44,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textAreaLabel: {
    fontSize: normalizeDimens(14),
    fontFamily: customFont.primary[400],
    backgroundColor: '#FFF',
    paddingHorizontal: 2,
  },
  inputTextAreaStyle: {
    marginTop: ios ? normalizeDimens(10) : 0,
  },
});

export default style;
