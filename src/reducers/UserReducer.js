

import Actions from "actions/User";
import Reducer from "reducers/utils/Reducer";

class User extends Reducer
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

export default User;