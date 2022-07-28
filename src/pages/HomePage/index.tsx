import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { View, Text, StatusBar, Platform, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import NoImage from '@image/welcome3.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button, ButtonIcon, Gap, Icon, StatusBarApp } from '@components';
import colors from '@utils/colors';
import { BottomModal, Card, CardLoading, ErrorIndicator, Header, Alert, AlertProps, Row } from '@parts';
import currencyFormat from '@utils/currencyFormat';
import discountFormat from '@utils/discountFormat';
import normalizeDimens from '@utils/normalizeDimens';
import Token from '@utils/token';
import { IResponseHttpService } from '@utils/types';
import ServiceAct from '@action/ServiceAction';
import OrderAction from '@store/action-creators/OrderAction';
import { RootState } from '@store/store';
import { MainBottomTabParamList, RootStackParamList } from '@routes';
import getLocation from '@utils/getLocation';
import style from './style';


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

  const getData = async () => {
    const tokenDecoded = await Token.tokenDecode();
    const location = await getLocation();
    const response = await ServiceAct.getServices(location.position.lat, location.position.lng);
    // const response = await ServiceAct.getServices(-6.303437304776969, 106.84429944363697);
    const getAnyOrder = await OrderAction.getAnyOrder(tokenDecoded.aud as string);
    if (getAnyOrder.result) setAnyOrder(getAnyOrder.result.anyorder);
    setDataService(response);
  };

  useEffect(() => {
    changeBarColor();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => getData());
    const onBlur = navigation.addListener('blur', () => setDataService({loading: true}));

    return () => {
      unsubscribe();
      onBlur();
    };
  }, [navigation]);

  const onRefresh = React.useCallback(async () => {
    setDataService({loading: true});
    setRefreshing(true);
    await getData();
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
    const response = await ServiceAct.getServicesById(idService, -6.242025515100212, 107.00061389711712);
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
                      <View style={style.itemTextWrapp}>
                        <Icon type={Icon.type.mci} name='washing-machine' size={normalizeDimens(13)} />
                        <Text style={[style.itemText, style.itemTextPrice]}>{item.name}</Text>
                      </View>
                      <View style={style.itemTextWrapp}>
                        <Icon type={Icon.type.fa5} name='money-bill-wave' size={normalizeDimens(11)} />
                        <Text style={[style.itemText, style.itemTextPrice]}>{currencyFormat(String(item.price))}</Text>
                      </View>
                      <View style={style.itemTextWrapp}>
                        <Icon type={Icon.type.mi} name='my-location' size={normalizeDimens(13)} />
                        <Text style={style.itemText}>{item.distance} km</Text>
                      </View>
                    </View>
                    <View style={style.btnOrder}>
                      <View>
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
        {serviceDetail.result &&
          <View style={[style.detailContainer, {marginBottom: top}]}>
            <Image style={style.imgDetail}
              source={serviceDetail.result.banner[0] ? {uri: serviceDetail.result.banner[0]} : NoImage} />
            <Gap height={20} />
            <Text style={style.detailTitle}>
              {serviceDetail.result.name}
              <Gap width={5} />
              {serviceDetail.result.promo &&
                <View style={style.detailPromoWrapp}>
                  <Icon type={Icon.type.mci} name='brightness-percent' color={colors.red.primary}
                    size={normalizeDimens(16)} />
                  <Gap width={3} />
                  <Text style={[style.textDiscount, style.detailPromoText]}>
                    {serviceDetail.result.promo.diskon.typeDiskon === 'percent'
                      ? <Text>{serviceDetail.result.promo.diskon.valueDiskon}% off</Text>
                      : <Text>{serviceDetail.result.promo.diskon.valueDiskon}k off</Text>
                    }
                  </Text>
                </View>
              }
            </Text>
            <Gap height={6} />
            <Text style={style.detailTextDesc}>{serviceDetail.result.desc}</Text>
            <Gap height={6} />
            <Text style={style.detailTextPrice}>
              {currencyFormat(String(serviceDetail.result.price))}
              {serviceDetail.result.quantityType === 'kg' ? '/kg' : ''}
              <Gap width={5} />
              <Text style={[style.detailTextDesc, style.detailPrice]}>
                {serviceDetail.result.quantityType === 'kg'
                  ? '(timbang di tempat oleh kurir)' : '(harga sesuai subservice)'}
              </Text>
            </Text>
            <Gap height={20} />
            <TouchableOpacity
              activeOpacity={serviceDetail.result.ratingAverage ? 0.25 : 1}
              onPress={serviceDetail.result.ratingAverage ? getReview : undefined}
              style={style.detailLaundryWrapp}>
              <View style={style.detailLaundryHeader}>
                <Text style={style.detailTextLaundryName}>{serviceDetail.result.laundry.name}</Text>
                {serviceDetail.result.ratingAverage && <Text style={style.textCekUlasan}>Cek Ulasan</Text>}
              </View>
              <Gap height={8} />
              <View>
                <View style={style.detailInfoWrapp}>
                  <Icon type={Icon.type.mi} name='my-location' size={normalizeDimens(16)} />
                  <Text style={style.itemText}>
                    {serviceDetail.result.distance} km
                    <Gap width={5} />
                    <Text style={style.detailTextDesc}>
                      ({serviceDetail.result.laundry.user_id.address.street})
                    </Text>
                  </Text>
                </View>
                <Gap height={8} />
                <View style={style.detailInfoWrapp}>
                  <Icon type={Icon.type.ai} name='star' size={normalizeDimens(16)} color='#fbbf24' />
                  <Text style={style.itemText}>
                    {serviceDetail.result.ratingAverage ?
                      `${serviceDetail.result.ratingAverage} ratings` : 'Belum ada rating'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Gap height={25} />
            <Button text='Order Sekarang'
              onPress={() => navigateToOrder(serviceDetail.result)}
            />
          </View>
        }
      </BottomModal>
      <BottomModal ref={btModal2}
        onTouchOutside={() => {
          btModal2.current.dismiss();
          setTimeout(() => {
            btModal.current.show();
          }, 400);
        }}>
        {reviews.result && reviews.result.length &&
          <View style={[style.reviewsContainer, {marginBottom: top}]}>
            <View style={style.starAverage}>
              <View style={style.ratingAverageWrapp}>
                <Text style={style.txtRatingAverage}>{serviceDetail.result.ratingAverage}</Text>
                <Gap width={6} />
                <Icon type={Icon.type.ai} name='star' size={23} color='#fbbf24' />
              </View>
              <Gap width={6} />
              <Text style={style.reviewCreated}>
                {reviews.result.length > 600 ? '600+' : reviews.result.length} rating/ulasan
              </Text>
            </View>
            <Gap height={10} />
            <Row align='center' style={style.rowBtnBack}>
              <ButtonIcon icType={Icon.type.mci} icName='arrow-left' icSize={22} dimens={35}
                background='transparent' rippleColor='rgba(0,0,0,0.3)' onPress={() => {
                  btModal2.current.dismiss();
                  setTimeout(() => {
                    btModal.current.show();
                  }, 400);
                }} />
              <Gap width={6} />
              <Text style={style.allReviews}>Semua Ulasan</Text>
            </Row>
            <Gap height={20} />
            {reviews.result.map((item: any, idx: number) => (
              <View key={`Reviews-${idx}`}>
                {idx !== 0 && <Gap height={15} />}
                <View style={style.headerReviews}>
                  <View style={style.fakeAfatar}>
                    <Text style={style.fakeAfatarText}>
                      {`${item.name.split(' ').map((word: string) => word[0]).join('')}`}
                    </Text>
                  </View>
                  <View style={style.contentContainer}>
                    <Text style={style.nameReviewer}>{item.name}</Text>
                    <Text style={style.reviewCreated}>{moment(item.createdAt).format('DD MMMM yyy')}</Text>
                  </View>
                  <View style={style.starWrapper}>
                    <Icon type={Icon.type.ai} name='star' size={17} color='#f43f5e' />
                    <Gap width={5} />
                    <Text style={[style.nameReviewer, style.textStar]}>{item.rating}</Text>
                  </View>
                </View>
                <Gap height={10} />
                <View style={style.itemReviewsWrapp}>
                  <View style={style.beforeBulb} />
                  <View style={style.commentTextWrapp}>
                    <Text style={style.commentText}>{item.comment}</Text>
                    <Gap height={7} />
                    <View style={style.ratingAverageWrapp}>
                      <Icon type={Icon.type.mci} name='washing-machine' size={16} color='#333' />
                      <Gap width={6} />
                      <Text style={style.reviewCreated}>
                        {item.sub_service ? item.sub_service : item.id_service.name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        }
      </BottomModal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderCart: state.OrdersReducer.orderCart,
});

export default connect(mapStateToProps)(HomePage);
