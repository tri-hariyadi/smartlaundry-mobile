import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import {
  WelcomeScreen,
  IntroScreen,
  LoginScreen,
  RegisterPage,
  HomePage,
  TrackOrderPage,
  ProfilePage,
  ReviewOrder,
  PickupAdress,
  OrderDetail,
  LaundryHome,
} from '@pages';
import { Icon, TabItem } from '@components';
import normalizeDimens from '@utils/normalizeDimens';
import OrderTopNav from './TopBarNav';
import OrdersTopBar from './OrdersTopBar';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  IntroScreen: undefined;
  LoginScreen: undefined;
  RegisterPage: undefined;
  MainApp: undefined;
  ReviewOrder: undefined;
  PickupAdress: undefined;
  OrderDetail: undefined;
  OrderTopNav: undefined;
  OrdersTopBar: undefined;
  LaundryHome: undefined;
};

export type MainBottomTabParamList = {
  Home: undefined;
  TrackOrder: undefined;
  MyOrders: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const tabArr = [
  {
    route: 'Home', label: 'Home',
    type: Icon.type.io, component: HomePage,
    activeIcon: 'home', inActiveIcon: 'home-outline', badge: 0,
  },
  {
    route: 'TrackOrder', label: 'Track Order',
    type: Icon.type.mi, component: TrackOrderPage,
    activeIcon: 'my-location', inActiveIcon: 'location-searching', badge: 0,
  },
  {
    route: 'MyOrders', label: 'My Orders',
    type: Icon.type.mci, component: OrdersTopBar,
    activeIcon: 'clipboard-list', inActiveIcon: 'clipboard-list-outline', badge: 0,
  },
  {
    route: 'Profile', label: 'Profile',
    type: Icon.type.mci, component: ProfilePage,
    activeIcon: 'account', inActiveIcon: 'account-outline', badge: 0,
  },
];

const MainApp = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: normalizeDimens(Platform.OS === 'ios' ? 90 : 65),
        overflow: 'hidden',
      },
    }}>
      {tabArr.map((item: any, idx: number) => (
        <Tab.Screen key={`MainApp-${idx}`} name={item.route} component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabItem {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='WelcomeScreen'>
        <Stack.Screen
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
        <Stack.Screen
          name='IntroScreen'
          component={IntroScreen}
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
        />
        <Stack.Screen
          name='RegisterPage'
          component={RegisterPage}
        />
        <Stack.Screen
          name='MainApp'
          component={MainApp}
        />
        <Stack.Screen
          name='OrderTopNav'
          component={OrderTopNav}
        />
        <Stack.Screen
          name='ReviewOrder'
          component={ReviewOrder}
        />
        <Stack.Screen
          name='PickupAdress'
          component={PickupAdress}
        />
        <Stack.Screen
          name='OrderDetail'
          component={OrderDetail}
        />
        <Stack.Screen
          name='LaundryHome'
          component={LaundryHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
