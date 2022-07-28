import React from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import { connect } from 'react-redux';
import { Gap, Icon, TouchableItem } from '@components';
import normalizeDimens from '@utils/normalizeDimens';
import { RootState } from '@store/store';
import currencyFormat from '@utils/currencyFormat';
import style from './style';

interface IProps {
  orderCart: {
    items: Array<{
      name: string;
      total: number;
      totalPrice: number;
    }>
    totalPriceItems: number;
    laundryName: string
  },
  onPress?: () => void;
}

const BottomPage: React.FC<IProps> = ({ orderCart, onPress }) => {
  const { top } = useSafeAreaInsets();
  const animateY = React.useRef(new Animated.Value(0)).current;
  const [height, setHeight] = React.useState(0);

  const containerStyle = {
    transform: [{
      translateY: animateY.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [height, height / 2, 0],
      }),
    }],
    opacity: animateY,
  };

  React.useEffect(() => {
    Animated.timing(animateY, {
      toValue: orderCart.items.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [JSON.stringify(orderCart)]);

  return (
    <>
      <Animated.View
        onLayout={e => setHeight(e.nativeEvent.layout.height)}
        style={[style.bottomContainer, containerStyle]}>
        <Shadow
          offset={[0, 1]} distance={5} startColor='#0004'
          radius={normalizeDimens(15)}
          viewStyle={style.card}
          containerViewStyle={[style.cardContainer]}>
          <TouchableItem onPress={onPress}
            rippleColor='#FFF' styleWrapper={style.basketContainer}>
            <View>
              <Text style={style.textItemBasket}>{orderCart.items.length} Item</Text>
              <Text style={style.textDetailBasket}>
                Pesan antar dari {orderCart.laundryName}
              </Text>
            </View>
            <View style={style.totalBasket}>
              <Text style={style.textTotalBasket}>
                {currencyFormat(String(orderCart.totalPriceItems))}
              </Text>
              <Gap width={10} />
              <Icon type={Icon.type.io} name='ios-basket' size={25} color='#FFF' />
            </View>
          </TouchableItem>
        </Shadow>
        <SafeAreaView style={[style.safeArea, { marginBottom: -top }]} />
      </Animated.View>
    </>
  );
};

BottomPage.defaultProps = {
  onPress: undefined,
};

const mapStateToProps = (state: RootState) => ({
  service: state.ServiceReducer.service,
  orderCart: state.OrdersReducer.orderCart,
});

export default connect(mapStateToProps)(BottomPage);
