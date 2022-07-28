import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  CurrentOrder,
  PastOrders,
  HeaderOrders,
} from '@pages';
import { TopBarItem } from '@components';

const Tab = createMaterialTopTabNavigator();

const topBarArr = [
  {route: 'Order Berlangsung', component: CurrentOrder},
  {route: 'Order Sebelumnya', component: PastOrders},
];

const OrderTopNav = () => {
  return (
    <Tab.Navigator
      initialRouteName='Order Berlangsung'
      tabBar={
        props => (
          <TopBarItem
            {...props} topBarArr={topBarArr}
            renderItem={(p) => <HeaderOrders {...p} />}
          />
        )
      }>
      {topBarArr.map((item, idx) => (
        <Tab.Screen key={`orderstopbar-${idx}`} name={item.route} component={item.component} />
      ))}
    </Tab.Navigator>
  );
};

export default OrderTopNav;
