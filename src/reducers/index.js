import { combineReducers } from "redux";
import UserReducer from 'reducers/UserReducer'
import EntityReducer from 'reducers/EntityReducer'
import DocumentReducer from 'reducers/DocumentReducer'
import ProductReducer from 'reducers/ProductReducer'
import ProductTypeReducer from 'reducers/ProductTypeReducer'
import ItemReducer from 'reducers/ItemReducer'
import TemplateReducer from 'reducers/TemplateReducer'
import TemplateTypeReducer from 'reducers/TemplateTypeReducer'
import DocumentTypeReducer from 'reducers/DocumentTypeReducer'


const reducers = {
    items: new ItemReducer().reducer,
    templates: new TemplateReducer().reducer,
    templateTypes: new TemplateTypeReducer().reducer,
    documentTypes: new DocumentTypeReducer().reducer,
    productTypes: new ProductTypeReducer().reducer,
    products: new ProductReducer().reducer,
    documents: new DocumentReducer().reducer,
    users: new UserReducer().reducer,
    entities: new EntityReducer().reducer,

};

export default combineReducers(reducers);