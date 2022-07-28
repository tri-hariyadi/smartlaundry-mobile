import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@utils/fonts';
import colors from '@utils/colors';

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    padding: normalizeDimens(15),
    justifyContent: 'space-between',
  },
  safeArea: {
    backgroundColor: '#EFEFF4',
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: normalizeDimens(15),
    borderRadius: 15,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: customFont.primary[600],
  },
  textItem: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
  textTypeItem: {
    fontSize: normalizeDimens(13),
    color: colors.border,
  },
  itemPrice: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.border,
  },
  textTotalAmount: {
    fontFamily: customFont.primary[600],
  },
});

export default style;
