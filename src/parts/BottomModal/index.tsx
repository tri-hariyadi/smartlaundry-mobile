import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Text,
  View,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Gap from 'src/components/Gap';
import styles from './style';

interface IProps {
  children?: React.ReactNode;
  childrenWrapperStyle?: ViewStyle;
  isDisabled?: boolean;
  textDisabled?: string;
  onTouchOutside?: () => void;
  onDismiss?: () => void;
  ref: React.ForwardedRef<unknown>;
}

const BottomModal: React.FC<IProps> = React.forwardRef(({
  children,
  childrenWrapperStyle,
  isDisabled,
  textDisabled,
  onTouchOutside,
  onDismiss,
}, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalHeight = useRef(0);
  const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current;
  const resetPositionAnim = useRef(Animated.timing(panY, {
    toValue: 0, duration: 400, useNativeDriver: false,
  })).current;
  const closeAnim = useRef(Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 400,
    useNativeDriver: false,
  })).current;
  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([
        null, { dy: panY },
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > (50 / 100) * modalHeight.current || gs.vy > 0.3) {
          return closeAnim.start(() => setVisible(v => !v));
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) resetPositionAnim.start();
    else {
      setIsScrolled(false);
      if (onDismiss) onDismiss();
    }
  }, [visible]);

  const dismissModal = () => closeAnim.start(() => setVisible(false));
  const show = () => closeAnim.start(() => setVisible(true));

  useImperativeHandle(ref, () => ({
    dismiss: dismissModal,
    show,
  }));

  return (
    <Modal
      animated
      animationType='none'
      visible={visible}
      transparent
      onRequestClose={() => dismissModal()}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <TouchableWithoutFeedback onPress={() => {
          dismissModal();
          if (onTouchOutside) onTouchOutside();
        }}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <Animated.View {...panResponder.panHandlers} style={[styles.ModalContainer, { top }]} onLayout={(e) => {
          modalHeight.current = e.nativeEvent.layout.height;
          if (Math.floor(e.nativeEvent.layout.height) === Math.floor((Dimensions.get('window').height * 86) / 100))
            setIsScrolled(true);
        }}>
          <View style={styles.topLineModal}>
            <View style={styles.lineModal} />
          </View>
          <Gap height={15} />
          {isScrolled
            ? <ScrollView style={childrenWrapperStyle}>
              <TouchableOpacity activeOpacity={1}>
                {children}
              </TouchableOpacity>
            </ScrollView>
            : <View style={childrenWrapperStyle}>{children}</View>
          }
          <Gap height={2} />
          {isDisabled &&
            <View style={[styles.viewDisabled, {height: modalHeight.current}]}>
              {textDisabled && <Text style={styles.textClosed}>{textDisabled}</Text>}
            </View>
          }
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

export default React.memo(BottomModal);
