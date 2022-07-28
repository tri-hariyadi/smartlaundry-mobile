import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Animated, Platform, Linking, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { connect, useDispatch } from 'react-redux';
import { Shadow } from 'react-native-shadow-2';
import { showMessage } from 'react-native-flash-message';
import Gmaps from '@image/google_maps.svg';
import { CommonActions } from '@react-navigation/native';
import { useFormik } from 'formik';
import { Button, ButtonIcon, Gap, Icon, InputText, StatusBarApp, TouchableItem } from '@components';
import { Alert, AlertProps, BottomModal, BottomModalProps, CardLoading, ErrorIndicator, Header, Row } from '@parts';
import colors from '@utils/colors';
import OrderAct from '@action/OrderAction';
import { RootState } from '@store/store';
import Token from '@utils/token';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import normalizeDimens from '@utils/normalizeDimens';
import currencyFormat from '@utils/currencyFormat';
import AuthAction from '@store/action-creators/AuthAction';
import useKeyboard from '@utils/useKeyboard';
import styles from './style';

type addressType = {
  addressName: string;
  address: string;
  detailAddress: string;
  lat: number;
  long: number;
}

interface IProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: addressType;
    role: string;
    laundry:{
      name: string;
    }
  }|null;
  userLoading: boolean;
  userError: string | boolean
}

