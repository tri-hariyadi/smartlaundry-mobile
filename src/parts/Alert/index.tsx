import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackHandler,
  Modal,
  Platform,
  Image,
  ModalProps,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';
import Successmark from '@image/successmark.gif';
import Warningmark from '@image/warningmark.gif';
import Errormark from '@image/errormark.gif';
import Gap from 'src/components/Gap';
import normalizeDimens from '@utils/normalizeDimens';
import style from './style';

const HwBackHandler = BackHandler;
const HW_BACK_EVENT = 'hardwareBackPress';

const { OS } = Platform;

export interface AlertCompProps {
  show?: boolean;
  useNativeDriver?: boolean;
  showProgress?: boolean;
  title?: string;
  message?: string;
  closeOnTouchOutside?: boolean;
  closeOnHardwareBackPress?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelButtonColor?: string;
  confirmButtonColor?: string;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
  confirmButtonStyle?: ViewStyle;
  confirmButtonTextStyle?: TextStyle;
  alertContainerStyle?: ViewStyle,
  overlayStyle?: ViewStyle,
  progressSize?: number,
  progressColor?: ColorValue,
  contentContainerStyle?: ViewStyle,
  contentStyle?: ViewStyle,
  titleStyle?: TextStyle,
  messageStyle?: TextStyle,
  actionContainerStyle?: ViewStyle,
  dangerMode?: boolean;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
  onDismiss?: () => void;
  customView?: JSX.Element | React.ReactNode;
  modalProps?: ModalProps;
  type?: 'success' | 'warning' | 'error';
}

