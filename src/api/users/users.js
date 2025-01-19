import { axiosInstance } from '../index.js';
import { handlingResponse } from '@utils/globalMethods.js';

export async function getUsers() {
  let data;

  try {
    data = await axiosInstance({
      method: 'get',
      url: ' http://127.0.0.1:3003/api/v1/tours',
    });
    return handlingResponse(data);
  } catch (error) {
    return handlingResponse(error);
  }
}

export async function deleteUser() {
  let data;

  try {
    data = await axiosInstance({
      method: 'get',
      url: `http://127.0.0.1:3003/api/v1/users/${userId}`,
    });
    return handlingResponse(data);
  } catch (error) {
    return handlingResponse(error);
  }
}
// @generator api:method


