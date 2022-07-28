import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
    ),
  ),
);

export default store;

export type RootState = ReturnType<typeof store.getState>
