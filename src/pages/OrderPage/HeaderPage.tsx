import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Icon } from '@components';
import colors from '@colors';
import compare from '@utils/compare';
import style, { btnFocused } from './style';

interface IProps {
  routeName: string;
  isFocused: boolean;
  index: number;
  topBarArr: Array<any>;
  onPress: () =>void;
  onLongPress: () =>void;
}

const HeaderPage: React.FC<MaterialTopTabBarProps & IProps> = ({
  routeName, isFocused, onPress, onLongPress,
}) => {
  const animateBg = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animateBg, {
      toValue: isFocused ? 1 : 0, duration: 200, useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const getItem = (): {icName: string; text: string} => {
    switch (routeName) {
      case 'Man':
        return {icName: 'face-man', text:  'Pria'};
      case 'Woman':
        return {icName: 'face-woman', text:  'Wanita'};
      case 'Child':
        return {icName: 'face-man-profile', text:  'Anak'};
      case 'Other':
        return {icName: 'human-cane', text:  'Lainnya'};

      default:
        return {icName: 'face-man', text:  'Pria'};
    }
  };

  return (
    <View style={style.header}>
      <View style={style.btnHeaderWrapper}>
        <TouchableOpacity style={style.styleBtnHeader} onPress={onPress} onLongPress={onLongPress}>
          <Animated.View style={[style.bgFocusBtnHeader, btnFocused(animateBg)]} />
          <Icon type={Icon.type.mci} name={getItem().icName} size={25}
            color={isFocused ? colors.textPrimary : '#FFF'} />
        </TouchableOpacity>
        <Text style={style.textHeader}>{getItem().text}</Text>
      </View>
    </View>
  );
};

export default React.memo(HeaderPage, compare);
