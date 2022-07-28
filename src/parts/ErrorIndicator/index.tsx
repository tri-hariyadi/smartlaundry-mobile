/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import Error from '@image/error.svg';
import Empty from '@image/emptydata.svg';
import Gap from 'src/components/Gap';
import Icon from 'src/components/Icon';
import normalizeDimens from '@utils/normalizeDimens';
import customFont from '@utils/fonts';
import colors from '@utils/colors';
import Row from '../SkletonLoading/Row';

interface IProps {
  width?: number;
  height?: number;
  errorMessage?: string;
  miniIndicator?: boolean;
  isEmpty?: boolean;
}

const ErrorIndicator: React.FC<IProps> = ({ width, height, errorMessage, miniIndicator, isEmpty }) => {
  if (miniIndicator) return (
    <Row align='center'>
      <Icon type={Icon.type.ai} name='exclamationcircleo' color={colors.border} size={20} />
      <Gap width={10} />
      <Text style={{
        fontFamily: customFont.primary[400],
        fontSize: normalizeDimens(13),
        color: colors.border,
      }}>{errorMessage}</Text>
    </Row>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isEmpty
        ? <Empty width={normalizeDimens(width as number)} height={normalizeDimens(height as number)} />
        : <Error width={normalizeDimens(width as number)} height={normalizeDimens(height as number)} />
      }
      <Gap height={15} />
      <Text style={{
        fontFamily: customFont.primary[600],
        fontSize: normalizeDimens(15),
        color: colors.border,
        textAlign: 'center',
      }}>{errorMessage}</Text>
    </View>
  );
};

ErrorIndicator.defaultProps = {
  width: 180,
  height: 180,
  errorMessage: 'Ooops, ada yang salah!',
  miniIndicator: false,
  isEmpty: false,
};

export default ErrorIndicator;
