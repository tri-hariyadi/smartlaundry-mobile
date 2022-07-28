import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useFormik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import colors from '@colors';
import { IconText, Gap, InputText, Button, ButtonText, Icon } from '@components';
import useKeyboard from '@utils/useKeyboard';
import { NavigationProps } from '@utils/types';
import loginValidation from '@validates/loginValidation';
import Token from '@utils/token';
import AuthAction from '@store/action-creators/AuthAction';
import { Alert, AlertProps } from '@parts';
import { RootState } from '@store/store';
import style from './style';

interface IProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: any;
  }|null;
}

const LoginScreen: React.FC<NavigationProps & IProps> = ({ navigation, user }) => {
  const dispatch = useDispatch();
  const alert = useRef<AlertProps>();
  const a = useRef<any>();
  const b = useRef<any>({ focus: () => null });
  const keyboard = useKeyboard();
  const formik = useFormik({
    initialValues:{
      email: Platform.OS === 'ios' ? 'ronirama@gmail.com' : 'kahn@gmail.com',
      password: Platform.OS === 'ios' ? 'ronirama1234' : 'kahn1234',
    },
    validationSchema: loginValidation,
    onSubmit: async (v) => {
      const response = await Promise.resolve(AuthAction.userLogin(v));
      if (response.result && response.status === 200) {
        Token.setToken(response.result); //ahmad1234,ronirama1234
        const tokenDecoded = await Token.tokenDecode();
        await AuthAction.getDataUser(tokenDecoded.aud as string)(dispatch);
      } else {
        alert.current?.showAlert({
          type: 'error',
          title: 'Error',
          message: response.message,
          dangerMode: true,
          cancelText: 'OK',
        });
      }
    },
  });

  useEffect(() => {
    if (user && user.role.code === 1) {
      navigation.replace('LaundryHome');
    } else if (user && user.role.code === 2) {
      navigation.replace('MainApp');
    }
  }, [user]);

  useLayoutEffect(() => {
    SystemNavigationBar.navigationShow();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView style={style.safeArea}>
        <KeyboardAvoidingView
          style={style.safeArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
            keyboardDismissMode='none' style={style.container}
            contentContainerStyle={style.contentWrapper}>
            {keyboard.isOpen && <Gap height={20} />}
            <View style={style.logoWrapper}>
              <Icon type={Icon.type.mci} name='washing-machine' style={style.iconLogo} />
              <Gap height={5} />
              <IconText width={200} height={28} />
              {keyboard.isOpen && <Gap height={20} />}
            </View>
            <View>
              <View>
                <Text style={style.textWelcome}>Selamat Datang!</Text>
                <Text style={style.textDesc}>Silahkan login ke akun anda.</Text>
                <Gap height={30} />
              </View>
              <InputText
                {...formik}
                isFirst
                externalRef={a}
                icType={Icon.type.fa}
                icName='envelope'
                name='email'
                label='Email'
                onSubmitEditing={() => b.current?.focus()} />
              <InputText
                {...formik}
                externalRef={b}
                secureTextEntry blurOnSubmit
                icType={Icon.type.mci}
                icName='key'
                name='password'
                label='Password'
                returnKeyType='default' />
              <Gap height={40} />
              <Button text='Login'
                isLoading={formik.isSubmitting}
                icType={Icon.type.mci} icName='login'
                onPress={() => {
                  keyboard.dismiss();
                  formik.handleSubmit();
                }} />
              <Gap height={10} />
              <ButtonText
                desc='Belum punya akun?'
                link='Daftar disini'
                onPress={() => navigation.push('RegisterPage')} />
              <Gap height={10} />
              {keyboard.isOpen && <Gap height={40} />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Alert ref={alert} />
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.AuthReducer.userData,
});

export default connect(mapStateToProps)(LoginScreen);
