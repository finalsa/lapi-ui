

import Actions from "actions/Document";
import Reducer from "reducers/utils/Reducer";

class Document extends Reducer
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

export default Document;