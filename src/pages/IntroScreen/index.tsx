import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Gap } from '@components';
import { NavigationProps } from '@utils/types';
import style, { paginationDots } from './style';

const dataIntro = [
  {
    image: require('@image/welcome1.png'),
    title: 'Pilih Pakaian Kamu',
    desc: 'Kamu bisa cuci pakaian apapun yang kamu punya untuk dicuci di Smart Laundry',
  },
  {
    image: require('@image/welcome2.png'),
    title: 'Fitur Antar Jemput',
    desc: 'Kini dengan fitur antar jemput yang semakin memanjakan kamu dalam memenuhi kebutuhan pakaian bersih kamu',
  },
  {
    image: require('@image/welcome3.png'),
    title: 'Dapatkan Service Laundry Terbaik',
    desc: 'Kamu bisa mendapatkan laundry dengan pelayanan dan kualitas paling terbaik di sekitar kamu',
  },
  {
    image: require('@image/welcome4.png'),
    title: 'On-Time Delivery',
    desc: 'Dijamin pakaian kamu selesai tepat waktu, jangan kawatir',
  },
  {
    image: require('@image/welcome5.png'),
    title: 'Pembayaran Mudah',
    desc: 'Pembayaran yang mudah dengan fitur Cash On Delivery atau menggunakan payment gateway',
  },
];

const RenderItem: React.FC<{image: any; title: string; desc: string}> = ({ image, title, desc }) => (
  <View style={style.slideWrapp}>
    <Image source={image} style={style.image} />
    <View style={style.textWrapper}>
      <Text style={style.title}>{title}</Text>
      <Text style={style.textDesc}>{desc}</Text>
    </View>
  </View>
);

const IntroScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');

  const setSliderPage = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const onBtnNext = () => {
    if (sliderState.currentPage === (dataIntro.length - 1)) {
      navigation.replace('LoginScreen');
    } else {
      scrollViewRef.current?.scrollTo({
        x : Dimensions.get('window').width * (sliderState.currentPage + 1),
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  React.useEffect(() => {
    const setNavigationBar = async () => {
      await SystemNavigationBar.navigationShow();
      await SystemNavigationBar.setNavigationColor('#FFF');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    };
    setNavigationBar();
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' />
      <SafeAreaView style={style.safeArea}>
        <ScrollView
          ref={scrollViewRef}
          style={style.scrollView}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setSliderPage(event);
          }}
        >
          <StatusBar barStyle='dark-content' translucent={false} backgroundColor='#fff' />
          {dataIntro.map(item => (
            <RenderItem key={`intro-${item.image}`}
              image={item.image}
              title={item.title}
              desc={item.desc} />
          ))}
        </ScrollView>
        <View style={style.footer}>
          <View style={style.paginationWrapper}>
            {Array.from(Array(5).keys()).map((key, index) => (
              <View style={paginationDots(pageIndex === index ? 1 : 0.2)} key={index} />
            ))}
          </View>
          <View style={style.btnGroupWrapper}>
            <View style={style.btnWrapper} />
            <View style={style.btnWrapper}>
              <TouchableOpacity onPress={onBtnNext} style={style.btnNext}>
                {sliderState.currentPage === (dataIntro.length - 1)
                  ? <Fontisto name='check' style={style.btnDoneIcon} />
                  : <Icon name='ios-arrow-forward' style={style.btnNextIcon} />
                }
              </TouchableOpacity>
            </View>
            <View style={[style.btnWrapper, style.btnSkipWrapper]}>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={style.textSkip}>Lewati</Text>
              </TouchableOpacity>
              <Gap width={20} />
            </View>
          </View>
          <Gap height={30} />
        </View>
        <Image source={require('@image/bg_primary.png')} style={style.background} />
      </SafeAreaView>
    </>
  );
};

export default IntroScreen;
