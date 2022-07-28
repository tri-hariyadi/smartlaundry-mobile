import { ActionType } from 'src/store/actionTypes';

interface IService {
  type: ActionType.DATA_SERVICE,
  payload: {
    loading: boolean,
    error: boolean | string | undefined,
    data: any
  }
}

export default IService;
