import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputFocusEventData,
  Platform,
  TextStyle,
} from 'react-native';
import { FormikProps } from 'formik';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@colors';
import style, {
  androidInputText, getSizeIcon, lineInput }
  from './style';
import Icon from '../Icon';
import Gap from '../Gap';
import ButtonIcon from '../ButtonIcon';

interface IProps {
  name: string;
  externalRef?: React.LegacyRef<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  blurOnSubmit?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  showSoftInputOnFocus?: boolean;
  maxLength?: number;
  label: string;
  secureTextEntry?: boolean;
  isFirst?: boolean;
  icType: string;
  icName: string;
  icSize?: number;
  icStyle?: TextStyle;
  disabled?: boolean;
  onSubmitEditing?: (_e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  onFocus?: (_e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const InputText: React.FC<FormikProps<any> & IProps> = ({
  name,
  externalRef,
  keyboardType,
  blurOnSubmit,
  returnKeyType,
  autoCapitalize,
  showSoftInputOnFocus,
  maxLength,
  label,
  secureTextEntry,
  isFirst,
  icType,
  icName,
  icSize,
  icStyle,
  disabled,
  onFocus,
  onSubmitEditing,
  //formik props
  errors, touched, setFieldTouched, setFieldValue, values, handleChange, handleBlur,
  ...inputProps
}) => {
  const isAndroid = Platform.OS === 'android';
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);
  const [visibilityIcon, setVisibilityIcon] = useState(secureTextEntry ? 'visibility-off' : '');
  const [heightInputWrapp, setHeightInputWrapp] = useState(0);

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) onFocus(event);
    setIsFocused(true);
  };

  const onPressBtnIcon = () => {
    if (secureTextEntry) {
      setVisibilityIcon(v => {
        if (v === 'visibility') return 'visibility-off';
        return 'visibility';
      });
    } else if (
      (values[name] || ( name.split('.').length >= 2 && values[name.split('.')[0]][name.split('.')[1]]))
        && !(touched.name && errors.name)) {
      setFieldValue(name, '');
      if (!isFocused) Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const rightIcon = () => {
    if (secureTextEntry) return (
      <ButtonIcon icType={Icon.type.mi} icName={visibilityIcon} rippleColor={colors.border}
        dimens={32} background='transparent' icSize={21} onPress={onPressBtnIcon} />
    );
    if (!secureTextEntry && (isFocused || values[name])) return (
      <ButtonIcon icType={Icon.type.ei} icName='circle-with-cross' rippleColor={colors.border}
        dimens={32} background='transparent' icSize={21} onPress={onPressBtnIcon} />
    );
    if (touched[name] && errors[name]) return (
      <Icon type={Icon.type.fa5} name='exclamation-circle'
        style={[style.iconVisibility, style.exclamation]} />
    );
    return null;
  };

  const labelStyle = {
    transform: [
      {
        translateY: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(heightInputWrapp + 1) / 2],
          extrapolate: 'clamp',
        }),
      },
    ],
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (touched[name] && errors[name]) && isFocused ? colors.red.primary : colors.border,
        (touched[name] && errors[name]) ? colors.red.primary : isFocused ? colors.primary
          : colors.textPrimary,
      ],
    }),
  };

  const toValueAnimated = () => {
    if (name.split('.').length >= 2 && (isFocused || values[name.split('.')[0]][name.split('.')[1]])) {
      return 1;
    } else if (name.split('.').length >= 2) {
      return 0;
    } else if (isFocused || values[name]) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: toValueAnimated(),
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, JSON.stringify(values)]);

  return (
    <>
      {!isFirst && <Gap height={20} />}
      <View
        style={[style.inputWrapper,
          lineInput((touched[name] && errors[name]) as boolean, isFocused)]}>
        <View
          onLayout={(e) => setHeightInputWrapp(e.nativeEvent.layout.height)}
          style={style.floatingWrapp}>
          <Animated.Text style={[
            style.labelStyle, labelStyle,
            (isFocused || (values[name]
              || ( name.split('.').length >= 2 && values[name.split('.')[0]][name.split('.')[1]])))
              && {fontSize: normalizeDimens(11)}]}>
            {label}
          </Animated.Text>
        </View>
        <View style={style.iconWrapper}>
          <Icon type={icType} name={icName}
            size={icSize} style={[style.iconField, getSizeIcon(icSize), icStyle as TextStyle]} />
        </View>
        <TextInput
          {...inputProps}
          ref={externalRef}
          value={name.split('.').length >= 2 ? values[name.split('.')[0]][name.split('.')[1]] : values[name]}
          onChangeText={text => handleChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            handleBlur(name);
            setIsFocused(false);
          }}
          onFocus={handleFocus}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          blurOnSubmit={blurOnSubmit}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          showSoftInputOnFocus={showSoftInputOnFocus}
          maxLength={maxLength}
          secureTextEntry={visibilityIcon === 'visibility-off'}
          style={[style.inputStyle, isAndroid && androidInputText()]}
          selectionColor={colors.blue[700]}
          editable={disabled}
        />
        {rightIcon()}
      </View>
      {touched[name] && errors[name] &&
        <Text style={style.errorHelper}>{errors[name] as string}</Text>
      }
    </>
  );
};

InputText.defaultProps = {
  externalRef: undefined,
  keyboardType: 'default',
  blurOnSubmit: false,
  returnKeyType: 'next',
  autoCapitalize: 'none',
  showSoftInputOnFocus: true,
  maxLength: undefined,
  secureTextEntry: false,
  isFirst: false,
  icSize: undefined,
  icStyle: undefined,
  disabled: undefined,
  onSubmitEditing: undefined,
  onFocus: undefined,
};

export default InputText;
