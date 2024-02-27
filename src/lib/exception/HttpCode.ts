/**
 *
 * CLIENT 4xx
 *
 * source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 *
 */
export const OK = 200;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const NOT_ACCEPTABLE = 406;
export const REQUEST_TIMEOUT = 408;
export const CONFLICT = 409;
export const PRECONDITION_FAILED = 417;
export const UNPROCESSABLE_ENTITY = 422;
export const TOO_MANY_REQUESTS = 429;

export const DECLINE = [
	UNPROCESSABLE_ENTITY,
	BAD_REQUEST,
	NOT_ACCEPTABLE,
	NOT_FOUND,
	PRECONDITION_FAILED,
	UNAUTHORIZED,
	CONFLICT
];

/**
 * SERVER 5XX
 */
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;
 