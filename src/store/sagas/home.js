import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as actions from '@store/actions/home.js';
import * as api from '@api/users/users.js';

function* fetchGetUsers() {
	const { error, response } = yield call(api.getUsers);

	if (!error) {
		yield put(actions.fetchPostsSuccess(response.data));
	} else {
		yield put(actions.fetchPostsFailure(error, data));
	}
}

// @generator saga:method
function* watchFetchRecipes() {
	yield takeLatest('FETCH_POSTS_REQUEST', fetchGetUsers);
}

// @generator saga:watch

export default function* rootSaga() {
	yield all([
		watchFetchRecipes(),
		// @generator saga:fork
	]);
}
