import React from 'react';
import { FlexAlignType, StyleProp, View, ViewStyle } from 'react-native';
import styles from './style';

interface IProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
    | 'space-around' | 'space-evenly';
  align?: FlexAlignType;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const Row: React.FC<IProps> = ({
  style, children, align, justify, flexWrap,
  ...otherProps
}) => {
  return (
    <View style={[styles.row, style, {
      justifyContent: justify,
      alignItems: align,
      flexWrap,
    }]} {...otherProps}>
      {children}
    </View>
  );
};

Row.defaultProps = {
  style: undefined,
  children: undefined,
  align: 'flex-start',
  justify: 'flex-start',
  flexWrap: 'nowrap',
};

export default React.memo(Row);
