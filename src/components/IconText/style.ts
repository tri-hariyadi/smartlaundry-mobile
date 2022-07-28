import { StyleSheet } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';

export const sizeIcon = (width: number | undefined, height: number | undefined) => ({
  width: width || normalizeDimens(280),
  height: height || normalizeDimens(40),
});

const style = StyleSheet.create({
  image: {
    resizeMode: 'stretch',
    width: normalizeDimens(280),
    height: normalizeDimens(40),
  },
});

export default style;
