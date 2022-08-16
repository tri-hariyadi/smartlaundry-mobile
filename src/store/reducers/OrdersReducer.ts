import IOrders from '../action-interfaces/orders';
import { ActionType } from '../actionTypes';

interface StateType {
  dataOrders: Array<{
    _id: string;
    progress: Array<{
        name: string;
        desc: string;
        status: string;
      }>,
    service: {
      _id: string;
      name: string;
      desc: string;
      banner: Array<string>;
      quantityType: string;
      laundry: {
        name: string;
      },
    },
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    isReviewed: boolean;
  }>
  dataOrdersError: boolean | string | undefined;

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
    id_service: string;
  }
}

const initialState = {
  dataOrders: [],
  dataOrdersError: false,

  orderCart: {
    items: [],
    totalPriceItems: 0,
    laundryName: '',
    id_service: '',
    priceCalculated: 0,
  },
};

const ordersReducer = (state: StateType = initialState, action: IOrders): StateType => {
  switch (action.type) {
    case ActionType.DATA_ORDERS:
      return {
        ...state,
        dataOrders: action.payload.data,
        dataOrdersError: action.payload.error,
      };
    case ActionType.ORDER_CART:
      return {
        ...state,
        orderCart: action.payload.data,
      };
    case ActionType.RESET_ORDER_CART:
      return {
        ...state,
        orderCart: {
          items: [],
          totalPriceItems: 0,
          laundryName: '',
          id_service: '',
          priceCalculated: 0,
        },
      };

    default:
      return state;
  }
};

export default ordersReducer;
