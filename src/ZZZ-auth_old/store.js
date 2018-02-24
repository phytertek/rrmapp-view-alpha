import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './async';

const localStorageConfig = {
  key: 'auth',
  storage
};

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({ type: CLEAR_AUTH });

const initState = {
  token: '',

  isAuth: false
};

const auth = (state = initState, { type, payload }) => {
  switch (type) {
    case CLEAR_AUTH:
      return initState;
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: payload.data.token,
        user: payload.data.user
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: payload.data.token,
        user: payload.data.user
      };
    case LOGOUT_SUCCESS:
      return initState;
    default:
      return state;
  }
};

const persistentAuth = persistReducer(localStorageConfig, auth);

export default persistentAuth;
