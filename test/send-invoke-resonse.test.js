'use strict';

const expect = require('chai').expect;
const should = require('chai').should();
const Response = require('../index');

const context = {
  awsRequestId: 'abc-123-cde'
};
const contentObject = {
  itDoesntMatter: 'here i am ... in case of error i am part of log'
};

describe('sendInvokeResonse', function () {
  it('should respond with 200 for call with 200', function (done) {
    const expectedResponseString = contentObject;
    let callback = (error, result) => {
      expect(error).to.be.null;
      expect(result).to.deep.equal(expectedResponseString);
      done();
    };
    Response.sendInvokeResponse(context, callback, 200, contentObject);
  });

  it('should respond with 400 for call with 400', function (done) {
    let responseObject = {
      httpStatus: 400,
      requestId: context.awsRequestId,
      message: 'Bad Request',
      error: contentObject ? contentObject : null
    };
    const expectedResponseString = JSON.stringify(responseObject);
    let callback = (error, result) => {
      should.not.exist(result);
      expect(error).to.deep.equal(expectedResponseString);
      done();
    };
    Response.sendInvokeResponse(context, callback, 400, contentObject);
  });

  it('should respond with 500 for call with any StatusCode', function (done) {
    let responseObject = {
      httpStatus: 500,
      requestId: context.awsRequestId,
      message: 'Internal Server Error',
      error: null
    };
    const expectedResponseString = JSON.stringify(responseObject);
    let callback = (error, result) => {
      should.not.exist(result);
      expect(error).to.deep.equal(expectedResponseString);
      done();
    };
    Response.sendInvokeResponse(context, callback, 678, null);
  });
});
