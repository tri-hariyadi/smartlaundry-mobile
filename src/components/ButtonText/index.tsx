import React, { useState } from 'react';
import { Text, View, TouchableHighlight, TextStyle } from 'react-native';
import compare from '@utils/compare';
import style, { textDaftar } from './style';

interface IProps {
  desc?: string;
  link: string;
  textLinkStyle?: TextStyle
  onPress: () => void;
}

const ButtonText: React.FC<IProps> = ({ desc, link, onPress, textLinkStyle }) => {
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
          <Text style={[textDaftar(isPress), textLinkStyle]}>{link}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

ButtonText.defaultProps = {
  desc: undefined,
  textLinkStyle: undefined,
};

export default React.memo(ButtonText, compare);
