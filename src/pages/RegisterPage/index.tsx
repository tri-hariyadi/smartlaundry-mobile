import React, { useRef } from 'react';
import {
  View, Text, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { Gap, IconText, InputText, Button, ButtonText, Icon } from '@components';
import { NavigationProps } from '@utils/types';
import useKeyboard from '@utils/useKeyboard';
import AuthAction from '@store/action-creators/AuthAction';
import { Alert, AlertProps } from '@parts';
import style from './style';

const RegisterPage: React.FC<NavigationProps> = ({ navigation }) => {
  const a = useRef<any>();
  const b = useRef<any>({ focus: () => null });
  const c = useRef<any>({ focus: () => null });
  const d = useRef<any>({ focus: () => null });
  const alert = useRef<AlertProps>();
  const keyboard = useKeyboard();
  const formik = useFormik({
    initialValues:{
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
    onSubmit: async (v) => {
      const roles = await AuthAction.getRole();
      if (roles.status === 200 && roles.result.length) {
        const role = roles.result.filter((item: any) => item.code === 2)[0]._id;
        const response = await AuthAction.userRegister({...v, role});
        if (response.status === 200) {
          alert.current?.showAlert({
            type: 'success',
            title: 'Success',
            message: 'Register berhasil, silahkan login kembali dengan akun anda!',
            dangerMode: false,
            onDismiss: () => navigation.replace('LoginScreen'),
          });
        } else {
          alert.current?.showAlert({
            type: 'error',
            title: 'Gagal',
            message: response.message,
            dangerMode: true,
            cancelText: 'OK',
          });
        }
      } else {
        alert.current?.showAlert({
          type: 'error',
          title: 'Gagal',
          message: roles.message,
          dangerMode: true,
          cancelText: 'OK',
        });
      }
    },
  });

  return (
    <SafeAreaView style={style.safeArea}>
      <KeyboardAvoidingView
        style={style.safeArea}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
          keyboardDismissMode='none' style={style.container}
          contentContainerStyle={style.contentWrapper}>
          <View style={style.logoWrapper}>
            <Icon type={Icon.type.mci} name='washing-machine' style={style.iconLogo} />
            <Gap height={5} />
            <IconText width={200} height={28} />
            {keyboard.isOpen && <Gap height={25} />}
          </View>
          <View>
            <View>
              <Text style={style.textWelcome}>Registrasi Akun</Text>
              <Text style={style.textDesc}>Isi form di bawah untuk akun baru.</Text>
              <Gap height={30} />
            </View>
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
              name='email'
              label='Email'
              icType={Icon.type.fa}
              icName='envelope'
              keyboardType='email-address'
              onSubmitEditing={() => c.current?.focus()} />
            <InputText
              {...formik}
              externalRef={c}
              name='phoneNumber'
              label='Nomor HP'
              icType={Icon.type.fa}
              icName='mobile-phone'
              icSize={26}
              keyboardType='number-pad'
              onSubmitEditing={() => d.current?.focus()} />
            <InputText
              {...formik}
              secureTextEntry blurOnSubmit
              externalRef={d}
              name='password'
              label='Password'
              icType={Icon.type.mci} icName='key'
              returnKeyType='default' />
            <Gap height={40} />
            <Button
              text='Register'
              icType={Icon.type.mci} icName='send'
              onPress={() => {
                keyboard.dismiss();
                formik.handleSubmit();
              }} />
            <Gap height={10} />
            <ButtonText
              desc='Sudah punya akun?'
              link='Login disini'
              onPress={() => navigation.push('LoginScreen')} />
            <Gap height={10} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert ref={alert} />
    </SafeAreaView>
  );
};

export default RegisterPage;
