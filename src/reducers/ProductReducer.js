

import Actions from "actions/Product";
import Reducer from "reducers/utils/Reducer";

class Product extends Reducer
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

export default Product;