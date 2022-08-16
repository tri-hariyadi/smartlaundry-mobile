import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import Confirm from '@image/step_confirm.svg';
import Pick from '@image/step_pick.svg';
import Process from '@image/step_process.svg';
import Shipped from '@image/step_shipped.svg';
import Delivery from '@image/step_delivery.svg';
import { connect, useDispatch } from 'react-redux';
import { ButtonIcon, Gap, Icon } from '@components';
import { Card, CardLoading, ErrorIndicator } from '@parts';
import { IResponseHttpService, NavigationProps } from '@utils/types';
import OrderAct from '@action/OrderAction';
import Token from '@utils/token';
import { RootState } from '@store/store';
import styles, { textProgress } from './style';

interface IProps {
  dataOrders: Array<{
    _id: string;
    progress: Array<{
      name: string;
      desc: string;
      status: string;
    }>,
    createdAt: string;
    updatedAt: string;
    status: string;
    isReviewed: boolean;
  }>;
  dataOrdersError: string | boolean | undefined;
}

const CurrentOrder: React.FC<NavigationProps & IProps> = ({
  dataOrdersError, navigation,
}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Partial<IResponseHttpService>>({loading: true});

  const getData = async () => {
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => getData());
    const onBlur = navigation.addListener('blur', () => setCurrentOrder({loading: true}));

    return () => {
      unsubscribe();
      onBlur();
    };
  }, [navigation]);

  const onRefresh = React.useCallback(async () => {
    setCurrentOrder({loading: true});
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={currentOrder.result || []}
          keyExtractor={(v, idx) => `Currentorder-${idx}`}
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }) => (
            <Card>
              <View style={styles.itemHeader}>
                <Text style={styles.title}>Order No: {item._id.toUpperCase()}</Text>
                <Text style={styles.titleDesc}>
                  Order {item.progress.map(({name, status}: any, idx: number) => {
                    const length = item.progress.length - 1;
                    if (status === '1' && idx < length && item.progress[idx + 1].status !== '1')
                      return `${name} - Ready untuk ${item.progress[idx + 1].name}`;
                    if (idx === length && status === '1') return `${name} - Order telah selesai`;
                  })}
                </Text>
              </View>
              <View style={styles.itemProgress}>
                {item.progress.map((dataItem: any, idx: number) => (
                  <View key={`progress-${idx}`} style={styles.progress}>
                    {idx === 0 && <Confirm />}
                    {idx === 1 && <Pick />}
                    {idx === 2 && <Process />}
                    {idx === 3 && <Shipped />}
                    {idx === 4 && <Delivery />}
                    <Gap height={4} />
                    <Text style={textProgress(dataItem.status)}>{dataItem.name}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.itemFooter}>
                <ButtonIcon
                  text='Lihat Detail'
                  icType={Icon.type.io}
                  icName='ios-eye'
                  icSize={15}
                  icStyle={styles.icStyle}
                  background='#E36F00'
                  onPress={() => navigation.navigate('TrackOrder')}
                />
              </View>
            </Card>
          )}
          contentContainerStyle={!currentOrder.loading && styles.listContainerStyle}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyContainer}>
              {currentOrder.loading
                ? (
                  <View style={styles.loadingList}>
                    <CardLoading count={2} loadingTextCount={3} heightLoadingText={12} />
                  </View>
                )
                : currentOrder.result && currentOrder.result.length <= 0 && !dataOrdersError
                  ? <ErrorIndicator isEmpty errorMessage='Kamu belum order lagi nih, order yuk.' />
                  : <ErrorIndicator errorMessage={dataOrdersError as string} />
              }
            </View>
          )}
        />
      </View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  dataOrders: state.OrdersReducer.dataOrders,
  dataOrdersError:  state.OrdersReducer.dataOrdersError,
});

export default connect(mapStateToProps)(CurrentOrder);
