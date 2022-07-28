import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@utils/fonts';

const style = StyleSheet.create({
  headerWrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalizeDimens(10),
    paddingHorizontal: normalizeDimens(5),
  },
  textHeaderWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  textHeader: {
    fontSize: normalizeDimens(16),
    fontFamily: customFont.primary[600],
    color: '#FFF',
  },
});

export default style;
