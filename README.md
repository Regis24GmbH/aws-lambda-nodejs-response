[![github tag][github-tag-image]][github-tag-url]
[![npm version][npm-version-image]][npm-version-url]
[![npm downloads][npm-downloads-image]][npm-downloads-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]

***

# npm package of @regis24/aws-lambda-nodejs-response

> A simple package to unify the response of AWS lambdas ...

## Installation

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i @regis24/aws-lambda-nodejs-response --save
```

## Usage

Just `require` the package and use one of the implemented calls (`sendInvokeResponse`, `sendApiResponse`)

```
const Response = require('@regis24/aws-lambda-nodejs-response');
	... and then call via ...
Response.sendInvokeResponse(context, callback, 200, contenObject);
	... or ...
Response.sendApiResponse(context, callback, 200, contenObject);
```

## License

Licensed under [MIT](https://github.com/Regis24GmbH/aws-lambda-nodejs-response/blob/master/LICENSE)

***

[github-tag-image]: https://img.shields.io/github/tag/Regis24GmbH/aws-lambda-nodejs-response.svg?style=flat-square
[github-tag-url]: https://github.com/Regis24GmbH/aws-lambda-nodejs-response

[npm-version-image]: https://img.shields.io/npm/v/@regis24/aws-lambda-nodejs-response.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/@regis24/aws-lambda-nodejs-response
[npm-downloads-image]: https://img.shields.io/npm/dm/@regis24/aws-lambda-nodejs-response.svg?style=flat-square
[npm-downloads-url]: https://www.npmjs.com/package/@regis24/aws-lambda-nodejs-response

[license-image]: https://img.shields.io/github/license/Regis24GmbH/aws-lambda-nodejs-response.svg?style=flat-square
[license-url]: https://github.com/Regis24GmbH/aws-lambda-nodejs-response/blob/master/LICENSE

[travis-image]: https://travis-ci.org/Regis24GmbH/aws-lambda-nodejs-response.svg?branch=master
[travis-url]: https://travis-ci.org/Regis24GmbH/aws-lambda-nodejs-response
