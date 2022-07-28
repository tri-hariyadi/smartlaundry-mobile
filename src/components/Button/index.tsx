import React, { useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '@colors';
import normalizeDimens from '@utils/normalizeDimens';
import RippleAnimation from '@utils/rippleAnimation';
import style, { animatedView, btnBackground, btnBlock } from './style';
import Icon from '../Icon';
import Gap from '../Gap';

interface IProps {
  isLoading?: boolean;
  background?: string;
  isBlock?: boolean;
  text: string;
  rippleColor?: string;
  icType?: string;
  icName?: string;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({
  isLoading,
  background,
  isBlock,
  text,
  rippleColor,
  icType,
  icName,
  onPress,
}) => {
  const maxOpacity = 0.8;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(maxOpacity)).current;

  const onBtnClick = () => {
    if (onPress) setTimeout(() => {
      onPress();
    }, 200);
  };

  if (isLoading) return (
    <View style={[style.loadingWrapper, btnBackground(background), btnBlock(isBlock)]}>
      <ActivityIndicator size={normalizeDimens(20)} color='#FFF' />
      <Text style={style.btnText}>Loading...</Text>
    </View>
  );

  if (Platform.OS === 'ios') return (
    <TouchableWithoutFeedback
      onPressIn={() => RippleAnimation(scaleValue, opacityValue, maxOpacity)}
      onPress={onBtnClick}>
      <View style={[style.btnIosWrapper, btnBackground(background), btnBlock(isBlock)]}>
        <Animated.View style={animatedView(scaleValue, opacityValue)} />
        <View style={style.btnContentWrapp}>
          <Text style={style.btnText}>{text}</Text>
          {icType && icName && <Gap width={7} />}
          {icType && icName && <Icon type={icType} name={icName} style={style.childrenIcon} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={style.btnAndroidContainer}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          rippleColor ? rippleColor : '#FFF', true,
        )}>
        <View style={[style.btnAndroidWrapper, btnBackground(background), btnBlock(isBlock)]}>
          <View style={style.btnContentWrapp}>
            <Text style={style.btnText}>{text}</Text>
            {icType && icName && <Gap width={7} />}
            {icType && icName && <Icon type={icType} name={icName} style={style.childrenIcon} />}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

Button.defaultProps = {
  isLoading: false,
  background: colors.primary,
  isBlock: true,
  rippleColor: '',
  icType: undefined,
  icName: undefined,
};

export default Button;
