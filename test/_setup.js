// Start server
require('..');

// Add `expect` and `sinon` to `global`
var chai = require('chai');
global.expect = require('chai').expect;
global.sinon = require('sinon');

// Hook in sinon-chai
chai.use(require('sinon-chai'));
