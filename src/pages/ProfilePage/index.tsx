import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { showMessage } from 'react-native-flash-message';
import Logo from '@image/logo.png';
import { useFormik } from 'formik';
import { ButtonIcon, Gap, Icon, InputText, StatusBarApp, TouchableItem, Button } from '@components';
import colors from '@colors';
import { Alert, AlertProps, Card, CardLoading, Header, BottomModal, Row, ErrorIndicator } from '@parts';
import Token from '@utils/token';
import AuthAction from '@action/AuthAction';
import { NavigationProps } from '@utils/types';
import { RootState } from '@store/store';
import normalizeDimens from '@utils/normalizeDimens';
import { getData } from '@store/localStorage';
import useKeyboard from '@utils/useKeyboard';
import passwordValidation from '@validates/passwordValidation';
import style from './style';

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
  }|null;
  userLoading: boolean;
  userError: string | boolean
}

const ProfilePage: React.FC<NavigationProps & IProps> = ({ navigation, user, userLoading, userError }) => {
  const { top } = useSafeAreaInsets();
  const keyboard = useKeyboard();
  const dispatch = useDispatch();
  const alert = useRef<AlertProps>();
  const btModal = useRef<any>();
  const address = useRef<addressType>();
  const a = useRef<any>();
  const b = useRef<any>({ focus: () => null });
  const c = useRef<any>({ focus: () => null });
  const [infoItem, setInfoItem] = useState('');
  // const [region, setRegion] = useState({latitudeDelta: 0.0,longitudeDelta: 0.0041});
  const formik = useFormik({
    initialValues: {fullName: '', phoneNumber: '', email: '', role: ''},
    onSubmit: async (values) => {
      const tokenDecoded = await Token.tokenDecode();
      const response = await AuthAction.updateUser({...values, role: user?.role}, user?._id as string);
      if (response.status === 200) {
        btModal.current.dismiss();
        await AuthAction.getDataUser(tokenDecoded.aud as string)(dispatch);
        showMessage({message: response.message as string, type: 'success'});
      } else {
        showMessage({message: response.message as string, type: 'danger'});
      }
    },
  });
  const formik2 = useFormik({
    initialValues: {password: ''},
    validationSchema: passwordValidation,
    onSubmit: async (v) => {
      const response = await AuthAction.updatePassword(v.password, user?._id as string);
      if (response.status === 200) {
        btModal.current.dismiss();
        await Promise.resolve(AuthAction.resetAuthReducer()(dispatch));
        navigation.removeListener('focus', fetchData);
        alert.current?.showAlert({
          type: 'success',
          title: 'Success',
          message: `${response.message}, silahkan login kembali dengan password baru`,
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
          title: 'Error',
          message: response.message,
        });
      }
    },
  });

  const onBtnClick = (action: string) => {
    switch (action) {
      case 'logout':
        alert.current?.showAlert({
          type: 'warning',
          title: 'Logout',
          message: 'Yakin kamu akan keluar dari aplikasi?',
          showCancelButton: true,
          onConfirmPressed: logOut,
        });
        break;
      case 'address':
        setInfoItem(action);
        btModal.current.show();
        break;
      case 'about':
        setInfoItem(action);
        btModal.current.show();
        break;
      case 'contactus':
        setInfoItem(action);
        btModal.current.show();
        break;
      case 'edit':
        formik.setFieldValue('fullName', user?.fullName);
        formik.setFieldValue('phoneNumber', user?.phoneNumber);
        formik.setFieldValue('email', user?.email);
        setInfoItem(action);
        btModal.current.show();
        break;
      case 'password':
        setInfoItem(action);
        formik2.resetForm();
        btModal.current.show();
        break;
      case 'regulation':
        setInfoItem(action);
        btModal.current.show();
        break;

      default:
        break;
    }
  };

  const fetchData = async () => {
    const tokenDecoded = await Token.tokenDecode();
    if (!user) AuthAction.getDataUser(tokenDecoded.aud as string)(dispatch);
    address.current = await getData('address');
  };

  const logOut = async () => {
    alert.current?.hideAlert();
    const response = await Promise.resolve(AuthAction.logOut());
    alert.current?.showAlert({
      showProgress: true,
      message: 'Loading...',
      showConfirmButton: false,
    });
    if (response.status === 200) {
      await Promise.resolve(AuthAction.resetAuthReducer()(dispatch));
      navigation.removeListener('focus', fetchData);
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
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  const renderModalItem = (type: string) => {
    switch (type) {
      case 'address':
        // setTimeout(() => {
        //   setRegion({latitudeDelta: 0,longitudeDelta: 0.0080});
        // }, 400);
        return (
          <View style={[style.infoContainer, {marginBottom: top}]}>
            {address.current
              ? (
                <>
                  <Row align='center'>
                    <Icon type={Icon.type.mi} name='location-on' color={colors.red.primary} size={25} />
                    <Gap width={5} />
                    <Text style={style.infoTitle}>{address.current.addressName}</Text>
                  </Row>
                  <Gap height={8} />
                  <View style={{ marginLeft: normalizeDimens(12) }}>
                    <Text style={[style.textItemInfo, style.txtAddress]}>{address.current.address}</Text>
                    <Gap height={3} />
                    <Text style={[style.textItemInfo, style.txtAddress]}>{address.current.detailAddress}</Text>
                  </View>
                  <Gap height={7} />
                  <View style={style.wrapperMap}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={style.map}
                      region={{
                        latitudeDelta: 0,longitudeDelta: 0.0080,
                        latitude: address.current.lat,
                        longitude: address.current.long,
                      }}>
                      <Marker
                        coordinate={{
                          latitude: address.current.lat,
                          longitude: address.current.long,
                        }}>
                        <View>
                          <Icon
                            type={Icon.type.mi}
                            name='location-on'
                            size={32}
                            color={colors.red.primary}
                          />
                        </View>
                      </Marker>
                    </MapView>
                  </View>
                </>
              )
              : userError
                ? <ErrorIndicator miniIndicator errorMessage={userError as string} />
                : <Text style={style.textItemInfo}>Alamat Belum Ada</Text>
            }
          </View>
        );
      case 'about':
        return (
          <View style={[style.infoContainer, style.aboutContainer, {paddingBottom: top + normalizeDimens(30)}]}>
            <Text style={[style.textItemInfo, style.textDetail]}>
              Smart Laundry adalah aplikasi yang memberikan solusi untuk kamu yang
              sibuk dan tidak memiliki waktu luang, kamu bisa menggunakan Smart Laundry untuk
              menemukan laundry dengan kualitas terbaik dan tentunya ada promo - promo menarik
              untuk memenuhi kebutuhan pakaian bersih kamu.
            </Text>
          </View>
        );
      case 'contactus':
        return (
          <View style={[style.infoContainer, {paddingBottom: top + normalizeDimens(30)}]}>
            <Text style={style.infoTitle}>Butuh Bantuan? Hubungi kami</Text>
            <Gap height={7} />
            <Row align='center' flexWrap='wrap'>
              <Icon type={Icon.type.mi} name='email' size={16} color={colors.red.primary} />
              <Gap width={10} />
              <Text style={style.textItemInfo}>
                smartlaundryservicecenter@smart.co.id
              </Text>
            </Row>
            <Gap height={5} />
            <Row align='center'>
              <Icon type={Icon.type.mi} name='phone' size={16} color={colors.red.primary} />
              <Gap width={10} />
              <Text style={style.textItemInfo}>
                +6289999888777
              </Text>
            </Row>
          </View>
        );
      case 'edit':
        return (
          <View style={[style.infoContainer, style.editContainer, !keyboard.isOpen && {paddingBottom: top}]}>
            <Gap height={10} />
            <Row align='center' style={style.editTitle}>
              <ButtonIcon icType={Icon.type.mci} icName='arrow-left' icSize={22} dimens={35}
                background='transparent' rippleColor='rgba(0,0,0,0.3)' onPress={btModal.current.dismiss} />
              <Gap width={5} />
              <Text style={style.infoTitle}>Edit Profile</Text>
            </Row>
            <Gap height={15} />
            <View>
              <InputText
                {...formik}
                isFirst
                externalRef={a}
                name='fullName'
                label='Nama Lengkap'
                icType={Icon.type.fa}
                icName='user'
                onSubmitEditing={() => b.current?.focus()} />
              <InputText
                {...formik}
                externalRef={b}
                name='phoneNumber'
                label='Nomor HP'
                icType={Icon.type.mi}
                icName='phone-iphone'
                icSize={23}
                onSubmitEditing={() => c.current?.focus()} />
              <InputText
                {...formik}
                externalRef={c}
                name='email'
                label='Email'
                icType={Icon.type.fa}
                icName='envelope'
                blurOnSubmit returnKeyType='default' />
              <Gap height={25} />
              <Button
                text='Update Profile'
                icType={Icon.type.mci} icName='send'
                isLoading={formik.isSubmitting}
                onPress={() => {
                  keyboard.dismiss();
                  formik.handleSubmit();
                }} />
              <Gap height={20} />
            </View>
          </View>
        );
      case 'password':
        return (
          <View style={[style.infoContainer, style.editContainer, !keyboard.isOpen && {paddingBottom: top}]}>
            <Gap height={10} />
            <Row align='center' style={style.editTitle}>
              <ButtonIcon icType={Icon.type.mci} icName='arrow-left' icSize={22} dimens={35}
                background='transparent' rippleColor='rgba(0,0,0,0.3)' onPress={btModal.current.dismiss} />
              <Gap width={5} />
              <Text style={style.infoTitle}>Ganti Password</Text>
            </Row>
            <Gap height={15} />
            <InputText
              {...formik2}
              isFirst
              externalRef={a}
              secureTextEntry
              name='password'
              label='Password'
              icType={Icon.type.mci}
              icName='key'
              onSubmitEditing={() => b.current?.focus()} />
            <InputText
              {...formik2}
              externalRef={b}
              blurOnSubmit secureTextEntry
              name='confirmPassword'
              label='Konfirmasi Password'
              icType={Icon.type.mci}
              icName='key'
              returnKeyType='default'
              icSize={23} />
            <Gap height={25} />
            <Button
              text='Ganti Password'
              icType={Icon.type.mci} icName='send'
              isLoading={formik2.isSubmitting}
              onPress={() => {
                keyboard.dismiss();
                formik2.handleSubmit();
              }} />
            <Gap height={20} />
          </View>
        );
      case 'regulation':
        return (
          <View style={[style.infoContainer, {paddingBottom: top + normalizeDimens(30)}]}>
            <Text style={style.infoTitle}>Syarat Dan Ketentuan</Text>
            <Gap height={8} />
            <Row align='flex-start' flexWrap='nowrap'>
              <Gap width={2} />
              <Text style={style.textItemInfo}>1.</Text>
              <Gap width={13} />
              <Text style={style.textItemInfo}>
                {'Smart Laundry tidak bertanggung jawab untuk\nkain luntur atau berkerut karena sifat bahan'}
              </Text>
            </Row>
            <Gap height={7} />
            <Row align='flex-start' flexWrap='nowrap'>
              <Text style={style.textItemInfo}>2.</Text>
              <Gap width={10} />
              <Text style={style.textItemInfo}>
                {'Smart Laundry tidak bertanggung jawab jika ada\nbarang yang tertinggal atau uang pada order cucian'}
              </Text>
            </Row>
            <Gap height={7} />
            <Row align='flex-start' flexWrap='nowrap'>
              <Text style={style.textItemInfo}>3.</Text>
              <Gap width={10} />
              <Text style={style.textItemInfo}>
                Jika terdapat kendala dapat hubungi servis center kami
              </Text>
            </Row>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <View style={style.pageContainer}>
        <Header
          showBackButton
          textHeader={() => 'Profil Saya'}
          rightContent={() => (
            <ButtonIcon
              icType={Icon.type.fi}
              icName='edit'
              icSize={15}
              text='Edit'
              icStyle={style.icStyle}
              onPress={() => onBtnClick('edit')}
            />
          )}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainer}>
          <Card>
            <View style={[style.profileContent, style.cardContentWrapp]}>
              {userLoading
                ? <CardLoading rectRounded loadingTextCount={3} heightLoadingText={12} />
                : user && (<>
                  <Image source={require('@image/null-photo.png')} style={style.imgProfile} />
                  <Gap width={20} />
                  <View>
                    <Text style={style.textName}>{user?.fullName}</Text>
                    <Text style={style.textProfile}>
                      +{user?.phoneNumber.replace(user?.phoneNumber.charAt(0), '62')}
                    </Text>
                    <Text style={style.textProfile}>{user?.email}</Text>
                  </View>
                </>
                )
              }
              {userError &&
                <Row align='center'>
                  <Icon type={Icon.type.ai} name='exclamationcircleo' color={colors.border} size={20} />
                  <Gap width={10} />
                  <Text style={style.textProfile}>{userError}</Text>
                </Row>}
            </View>
          </Card>
          <Gap height={20} />
          <Card>
            <View style={style.cardContentWrapp}>
              <Text style={style.cardTitle}>Info lainya</Text>
              <Gap height={5} />
              <TouchableItem onPress={() => onBtnClick('address')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.mi} name='location-on' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Alamat Saya</Text>
              </TouchableItem>
              <TouchableItem onPress={() => onBtnClick('password')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.mci} name='key' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Ganti Password</Text>
              </TouchableItem>
              <TouchableItem onPress={() => onBtnClick('about')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.io} name='people' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Tentang Kami</Text>
              </TouchableItem>
              <TouchableItem onPress={() => onBtnClick('contactus')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.ai} name='contacts' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Hubungi Kami</Text>
              </TouchableItem>
              <TouchableItem onPress={() => onBtnClick('regulation')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.mci} name='script-text' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Syarat dan Ketentuan</Text>
              </TouchableItem>
              <TouchableItem onPress={() => onBtnClick('logout')} styleWrapper={style.btnListWrapper}>
                <Icon type={Icon.type.mi} name='logout' color={colors.red.primary} size={25} />
                <Text style={style.btnListText}>Logout</Text>
              </TouchableItem>
              <Gap height={5} />
            </View>
          </Card>
        </ScrollView>
      </View>
      <BottomModal ref={btModal}>
        <View style={style.aboutContainer}>
          <Image source={Logo} style={style.imgLogo} />
          <Gap height={3} />
          <Text style={style.textItemInfo}>Versi 1.0.0</Text>
        </View>
        <Gap height={20} />
        {renderModalItem(infoItem)}
      </BottomModal>
      <Alert ref={alert} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.AuthReducer.userData,
  userLoading: state.AuthReducer.userLoading,
  userError: state.AuthReducer.userError,
});

export default connect(mapStateToProps)(ProfilePage);
