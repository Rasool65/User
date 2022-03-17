import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Persistor from '@redux/store/store';
import App from './App';

import './assets/style/style.css';
import NotistackProivder from '@uikits/notistack/NotistackProvider';

export let { store, persistor } = Persistor();

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        <NotistackProivder>
          <App />
        </NotistackProivder>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
