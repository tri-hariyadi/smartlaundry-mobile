import { Platform, StyleSheet, TextStyle } from 'react-native';
import colors from '@colors';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@utils/fonts';

export const textProgress = (status: string): TextStyle => ({
  fontFamily: customFont.primary[400],
  fontSize: normalizeDimens(10),
  color: status === '1' ? '#0d9488' : colors.textPrimary,
});

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: normalizeDimens(16),
  },
  headerBtnWrapp: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bgHeaderBtn: {
    backgroundColor: '#E5F6FE',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  btnTab: {
    flex: 1,
    borderColor: '#E5F6FE',
    borderWidth: 1,
    paddingVertical: normalizeDimens(8),
    paddingHorizontal: normalizeDimens(5),
  },
  btnTab1: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0,
  },
  btnTab2: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0,
  },
  textHeaderBtn: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    textAlign: 'center',
    marginBottom: Platform.OS === 'android' ? -2 : 0,
  },
  content: {
    flex: 1,
    padding: normalizeDimens(15),
    backgroundColor: '#EFEFF4',
  },
  itemHeader: {
    padding: normalizeDimens(13),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
  },
  titleDesc: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: colors.border,
    marginTop: Platform.OS === 'android' ? -2 : 0,
  },
  itemProgress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: normalizeDimens(13),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icStyle: {
    color: '#FFF',
    fontSize: normalizeDimens(12),
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    padding: normalizeDimens(15),
    justifyContent: 'flex-end',
  },
  footerPastOrder: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //Past Order
  descPastOrder: {
    flex: 1,
  },
  imgService: {
    resizeMode: 'stretch',
    width: normalizeDimens(90),
    height: normalizeDimens(90),
    borderRadius: 15,
  },
  textDone: {
    color: '#0d9488',
    fontFamily: customFont.primary[500],
  },
  itemHeaderPastOrder: {
    flexDirection: 'row',
  },
  itemOrderAgain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textServiceName: {
    fontFamily: customFont.primary[400],
    color: colors.border,
    fontSize: normalizeDimens(12),
  },
  totalPrice: {
    fontFamily: customFont.primary[600],
    color: colors.textPrimary,
    fontSize: normalizeDimens(14),
  },
  reviewWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(14),
    color: colors.textPrimary,
  },
  btnReview: {
    flex: 1,
    alignItems: 'center',
    padding: normalizeDimens(15),
    alignSelf: 'stretch',
  },
  listContainerStyle: {
    flexGrow: 1,
  },
  listEmptyContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingList: {
    alignSelf: 'stretch',
    height: '100%',
    padding: normalizeDimens(20),
    borderRadius: 15,
    backgroundColor: '#FFF',
  },

  //detailorder
  detailContainer: {
    paddingHorizontal: normalizeDimens(20),
    flexGrow: 1,
  },
  imgDetail: {
    resizeMode: 'stretch',
    width: '100%',
    height: normalizeDimens(180),
    borderRadius: 15,
  },
  detailTitle: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(17),
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  detailPromoWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailPromoText: {
    color: colors.textPrimary,
  },
  detailTextDesc: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(14),
    color: colors.border,
  },
  detailTextPrice: {
    fontFamily: customFont.primary[600],
    color: colors.textPrimary,
    fontSize: normalizeDimens(14),
  },
  textDiscount: {
    fontSize: normalizeDimens(12),
    fontFamily: customFont.primary[700],
    color: '#FFF',
    top: Platform.OS === 'android' ? 1 : 0,
  },
  detailPrice: {
    fontSize: normalizeDimens(11),
  },

  //Review Style
  reviewContainer: {
    paddingHorizontal: normalizeDimens(15),
  },
  imgProdReview: {
    width: normalizeDimens(40),
    height: normalizeDimens(40),
    borderRadius: 8,
    resizeMode: 'stretch',
  },
  txtNameServiceReview: {
    fontSize: normalizeDimens(14),
    fontFamily: customFont.primary[500],
    color: colors.textPrimary,
  },
  txtSubServiceReview: {
    fontSize: normalizeDimens(12),
    fontFamily: customFont.primary[400],
    color: colors.border,
    marginTop: normalizeDimens(2),
  },
});

export default style;
