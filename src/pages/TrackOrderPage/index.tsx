import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import Confirm from '@image/step_confirm.svg';
import Pick from '@image/step_pick.svg';
import Process from '@image/step_process.svg';
import Shipped from '@image/step_shipped.svg';
import Delivery from '@image/step_delivery.svg';
import { Card, CardLoading, Header, ErrorIndicator } from '@parts';
import { Gap, StatusBarApp, Stepper } from '@components';
import colors from '@utils/colors';
import OrderAct from '@action/OrderAction';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import Token from '@utils/token';
import style from './style';

const TrackOrderPage: React.FC<NavigationProps> = ({ navigation }) => {
  const [orders, setOrders] = useState<Partial<IResponseHttpService>>({loading: true});
  const [lastStepDone, setLastStepDone] =
    useState<{ last: string; next: string }>({ last: 'Confirmed', next: 'Pick Up' });
  const [refreshing, setRefreshing] = useState(false);
  const steps = useRef<any>();

  const getData = async () => {
    const tokenDecoded = await Token.tokenDecode();
    const response = await OrderAct.getOrders(tokenDecoded.aud as string);
    setOrders({
      ...response,
      result: response.result?.filter((item: any) => {
        if (item.status !== '1') return item;
      }),
    });
  };

  useEffect(() => {
    if (orders.result && orders.result.length) {
      for (let i = 0; i < orders.result[0].progress.length; i++) {
        if (orders.result[0].progress[i].status === '1') {
          if (i < (orders.result[0].progress.length - 1) && orders.result[0].progress[i + 1].status === '1') {
            continue;
          } else {
            setLastStepDone({
              last: orders.result[0].progress[i].name,
              next: i < (orders.result[0].progress.length - 1)
                ? `Ready to ${orders.result[0].progress[i + 1].name}` : 'Order telah selesai',
            });
          }
        }
      }
      steps.current = [...orders.result[0].progress.map((item: any, idx: any) => ({
        ...item,
        SvgStep: (() => {
          if (idx === 1) return Pick;
          if (idx === 2) return Process;
          if (idx === 3) return Shipped;
          if (idx === 4) return Delivery;
          return Confirm;
        })(),
      }))];
    }
  }, [orders]);

  const onRefresh = React.useCallback(async () => {
    setOrders({loading:true});
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => getData());
    const onBlur = navigation.addListener('blur', () => {
      steps.current = undefined;
      setOrders({loading:true});
    });

    return () => {
      unsubscribe();
      onBlur();
    };
  }, [navigation]);

  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <View style={style.container}>
        <Header showBackButton onBackPress={() => navigation.goBack()} />
        <FlatList
          data={orders.result || []}
          keyExtractor={(v, idx) => `trackOrder-${idx}`}
          style={style.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }) => (
            <>
              <Card>
                <View style={style.header}>
                  <Text style={style.headerTitle}>Order No: {item?._id.toUpperCase()}</Text>
                  <Gap height={3} />
                  <Text style={style.headerDesc}>
                    Order {lastStepDone.last} - {lastStepDone.next}
                  </Text>
                </View>
                <Gap height={20} />
                <View style={style.content}>
                  <Stepper steps={steps.current} />
                </View>
              </Card>
              <Gap height={50} />
            </>
          )}
          contentContainerStyle={style.listContainerStyle}
          ListEmptyComponent={() => (
            <>
              {orders.loading
                ? (
                  <Card>
                    <View style={style.header}>
                      <CardLoading loadingTextCount={2} rectWidth={50} rectHeight={50}
                        styleContainer={style.loadingContainer} />
                    </View>
                    <Gap height={20} />
                    <View style={style.content}>
                      <CardLoading count={5} loadingTextCount={2} styleloadingRect={style.styleloadingRect}
                        rectWidth={40} rectHeight={40} styleContainer={style.loadingContainer} />
                      <Gap height={20} />
                    </View>
                  </Card>
                )
                : (
                  <View style={style.listEmptyContainer}>
                    {orders.result && orders.status === 200
                      ? <ErrorIndicator isEmpty errorMessage='Belum ada order nih, order yuk.' />
                      : <ErrorIndicator errorMessage={orders.message as string} />}
                  </View>
                )
              }
            </>
          )}
        />
      </View>
    </>
  );
};

export default TrackOrderPage;
