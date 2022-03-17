import { MessageReducer } from './../message/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { userInfoReducer } from '../userInfo/reducer';
import { landingReducer } from '../landing/reducers';
import { ShoppingReducer } from '../shoppingList/reducers';
import { settingReducer } from '../setting/reducer';
import { preFactorReducer } from '../preFactor/reducer';
import { TablePaginationReducer } from '../tablePagination/reducers';

// const saveSubsetFilter = createFilter('filterReducer');
// const notificationFilter = createFilter('notificationReducer');

const filterLanding = createFilter('landingReducer', ['allApis']);

const persistConfig = {
  key: 'panel',
  storage,
  whitelist: ['landingReducer'],
  transforms: [filterLanding],
  stateReconciler: autoMergeLevel2,
};

const rootReducer: any = combineReducers({
  userInfoReducer,
  landingReducer,
  ShoppingReducer,
  settingReducer,
  preFactorReducer,
  TablePaginationReducer,
  MessageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware: any;

if (process.env.NODE_ENV !== 'production') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
};
