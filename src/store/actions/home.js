/*
 *
 * Home Actions
 *
 * @author Vittorio Scaperrotta
 * @since 11-Jan-2023
 */

import { createRequestTypes, createAction, MakeRequest } from '@utils/action';

export const actionTypes = {
  DO_EXAMPLE: '@@home/do_example',
  // @generator action:action-typemethodmethodmethod
}

// export const fetchPostsRequest = (payload) => {
//   return {
//     type: 'FETCH_POSTS_REQUEST',
//     payload: payload
//   }
// }

// export const fetchPostsSuccess = (payload) => {
//   return {
//     type: 'FETCH_POSTS_SUCCESS',
//     payload: payload
//   }
// }

// export const fetchPostsFailure = (payload) => {
//   return {
//     type: 'FETCH_POSTS_FAILURE',
//     payload: payload
//   }
// }

/** action
 *
 * @name doExample
 * @return {object} - The action object
 */
export const doExample = (payload) => createAction(actionTypes.DO_EXAMPLE, payload)
// @generator action:method
