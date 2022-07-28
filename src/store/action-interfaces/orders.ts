import { ActionType } from 'src/store/actionTypes';

interface IOrders {
  type: ActionType.DATA_ORDERS | ActionType.ORDER_CART | ActionType.RESET_ORDER_CART,
  payload: {
    loading: boolean,
    error: boolean | string | undefined,
    data: any
  }
}

export default IOrders;
