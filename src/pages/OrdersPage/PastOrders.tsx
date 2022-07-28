import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import moment from 'moment';
import 'moment/locale/id';
import { connect, useDispatch } from 'react-redux';
import NoImage from '@image/welcome3.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { Button, ButtonIcon, Gap, Icon, TextArea } from '@components';
import { Card, ErrorIndicator, BottomModal, BottomModalProps, Alert, AlertProps, Row } from '@parts';
import currencyFormat from '@utils/currencyFormat';
import { RootState } from '@store/store';
import OrderAct from '@action/OrderAction';
import ServiceAct from '@action/ServiceAction';
import AuthAct from '@action/AuthAction';
import Token from '@utils/token';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import colors from '@utils/colors';
import useKeyboard from '@utils/useKeyboard';
import styles from './style';

interface IProps {
  dataOrders: Array<{
    _id: string;
    progress: Array<{
        name: string;
        desc: string;
        status: string;
      }>,
    service: {
      _id: string;
      name: string;
      desc: string;
      banner: Array<string>;
      quantityType: string;
      laundry: {
        name: string;
      },
    },
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    status: string;
  }>;
  dataOrdersError: string | boolean | undefined;
  orderCart: {id_service: string};
}

const PastOrders: React.FC<NavigationProps & IProps> = ({
  navigation, dataOrders, dataOrdersError, orderCart,
}) => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const keyboard = useKeyboard();
  const alert = useRef<AlertProps>(null);
  const btModal = useRef<BottomModalProps>();
  const btModal2 = useRef<BottomModalProps>();
  const animatedStar = useRef(new Animated.Value(0)).current;
  const [serviceDetail, setServiceDetail] = useState<Partial<IResponseHttpService>>({loading: true});
  const [dataReview, setDataReview] = useState<any>('');
  const [starMask, setStarMask] = useState<{[key: string]: boolean}>({
    '1': true, '2': true, '3': true, '4': true, '5': true,
  });
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: async (v) => {
      const tokenDecoded = await Token.tokenDecode();
      const user = await AuthAct.getUser(tokenDecoded.aud as string);
      if (!user.result || user.status !== 200) return alert.current?.showAlert({
        type: 'error',
        title: 'Error',
        message: 'Terjadi kesalahan, tidak bisa mengirim ulasan',
      });
      const param = {
        name: user.result.fullName,
        rating: Object.values(starMask).filter(value => value).length,
        comment: v.comment,
        id_service: dataReview.service._id,
        sub_service: dataReview.sub_service.length > 0
          ? dataReview.sub_service.map((item: any) => item.name).join(', ')
          : '',
      };
      const response = await ServiceAct.addReview(param);
      if (response.status === 200) {
        btModal.current?.dismiss();
        setTimeout(() => {
          showMessage({message: 'Berhasil memberikan ulasan', type: 'success'});
        }, 400);
      }
      else
        showMessage({message: response.message as string, type: 'danger', position: 'bottom'});
    },
  });

  const starStyle = {
    transform:[{scale: animatedStar}],
  };

  const spring = (delay?: number) => {
    animatedStar.setValue(0);
    Animated.spring(
      animatedStar,
      {
        toValue: 1,
        friction: 4,
        tension: 150,
        useNativeDriver: false,
        delay: delay || 0,
      },
    ).start();
  };

  const getDetailService = async (idService: string) => {
    const tokenDecoded = await Token.tokenDecode();
    AuthAct.getDataUser(tokenDecoded.aud as string)(dispatch);
    const anyOrder = await OrderAct.getAnyOrder(tokenDecoded.aud as string);
    if (anyOrder.result && anyOrder.result.anyorder) return alert.current?.showAlert({
      type: 'warning',
      title: 'Warning',
      message: 'Belum bisa order lagi nih, tunggu orderan yang lain selesai dulu.',
    });
    btModal2.current?.show();
    const response = await ServiceAct.getServicesById(idService, -6.242025515100212, 107.00061389711712);
    setServiceDetail(response);
    ServiceAct.saveDataService(response.result, response.message)(dispatch);
  };

  const navigateToOrder = (data: any) => {
    if (orderCart.id_service && (data._id !== orderCart.id_service)) {
      btModal2.current?.dismiss();
      setTimeout(() => {
        alert.current?.showAlert({
          type: 'warning',
          title: 'Ganti Order',
          message: 'Yakin mau ganti order?',
          showCancelButton: true,
          onConfirmPressed: () => {
            OrderAct.resetOrderCart()(dispatch);
            alert.current?.hideAlert();
            btModal2.current?.show();
          },
        });
      }, 400);
    } else {
      btModal2.current?.dismiss();
      setTimeout(() => {
        if (data.subServices.length) {
          navigation.navigate('OrderTopNav');
        } else {
          navigation.navigate('PickupAdress');
        }
      }, 400);
    }
  };

  const onBtnStarPress = (star: string) => {
    const arrStar = Object.keys(starMask);
    if (starMask[star]) {
      arrStar.forEach((item, idx) => {
        if (idx > arrStar.indexOf(star)) {
          setStarMask(v => ({...v, [item]: false}));
        }
      });
    } else {
      arrStar.forEach((item, idx) => {
        if (idx <= arrStar.indexOf(star)) {
          setStarMask(v => ({...v, [item]: true}));
        }
      });
    }
    spring();
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={dataOrders.filter(({ status }) => status === '1')}
          keyExtractor={(v, idx) => `pastorders-${idx}`}
          style={styles.content}
          renderItem={({ item }) => (
            <Card>
              <View style={[styles.itemHeader, styles.itemHeaderPastOrder]}>
                <Image
                  source={item.service.banner[0]
                    ? {uri: item.service.banner[0]}
                    : require('@image/welcome3.png')}
                  style={styles.imgService} />
                <Gap width={15} />
                <View style={styles.descPastOrder}>
                  <Text style={styles.title}>{item.service.laundry.name}</Text>
                  <Text style={styles.titleDesc}>
                    {moment(item.createdAt).format('dddd, DD MMMM YYYY')} .{' '}
                    <Text style={styles.textDone}>Selesai</Text>
                  </Text>
                  <Gap height={4} />
                  <Text style={styles.textServiceName}>{item.service.name}</Text>
                  <Gap height={10} />
                  <View style={styles.itemOrderAgain}>
                    <Text style={styles.totalPrice}>{currencyFormat(String(item.totalPrice))}</Text>
                    <ButtonIcon
                      text='Order Lagi'
                      icType={Icon.type.mi}
                      icName='shopping-cart'
                      icSize={15}
                      icStyle={styles.icStyle}
                      background='#E36F00'
                      onPress={() => getDetailService(item.service._id)}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.footerPastOrder}>
                <TouchableOpacity style={styles.btnReview} onPress={() => {
                  setDataReview(item);
                  btModal.current?.show();
                  spring(1000);
                }}>
                  <View style={styles.reviewWrapp}>
                    <Text style={styles.reviewText}>Kasih ulasan, yuk</Text>
                    <Gap width={10} />
                    <View style={styles.reviewWrapp}>
                      {Array.from(Array(5)).map((_item, idx) =>
                        <Icon key={`star-${idx}`} type={Icon.type.ai} name='star' size={20} color='#e5e7eb' />)}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          )}
          ItemSeparatorComponent={() => <Gap height={15} />}
          contentContainerStyle={styles.listContainerStyle}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyContainer}>
              {!dataOrders.filter(({ status }) => status === '1').length && !dataOrdersError
                ? <ErrorIndicator isEmpty errorMessage='Belum ada order nih, order yuk.' />
                : <ErrorIndicator errorMessage={dataOrdersError as string} />
              }
            </View>
          )}
        />
      </View>
      <BottomModal ref={btModal} onDismiss={() => {
        setStarMask({'1': true, '2': true, '3': true, '4': true, '5': true});
        formik.setFieldValue('comment', '');
        formik.setSubmitting(false);
      }}>
        <View style={[styles.reviewContainer, !keyboard.isOpen && {paddingBottom: top}]}>
          {dataReview &&
            <Row align='center'>
              <Image source={{uri: dataReview.service.banner[0]}} style={styles.imgProdReview} />
              <Gap width={16} />
              <View>
                <Text style={styles.txtNameServiceReview}>{dataReview.service.name}</Text>
                {dataReview.sub_service.length > 0 &&
                  <Text style={styles.txtSubServiceReview}>
                    {dataReview.sub_service.map((item: any) => item.name).join(', ')}
                  </Text>}
              </View>
            </Row>
          }
          <Gap height={20} />
          <Row align='center' justify='center'>
            {Object.keys(starMask).map((item, idx) => (
              <TouchableOpacity key={`addstars-${idx}`} onPress={() => onBtnStarPress(item)}>
                <Row>
                  <Animated.Text style={starMask[item] ? starStyle : {}}>
                    <Icon type={Icon.type.ai} name='star' size={40} color={starMask[item] ? '#fbbf24' : '#e5e7eb'} />
                  </Animated.Text>
                  <Gap width={12} />
                </Row>
              </TouchableOpacity>
            ))}
          </Row>
          <Gap height={10} />
          <TextArea
            {...formik}
            icType={Icon.type.mci}
            icName='comment-text-multiple'
            icSize={23}
            name='comment'
            label='Komentar'
          />
          <Gap height={20} />
          <Button text='Kirim Ulasan'
            isLoading={formik.isSubmitting}
            onPress={formik.handleSubmit} />
          <Gap height={15} />
        </View>
      </BottomModal>
      <BottomModal ref={btModal2}
        textDisabled='Tutup'
        isDisabled={serviceDetail.result && !serviceDetail.result.laundry.status}>
        {serviceDetail.result &&
          <View style={[styles.detailContainer, {marginBottom: top}]}>
            <Image style={styles.imgDetail}
              source={serviceDetail.result.banner[0] ? {uri: serviceDetail.result.banner[0]} : NoImage} />
            <Gap height={20} />
            <Text style={styles.detailTitle}>
              {serviceDetail.result.name}
              <Gap width={5} />
              {serviceDetail.result.promo &&
                <View style={styles.detailPromoWrapp}>
                  <Icon type={Icon.type.mci} name='brightness-percent' color={colors.red.primary}
                    size={16} />
                  <Gap width={3} />
                  <Text style={[styles.textDiscount, styles.detailPromoText]}>
                    {serviceDetail.result.promo.diskon.typeDiskon === 'percent'
                      ? <Text>{serviceDetail.result.promo.diskon.valueDiskon}% off</Text>
                      : <Text>{serviceDetail.result.promo.diskon.valueDiskon}k off</Text>
                    }
                  </Text>
                </View>
              }
            </Text>
            <Gap height={6} />
            <Text style={styles.detailTextDesc}>{serviceDetail.result.desc}</Text>
            <Gap height={6} />
            <Text style={styles.detailTextPrice}>
              {currencyFormat(String(serviceDetail.result.price))}
              {serviceDetail.result.quantityType === 'kg' ? '/kg' : ''}
              <Gap width={5} />
              <Text style={[styles.detailTextDesc, styles.detailPrice]}>
                {serviceDetail.result.quantityType === 'kg'
                  ? '(timbang di tempat oleh kurir)' : '(harga sesuai subservice)'}
              </Text>
            </Text>
            <Gap height={20} />
            <Button text='Order'
              onPress={() => navigateToOrder(serviceDetail.result)}
            />
          </View>
        }
      </BottomModal>
      <Alert ref={alert} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  dataOrders: state.OrdersReducer.dataOrders,
  dataOrdersError: state.OrdersReducer.dataOrdersError,
  orderCart: state.OrdersReducer.orderCart,
});

export default connect(mapStateToProps)(PastOrders);
