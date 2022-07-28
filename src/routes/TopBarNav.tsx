import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ManCategory,
  WomanCategory,
  ChildCategory,
  OtherCategory,
  HeaderOrder,
  BottomOrder,
} from '@pages';
import { TopBarItem } from '@components';
import { NavigationProps } from '@utils/types';

const Tab = createMaterialTopTabNavigator();

const topBarArr = [
  {route: 'Man', component: ManCategory},
  {route: 'Woman', component: WomanCategory},
  {route: 'Child', component: ChildCategory},
  {route: 'Other', component: OtherCategory},
];

const OrderTopNav = ({navigation, route}: NavigationProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <Tab.Navigator tabBar={props => <TopBarItem
      topBarArr={topBarArr}
      onBackPress={() => navigation.goBack()}
      renderItem={(p) => <HeaderOrder {...p} />}
      conditionalComp={() => <BottomOrder onPress={() => navigation.push('PickupAdress')} />}
      {...props} />}>
      {topBarArr.map((item, idx) => (
        <Tab.Screen key={`topbar-${idx}`} name={item.route}
          component={item.component} initialParams={{...route.params, top}} />
      ))}
    </Tab.Navigator>
  );
};

export default OrderTopNav;
