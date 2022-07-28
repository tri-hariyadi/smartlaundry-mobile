import { Animated, StyleSheet } from 'react-native';
import colors from '@utils/colors';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    zIndex: -1,
  },
  scrollContainer: {
    padding: normalizeDimens(12),
  },
  safeArea: {
    backgroundColor: '#EFEFF4',
  },
  cardLocation: {
    overflow: 'hidden',
    paddingVertical: normalizeDimens(10),
  },
  touchableItem: {
    paddingVertical: normalizeDimens(10),
    paddingHorizontal: normalizeDimens(25),
  },
  locContainer: {
    marginLeft: normalizeDimens(10),
  },
  locOptionWrapp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  },
  locOptionText: {
    fontFamily: customFont.primary[400],
    fontSize: normalizeDimens(13),
    color: colors.textPrimary,
    marginLeft: normalizeDimens(5),
  },
  formCardContainer: {
    paddingVertical: normalizeDimens(10),
  },
  formCard: {
    paddingHorizontal: normalizeDimens(15),
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },

  //Warning style
  warnContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    // alignItems: 'center',
    backgroundColor: '#facc15',
    paddingHorizontal: normalizeDimens(15),
    paddingVertical: normalizeDimens(10),
    // zIndex: 2,
    position: 'absolute',
  },
  warnText: {
    flex: 1,
    fontFamily: customFont.primary[700],
    color: '#333',
    fontSize: normalizeDimens(12),
  },
  warnDetail: {
    fontFamily: customFont.primary[400],
  },
});

export const warnStyle = (animated: Animated.Value, height: number) => ({
  top: animated.interpolate({
    inputRange: [0, 1],
    outputRange: [-height || -100, 0],
  }),
});

export const scrollStyle = (animated: Animated.Value, height: number) => ({
  transform: [{
    translateY: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height],
    }),
  }],
});

export default style;
