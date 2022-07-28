import React, { ReactNode, useRef, useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
  ColorValue,
  GestureResponderEvent,
} from 'react-native';
import RippleAnimation from '@utils/rippleAnimation';
import normalizeDimens from '@utils/normalizeDimens';

interface IProps {
  onPress?: (_e: GestureResponderEvent) => void;
  rippleColor?: ColorValue;
  styleWrapper?: ViewStyle;
  children: ReactNode;
}

const TouchableItem: React.FC<IProps> = ({ onPress, rippleColor, styleWrapper, children }) => {
  const maxOpacity = 0.5;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(maxOpacity)).current;
  const [width, setWidth] = useState(0);

  const onClick = (e: GestureResponderEvent) => {
    if (onPress) setTimeout(() => {
      onPress(e);
    }, 100);
  };

  const animatedView = (scale: any, opacity: any): ViewStyle => ({
    position: 'absolute',
    width: normalizeDimens(width),
    height: scale ? normalizeDimens(width) : 0,
    borderRadius: normalizeDimens(width) / 2,
    transform: [{ scale }],
    opacity: opacity,
    backgroundColor: rippleColor,
  });

  const itemContentWrapper: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={() => RippleAnimation(scaleValue, opacityValue, maxOpacity)}
      onPress={onClick}>
      <View
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
        style={[itemContentWrapper, styleWrapper]}>
        <Animated.View style={animatedView(scaleValue, opacityValue)} />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

TouchableItem.defaultProps = {
  onPress: undefined,
  rippleColor: 'rgba(0, 0, 0, 0.3)',
  styleWrapper: undefined,
};

export default TouchableItem;
