import { View, ViewStyle } from 'react-native';
import React from 'react';
import normalizeDimens from '@utils/normalizeDimens';

const getGap = (width?: number, height?: number, debug?: string | null): ViewStyle => ({
  width: width ? normalizeDimens(width) : 0,
  height: height ? normalizeDimens(height) : 0,
  backgroundColor: debug ? debug : 'transparent',
});

const Gap: React.FC<{width?: number, height?: number, debug?: string | null}> = ({ width, height, debug}) => {
  return (
    <View style={getGap(width, height, debug)} />
  );
};

Gap.defaultProps = {
  width: 0,
  height: 0,
  debug: null,
};

export default Gap;
