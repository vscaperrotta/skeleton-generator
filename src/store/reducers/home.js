import { produce } from 'immer';
import { actionTypes } from '@store/actions/home';

const ACTION_HANDLERS = {
  [actionTypes.DO_EXAMPLE]: produce((draft, action) => {
    draft.example = action.payload;
  }),
  // @generator reducer:type:action
};

// The initial state of the food reducer
const initialState = {
  // data: {
  //   users: {}
  // },
  // loading: false,
  // error: null,
  example: ''
};

const home = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default home;
