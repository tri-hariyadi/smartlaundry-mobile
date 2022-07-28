import React, { ReactNode } from 'react';
import { ColorValue, View, Text } from 'react-native';
import Icon from 'src/components/Icon';
import ButtonIcon from 'src/components/ButtonIcon';
import colors from '@utils/colors';
import style from './style';

interface IProps {
  showBackButton?: boolean;
  background?: ColorValue;
  onBackPress?: () => void;
  textHeader?: () => JSX.Element | string;
  rightContent?: () => ReactNode | undefined
}

const Header: React.FC<IProps> = ({ textHeader, rightContent, showBackButton, background, onBackPress }) => {
  return (
    <View style={[style.headerWrapper, {backgroundColor: background}]}>
      <View>
        {showBackButton &&
          <ButtonIcon
            onPress={onBackPress}
            background='transparent'
            dimens={45}
            icSize={30}
            icColor='#FFF'
            icType={Icon.type.ei}
            icName='chevron-small-left' />
        }
      </View>
      <View style={style.textHeaderWrapper}>
        {textHeader && <Text style={style.textHeader}>{textHeader()}</Text>}
      </View>
      <View>
        {rightContent && rightContent()}
      </View>
    </View>
  );
};

Header.defaultProps = {
  showBackButton: false,
  background: colors.primary,
  onBackPress: undefined,
  textHeader: () => 'Smart Laundry',
  rightContent: undefined,
};

export default React.memo(Header);
