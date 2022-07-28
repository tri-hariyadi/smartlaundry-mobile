import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import EventSource from 'react-native-sse';
import { CommonActions } from '@react-navigation/native';
import { Button, Gap, Icon, StatusBarApp } from '@components';
import { Alert, AlertProps, Card, CardLoading, Header } from '@parts';
import colors from '@colors';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import { RootState } from '@store/store';
import currencyFormat from '@utils/currencyFormat';
import OrderAct from '@action/OrderAction';
import AuthAct from '@store/action-creators/AuthAction';
import style from './style';

interface IProps {
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
  },
  service: {
    _id?: string;
    laundry?: {
      name: string;
      user_id: {
        _id: string;
        address: {
          lat: number;
          long: number;
        }
      }
    }
  }
}

const ReviewOrder: React.FC<IProps & NavigationProps> = ({ navigation, route, orderCart, service }) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const values = route.params?.values;
  const alert = useRef<AlertProps>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataPrice, setDataPrice] = useState<Partial<IResponseHttpService>>({loading: true});

  const getTypeItem = (type: string): string => {
    switch (type) {
      case 'Man':
        return 'Pria';
      case 'Woman':
        return 'Wanita';
      case 'Child':
        return 'Anak';
      case 'Other':
        return 'Lainnya';
      default:
        return 'Pria';
    }
  };

  const getPrices = async () => {
    const dataLaundry = await AuthAct.getUser(service.laundry?.user_id._id as string, true);
    if (dataLaundry.result && dataLaundry.status === 200) {
      const response = await OrderAct.calculatePrice({
        totalPay: orderCart.totalPriceItems,
        totalOrder: orderCart.items.reduce((a, b) => a + b.total, 0),
        id_service: service._id as string,
        laundryPosition: {
          lat: dataLaundry.result.address.lat,
          long: dataLaundry.result.address.long,
        },
        custPosition: {
          lat: values.lat,
          long: values.long,
        },
      });
      setDataPrice(response);
      OrderAct.saveOrderCart({...orderCart, priceCalculated: response.result?.totalPrice})(dispatch);
    } else {
      alert.current?.showAlert({
        type: 'error',
        title: 'Error',
        message: 'Gagal melakukan kalkulasi, pastikan koneksi internet mu bagus',
        onDismiss: getPrices,
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await OrderAct.createOrder({...values, totalPrice: orderCart.priceCalculated});
  };

  useEffect(() => {
    getPrices();
    const es = new EventSource(`http://192.168.43.229:8082/api/v1/events/${values.id_customer}`, {
      headers: {'X-Api-Key': 'C0Uj7h/moE8QJg1i12L6+1cB8Xv2NX/16w=='},
    });
    es.addEventListener('message', (event) => {
      const data = JSON.parse(JSON.stringify(event));
      alert.current?.showAlert({
        type: JSON.parse(data.data).data === 'reject' ? 'error' : 'success',
        title: JSON.parse(data.data).title,
        message: JSON.parse(data.data).body,
        onDismiss: () => {
          setIsSubmitting(false);
          if (JSON.parse(data.data).data !== 'reject') {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'OrderDetail', params:  {id_order: JSON.parse(data.data).data.id_order} }],
              }),
            );
          }
        },
      });
    });

    return () => es.close();
  }, []);

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <Header showBackButton onBackPress={() => navigation.goBack()}
        textHeader={() => 'Review Order'} />
      <View style={style.pageContainer}>
        <View>
          <Card>
            <View style={style.itemContainer}>
              <Text style={[style.textItem, style.textTitle]}>Cucian Kamu :</Text>
              <Gap height={12} />
              {!dataPrice.loading && orderCart.items.map((item, idx) => (
                <View key={`item-review-${idx}`}>
                  <View style={style.itemWrapper}>
                    <Text style={style.textItem}>
                      {item.total} x {item.name} <Text style={style.textTypeItem}>({getTypeItem(item.type)})</Text>
                    </Text>
                    <Text style={style.itemPrice}>{currencyFormat(String(item.totalPrice))}</Text>
                  </View>
                  <Gap height={15} />
                </View>
              ))}
              {dataPrice.loading &&
                <CardLoading count={4} loadingTextCount={1} rectRounded rowAlign='center'
                  rectHeight={15} rectWidth={15} heightLoadingText={12} />
              }
              {!dataPrice.loading &&
                <>
                  <View style={style.itemWrapper}>
                    <Text style={style.textItem}>Ongkir</Text>
                    <Text style={style.itemPrice}>{currencyFormat(String(dataPrice.result?.costDelivery || 0))}</Text>
                  </View>
                  <Gap height={15} />
                  <View style={style.itemWrapper}>
                    <Text style={style.textItem}>Jasa Aplikasi</Text>
                    <Text style={style.itemPrice}>{currencyFormat(String(dataPrice.result?.costApp || 0))}</Text>
                  </View>
                </>
              }
            </View>
          </Card>
          <Gap height={10} />
          <Card>
            <View style={style.itemContainer}>
              {!dataPrice.loading &&
                <View style={style.itemWrapper}>
                  <Text style={[style.textItem, style.textTotalAmount]}>Jumlah Total</Text>
                  <Text style={style.itemPrice}>
                    {currencyFormat(String(dataPrice.result?.totalPrice || 0))}
                  </Text>
                </View>
              }
              {dataPrice.loading &&
                <CardLoading count={2} loadingTextCount={1} rectRounded rowAlign='center'
                  rectHeight={15} rectWidth={15} heightLoadingText={12} />
              }
            </View>
          </Card>
        </View>
        <Button text='Confirmasi Order' isLoading={isSubmitting}
          icType={Icon.type.fi} icName='check-circle'
          onPress={handleSubmit} />
      </View>
      <Alert ref={alert} />
      <SafeAreaView style={[style.safeArea, { marginBottom: -top }]} />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  orderCart: state.OrdersReducer.orderCart,
  service: state.ServiceReducer.service,
});

export default connect(mapStateToProps)(ReviewOrder);
