import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  TextStyle,
  ColorValue,
  ViewStyle,
} from 'react-native';
import Icon from 'src/components/Icon';
import Gap from 'src/components/Gap';
import normalizeDimens from '@utils/normalizeDimens';
import RippleAnimation from '@utils/rippleAnimation';
import colors from '@utils/colors';
import style, { btnStyle, animatedView, iconText } from './style';

interface IProps {
  isLoading?: boolean;
  background?: string;
  text?: string;
  rippleColor?: string;
  icType: string;
  icName: string;
  icSize?: number;
  icColor?: ColorValue;
  icStyle?: TextStyle;
  dimens?: number;
  styleContainer?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonIcon: React.FC<IProps> = ({
  isLoading,
  background,
  text,
  rippleColor,
  icType,
  icName,
  icSize,
  icColor,
  icStyle,
  dimens,
  styleContainer,
  disabled,
  onPress,
}) => {
  const maxOpacity = 0.8;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(maxOpacity)).current;
  const [width, setWidth] = useState(0);

  if (disabled) {
    scaleValue.setValue(0);
    opacityValue.setValue(maxOpacity);
    return (
      <View style={[style.loadingWrapper, btnStyle(dimens as number, background)]}>
        {!text &&
        <Icon type={icType} name={icName} color={icColor}
          size={icSize as number} style={icStyle} />}
        {text &&
        <>
          <Icon type={icType} name={icName} color={icColor}
            size={icSize as number} style={[icStyle || style.icon, icSize ? { fontSize: icSize } : {}]} />
          <Gap width={5} />
          <Text style={[icStyle || style.icon, style.text]}>{text}</Text>
        </>
        }
      </View>
    );
  }

  if (isLoading) return (
    <View style={[style.loadingWrapper, btnStyle(dimens as number, background)]}>
      <ActivityIndicator size={normalizeDimens(20)} color='#FFF' />
    </View>
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={() => RippleAnimation(scaleValue, opacityValue, maxOpacity)}
      onPress={() => setTimeout(() => {
        if (onPress) onPress();
      }, 200)}>
      <View
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={[text ? iconText(background) : btnStyle(dimens as number, background), styleContainer]}>
        <Animated.View style={animatedView(scaleValue, opacityValue, width, rippleColor)} />
        {!text &&
          <Icon type={icType} name={icName} color={icColor}
            size={icSize as number} style={icStyle} />}
        {text &&
          <>
            <Icon type={icType} name={icName} color={icColor}
              size={icSize as number} style={[icStyle || style.icon, icSize ? { fontSize: icSize } : {}]} />
            <Gap width={5} />
            <Text style={[icStyle || style.icon, style.text]}>{text}</Text>
          </>
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

ButtonIcon.defaultProps = {
  isLoading: false,
  background: colors.primary,
  text: undefined,
  rippleColor: undefined,
  icSize: undefined,
  icColor: '#333',
  icStyle: undefined,
  onPress: undefined,
  dimens: undefined,
  styleContainer: undefined,
  disabled: false,
};

export default ButtonIcon;
