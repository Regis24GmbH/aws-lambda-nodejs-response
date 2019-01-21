'use strict';

const sendApiResponse = require('./sendApiResonse');
const sendInvokeResponse = require('./sendInvokeResponse');

let Response = {};
Response.sendApiResponse = sendApiResponse;
Response.sendInvokeResponse = sendInvokeResponse;

module.exports = Response;
