import { Platform, StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@utils/fonts';
import colors from '@utils/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper:  {
    flexGrow: 1,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    padding: normalizeDimens(15),
    justifyContent: 'space-between',
  },
  safeArea: {
    backgroundColor: '#EFEFF4',
  },
  bannerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalizeDimens(40),
  },
  topHeaderTitle: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(18),
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: Platform.OS === 'android' ? -1 : 0,
  },
  topHeaderText: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.border,
    textAlign: 'center',
  },
  itemDetaiWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalizeDimens(15),
    paddingHorizontal:normalizeDimens(15),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  itemText: {
    flex: 1,
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
  valueItemText: {
    textAlign: 'right',
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12.5),
    color: 'rgba(0,0,0,0.7)',
    maxWidth: normalizeDimens(200),
  },
  imgWrapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img2: {
    position: 'absolute',
  },
  loadingWrapper: {
    marginHorizontal: normalizeDimens(30),
    flex: 1,
    marginTop: normalizeDimens(30),
  },
  rectStyle: {
    borderRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  bgRect: {
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  btnTrack: {
    position: 'relative',
    bottom: 0,
    paddingHorizontal: normalizeDimens(15),
    backgroundColor: 'transparent',
    paddingVertical: normalizeDimens(10),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    flexDirection: 'column',
    paddingHorizontal: normalizeDimens(15),
  },
  errorText: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(15),
    color: colors.textPrimary,
    textAlign:  'center',
  },
});

export default style;
