import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@fonts';
import colors from '@colors';

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: normalizeDimens(15),
    paddingVertical: normalizeDimens(25),
    backgroundColor: 'transparent',
  },
  icStyle: {
    color: '#FFF',
  },
  cardContentWrapp: {
    padding: normalizeDimens(15),
  },
  cardTitle: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgProfile: {
    resizeMode: 'contain',
    width: normalizeDimens(80),
    height: normalizeDimens(80),
  },
  textProfile: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.border,
  },
  textName: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(17),
    color: colors.textPrimary,
  },

  //list
  btnListWrapper: {
    paddingHorizontal: normalizeDimens(15),
    paddingVertical: normalizeDimens(12),
    marginHorizontal: -normalizeDimens(15),
  },
  btnListText: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(14),
    color: colors.textPrimary,
    marginLeft: normalizeDimens(10),
  },

  //info item
  infoContainer: {
    paddingHorizontal: normalizeDimens(18),
  },
  infoTitle: {
    fontFamily: customFont.primary[600],
    fontSize: normalizeDimens(16),
    color: colors.textPrimary,
  },
  textItemInfo: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(14),
    color: colors.border,
  },

  //about
  imgLogo: {
    width: '100%',
    height: normalizeDimens(23),
    resizeMode: 'contain',
  },
  aboutContainer: {
    alignItems: 'center',
  },
  textDetail: {
    textAlign: 'justify',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },

  //address
  wrapperMap: {
    height: normalizeDimens(250),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  txtAddress: {
    fontSize: normalizeDimens(12.5),
  },

  //Edit
  editContainer: {
    marginTop: -normalizeDimens(10),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  editTitle: {
    marginLeft: -normalizeDimens(15),
  },
});

export default style;
