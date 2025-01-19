
/** @function
 * * Handling the API Rest resposnse, and return data and different message for status code
 * @name handlingResponse
 * @param {object} data - The response of method
 * @return {object} - The response of method, with additional info
 */
export const handlingResponse = (data) => {
	const response = { error: '' };

	if (data && !/ok/i.test(data.statusText)) {
		switch (data.status) {
			case 401:
				data.type = 'Unauthorized';
				break;
			case 404:
				data.type = 'Not Found';
				break;
			case 500:
				data.type = 'ServerError';
				break;
			default:
				data.type = 'Invalid Data';
				break;
		}
		return { response, error: data };
	}
	return { response: data };
};

/**  @function
 * * Handling the null case and set to safe
 *
 * @name nullSafe
 * @param {function} func
 * @param {*} fallbackValue
 * @returns {*} the value to set safe the method
 */
export const nullSafe = (func, fallbackValue) => {
	try {
		const value = func();
		return value === null || value === undefined ? fallbackValue : value;
	} catch (e) {
		return fallbackValue;
	}
};

/**
 * Generates a unique identifier by combining two random numbers.
 *
 * @function generateId
 * @returns {string} - A string representing the unique identifier in the format "XXXX-XXXX",
 * where X represents a random number between 0 and 9.
 *
 * @example
 * const uniqueId = generateId();
 * console.log(uniqueId); // Output: "1234-5678"
 */
export function generateId() {
	return `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Generates a Universally Unique Identifier (UUID) using the version 4 algorithm.
 *
 * @function generaUUID
 * @returns {string} - A string representing the generated UUID in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
 * where x represents a random hexadecimal digit and y represents a random hexadecimal digit from the set [8, 9, A, B].
 *
 * @example
 * const uniqueId = generaUUID();
 * console.log(uniqueId); // Output: "123e4567-e89b-42d3-a456-426614174000"
 */
export function generaUUID() {
	let dt = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

