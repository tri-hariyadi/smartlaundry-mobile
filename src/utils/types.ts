import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export interface NavigationProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, 'params'>
}

export interface IResponseHttpService {
  result: any; message: string; status: number, loading: boolean
}

export type OrderPageProps = MaterialTopTabScreenProps<any, any> & {
  service: {
    subServices?: Array<{
      name: string;
      price: number;
      banner: string;
      type: string;
      _id: string;
    }>
  }
  serviceError: boolean | string | undefined;
  orderCart: {
    items: Array<{
      name: string;
      total: number;
      totalPrice: number;
    }>
    totalPriceItems: number;
  }
}
