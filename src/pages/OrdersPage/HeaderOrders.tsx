import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from './style';

interface IProps {
  routeName: string;
  isFocused: boolean;
  index: number;
  topBarArr: Array<any>;
  onPress: () =>void;
  onLongPress: () =>void;
  animref: Animated.Value
}

const HeaderOrders: React.FC<MaterialTopTabBarProps & IProps> = ({
  routeName, isFocused, onPress, onLongPress, index, animref,
}) => {
  const [bgWidth, setBgWidth] = useState(0);
  const btnClicked = useRef(false);

  const bgStyle = (name: any) => ({
    transform: [{
      translateX: animref.interpolate({
        inputRange: [0, 1],
        outputRange: [name === 'Order Berlangsung' ? 0 : -bgWidth, name === 'Order Berlangsung' ? bgWidth : 0],
      }),
    }],
  });

  const textStyle = (name: string) => {
    return {
      color: animref.interpolate({
        inputRange: [0, 1],
        outputRange: [name === 'Order Berlangsung' ? '#000' : '#FFF', name === 'Order Berlangsung' ? '#FFF' : '#000'],
      }),
    };
  };

  const onBtnHeaderClick = (name: any) => {
    btnClicked.current === true;
    Animated.timing(animref, {
      toValue: name === 'Order Berlangsung' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (onPress) onPress();
    });
  };

  React.useEffect(() => {
    if (!btnClicked.current) Animated.timing(animref, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => (btnClicked.current = false));
  }, [isFocused]);

  return (
    <Animated.View style={styles.headerButton}>
      <View onLayout={e => setBgWidth(e.nativeEvent.layout.width)}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.headerBtnWrapp, index === 0 ? {marginLeft: 20} : {marginRight: 20},
          index === 0 ? styles.btnTab1 : styles.btnTab2]}>
        <Animated.View style={[styles.bgHeaderBtn, bgStyle(routeName)]} />
        <TouchableOpacity onPress={() => onBtnHeaderClick(routeName)} onLongPress={onLongPress}
          style={[styles.btnTab, index === 0 ? styles.btnTab1 : styles.btnTab2]}>
          <Animated.Text style={[styles.textHeaderBtn, textStyle(routeName)]}>
            {routeName}
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default HeaderOrders;
