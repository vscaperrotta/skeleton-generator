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

/** action
 *
 * @name doExample
 * @return {object} - The action object
 */
export const doExample = (payload) => createAction(actionTypes.DO_EXAMPLE, payload)
// @generator action:method
