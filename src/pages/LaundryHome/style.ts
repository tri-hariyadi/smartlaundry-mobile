import { Platform, StyleSheet } from 'react-native';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@utils/colors';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerTxtWrapp: {
    width: '100%',
    backgroundColor: colors.primary,
    opacity: 0.7,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  markerTxt: {
    color: '#FFF',
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    paddingHorizontal: normalizeDimens(5),
  },
  btnOrderListWrapp:{
    position: 'absolute',
    top: 0,
    right: 0,
    padding: normalizeDimens(15),
  },
  icStyle: {
    color: '#FFF',
  },
  btnListTitle: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
  },
  btnListText: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: colors.border,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
  },
  listFlex: {
    flex:1,
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
    backgroundColor: '#FFF',
    paddingVertical: normalizeDimens(11),
    paddingHorizontal: normalizeDimens(13),
    borderRadius: 15,
  },
  basketWrapper: { width: '100%' },
  textItemBasket: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
  textDetailBasket: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(11),
    color: colors.border,
  },
  textTotalBasket: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(15),
    color: colors.textPrimary,
    marginBottom: -5,
  },
  txtGmaps: {
    marginBottom: Platform.OS === 'android' ? -3 : 0,
    color: colors.textPrimary,
  },
  card: {
    width: '100%',
    marginBottom: normalizeDimens(20),
  },
  cardContainer: {
  },

  listWrapper: {
    paddingHorizontal: normalizeDimens(15),
  },
  listEmptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingList: {
    padding: normalizeDimens(20),
  },
  itemListWrapp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: normalizeDimens(15),
  },
  txtListOrder: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
    marginBottom:  normalizeDimens(20),
    marginLeft: normalizeDimens(15),
  },
  flashMessage: {
    paddingTop: Platform.OS === 'android' ? normalizeDimens(55) : normalizeDimens(35),
  },

  //form
  formContainer: {
    paddingHorizontal: normalizeDimens(15),
  },
});

export default styles;
