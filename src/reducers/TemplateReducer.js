

import Actions from "actions/Template";
import Reducer from "reducers/utils/Reducer";

class Template extends Reducer
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

export default Template;