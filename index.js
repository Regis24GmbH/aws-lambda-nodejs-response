'use strict';

/**
 * Send a callback to API gateway (lambda integration type PROXY)
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
 * return Response.sendApiResponse(context, callback, 200, responseObject);
 * }
 * @example
 * // return error
 * const Response = require('./lib/response');
 * exports.handler = (event, context, callback) => {
 * ...
 * let responseObject = {message: 'oh oh'};
 * return Response.sendApiResponse(context, callback, 400, responseObject);
 * }
 */
function sendApiResponse(context, callback, statusCode, contentObject) {
  let responseBodyObject;
  switch (statusCode) {
    case 200:
      responseBodyObject = contentObject;
      break;
    case 400:
      console.log(contentObject);
      responseBodyObject = {
        message: 'Bad Request',
        requestId: context.awsRequestId
      };
      break;
    default:
      console.log(contentObject);
      statusCode = 500;
      responseBodyObject = {
        message: 'Internal Server Error',
        requestId: context.awsRequestId
      };
  }
  const responseObject = {
    statusCode: statusCode,
    body: JSON.stringify(responseBodyObject),
    isBase64Encoded: false
  };
  callback(null, responseObject);
}

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

module.exports = {
  sendApiResponse: sendApiResponse,
  sendInvokeResponse: sendInvokeResponse
};
