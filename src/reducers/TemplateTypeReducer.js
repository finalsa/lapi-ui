

import Actions from "actions/TemplateType";
import Reducer from "reducers/utils/Reducer";

class TemplateType extends Reducer
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

export default TemplateType;