const LaundryHome: React.FC<NavigationProps & IProps> = ({ navigation, user, userLoading, userError }) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
  const alert = useRef<AlertProps>();
  const btModal = useRef<BottomModalProps>();
  const btModa2 = useRef<BottomModalProps>();
  const animateY = React.useRef(new Animated.Value(0)).current;
  const [currentOrder, setCurrentOrder] = useState<Partial<IResponseHttpService>>({loading: true});
  const [dataOrder, setDataOrder] = useState<any>({});
  const [height, setHeight] = React.useState(0);
  const [bg, setBg] = useState(colors.primary);
  const formik = useFormik({
    initialValues: {total: ''},
    validate: (v) => { if (!v.total) return {total: 'Berat cucian (Kg) harus diisi'}; },
    onSubmit: (v) => getPrices(parseFloat(v.total)),
  });

  const getUser = async () => {
    const tokenDecoded = await Token.tokenDecode();
    await AuthAction.getDataUser(tokenDecoded.aud as string, true)(dispatch);
  };

  const getData = async () => {
    setCurrentOrder({loading: true});
    const tokenDecoded = await Token.tokenDecode();
    const response = await OrderAct.getOrders(tokenDecoded.aud as string);
    OrderAct.saveOrders(
      response.result,
      response.status !== 200 && response.message,
    )(dispatch);
    if (response.result)
      setCurrentOrder({...response, result: response.result.filter(({ status }: any) => status === '0')});
    else setCurrentOrder(response);
  };

  const getPrices = async (total: number) => {
    const response = await OrderAct.calculatePrice({
      totalPay: total * dataOrder.service.price,
      totalOrder: total,
      id_service: dataOrder.service._id,
      laundryPosition: {
        lat: user?.address.lat || 0,
        long: user?.address.long || 0,
      },
      custPosition: {
        lat: dataOrder.address.lat,
        long: dataOrder.address.long,
      },
    });
    if (response.result && response.status === 200) {
      const updateWeight = await OrderAct.inputWeight(
        {totalPrice: response.result.totalPrice, total: total},
        dataOrder._id);
      if (updateWeight.status === 200) {
        await Promise.resolve(getData());
        btModa2.current?.dismiss();
        setTimeout(() => {
          formik.setFieldValue('total', '');
          formik.setTouched({total: false});
          setBg('#5cb85c');
          showMessage({message: updateWeight.message as string, type: 'success',
            icon: 'success', duration: 3000, style: styles.flashMessage, onHide: () => setBg(colors.primary)});
        }, 400);
      } else {
        setBg('#d9534f');
        showMessage({message: updateWeight.message as string, type: 'danger', onHide: () => setBg(colors.primary),
          icon: 'danger', duration: 3000, style: styles.flashMessage});
      }
    } else {
      setBg('#d9534f');
      showMessage({message: response.message as string, type: 'danger', onHide: () => setBg(colors.primary),
        icon: 'danger', duration: 3000, style: styles.flashMessage});
    }
  };

  const logOut = () => {
    alert.current?.showAlert({
      type: 'warning',
      title: 'Logout',
      message: 'Yakin kamu akan keluar dari aplikasi?',
      showCancelButton: true,
      onConfirmPressed: async () => {
        alert.current?.hideAlert();
        const response = await Promise.resolve(AuthAction.logOut());
        alert.current?.showAlert({
          showProgress: true,
          message: 'Loading...',
          showConfirmButton: false,
        });
        if (response.status === 200) {
          await Promise.resolve(AuthAction.resetAuthReducer()(dispatch));
          alert.current?.hideAlert();
          alert.current?.showAlert({
            title: 'Success',
            message: 'Berhasil keluar dari aplikasi?',
            onDismiss: async () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LoginScreen' }],
                }),
              );
            },
          });
        } else {
          alert.current?.showAlert({
            type: 'error',
            show: true,
            title: 'Gagal',
            message: response.message,
          });
        }
      },
    });
  };

  const openGPS = async (latitude: number, longitude: number, label = 'MyLabel') => {
    const tag = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
    const link = Platform.select({
      ios: `${tag}${label}@${latitude},${longitude}`,
      android: `${tag}${latitude},${longitude}(${label})`,
    });
    try {
      const supported = await Linking.canOpenURL(link as string);
      if (supported) Linking.openURL(link as string);
      else throw new Error('Tidak bisa membuka GPS, pastikan perangkatmu mendukung aplikasi GPS');
    } catch (error) {
      setBg('#d9534f');
      showMessage({message: error as string, type: 'danger', duration: 3000,
        style: styles.flashMessage, onHide: () => setBg(colors.primary)});
    }
  };

  const onListOrderClick = (item: any) => {
    setDataOrder(item);
    btModal.current?.dismiss();
    animateY.setValue(0);
    Animated.timing(animateY, {
      toValue: 1, duration: 300, delay: 500,
      useNativeDriver: true,
    }).start();
  };

  const containerStyle = {
    transform: [{
      translateY: animateY.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [height, height / 2, 0],
      }),
    }],
    opacity: animateY,
  };

  const changeBarColor = async () => {
    try {
      await SystemNavigationBar.navigationShow();
      await SystemNavigationBar.setNavigationColor('#e5e7eb');
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') StatusBar.setBackgroundColor(colors.primary);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    changeBarColor();
    getData();
  }, []);

  useEffect(() => {
    if (currentOrder.result && currentOrder.result.length && Object.keys(dataOrder).length)
      setDataOrder((v: any) => currentOrder.result.filter((item: any) => item._id === v._id)[0]);
  }, [JSON.stringify(currentOrder)]);

  const renderPage = () => {
    if (userLoading) return (
      <View style={styles.pageContainer}>
        <ActivityIndicator size={30} color={colors.primary} />
        <Text>Loading...</Text>
      </View>
    );

    if (userError) return <ErrorIndicator errorMessage={userError as string} />;

    return (
      <>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitudeDelta: 0,
            longitudeDelta: 0.0080,
            latitude: user?.address.lat || 0,
            longitude: user?.address.long || 0,
          }}>
          <Marker
            coordinate={{
              latitude: user?.address.lat || 0,
              longitude: user?.address.long || 0,
            }}>
            <View style={styles.markerWrap}>
              <Icon
                type={Icon.type.mi}
                name='location-on'
                size={32}
                color={colors.red.primary}
              />
              <View>
                <View style={styles.markerTxtWrapp} />
                <Text style={styles.markerTxt}>{user?.laundry?.name}</Text>
              </View>
            </View>
          </Marker>
          {Object.keys(dataOrder).length > 0 &&
            <Marker
              coordinate={{
                latitude: dataOrder.address?.lat || 0,
                longitude: dataOrder.address?.long || 0,
              }}>
              <View style={styles.markerWrap}>
                <Icon
                  type={Icon.type.mi}
                  name='location-on'
                  size={32}
                  color={colors.red.primary}
                />
                <View>
                  <View style={styles.markerTxtWrapp} />
                  <Text style={styles.markerTxt}>{dataOrder.id_customer?.fullName}</Text>
                </View>
              </View>
            </Marker>
          }
        </MapView>
        <View style={styles.btnOrderListWrapp}>
          <ButtonIcon icType={Icon.type.fa5} icName='shopping-basket' icSize={22} text='List Order'
            background='#e11d48' icColor='#e5e7eb' icStyle={styles.icStyle}
            onPress={() => {
              btModal.current?.show();
              getData();
            }} />
        </View>
        <Animated.View
          onLayout={e => setHeight(e.nativeEvent.layout.height)}
          style={[styles.bottomContainer, containerStyle]}>
          {dataOrder.service?.quantityType === 'kg' &&
            <>
              <ButtonIcon icType={Icon.type.oi} icName='plus' icSize={20} text='Input Kg'
                background='#0d9488' icColor='#e5e7eb' icStyle={styles.icStyle}
                onPress={btModa2.current?.show} />
              <Gap height={7} />
            </>
          }
          <Shadow
            offset={[0, 1]} distance={5} startColor='#0004'
            radius={normalizeDimens(15)}
            viewStyle={styles.card}
            containerViewStyle={[styles.cardContainer]}>
            <TouchableItem onPress={() => openGPS(dataOrder.address?.lat, dataOrder.address?.long)}
              styleWrapper={styles.basketContainer}>
              <View style={styles.basketWrapper}>
                <Row align='center' justify='space-between'>
                  <Row align='center'>
                    <Icon type={Icon.type.fa5} name='shopping-basket' size={20} color='#e11d48' />
                    <Gap width={10} />
                    <Text style={styles.textTotalBasket}>
                      {dataOrder.service?.name}
                    </Text>
                  </Row>
                  <Text style={styles.textItemBasket}>
                    {currencyFormat(String(dataOrder.totalPrice))}
                  </Text>
                </Row>
                <Gap height={7} />
                <Text style={styles.textItemBasket}>
                  Orderan dari {dataOrder.id_customer?.fullName}
                </Text>
                <Text style={styles.textDetailBasket}>
                  {dataOrder.id_customer?.phoneNumber}
                </Text>
                <Text style={styles.textDetailBasket}>
                  {dataOrder.address?.address}
                </Text>
                <Gap height={7} />
                <View style={styles.itemSeparator} />
                <Gap height={7} />
                <Row align='center' justify='center'>
                  <Gmaps width={normalizeDimens(35)} height={normalizeDimens(35)} />
                  <Text style={[styles.textItemBasket, styles.txtGmaps]}>Navigasi dengan Google Maps</Text>
                </Row>
              </View>
            </TouchableItem>
          </Shadow>
        </Animated.View>
      </>
    );
  };

  return (
    <>
      <StatusBarApp backgroundColor={bg} />
      <Header showBackButton
        rightContent={() => (
          <ButtonIcon
            icType={Icon.type.ei}
            icName='log-out'
            icSize={23}
            dimens={45}
            icStyle={styles.icStyle}
            onPress={logOut}
          />
        )}
      />
      <View style={styles.pageContainer}>
        {renderPage()}
      </View>
      <Alert ref={alert} />
      <BottomModal ref={btModal}>
        <View style={{marginBottom: top}}>
          <FlatList
            data={currentOrder.result}
            keyExtractor={(v, idx) => `listorder-${idx}`}
            ListHeaderComponent={() => (
              <Text style={styles.txtListOrder}>List Order</Text>
            )}
            renderItem={({ item }) => (
              <TouchableItem onPress={() => onListOrderClick(item)} styleWrapper={styles.listWrapper}>
                <View style={styles.itemListWrapp}>
                  <Row style={styles.listFlex}>
                    <Icon type={Icon.type.fa5} name='shopping-basket' color={colors.red.primary} size={25} />
                    <Gap width={20} />
                    <View>
                      <Text style={styles.btnListTitle}>{item.service.name}</Text>
                      <Text style={styles.btnListText}>{item.id_customer.fullName}</Text>
                      <Text style={styles.btnListText}>{item.id_customer.phoneNumber}</Text>
                    </View>
                  </Row>
                  <Row style={styles.listFlex} justify='flex-end'>
                    <Gap width={10} />
                    <Text style={styles.btnListText}>{
                      item.sub_service.length > 0
                        ? item.sub_service.map((v: any) => `(${v.total}x) ${v.name}`).join(', ')
                        : `${item.total} Kg` || ''
                    }</Text>
                  </Row>
                </View>
              </TouchableItem>
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListEmptyComponent={() => {
              if (currentOrder.loading) return (
                <View style={styles.loadingList}>
                  <CardLoading count={2} loadingTextCount={3} heightLoadingText={12} />
                </View>
              );
              if (currentOrder.status !== 200 && !currentOrder.loading) return (
                <View style={styles.listEmptyContainer}>
                  <ErrorIndicator errorMessage={currentOrder.message} />
                </View>
              );
              return (
                <View style={styles.listEmptyContainer}>
                  <ErrorIndicator isEmpty errorMessage='Belum ada orderan dari Pelanggan!' />
                </View>
              );
            }}
          />
        </View>
      </BottomModal>
      <BottomModal ref={btModa2}>
        <View style={[styles.formContainer, !keyboard.isOpen && {marginBottom: top}]}>
          <Text style={styles.txtListOrder}>Input Berat Kg Cucian</Text>
          <Gap height={10} />
          <InputText
            {...formik}
            isFirst
            name='total'
            label='Berat Kg'
            icType={Icon.type.mci}
            icName='weight-kilogram'
            blurOnSubmit
            keyboardType='numeric'
            returnKeyType='done' />
          <Gap height={20} />
          <Button text='Simpan' icType={Icon.type.fi} icName='save'
            isLoading={formik.isSubmitting} onPress={() => {
              formik.handleSubmit();
              keyboard.dismiss();
            }} />
        </View>
      </BottomModal>
      <SafeAreaView style={[{marginBottom: -top}]} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.AuthReducer.userData,
  userLoading: state.AuthReducer.userLoading,
  userError: state.AuthReducer.userError,
});

export default connect(mapStateToProps)(LaundryHome);
