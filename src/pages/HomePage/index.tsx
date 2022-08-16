import React, { useEffect, useRef, useState } from 'react';
import 'moment/locale/id';
import { View, Text, StatusBar, Platform, Image, FlatList, RefreshControl } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import NoImage from '@image/welcome3.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ButtonIcon, Gap, Icon, StatusBarApp } from '@components';
import colors from '@utils/colors';
import { BottomModal, Card, CardLoading, ErrorIndicator, Header, Alert, AlertProps } from '@parts';
import currencyFormat from '@utils/currencyFormat';
import discountFormat from '@utils/discountFormat';
import Token from '@utils/token';
import { IResponseHttpService } from '@utils/types';
import ServiceAct from '@action/ServiceAction';
import OrderAction from '@store/action-creators/OrderAction';
import { RootState } from '@store/store';
import { MainBottomTabParamList, RootStackParamList } from '@routes';
import { getData } from '@store/localStorage';
import style from './style';
import ServiceDetail from './ServiceDetail';
import ServiceReview from './ServiceReview';


type HomeScreenProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'MainApp'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

const HomePage: React.FC<{orderCart:{id_service: string}}> = ({
  orderCart,
}) => {
  const navigation = useNavigation<HomeScreenProp>();
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [dataService, setDataService] = useState<Partial<IResponseHttpService>>({loading: true});
  const [refreshing, setRefreshing] = useState(false);
  const [anyOrder, setAnyOrder] = useState<any>(false);
  const [serviceDetail, setServiceDetail] = useState<Partial<IResponseHttpService>>({loading: true});
  const [reviews, setReviews] = useState<Partial<IResponseHttpService>>({loading: true});
  const btModal = useRef<any>(null);
  const btModal2 = useRef<any>(null);
  const alert = useRef<AlertProps>(null);
  const ios = Platform.OS === 'ios';

  const getDataServices = async () => {
    const location = await getData('position');
    const response = await ServiceAct.getServices(
      ios ? -6.3005932 : location.lat,
      ios ? 106.8428308 : location.lng);
    setDataService(response);
  };

  const getStatusOrder = async () => {
    const tokenDecoded = await Token.tokenDecode();
    const getAnyOrder = await OrderAction.getAnyOrder(tokenDecoded.aud as string);
    if (getAnyOrder.result) setAnyOrder(getAnyOrder.result.anyorder);
  };

  useEffect(() => {
    changeBarColor();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getDataServices();
      getStatusOrder();
    });
    const onBlur = navigation.addListener('blur', () => setDataService({loading: true}));

    return () => {
      unsubscribe();
      onBlur();
    };
  }, [navigation]);

  const onRefresh = React.useCallback(async () => {
    setDataService({loading: true});
    setRefreshing(true);
    await getDataServices();
    await getStatusOrder();
    setRefreshing(false);
  }, []);

  const changeBarColor = async () => {
    try {
      await SystemNavigationBar.setNavigationColor('#FFF');
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') StatusBar.setBackgroundColor(colors.primary);
    } catch (error) {}
  };

  const getDetailService = async (idService: string) => {
    if (anyOrder) return alert.current?.showAlert({
      type: 'warning',
      title: 'Warning',
      message: 'Belum bisa order lagi nih, tunggu orderan yang lain selesai dulu.',
    });
    btModal.current.show();
    const location = await getData('position');
    const response = await ServiceAct.getServicesById(
      idService,
      ios ? -6.3005932 : location.lat,
      ios ? 106.8428308 : location.lng);
    setServiceDetail(response);
    ServiceAct.saveDataService(response.result, response.message)(dispatch);
  };

  const getReview = async () => {
    btModal.current.dismiss();
    if (serviceDetail.result.ratingAverage) {
      btModal2.current.show();
      const response = await ServiceAct.getReview(serviceDetail.result._id);
      setReviews(response);
    }
  };

  const navigateToOrder = (data: any) => {
    if (orderCart.id_service && (data._id !== orderCart.id_service)) {
      btModal.current.dismiss();
      setTimeout(() => {
        alert.current?.showAlert({
          type: 'warning',
          title: 'Ganti Order',
          message: 'Yakin mau ganti order?',
          showCancelButton: true,
          onConfirmPressed: () => {
            OrderAction.resetOrderCart()(dispatch);
            alert.current?.hideAlert();
            btModal.current.show();
          },
        });
      }, 400);
    } else {
      btModal.current.dismiss();
      setTimeout(() => {
        if (data.subServices.length) {
          navigation.navigate('OrderTopNav');
        } else {
          navigation.navigate('PickupAdress');
        }
      }, 400);
    }
  };

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <View style={[style.contentContainer]}>
        <Header showBackButton onBackPress={() => navigation.goBack()} />
        <FlatList
          data={dataService?.result || []}
          keyExtractor={(v) => v._id}
          style={style.contentWrapper}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={() => (
            <>
              <View style={style.banner}>
                <View style={style.textBannerWrapper}>
                  <Text style={style.titleBanner}>Bless this mess</Text>
                  <Text style={style.descBanner}>Kami memilih pakaian Anda, memberi mereka tampilan yang segar.</Text>
                </View>
                <Image style={style.imgBanner} source={require('@image/Intersection1.png')} />
              </View>
              <Gap height={20} />
              <Text style={style.services}>Services</Text>
              <Gap height={15} />
            </>
          )}
          renderItem={({item}) => (
            <View style={style.renderItemWrapp}>
              <Card cardBodyStyle={style.cardWrapp}>
                {!item.status &&
                  <View style={style.viewDisabled}>
                    <Text style={style.textClosed}>Tutup</Text>
                  </View>
                }
                <View style={style.itemWrapp}>
                  <Image style={style.itemImg}
                    source={item.banner ? {uri: item.banner} : NoImage} />
                  {item.diskon?.valueDiskon &&
                    <View style={style.discountWrapp}>
                      <Text style={style.textDiscount}>
                        {item.diskon?.typeDiskon === 'percent'
                          ? <Text>{item.diskon?.valueDiskon}% off</Text>
                          : <Text>{discountFormat(String(item.diskon?.valueDiskon))}k off</Text>
                        }
                      </Text>
                    </View>
                  }
                  <View style={style.itemContent}>
                    <View>
                      <Text style={style.itemText}>{item.distance} km</Text>
                      <Gap height={7} />
                      <Text style={[style.itemText, style.itemTextPrice]}>{item.name}</Text>
                      <Text style={[style.itemText, style.itemTextLaundry]}>
                        {item.laundry}, {item.address.slice(0, 45)}{item.address.length > 45 ? '....' : ''}
                      </Text>
                    </View>
                    <Gap height={13} />
                    <View style={style.btnOrder}>
                      <Text style={[style.itemText, style.itemTextPrice]}>{currencyFormat(String(item.price))}</Text>
                      <ButtonIcon
                        text='Yuk Order'
                        icStyle={style.icStyle}
                        icType={Icon.type.mi}
                        icSize={15}
                        icName='shopping-cart'
                        background='#E36F00'
                        onPress={() => getDetailService(item._id)}
                      />
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          )}
          contentContainerStyle={style.listContainerStyle}
          ListEmptyComponent={() => <>
            {dataService.loading
              ? (
                <CardLoading count={5} styleContainer={style.renderItemWrapp}
                  loadingTextCount={3} heightLoadingText={15} />
              )
              : dataService.result === null
                ? <ErrorIndicator isEmpty errorMessage={'Belum ada service laundry\ndi sekitar lokasi kamu'} />
                : <ErrorIndicator errorMessage={dataService?.message} />
            }
          </>}
          ItemSeparatorComponent={() => <Gap height={15} />}
          ListFooterComponent={() => (
            <View>
              <Gap height={30} />
            </View>
          )}
        />
      </View>
      <Alert ref={alert} />
      <BottomModal ref={btModal}
        textDisabled='Tutup'
        isDisabled={serviceDetail.result && !serviceDetail.result.laundry.status}>
        <ServiceDetail
          serviceDetail={serviceDetail}
          top={top}
          getReview={getReview}
          navigateToOrder={navigateToOrder}
        />
      </BottomModal>
      <BottomModal ref={btModal2}
        onTouchOutside={() => {
          btModal2.current.dismiss();
          setTimeout(() => {
            btModal.current.show();
          }, 400);
        }}>
        <ServiceReview
          reviews={reviews}
          serviceDetail={serviceDetail}
          top={top}
          btModal={btModal}
          btModal2={btModal2}
        />
      </BottomModal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderCart: state.OrdersReducer.orderCart,
});

export default connect(mapStateToProps)(HomePage);
