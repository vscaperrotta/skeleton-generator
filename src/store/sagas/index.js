import { all } from 'redux-saga/effects';
import home from '@store/sagas/home.js';
// @generator sagas:import

export default function* allSagas() {
  yield all([
    home()
    // @generator sagas:export
  ]);
};
