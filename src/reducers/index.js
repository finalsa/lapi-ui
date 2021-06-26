import { combineReducers } from "redux";
import UserReducer from 'reducers/UserReducer'


const reducers = {
  
    users: new UserReducer().reducer,
    
};

export default combineReducers(reducers);