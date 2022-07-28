import { Dimensions, StyleSheet } from 'react-native';
import colors from '@utils/colors';
import customFont from '@utils/fonts';
import normalizeDimens from '@utils/normalizeDimens';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  ModalContainer: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    maxHeight: (Dimensions.get('window').height * 86) / 100,
  },
  topLineModal: {
    height: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  lineModal: {
    height: 4,
    backgroundColor: colors.border,
    width: 50,
    borderRadius: 20,
  },
  viewDisabled:{
    backgroundColor: 'rgba(202,75,66,0.2)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  textClosed: {
    fontFamily: customFont.primary[500],
    fontSize: normalizeDimens(13),
    color: colors.red.primary,
    position: 'absolute',
    right: 20,
    top: 8,
  },
});

export default styles;