const Alert: React.FC<{ref: React.ForwardedRef<unknown>}> = forwardRef(({},ref) => {
  const wrapInModal = OS === 'android' || OS === 'ios';
  const springValue = useRef(new Animated.Value(0)).current;
  const [showSelf, setShowSelf] = useState(false);
  const [show, setShow] = useState(false);
  const defaultProps: AlertCompProps = {
    show: undefined,
    useNativeDriver: false,
    showProgress: false,
    message: undefined,
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: true,
    showCancelButton: false,
    showConfirmButton: true,
    cancelText: 'Batal',
    confirmText: 'OK',
    cancelButtonColor: '#df0000',
    confirmButtonColor: '#4b61da',
    cancelButtonStyle: undefined,
    cancelButtonTextStyle: undefined,
    confirmButtonStyle: undefined,
    confirmButtonTextStyle: undefined,
    alertContainerStyle: undefined,
    overlayStyle: undefined,
    progressSize: 30,
    progressColor: undefined,
    contentContainerStyle: undefined,
    contentStyle: undefined,
    titleStyle: undefined,
    messageStyle: undefined,
    actionContainerStyle: undefined,
    dangerMode: false,
    onCancelPressed: undefined,
    onConfirmPressed: undefined,
    onDismiss: undefined,
    customView: undefined,
    modalProps: {},
    type: 'success',
  };
  const props = useRef<AlertCompProps>(defaultProps);
  const {
    useNativeDriver,
    showProgress,
    title,
    message,
    closeOnTouchOutside,
    closeOnHardwareBackPress,
    showCancelButton,
    showConfirmButton,
    cancelText,
    confirmText,
    cancelButtonColor,
    confirmButtonColor,
    cancelButtonStyle,
    cancelButtonTextStyle,
    confirmButtonStyle,
    confirmButtonTextStyle,
    alertContainerStyle,
    overlayStyle,
    progressSize,
    progressColor,
    contentContainerStyle,
    contentStyle,
    titleStyle,
    messageStyle,
    actionContainerStyle,
    dangerMode,
    onCancelPressed,
    onConfirmPressed,
    onDismiss,
    customView,
    modalProps,
    type,
  } = props.current;

  const showAlert = (param: AlertCompProps) => {
    props.current = {...props.current, ...param};
    setShow(true);
  };

  const hideAlert = () => {
    props.current = defaultProps;
    setShow(false);
  };

  useImperativeHandle(ref, () => ({
    showAlert,
    hideAlert,
  }));

  useEffect(() => {
    HwBackHandler.addEventListener(HW_BACK_EVENT, handleHwBackEvent);
    return () => HwBackHandler.removeEventListener(HW_BACK_EVENT, handleHwBackEvent);
  }, []);

  useEffect(() => {
    if (show && !showSelf) springShow();
    else if (show === false && showSelf) springHide();
  }, [show, showSelf]);

  const springShow = (fromConstructor?: boolean) => {
    toggleAlert(fromConstructor);
    springValue.setValue(0.3);
    Animated.spring(springValue, {
      toValue: 1.2,
      friction: 5,
      tension: 150,
      useNativeDriver: useNativeDriver || false,
    }).start();
  };

  const springHide = (cb?: () => void) => {
    if (showSelf === true) {
      Animated.spring(springValue, {
        toValue: 0,
        tension: 10,
        useNativeDriver: useNativeDriver || false,
      }).start();

      setTimeout(() => {
        toggleAlert();
        OnDismiss();
        if (cb) cb();
      }, 80);
    }
  };

  const toggleAlert = (fromConstructor?: boolean) => {
    if (fromConstructor) setShowSelf(true);
    else setShowSelf(v => !v);
  };

  const handleHwBackEvent = () => {
    if (showSelf && closeOnHardwareBackPress) {
      springHide(() => setShow(false));
      return true;
    } else if (!closeOnHardwareBackPress && showSelf) {
      return true;
    }

    return false;
  };

  const onTapOutside = () => {
    if (closeOnTouchOutside) springHide(() => setShow(false));
  };

  const OnDismiss = () => {
    if (onDismiss) onDismiss();
  };

  const renderButton = (data: any) => {
    const {
      text,
      backgroundColor,
      buttonStyle,
      buttonTextStyle,
      onPress,
    } = data;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[style.button, { backgroundColor }, buttonStyle]}>
          <Text style={[style.buttonText, buttonTextStyle]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAlert = () => {
    const animation = {
      transform: [{
        scale: springValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.5, 1],
        }),
      }],
    };

    const cancelButtonData = {
      text: cancelText,
      backgroundColor: cancelButtonColor,
      buttonStyle: cancelButtonStyle,
      buttonTextStyle: cancelButtonTextStyle,
      onPress: () => {
        if (onCancelPressed) onCancelPressed();
        springHide(() => setShow(false));
      },
    };

    const confirmButtonData = {
      text: confirmText,
      backgroundColor: confirmButtonColor,
      buttonStyle: confirmButtonStyle,
      buttonTextStyle: confirmButtonTextStyle,
      onPress: () => {
        if (onConfirmPressed) onConfirmPressed();
        else springHide(() => setShow(false));
      },
    };

    return (
      <View style={[style.container, alertContainerStyle]}>
        <TouchableWithoutFeedback onPress={onTapOutside}>
          <View style={[style.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[style.contentContainer, animation, contentContainerStyle]}
        >
          <View style={[style.content, contentStyle]}>
            {!showProgress &&
              <Image
                style={style.imageProfile}
                source={
                  type === 'success'
                    ? Successmark
                    : type === 'warning'
                      ? Warningmark
                      : Errormark
                }
              />
            }
            {showProgress ? (
              <>
                <ActivityIndicator size={normalizeDimens(progressSize as number)} color={progressColor} />
                <Gap height={10} />
              </>
            ) : null}
            {title ? (
              <Text style={[style.title, titleStyle]}>{title}</Text>
            ) : null}
            {message ? (
              <Text style={[style.message, messageStyle]}>{message}</Text>
            ) : null}
            <Gap height={1.5} />
            {customView}
          </View>
          <View style={[style.action, actionContainerStyle]}>
            {showCancelButton || dangerMode ? renderButton(cancelButtonData) : null}
            {showConfirmButton && !dangerMode ? renderButton(confirmButtonData) : null}
          </View>
        </Animated.View>
      </View>
    );
  };

  if (showSelf && wrapInModal) return (
    <Modal
      animationType='none'
      transparent={true}
      visible={show}
      onRequestClose={() => {
        if (showSelf && closeOnHardwareBackPress) {
          springHide();
        }
      }}
      {...modalProps}
    >
      {renderAlert()}
    </Modal>
  );

  if (showSelf) return (<>{renderAlert()}</>);
  return null;
});

export default React.memo(Alert);
