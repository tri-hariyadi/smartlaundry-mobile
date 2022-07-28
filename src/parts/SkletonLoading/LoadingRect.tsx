import React, { useEffect, useRef } from 'react';
import { StyleProp, ViewStyle, Animated, Easing } from 'react-native';
import normalizeDimens from '@utils/normalizeDimens';
import styles from './style';

interface IProps {
  width: string | number;
  height: string | number;
  style?: StyleProp<ViewStyle>;
}

const LoadingRect: React.FC<IProps> = ({ width, height, style }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 250,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Animated.View
      style={[
        styles.LoadingRect,
        {
          width: typeof width !== 'string' ? normalizeDimens(width as number) : width,
          height: typeof height !== 'string' ? normalizeDimens(height as number) : height,
        },
        { opacity: opacityAnim },
        style,
      ]}
    />
  );
};

LoadingRect.defaultProps = {
  style: undefined,
};

export default React.memo(LoadingRect);
