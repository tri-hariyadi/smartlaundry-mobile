import IAuth from '@store/action-interfaces/auth';
import { ActionType } from '@store/actionTypes';

interface StateType {
  loginLoading: boolean,
  loginError: string | boolean,
  token: {
    accessToken: string,
    refreshToken: string
  },
  userData: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: {
      addressName: string;
      address: string;
      detailAddress: string;
      lat: number;
      long: number;
    };
    role: any;
    laundry:{
      name: string;
    }
    createdAt: Date;
    updatedAt: Date;
  } | null;
	userLoading: boolean;
	userError: string | boolean;
}

const initialState = {
  loginLoading: false,
  loginError: false,
  token: {
    accessToken: '',
    refreshToken: '',
  },
  userData: null,
  userLoading: false,
  userError: false,
};

const authReducer = (state: StateType = initialState, action: IAuth): StateType => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginError: action.payload.error,
        token: action.payload.data.result,
      };
    case ActionType.USER_DATA:
      return {
        ...state,
        userData: action.payload.data,
        userLoading: action.payload.loading,
        userError: action.payload.error,
      };
    case ActionType.RESET_AUTH_REDUCER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
