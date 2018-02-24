import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxPromise from 'redux-promise';
//

// Import component reducers
// import login from '../auth/login';
// import authStore from '../auth/store';
// import authAsync from '../auth/async';
// import mainStore from '../mainPage/store';
// import mainAsync from '../mainPage/async';

// Combine component reducers (states)
const combinedReducers = combineReducers({
  // login,
  // authStore,
  // mainStore,
  routerReducer
});

export default history => {
  const routerHistory = routerMiddleware(history);
  const createStoreWithMiddleware = applyMiddleware(
    routerHistory,
    reduxPromise
    // authAsync,
    // mainAsync
  )(createStore);
  const store = createStoreWithMiddleware(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return { store };
};
