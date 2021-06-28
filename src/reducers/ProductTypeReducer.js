

import Actions from "actions/ProductType";
import Reducer from "reducers/utils/Reducer";

class ProductType extends Reducer
{
  constructor()
  {
    super(new Actions());
  }

  reducer = (state, action) =>
  {
    return this.baseReducer(state, action);
  };
}

export default ProductType;