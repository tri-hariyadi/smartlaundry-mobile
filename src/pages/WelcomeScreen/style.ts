import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    fontSize: 70,
    marginBottom: 10,
    color: '#252C5B',
  },
  background: {
    resizeMode: 'stretch',
    position: 'absolute',
    zIndex: 9999,
    transform: [
      {
        rotate: '30deg',
      },
      {
        translateX: 110,
      },
      {
        translateY: 140,
      },
    ],
  },
  flashMessage: {
    paddingTop: normalizeDimens(43),
  },
});

export default style;
