'use strict';

/**
 * Send a callback to API gateway (lambda integration type PROXY)
 * @param {object} context
 * @param {string} [context.awsRequestId]
 * @param callback
 * @param {number} statusCode
 * @param {object} contentObject
 */
function sendApiResponse(context, callback, statusCode, contentObject) {
  // set default responseObject and requestStatus as error-500
  let requestStatus = 500;
  let responseBodyObject = {
    message: 'Internal Server Error',
    requestId: context.awsRequestId
  };
  // 200 - overwrite complete responseObject
  if (statusCode === 200) {
    requestStatus = statusCode;
    responseBodyObject = contentObject;
  }
  // 400 - overwrite default error object
  if (statusCode === 400) {
    requestStatus = statusCode;
    responseBodyObject = {
      message: 'Bad Request',
      requestId: context.awsRequestId
    };
  }
  // log stuf in case of error
  if (requestStatus !== 200) {
    console.log(contentObject);
  }
  const responseObject = {
    statusCode: requestStatus,
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
  if (statusCode === 200) {
    callback(null, responseObject);
  } else {
    console.log(responseObject);
    callback(JSON.stringify(responseObject));
  }
}

module.exports = {
  sendApiResponse: sendApiResponse,
  sendInvokeResponse: sendInvokeResponse
};
