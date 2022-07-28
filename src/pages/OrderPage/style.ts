import { Animated, Platform, StyleSheet } from 'react-native';
import colors from '@colors';
import customFont from '@fonts';
import normalizeDimens from '@utils/normalizeDimens';

export const btnFocused = (animated: Animated.Value) => ({
  backgroundColor: animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#E5F6FE'],
  }),
});

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  safeArea: {
    backgroundColor: '#EFEFF4',
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: normalizeDimens(10),
  },
  styleBtnHeader: {
    borderWidth: 2,
    borderColor: '#E5F6FE',
    padding: normalizeDimens(5),
    borderRadius: 1000,
    overflow: 'hidden',
  },
  btnHeaderWrapper: {
    alignSelf: 'baseline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgFocusBtnHeader: {
    width: '200%',
    height: '200%',
    position: 'absolute',
    zIndex: -1,
  },
  textHeader: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: '#E5F6FE',
    marginTop: normalizeDimens(5),
  },

  //list
  listContainerStyle: {
    flexGrow: 1,
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: normalizeDimens(12),
  },
  cardContentWrapp: {
    paddingVertical: normalizeDimens(15),
    paddingHorizontal: normalizeDimens(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSubService: {
    resizeMode: 'contain',
    width: normalizeDimens(60),
    height: normalizeDimens(60),
  },
  nameService: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(15),
    color: colors.textPrimary,
    marginBottom: normalizeDimens(2),
  },
  priceService: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.border,
    marginTop: Platform.OS === 'android' ? -1 : 0,
  },
  itemServiceWrapp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  addContent: {
    alignItems: 'center',
  },
  btnAddMinWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPrice: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
    marginRight: normalizeDimens(8),
  },
  addTotal: {
    marginHorizontal: normalizeDimens(16),
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(15),
    color: colors.textPrimary,
  },
  listEmptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textListEmpty: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
  },

  //Bottom Content
  bottomContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 999,
    left: 0,
    right:  0,
    bottom: 0,
    paddingHorizontal: normalizeDimens(10),
  },
  basketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#10b981',
    paddingVertical: normalizeDimens(8),
    paddingHorizontal: normalizeDimens(12),
    borderRadius: 15,
  },
  textItemBasket: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: '#FFF',
  },
  textDetailBasket: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(11),
    color: '#FFF',
  },
  totalBasket: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textTotalBasket: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(13),
    color: '#FFF',
    marginBottom: -5,
  },
  card: {
    width: '100%',
    marginBottom: normalizeDimens(15),
  },
  cardContainer: {
  },
});

export default style;
