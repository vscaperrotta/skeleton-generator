import { produce } from 'immer';
import { actionTypes } from '@store/actions/home';

const ACTION_HANDLERS = {
  [actionTypes.DO_EXAMPLE]: produce((draft, action) => {
    draft.example = action.payload;
  }),
  // ['FETCH_POSTS_REQUEST']: produce((draft, action) => {
  //   draft.loading = true;
  //   draft.error = null;
  // }),
  // ['FETCH_POSTS_SUCCESS']: produce((draft, action) => {
  //   draft.loading = false;
  //   draft.data.users = action.payload;
  // }),
  // ['FETCH_POSTS_FAILURE']: produce((draft, action) => {
  //   draft.loading = false;
  //   draft.error = action.payload;
  // }),
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
