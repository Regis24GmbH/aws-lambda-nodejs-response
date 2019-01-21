'use strict';

const expect = require('chai').expect;
const Response = require('../src/index');

const context = {
  awsRequestId: 'abc-123-cde'
};
const contentObject = {
  itDoesntMatter: 'here i am ... in case of error i am part of log'
};

describe('sendApiResonse', function () {
  it('should respond with 200 for call with 200', function (done) {
    let expectedResponseObject = {
      statusCode: 200,
      body: JSON.stringify(contentObject),
      isBase64Encoded: false
    };
    let callback = (error, response) => {
      expect(error).to.be.null;
      expect(response).to.deep.equal(expectedResponseObject);
      done();
    };
    Response.sendApiResponse(context, callback, 200, contentObject);
  });

  it('should respond with 400 for call with 400', function (done) {
    let responseBodyObject = {
      message: 'Bad Request',
      requestId: context.awsRequestId
    };
    let expectedResponseObject = {
      statusCode: 400,
      body: JSON.stringify(responseBodyObject),
      isBase64Encoded: false
    };
    let callback = (error, response) => {
      expect(error).to.be.null;
      expect(response).to.deep.equal(expectedResponseObject);
      done();
    };
    Response.sendApiResponse(context, callback, 400, contentObject);
  });

  it('should respond with 500 for call with any StatusCode', function (done) {
    let responseBodyObject = {
      message: 'Internal Server Error',
      requestId: context.awsRequestId
    };
    let expectedResponseObject = {
      statusCode: 500,
      body: JSON.stringify(responseBodyObject),
      isBase64Encoded: false
    };
    let callback = (error, response) => {
      expect(error).to.be.null;
      expect(response).to.deep.equal(expectedResponseObject);
      done();
    };
    Response.sendApiResponse(context, callback, 678, contentObject);
  });
});
