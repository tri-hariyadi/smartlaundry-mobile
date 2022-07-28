import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Card, ErrorIndicator } from '@parts';
import { ButtonIcon, Gap, Icon } from '@components';
import colors from '@colors';
import currencyFormat from '@utils/currencyFormat';
import OrderAct from '@action/OrderAction';
import { RootState } from '@store/store';
import style from './style';

interface IProps {
  data: Array<any>;
  routeKey: string;
  service: {
    _id?: string;
    laundry?: {
      name: string
    }
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
    id_service?: string;
  }
}

type TypeNewItem = {
  name: string;
  price: number;
  type: string;
}

const ListItem: React.FC<IProps> = ({ data, routeKey, orderCart, service }) => {
  const dispatch = useDispatch();

  const updateUIState = (itemName: string) => {
    if (orderCart.items.length) {
      return {
        total: orderCart.items.filter(({ name }) => name === itemName)[0]?.total || 0,
        totalPrice: orderCart.items.filter(({ name }) => name === itemName)[0]?.totalPrice || 0,
      };
    }
    return { total: 0, totalPrice: 0 };
  };

  const addToCart = (newItem: TypeNewItem) => {
    const prevData = {...orderCart};
    const idx = prevData.items.findIndex(({ name }) => name === newItem.name);
    if (idx < 0) {
      prevData.items.push({
        name: newItem.name,
        total: 1,
        totalPrice: newItem.price,
        type: newItem.type,
      });
    } else {
      prevData.items[idx] = {
        ...prevData.items[idx],
        total: prevData.items[idx].total + 1,
        totalPrice: prevData.items[idx].totalPrice + newItem.price,
      };
    }
    prevData.totalPriceItems = prevData.items.reduce((a,b) => a + b.totalPrice, 0);
    prevData.laundryName = service.laundry?.name || '';
    prevData.id_service = service._id;
    OrderAct.saveOrderCart(prevData)(dispatch);
  };

  const removeFromCart = (newItem: TypeNewItem) => {
    const prevData = {...orderCart};
    const idx = prevData.items.findIndex(({ name }) => name === newItem.name);
    if (idx >= 0 && prevData.items[idx].total <= 1) {
      prevData.items.splice(idx, 1);
    } else {
      prevData.items[idx] = {
        ...prevData.items[idx],
        total: prevData.items[idx].total - 1,
        totalPrice: prevData.items[idx].totalPrice - newItem.price,
      };
    }
    prevData.totalPriceItems = prevData.items.reduce((a,b) => a + b.totalPrice, 0);
    if (!prevData.items.length) prevData.id_service = '';
    OrderAct.saveOrderCart(prevData)(dispatch);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(v, idx) => `${routeKey}-${idx}`}
      style={style.listWrapper}
      ListHeaderComponent={() => <Gap height={15} />}
      renderItem={({item}) => (
        <Card>
          <View style={style.cardContentWrapp}>
            <Image source={item.banner ? {uri: item.banner} : require('@image/trouser.png')}
              style={style.imgSubService} />
            <Gap width={15} />
            <View style={style.itemServiceWrapp}>
              <View>
                <Text style={style.nameService}>{item.name}</Text>
                <Text style={style.priceService}>{currencyFormat(String(item.price))}</Text>
              </View>
              <View style={style.addWrapper}>
                <View style={style.addContent}>
                  <View style={style.btnAddMinWrapper}>
                    <ButtonIcon
                      icType={Icon.type.ei}
                      icName='plus'
                      icColor='#FFF'
                      icSize={20}
                      dimens={30}
                      onPress={() => addToCart({ name: item.name, price: item.price, type: item.type })}
                    />
                    <Text style={style.addTotal}>{updateUIState(item.name).total}</Text>
                    <ButtonIcon
                      icType={Icon.type.ei}
                      icName='minus'
                      icColor='#FFF'
                      icSize={20}
                      dimens={30}
                      background={colors.red.primary}
                      disabled={orderCart.items.filter(({ name }) => name === item.name).length < 1}
                      onPress={() => removeFromCart({ name: item.name, price: item.price, type: item.type })}
                    />
                  </View>
                  <Gap height={10} />
                  <Text style={style.addPrice}>
                    Total: {currencyFormat(String(updateUIState(item.name).totalPrice))}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      )}
      ItemSeparatorComponent={() => <Gap height={6} />}
      contentContainerStyle={style.listContainerStyle}
      ListEmptyComponent={() => (
        <View style={style.listEmptyContainer}>
          <ErrorIndicator isEmpty errorMessage='Belum Ada Servis Tersedia!' />
        </View>
      )}
      ListFooterComponent={() => <Gap height={120} />}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  orderCart: state.OrdersReducer.orderCart,
  service: state.ServiceReducer.service,
});

export default connect(mapStateToProps)(ListItem);
