import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Animated,
  Platform,
} from 'react-native';
import { FormikProps } from 'formik';
import ButtonIcon from 'src/components/ButtonIcon';
import Icon from 'src/components/Icon';
import Gap from 'src/components/Gap';
import colors from '@utils/colors';
import normalizeDimens from '@utils/normalizeDimens';
import style, {
  getSizeIcon,
  iconTextArea,
  lineInput,
  textAreaContainer,
  textAreaStyle,
  textAreaWrappStyle,
} from './style';

interface IProps {
  name: string,
  label?: string,
  icType: string;
  icName: string;
  icSize?: number;
  isFirst?: boolean;
}

const TextArea: React.FC<TextInputProps & FormikProps<any> & IProps> = ({
  name,
  label,
  icType,
  icName,
  icSize,
  isFirst,
  keyboardType,
  onFocus,
  errors, touched, setFieldTouched, setFieldValue, values, handleChange, handleBlur,
  ...inputProps
}) => {
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState<{first: number, last: number}>({first: 0, last: 0});
  const [floatingHeight, setFloatingHeight] = useState(0);

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) onFocus(event);
    setIsFocused(true);
  };

  const handleDeleteIcon = () => {
    if (Platform.OS === 'android') setContentHeight({ first: 0, last: 0 });
    setFieldValue(name, '');
  };

  const leftIcon = () => {
    if (isFocused || values[name]) return (
      <ButtonIcon icType={Icon.type.ei} icName='circle-with-cross' rippleColor={colors.border}
        dimens={32} background='transparent' icSize={21} onPress={handleDeleteIcon} />
    );
    if (touched[name] && errors[name]) return (
      <Icon type={Icon.type.ai} name='exclamationcircle'
        style={[style.iconVisibility, style.exclamation]} />
    );
    return null;
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
  }, [isFocused, JSON.stringify(values), floatingHeight]);

  const labelStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -floatingHeight / 2],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (touched[name] && errors[name]) && isFocused ? colors.red.primary : colors.border,
        (touched[name] && errors[name]) ? colors.red.primary : isFocused ? colors.primary
          : colors.textPrimary,
      ],
    }),
  };

  return (
    <>
      {!isFirst && <Gap height={20} />}
      <View style={[style.inputWrapper, textAreaContainer(contentHeight),
        lineInput((touched[name] && errors[name]) as boolean, isFocused)]}>
        <View style={style.textAreaLabelWrapp} onLayout={e => setFloatingHeight(e.nativeEvent.layout.height)}>
          <Animated.Text style={[style.textAreaLabel, labelStyle,
            (isFocused || values[name]) && {fontSize: normalizeDimens(11)}]}>
            {label}
          </Animated.Text>
        </View>
        <View style={[style.textAreaWrapper, textAreaWrappStyle(contentHeight)]}>
          <View style={[style.iconWrapper, iconTextArea(contentHeight)]}>
            <Icon type={icType} name={icName}
              size={icSize} style={[style.iconField, getSizeIcon(icSize)]} />
          </View>
          <TextInput
            {...inputProps}
            multiline
            value={name.split('.').length >= 2 ? values[name.split('.')[0]][name.split('.')[1]] : values[name]}
            onChangeText={text => handleChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              handleBlur(name);
              setIsFocused(false);
            }}
            onFocus={handleFocus}
            keyboardType={keyboardType}
            selectionColor={colors.blue[700]}
            style={[style.inputStyle, textAreaStyle(contentHeight), style.inputTextAreaStyle]}
            onContentSizeChange={e => {
              e.persist();
              setContentHeight(v => ({
                first: v.first === 0 ? Math.round(e.nativeEvent.contentSize.height) : v.first,
                last: Math.round(e.nativeEvent.contentSize.height),
              }));
            }}
          />
          <View style={iconTextArea(contentHeight, true)}>
            {leftIcon()}
          </View>
        </View>
      </View>
      {touched[name] && errors[name] &&
        <Text style={style.errorHelper}>{errors[name] as string}</Text>
      }
    </>
  );
};

TextArea.defaultProps = {
  label: '',
  icSize: undefined,
  isFirst: undefined,
};

export default TextArea;
