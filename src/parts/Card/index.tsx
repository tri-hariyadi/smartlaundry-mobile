import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Shadow, ShadowProps } from 'react-native-shadow-2';
import style from './style';

interface IProps {
  children: React.ReactNode;
  margin?: number;
  cardBodyStyle?: ViewStyle;
}

const Card = ({ children, margin, cardBodyStyle, ...props }: ShadowProps & IProps) => {
  return (
    <Shadow
      distance={5}
      {...props}
      viewStyle={style.card}
      containerViewStyle={[style.cardContainer, margin ? {margin} : {}]}>
      <View style={[style.cardBody, cardBodyStyle]}>
        {children}
      </View>
    </Shadow>
  );
};

Card.defaultProps = {
  margin: undefined,
  cardBodyStyle: undefined,
};

export default React.memo(Card);
