import { combineReducers } from "redux";
import UserReducer from 'reducers/UserReducer'
import EntityReducer from 'reducers/EntityReducer'
import DocumentReducer from 'reducers/DocumentReducer'
import ProductReducer from 'reducers/ProductReducer'


const reducers = {
    products: new ProductReducer().reducer,
    documents: new DocumentReducer().reducer,
    users: new UserReducer().reducer,
    entities: new EntityReducer().reducer,

};

export default combineReducers(reducers);