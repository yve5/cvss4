import { createStore, combineReducers } from 'redux';
import cvss4 from '../reducer/Reducer';

const store = createStore(combineReducers({ cvss4 }));

export default store;
