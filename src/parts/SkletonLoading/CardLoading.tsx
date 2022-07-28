import { FlexAlignType, View, ViewStyle } from 'react-native';
import React from 'react';
import Gap from 'src/components/Gap';
import LoadingRect from './LoadingRect';
import LoadingText from './LoadingText';
import Row from './Row';
import styles from './style';

interface IProps {
  count?: number;
  gap?: number;
  loadingTextCount?: number;
  heightLoadingText?: number;
  styleContainer?: ViewStyle;
  styleloadingTextContainer?: ViewStyle;
  styleloadingText?: ViewStyle;
  styleloadingRect?: ViewStyle;
  styleTxtRect?: ViewStyle;
  rectWidth?: number;
  rectHeight?: number;
  rectRounded?: boolean;
  rowAlign?: FlexAlignType
}

const CardLoading: React.FC<IProps> = ({
  count,
  gap,
  loadingTextCount,
  heightLoadingText,
  styleContainer,
  styleloadingTextContainer,
  styleloadingText,
  styleloadingRect,
  styleTxtRect,
  rectWidth,
  rectHeight,
  rectRounded,
  rowAlign,
}) => {
  return (
    <>
      {Array.from(Array(count)).map((item, idx) => (
        <View key={idx}>
          {idx !== 0 && <Gap height={gap} />}
          <Row align={rowAlign} style={styleContainer}>
            <LoadingRect width={rectWidth as number} height={rectHeight as number}
              style={[styleloadingRect, rectRounded && { borderRadius: rectWidth as number / 2 }]} />
            <Gap width={7} />
            <View style={[styles.cardLoading, styleloadingTextContainer]}>
              <LoadingText count={loadingTextCount} height={heightLoadingText}
                style={styleloadingText} styleRect={styleTxtRect} />
            </View>
          </Row>
        </View>
      ))}
    </>
  );
};

CardLoading.defaultProps = {
  count: 1,
  gap: 15,
  loadingTextCount: 3,
  heightLoadingText: 15,
  styleContainer: undefined,
  styleloadingTextContainer: undefined,
  styleloadingText: undefined,
  styleloadingRect: undefined,
  styleTxtRect: undefined,
  rectWidth: 70,
  rectHeight: 70,
  rectRounded: false,
  rowAlign: 'flex-start',
};

export default React.memo(CardLoading);
