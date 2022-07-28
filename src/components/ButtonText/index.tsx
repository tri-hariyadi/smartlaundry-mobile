import React, { useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import compare from '@utils/compare';
import style, { textDaftar } from './style';

interface IProps {
  desc?: string;
  link: string;
  onPress: () => void;
}

const ButtonText: React.FC<IProps> = ({ desc, link, onPress }) => {
  const [isPress, setIsPress] = useState(false);
  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'transparent',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      setTimeout(() => {
        onPress();
      }, 100);
    },
  };

  return (
    <View style={style.container}>
      <View style={style.wrapperLink}>
        {desc && <Text style={style.text}>{desc}</Text>}
        <TouchableHighlight {...touchProps}>
          <Text style={textDaftar(isPress)}>{link}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

ButtonText.defaultProps = {
  desc: undefined,
};

export default React.memo(ButtonText, compare);
