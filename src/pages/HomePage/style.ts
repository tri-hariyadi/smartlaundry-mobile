import { Platform, StyleSheet } from 'react-native';
import colors from '@utils/colors';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentWrapper: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FFF',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: normalizeDimens(18),
    backgroundColor: '#E5F6FE',
  },
  textBannerWrapper: {
    flex: 1,
  },
  titleBanner:{
    textTransform: 'uppercase',
    fontFamily: customFont.primary[500],
    fontSize:  normalizeDimens(25),
    color: colors.textPrimary,
  },
  descBanner:{
    fontFamily: customFont.primary[400],
    fontSize:  normalizeDimens(13),
    color: colors.textPrimary,
  },
  imgBanner: {
    resizeMode: 'contain',
    width: normalizeDimens(110),
    height: normalizeDimens(110),
  },
  services: {
    fontFamily: customFont.primary[600],
    fontSize:  normalizeDimens(20),
    color: colors.textPrimary,
    marginLeft: normalizeDimens(18),
    marginBottom: -8,
  },

  //render item
  listContainerStyle: {
    flexGrow: 1,
  },
  cardWrapp: {
    overflow: 'visible',
  },
  renderItemWrapp: {
    marginHorizontal: normalizeDimens(15),
  },
  itemWrapp: {
    backgroundColor: '#ECFFFF',
    flexDirection: 'row',
    paddingRight:  normalizeDimens(5),
    // paddingVertical: normalizeDimens(15),
    borderRadius: 15,
    alignItems:  'center',
  },
  itemImg: {
    resizeMode: 'stretch',
    width: normalizeDimens(100),
    height: '100%',
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: normalizeDimens(10),
    paddingVertical: normalizeDimens(15),
  },
  itemTextWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeDimens(4),
  },
  itemText: {
    fontFamily: customFont.primary[500],
    fontSize:  normalizeDimens(13),
    color: colors.textPrimary,
    textTransform:'capitalize',
    top: Platform.OS === 'android' ? 2 : 0,
    marginLeft: normalizeDimens(5),
  },
  itemTextPrice: {
    fontFamily: customFont.primary[700],
  },
  discountWrapp: {
    backgroundColor: colors.red.primary,
    paddingHorizontal: normalizeDimens(10),
    paddingVertical: normalizeDimens(3),
    borderRadius: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent:'center',
    alignItems:'center',
  },
  promoIcon: {
    fontSize: normalizeDimens(30),
  },
  textDiscount: {
    fontSize: normalizeDimens(12),
    fontFamily: customFont.primary[700],
    color: '#FFF',
    top: Platform.OS === 'android' ? 1 : 0,
  },
  icStyle: {
    fontSize: normalizeDimens(12),
    color: '#FFF',
  },
  btnOrder: {
    flex: 1,
    flexDirection:  'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    marginRight: normalizeDimens(5),
  },


  //Detail Style
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
  detailLaundryWrapp: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: normalizeDimens(15),
  },
  detailTextLaundryName: {
    flex:1,
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(14),
    color: colors.textPrimary,
  },
  detailInfoWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailPrice: {
    fontSize: normalizeDimens(11),
  },
  detailLaundryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textCekUlasan: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(13),
    color: colors.emerald[500],
  },

  //Disabled card
  viewDisabled:{
    backgroundColor: 'rgba(202,75,66,0.2)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999,
    borderRadius: 15,
  },
  textClosed: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.red.primary,
    position: 'absolute',
    right: 8,
    top: 5,
  },
  viewDisabledModal: {
    borderRadius: 0,
  },
  textClosedModal: {
    right: 25,
    top: 15,
  },

  //Reviews
  reviewsContainer: {
    paddingHorizontal: normalizeDimens(16),
  },
  headerReviews: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalizeDimens(10),
  },
  fakeAfatar: {
    width: normalizeDimens(40),
    height: normalizeDimens(40),
    backgroundColor: colors.green[800],
    borderRadius: normalizeDimens(40) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalizeDimens(10),
  },
  fakeAfatarText: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: 'white',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: Platform.OS === 'android' ? -2 : 0,
    marginLeft: Platform.OS === 'ios' ? 1 : 0,
  },
  nameReviewer: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
  reviewCreated: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: colors.border,
    marginBottom: Platform.OS === 'android' ? -4 : 0,
  },
  itemReviewsWrapp: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 1,
    paddingBottom: 1,
    borderRadius: 15,
  },
  commentTextWrapp: {
    backgroundColor: 'white',
    padding: normalizeDimens(10),
    borderRadius: 15,
  },
  commentText: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(12),
    color: colors.textPrimary,
  },
  beforeBulb: {
    width: normalizeDimens(15),
    height: normalizeDimens(15),
    backgroundColor: 'white',
    transform: [
      {rotate: '-45deg'},
    ],
    position: 'absolute',
    left: 22,
    top:-((normalizeDimens(15) / 2) - 1),
    borderWidth: 1,
    borderColor: colors.border,
  },
  starWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizeDimens(10),
    paddingVertical: normalizeDimens(4),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: normalizeDimens(10),
  },
  textStar: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(14),
    marginBottom: Platform.OS === 'android' ? -4 : 0,
  },
  starAverage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingAverageWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtRatingAverage: {
    fontFamily: customFont.primary[700],
    fontSize: normalizeDimens(18),
    color: colors.textPrimary,
    marginBottom: Platform.OS === 'android' ? -8 : 0,
  },
  allReviews: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(18),
    color: colors.textPrimary,
  },
  rowBtnBack: {
    marginLeft: -normalizeDimens(10),
  },
});

export default style;
