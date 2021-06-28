

import Actions from "actions/DocumentType";
import Reducer from "reducers/utils/Reducer";

class DocumentType extends Reducer
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

export default DocumentType;