import {createStore} from 'redux';
import { boardReducer } from './reducers';



const store = createStore(boardReducer);

export default store;