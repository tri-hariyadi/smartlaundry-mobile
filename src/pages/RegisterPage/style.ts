import { StyleSheet } from 'react-native';
import colors from '@colors';
import customFont from '@fonts';
import normalizeDimens from '@utils/normalizeDimens';

const style = StyleSheet.create({
  safeArea: {
    flex:  1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: normalizeDimens(25),
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    justifyContent: 'space-evenly',
    paddingVertical: normalizeDimens(25),
    flexGrow: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLogo: {
    fontSize: normalizeDimens(80),
    color: colors.textPrimary,
  },
  textWelcome: {
    fontSize: normalizeDimens(30),
    color: '#1e40af',
    fontFamily: customFont.primary[500],
    textAlign: 'center',
  },
  textDesc: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(16),
    color: colors.border,
    textAlign: 'center',
  },
});

export default style;
