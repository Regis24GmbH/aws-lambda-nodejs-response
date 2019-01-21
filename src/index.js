'use strict';

const sendApiResponse = require('./send-api-resonse');
const sendInvokeResponse = require('./send-invoke-response');

let Response = {};
Response.sendApiResponse = sendApiResponse;
Response.sendInvokeResponse = sendInvokeResponse;

module.exports = Response;
