import React from 'react';
import { View, Image } from 'react-native';
import style, { sizeIcon } from './style';
import compare from '@utils/compare';

const IconText: React.FC<{ width?: number; height?: number }> = ({ width, height }) => {
  return (
    <View>
      <Image
        source={require('@image/logo.png')}
        style={[style.image, sizeIcon(width, height)]} />
    </View>
  );
};

IconText.defaultProps = {
  width: 280,
  height: 40,
};

export default React.memo(IconText, compare);
