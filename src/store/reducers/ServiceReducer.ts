import IService from '../action-interfaces/service';
import { ActionType } from '../actionTypes';

interface StateType {
  service: {
    _id?: string;
    subServices?: Array<{
      name: string;
      price: number;
      banner: string;
      type: string;
      _id: string;
    }>
    laundry?: {
      _id: string;
      name: string;
      user_id: {
        _id: string;
        address: {
          city: string;
          street: string;
          lat: number;
          long: number;
        }
      }
    };
    quantityType?: string;
  }
  serviceError: boolean | string | undefined;
}

const initialState = {
  service: {},
  serviceError: false,
};

const serviceReducer = (state: StateType = initialState, action: IService): StateType => {
  switch (action.type) {
    case ActionType.DATA_SERVICE:
      return {
        ...state,
        service: action.payload.data,
        serviceError: action.payload.error,
      };

    default:
      return state;
  }
};

export default serviceReducer;
