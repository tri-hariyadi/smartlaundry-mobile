import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import ImageOrder from '@image/order_detail.svg';
import Error from '@image/error.svg';
import { useDispatch } from 'react-redux';
import { StatusBarApp, Button, Icon, Gap } from '@components';
import { Card, CardLoading, Header, LoadingRect, Row } from '@parts';
import OrderAct from '@action/OrderAction';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import Token from '@utils/token';
import colors from '@colors';
import currencyFormat from '@utils/currencyFormat';
import normalizeDimens from '@utils/normalizeDimens';
import style from './style';

const OrderDetail: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const id_order = route.params?.id_order;
  const imgAnimated = useRef(new Animated.Value(0)).current;
  const imgAnimated2 = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [dataOrder, setDataOrder] = useState<Partial<IResponseHttpService>>({loading: true});

  const imgStyle = {
    transform: [
      {
        translateX: imgAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Dimensions.get('window').width],
        }),
      },
      {
        rotate: rotate.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['0deg', '-20deg', '0deg'],
        }),
      },
    ],
  };

  const imgStyle2 = {
    transform: [
      {
        translateX: imgAnimated2.interpolate({
          inputRange: [0, 1],
          outputRange: [-Dimensions.get('window').width, 0],
        }),
      },
    ],
    opacity: imgAnimated2,
  };

  const getDataOrder = async () => {
    OrderAct.resetOrderCart()(dispatch);
    const tokenDecoded = await Token.tokenDecode();
    const response = await OrderAct.getOrderById(tokenDecoded.aud as string, id_order);
    if (response.result && response.status === 200) {
      setDataOrder(response);
    } else setDataOrder({loading: false, message: response.message});
  };

  useEffect(() => {
    getDataOrder();
    Animated.timing(rotate, {
      toValue: 1,
      duration: 300,
      delay: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(imgAnimated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
    setTimeout(() => {
      Animated.timing(imgAnimated2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  }, []);

  if (dataOrder.loading) return (
    <View style={style.loadingWrapper}>
      <Gap height={15} />
      <Row align='center' justify='center'>
        <LoadingRect width={130} height={130} style={style.rectStyle} />
      </Row>
      <Gap height={50} />
      <CardLoading count={2} styleloadingRect={style.bgRect} styleTxtRect={style.bgRect}
        loadingTextCount={3} heightLoadingText={15} />
    </View>
  );

  if (dataOrder.message && dataOrder.status !== 200) return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <Header showBackButton textHeader={() => 'Detail Order'}
        onBackPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainApp' }],
            }),
          );
        }} />
      <View style={style.errorContainer}>
        <Error width={normalizeDimens(200)} height={normalizeDimens(200)} />
        <Gap height={20} />
        <Text style={style.errorText}>
          {'Mohon Maaf sedang terjadi Kesalahan, orderanmu sudah masuk\nKlik Track Order'}
        </Text>
        <Gap height={5} />
        <View style={style.btnTrack}>
          <Button text='Track Order' icType={Icon.type.mi}
            icName='my-location' onPress={() => navigation.replace('MainApp', { screen: 'TrackOrder' })} />
        </View>
      </View>
      <SafeAreaView style={[style.safeArea, {marginBottom: -top}]} />
    </>
  );

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <Header showBackButton textHeader={() => 'Detail Order'}
        onBackPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainApp' }],
            }),
          );
        }} />
      <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
        keyboardDismissMode='none' style={style.container}
        contentContainerStyle={style.contentWrapper}>
        <View style={style.pageContainer}>
          <View>
            <View style={style.bannerWrapper}>
              <View style={style.imgWrapp}>
                <Animated.View style={[style.img2, imgStyle2]}>
                  <ImageOrder />
                </Animated.View>
                <Animated.View style={imgStyle}>
                  <ImageOrder />
                </Animated.View>
              </View>
              <Gap height={20} />
              <Text style={style.topHeaderTitle}>Terimakasih telah memilih kami!</Text>
              <Gap height={5} />
              <Text style={style.topHeaderText}>
                Orderan mu telah diterima, kami akan segera memproses pakaian kamu.
              </Text>
            </View>
            <Card>
              <View>
                <View style={style.itemDetaiWrapper}>
                  <Text style={style.itemText}>Laundry</Text>
                  <Text style={style.valueItemText}>{dataOrder.result.service.laundry.name}</Text>
                </View>
                <View style={style.itemDetaiWrapper}>
                  <Text style={style.itemText}>Service</Text>
                  <Text style={style.valueItemText}>{dataOrder.result.service.name}</Text>
                </View>
                {dataOrder.result.sub_service.length > 0 &&
                  <View style={style.itemDetaiWrapper}>
                    <Text style={style.itemText}>Service Items</Text>
                    <Text style={style.valueItemText}>
                      {dataOrder.result.sub_service.map((item: any) => item.name).join(', ')}
                    </Text>
                  </View>
                }
                <View style={style.itemDetaiWrapper}>
                  <Text style={style.itemText}>Total</Text>
                  {dataOrder.result.service.quantityType === 'kg'
                    ? <Text style={style.valueItemText}>Total akan ditimbang oleh kurir ditempat</Text>
                    : <Text style={style.valueItemText}>{dataOrder.result.total}</Text>
                  }
                </View>
                <View style={style.itemDetaiWrapper}>
                  <Text style={style.itemText}>Total Biaya</Text>
                  {dataOrder.result.service.quantityType === 'kg'
                    ? <Text style={style.valueItemText}>Total Biaya setelah ditimbang kurir</Text>
                    : <Text style={style.valueItemText}>{currencyFormat(String(dataOrder.result.totalPrice))}</Text>
                  }
                </View>
                <View style={style.itemDetaiWrapper}>
                  <Text style={style.itemText}>Pembayaran</Text>
                  <Text style={style.valueItemText}>{dataOrder.result.payment}</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      <View style={style.btnTrack}>
        <Button text='Track Order' icType={Icon.type.mi}
          icName='my-location' onPress={() => navigation.replace('MainApp', { screen: 'TrackOrder' })} />
      </View>
      <SafeAreaView style={[style.safeArea, {marginBottom: -top}]} />
    </>
  );
};

export default OrderDetail;
