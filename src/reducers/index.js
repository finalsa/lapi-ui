import { combineReducers } from "redux";
import UserReducer from 'reducers/UserReducer'
import EntityReducer from 'reducers/EntityReducer'


const reducers = {
  
    users: new UserReducer().reducer,
    entities: new EntityReducer().reducer,

};

export default combineReducers(reducers);