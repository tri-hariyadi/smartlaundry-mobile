import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import OrdersReducer from './OrdersReducer';
import ServiceReducer from './ServiceReducer';

const rootReducer = combineReducers({
  AuthReducer,
  OrdersReducer,
  ServiceReducer,
});

export default rootReducer;
