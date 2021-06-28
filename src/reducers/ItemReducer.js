

import Actions from "actions/Item";
import Reducer from "reducers/utils/Reducer";

class Item extends Reducer
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

export default Item;