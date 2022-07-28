import React, { useEffect, useRef } from 'react';
import {SafeAreaView, Image, StatusBar, Animated} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from 'react-native-flash-message';
import BgPrimary from '@image/bg_primary.png';
import { connect, useDispatch } from 'react-redux';
import { IconText } from '@components';
import { NavigationProps } from '@utils/types';
import useToken from '@utils/useToken';
import Token from '@utils/token';
import { RootState } from '@store/store';
import AuthAction from '@store/action-creators/AuthAction';
import style from './style';

interface IProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: any;
  }|null;
  userError: string | boolean
}

const WelcomeScreen: React.FC<NavigationProps & IProps> = ({ navigation, user, userError }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    SystemNavigationBar.navigationHide();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      await token.then(async (res) => {
        if (res.accessToken && res.refreshToken) {
          const tokenDecoded = await Token.tokenDecode();
          await AuthAction.getDataUser(tokenDecoded.aud as string)(dispatch);
        }
        else navigation.replace('IntroScreen');
      });
    } catch (error) {
      navigation.replace('IntroScreen');
    }
  };

  const navigateToScreen = () => {
    setTimeout(() => {
      if (user && user.role.code === 1) {
        navigation.replace('LaundryHome');
      } else if (user && user.role.code === 2) {
        navigation.replace('MainApp');
      } else if (userError) {
        showMessage({
          message: userError as string, type: 'danger',
          icon: 'danger', style: style.flashMessage,
          duration: 3000,
        });
        navigation.replace('IntroScreen');
      }
    }, 3000);
  };

  useEffect(() => {
    if (userError || user) {
      navigateToScreen();
    }
  }, [user, userError]);

  return (
    <>
      <SafeAreaView style={style.container}>
        <StatusBar backgroundColor='transparent' translucent />
        <Animated.View style={[
          style.wrapper,
          {
            opacity: fadeAnim,
            transform: [
              { scale: fadeAnim },
              { translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-800, 0],
              }) },
            ] },
        ]}>
          <Icon name='washing-machine' style={style.icon} />
          <IconText />
        </Animated.View>
      </SafeAreaView>
      <Image source={BgPrimary} style={style.background} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.AuthReducer.userData,
  userError: state.AuthReducer.userError,
});

export default connect(mapStateToProps)(WelcomeScreen);
