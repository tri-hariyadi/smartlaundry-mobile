import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { Gap, Icon, InputText, StatusBarApp, TouchableItem, Button, TextArea } from '@components';
import { Alert, AlertProps, Card, Header } from '@parts';
import colors from '@colors';
import { NavigationProps } from '@utils/types';
import { getCurrentLocation } from '@utils/getLocation';
import { getData, removeData, storeData } from '@store/localStorage';
import { RootState } from '@store/store';
import Token from '@utils/token';
import OrderValidation from '@validates/OrderValidation';
import style, { warnStyle, scrollStyle } from './style';

interface IProps {
  service: {
    _id?: string;
    laundry?: {
      _id: string;
      name: string;
      user_id: {
        _id: string;
      }
    };
    quantityType?: string
  }
  orderCart: {
    items: Array<{
      name: string;
      total: number;
      totalPrice: number;
      type: string;
    }>
    totalPriceItems: number;
    laundryName: string;
    priceCalculated?: number;
  }
}

const PickupAdress: React.FC<NavigationProps & IProps> = ({ navigation, service, orderCart }) => {
  const { top } = useSafeAreaInsets();
  const [checkboxData, setCheckboxData] = useState({ save: false });
  const [radioBtnData, setRadioBtnData] = useState({
    currentloc: false,
    savedAddress: false,
    cod: false,
    banking: false,
  });
  const [heightWarn, setHeightWarn] = useState(0);
  const alert = useRef<AlertProps>(null);
  const currentAddress = useRef<any>(null);
  const warningAnimated = useRef(new Animated.Value(0)).current;

  const formik = useFormik({
    initialValues:{
      service: service._id,
      sub_service: orderCart.items.length ? orderCart.items.map(item => ({
        name: item.name,
        price: item.totalPrice,
        total: item.total,
      })) : [],
      addressName: '',
      address: '',
      detailAddress: '',
      lat: '',
      long: '',
      totalPrice: orderCart.priceCalculated ? orderCart.priceCalculated : 0,
      total: orderCart.items.length ? orderCart.items.reduce((a, b) => a + b.total, 0) : 0,
      payment: '',
      id_merchant: service.laundry?.user_id._id,
      id_customer: '',
    },
    validate: OrderValidation,
    onSubmit: async (values) => {
      if (!values.payment) return alert.current?.showAlert({
        type: 'warning',
        title: 'Warning',
        message: 'Pilih pembayaran dulu untuk lanjut order.',
      });
      navigation.push('ReviewOrder', {values});
    },
  });

  useEffect(() => {
    const getIdCustomer = async () => {
      const idCustomer = (await Token.tokenDecode()).aud;
      formik.setFieldValue('id_customer', idCustomer);
    };
    radioBtnController('currentloc');
    getIdCustomer();
  }, []);

  useEffect(() => {
    if (checkboxData.save) {
      storeData('address', {
        addressName: formik.values.addressName,
        address: formik.values.address,
        detailAddress: formik.values.detailAddress,
        lat: currentAddress.current.position.lat,
        long: currentAddress.current.position.lng,
      });
    }
  }, [JSON.stringify(checkboxData)]);

  const radioBtnController = (
      field?: 'currentloc' | 'savedAddress' | 'cod' | 'banking' | null,
      isSelected?: boolean) => {
    if (field) {
      switch (field) {
        case 'currentloc':
          setRadioBtnData(v => ({...v, currentloc: true, savedAddress: false}));
          if (!radioBtnData.currentloc) {
            if (formik.values.addressName) formik.setFieldValue('addressName', '');
            if (formik.values.detailAddress) formik.setFieldValue('detailAddress', '');
            alert.current?.showAlert({
              showProgress: true,
              title: 'Mencari lokasi kamu...',
              message: '',
              showConfirmButton: false,
              closeOnHardwareBackPress: false,
              closeOnTouchOutside:  false,
            });
            getCurrentLocation().then((res) => {
              alert.current?.hideAlert();
              if (res.formattedAddress) {
                currentAddress.current = res;
                formik.setFieldValue('address', res.formattedAddress);
                formik.setFieldValue('lat', res.position.lat);
                formik.setFieldValue('long', res.position.lng);
              } else {
                alert.current?.showAlert({
                  type: 'error',
                  title: 'Error',
                  message: 'Gagal mendapatkan lokasi, izinkan aplikasi untuk mengakses lokasi kamu.',
                });
              }
              Animated.timing(warningAnimated, {
                toValue: 1, duration: 400, delay: 2000, useNativeDriver: false,
              }).start();
            });
          }
          break;
        case 'savedAddress':
          setRadioBtnData(v => ({...v, currentloc: false, savedAddress: true}));
          if (!radioBtnData.savedAddress) getSavedAddress();
          else removeData('address');
          break;
        case 'cod':
          setRadioBtnData(v => ({...v, cod: true, banking: false}));
          if (!radioBtnData.cod) formik.setFieldValue('payment', 'Cash On Delivery');
          break;
        case 'banking':
          setRadioBtnData(v => ({...v, cod: false, banking: true}));
          break;

        default:
          break;
      }
    } else {
      if (isSelected) return 'check-circle';
      return 'radio-button-unchecked';
    }
  };

  const checkBoxController = (setValue?: boolean | null, isSelected?: boolean) => {
    if (isSelected) {
      if (setValue) setCheckboxData({ save: false });
      return 'check-box';
    }
    if (setValue) setCheckboxData({ save: true });
    return 'check-box-outline-blank';
  };

  const getSavedAddress = async () => {
    currentAddress.current = await getData('address');
    if (currentAddress.current) {
      formik.setFieldValue('addressName', currentAddress.current.addressName);
      formik.setFieldValue('address', currentAddress.current.address);
      formik.setFieldValue('detailAddress', currentAddress.current.detailAddress);
      formik.setFieldValue('lat', currentAddress.current.lat);
      formik.setFieldValue('long', currentAddress.current.long);
    } else {
      alert.current?.showAlert({
        type: 'error',
        title: 'Error',
        message: 'Belum ada alamat tersimpan.',
      });
    }
  };

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <Header showBackButton textHeader={() => 'Alamat Dan Payment'}
        onBackPress={() => navigation.goBack()} />
      <View style={style.pageContainer}>
        {service.quantityType === 'kg' &&
          <Animated.View onLayout={e => setHeightWarn(e.nativeEvent.layout.height)}
            style={[style.warnContainer, warnStyle(warningAnimated, heightWarn)]}>
            <Icon type={Icon.type.ai} name='warning' size={18} />
            <Gap width={8} />
            <Text style={style.warnText}>
              Warning, <Gap width={3} />
              <Text style={style.warnDetail}>
                untuk order cuci kiloan akan ditimbang langsung oleh kurir di tempat.
              </Text>
            </Text>
          </Animated.View>
        }
        <Animated.ScrollView
          keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
          keyboardDismissMode='none' style={[style.scrollContainer, scrollStyle(warningAnimated, heightWarn)]}>
          <Gap height={8} />
          <Card>
            <View style={style.formCardContainer}>
              <Gap height={10} />
              <View style={style.formCard}>
                <Text style={style.locOptionText}>Alamat pickup dan delivery</Text>
                <Gap height={15} />
                <InputText
                  {...formik}
                  isFirst
                  icType={Icon.type.mci}
                  icName='home-account'
                  icSize={24}
                  name='addressName'
                  label='Nama Alamat'
                />
                <TextArea
                  {...formik}
                  icType={Icon.type.mci}
                  icName='home'
                  icSize={23}
                  name='address'
                  label='Alamat'
                />
                <TextArea
                  {...formik}
                  icType={Icon.type.mci}
                  icName='home-edit'
                  icSize={23}
                  name='detailAddress'
                  label='Detai Alamat'
                />
              </View>
              <Gap height={10} />
              <TouchableItem styleWrapper={style.touchableItem}
                onPress={() => radioBtnController('currentloc')}>
                <Icon type={Icon.type.mi} name={radioBtnController(null, radioBtnData.currentloc)}
                  size={25} color={radioBtnData.currentloc ? colors.emerald[500] : colors.textPrimary} />
                <Gap width={5} />
                <View style={style.locOptionWrapp}>
                  <Icon type={Icon.type.mi} name='my-location'
                    size={18} color={colors.textPrimary} />
                  <Text style={style.locOptionText}>Gunakan lokasi saat ini</Text>
                </View>
              </TouchableItem>
              <TouchableItem styleWrapper={style.touchableItem}
                onPress={() => radioBtnController('savedAddress')}>
                <Icon type={Icon.type.mi} name={radioBtnController(null, radioBtnData.savedAddress)}
                  size={25} color={radioBtnData.savedAddress ? colors.emerald[500] : colors.textPrimary} />
                <Gap width={5} />
                <View style={style.locOptionWrapp}>
                  <Icon type={Icon.type.mi} name='location-on'
                    size={18} color={colors.red.primary} />
                  <Text style={style.locOptionText}>Gunakan alamat tersimpan</Text>
                </View>
              </TouchableItem>
              <TouchableItem styleWrapper={style.touchableItem}
                onPress={() => checkBoxController(true, checkboxData.save)}>
                <View style={style.locOptionWrapp}>
                  <Icon type={Icon.type.mi} name={checkBoxController(null, checkboxData.save)}
                    size={23} color={checkboxData.save ? colors.emerald[500] : colors.textPrimary} />
                  <Gap width={5} />
                  <Text style={style.locOptionText}>Simpan alamat</Text>
                </View>
              </TouchableItem>
            </View>
          </Card>
          <Gap height={15} />
          <Card>
            <View style={[style.cardLocation]}>
              <Text style={[style.locOptionText, style.touchableItem]}>Pembayaran</Text>
              <TouchableItem styleWrapper={style.touchableItem}
                onPress={() => radioBtnController('cod')}>
                <Icon type={Icon.type.mi} name={radioBtnController(null, radioBtnData.cod)}
                  size={25} color={radioBtnData.cod ? colors.emerald[500] : colors.textPrimary} />
                <Gap width={3} />
                <Text style={style.locOptionText}>Cash On Delivery</Text>
              </TouchableItem>
              {/* <TouchableItem styleWrapper={style.touchableItem}
                onPress={() => radioBtnController('banking')}>
                <Icon type={Icon.type.mi} name={radioBtnController(null, radioBtnData.banking)}
                  size={25} color={radioBtnData.banking ? colors.emerald[500] : colors.textPrimary} />
                <Gap width={3} />
                <Text style={style.locOptionText}>Net Banking</Text>
              </TouchableItem> */}
            </View>
          </Card>
          <Gap height={25} />
          <Button text='Lanjut'
            icType={Icon.type.mci} icName='login'
            onPress={formik.handleSubmit} />
          <Gap height={100} />
        </Animated.ScrollView>
      </View>
      <Alert ref={alert} />
      <SafeAreaView style={[style.safeArea, {marginBottom: -top}]} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderCart: state.OrdersReducer.orderCart,
  service: state.ServiceReducer.service,
});

export default connect(mapStateToProps)(PickupAdress);
