import { Animated } from 'react-native';

const RippleAnimation = (scaleValue: any, opacityValue: any, maxOpacity: any) => {
  const scaleAnimation = Animated.spring(scaleValue, {
    toValue: 1,
    useNativeDriver: true,
  });

  const opacityAnimation = Animated.timing(opacityValue, {
    toValue: 0,
    useNativeDriver: true,
  });

  // Animated.stagger(100, [scaleAnimation, opacityAnimation]).start(() => {
  //   scaleValue.setValue(0);
  //   opacityValue.setValue(maxOpacity);
  // });

  Animated.parallel([scaleAnimation, opacityAnimation], { stopTogether: false }).start(() => {
    scaleValue.setValue(0);
    opacityValue.setValue(maxOpacity);
  });
};

export default RippleAnimation;
