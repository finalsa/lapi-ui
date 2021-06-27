

import Actions from "actions/Entity";
import Reducer from "reducers/utils/Reducer";

class Entity extends Reducer
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

export default Entity;