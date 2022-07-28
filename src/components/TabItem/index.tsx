import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, GestureResponderEvent } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import colors from '@utils/colors';
import style, { animatedView, labelStyle } from './style';
import Icon from '../Icon';
import Gap from '../Gap';

interface IProps {
  item: {
    route: any, label: any,
    type: any, component: any,
    activeIcon: any, inActiveIcon: any, badge: number;
  };
}

const TabItem: React.FC<BottomTabBarButtonProps & IProps> = ({ item, onPress, accessibilityState }) => {
  const maxOpacity = 0.6;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(maxOpacity)).current;
  const animateIcon = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const focused = accessibilityState?.selected;
  const isMounted = useRef(false);
  const scaleAnimation = Animated.spring(scaleValue, {
    toValue: 1,
    useNativeDriver: true,
  });
  const opacityAnimation = Animated.timing(opacityValue, {
    toValue: 0,
    useNativeDriver: true,
  });

  const onTabPressed = (event: GestureResponderEvent) => {
    if (onPress) onPress(event);
  };

  useLayoutEffect(() => {
    Animated.timing(animateIcon, {
      toValue: focused ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (focused && isMounted.current) {
      Animated.parallel([scaleAnimation, opacityAnimation], { stopTogether: true }).start(() => {
        scaleValue.setValue(0);
        opacityValue.setValue(maxOpacity);
      });
    }
    isMounted.current = true;
  }, [focused]);

  const contentStyle = {
    transform: [
      {
        translateY: animateIcon.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const iconStyle = {
    transform: [
      {
        translateY: animateIcon.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -3],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={onTabPressed}>
      <View style={style.btnFieldWrapper} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <Animated.View style={animatedView(scaleValue, opacityValue, width)} />
        <Animated.View style={[contentStyle, style.content]}>
          <Animated.View style={iconStyle}>
            {item.badge ?
              <View style={style.badge}>
                <Text style={style.badgeText}>{item.badge}</Text>
              </View> : null
            }
            <Icon
              type={item.type}
              style={style.icon}
              name={focused ? item.activeIcon : item.inActiveIcon}
              color={focused ? colors.primary : colors.border} />
          </Animated.View>
          <Gap height={3} />
          <Text style={labelStyle(focused)}>{item.label}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabItem;
