'use strict';

/**
 * Send a callback to Invoker
 * @param {object} context
 * @param {string} [context.awsRequestId]
 * @param callback
 * @param {number} statusCode
 * @param {object} contentObject
 * @example
 * // return success
 * const Response = require('./lib/response');
 * exports.handler = (event, context, callback) => {
 * ...
 * let responseObject = {prop: 'yeah'};
 * return Response.senInvokeResponse(context, callback, 200, responseObject);
 * }
 * @example
 * // return error
 * const Response = require('./lib/response');
 * exports.handler = (event, context, callback) => {
 * ...
 * let responseObject = {message: 'oh oh'};
 * return Response.senInvokeResponse(context, callback, 400, responseObject);
 * }
 */
function sendInvokeResponse(context, callback, statusCode, contentObject) {
  // set default responseObject as error-500
  let responseObject = {
    httpStatus: 500,
    requestId: context.awsRequestId,
    message: 'Internal Server Error',
    error: contentObject ? contentObject : null
  };
  // 200 - overwrite complete responseObject
  if (statusCode === 200) {
    responseObject = contentObject;
  }
  // 400 - overwrite default error object
  if (statusCode === 400) {
    responseObject.httpStatus = 400;
    responseObject.message = 'Bad Request';
  }
  const responseString = JSON.stringify(responseObject);
  if (statusCode === 200) {
    callback(null, responseString);
  } else {
    console.log(JSON.parse(responseString));
    callback(responseString);
  }
}

module.exports = sendInvokeResponse;
