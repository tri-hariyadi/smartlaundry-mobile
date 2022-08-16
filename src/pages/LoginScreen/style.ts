import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@colors';
import customFont from '@fonts';

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: normalizeDimens(25),
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    justifyContent: 'space-evenly',
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
  recoveryWrapp: {
    alignItems: 'flex-end',
    paddingRight: normalizeDimens(15),
    marginTop: normalizeDimens(5),
  },
  textLinkStyle: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
  },
  forgotPassWrapp: {
    marginHorizontal: normalizeDimens(18),
  },
  forgotPassTitle: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(20),
    color: colors.textPrimary,
    marginBottom: normalizeDimens(13),
  },
  forgotPassText: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(14),
    color: colors.border,
  },
});

export default style;
