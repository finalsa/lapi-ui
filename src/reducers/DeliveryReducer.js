

import Actions from "actions/Delivery";
import Reducer from "reducers/utils/Reducer";

class Delivery extends Reducer
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

export default Delivery;