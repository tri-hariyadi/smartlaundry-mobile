import { ActionType } from 'src/store/actionTypes';

interface IAuth {
  type: ActionType.USER_LOGIN | ActionType.USER_DATA | ActionType.RESET_AUTH_REDUCER,
  payload: {
    loading: boolean,
    error: boolean | string,
    data: any
  }
}

export default IAuth;
