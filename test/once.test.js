/**
 * @file
 * Main library tests. Requires a browser to run.
 */

import { expect, assert } from '@open-wc/testing';
import once from '../src/once';

function expectArrayOfLength(result, len) {
  return expect(result)
    .to.be.an('array')
    .with.lengthOf(len);
}

describe('once', () => {
  let pSpan;
  let context;

  beforeEach(() => {
    document.body.innerHTML = '<p><span>test</span></p><span></span>';
    pSpan = document.querySelectorAll('p span');
    context = document.querySelector('p');
  });

  it('require ID to be a string', () => {
    assert.throws(
      () => once(123, pSpan),
      TypeError,
      'once ID must be a string',
    );
  });

  it('require ID to not have spaces', () => {
    assert.throws(
      () => once('BAD ID', pSpan),
      RangeError,
      'once ID must not be empty or contain spaces',
    );
  });

  it("only process 'Element' objects", () => {
    assert.throws(
      () => once('test3', [pSpan, 'wrong element']),
      TypeError,
      'The element must be an instance of Element',
    );
  });

  it("executes once('test4') and check the return type", () => {
    // Check the return of the function.
    expectArrayOfLength(once('test4', pSpan), 1);

    // Make sure the DOM has been updated properly.
    expect(pSpan[0]).dom.to.equal('<span data-once="test4">test</span>');
  });

  it("execute once('test5') and make sure it returns an element only once", () => {
    expectArrayOfLength(once('test5', pSpan), 1);

    // Ensure it is not run twice.
    expectArrayOfLength(once('test5', pSpan), 0);
  });

  it('execute once with different ids', () => {
    expectArrayOfLength(once('test51', pSpan), 1);
    // Make sure the DOM has been updated properly.
    expect(pSpan[0]).dom.to.equal('<span data-once="test51">test</span>');

    expectArrayOfLength(once('test52', pSpan), 1);
    // Make sure the DOM has been updated properly.
    expect(pSpan[0]).dom.to.equal(
      '<span data-once="test51 test52">test</span>',
    );
  });

  it('execute once.remove', () => {
    expectArrayOfLength(once('test61', pSpan), 1);
    expect(pSpan[0]).dom.to.equal('<span data-once="test61">test</span>');

    expectArrayOfLength(once('test62', pSpan), 1);
    expect(pSpan[0]).dom.to.equal(
      '<span data-once="test61 test62">test</span>',
    );

    expectArrayOfLength(once.remove('test62', pSpan), 1).deep.equal([pSpan[0]]);
    expect(pSpan[0]).dom.to.equal('<span data-once="test61">test</span>');

    expectArrayOfLength(once.remove('test61', pSpan), 1).deep.equal([pSpan[0]]);
    expect(pSpan[0]).dom.to.equal('<span>test</span>');
  });

  it('execute once.filter', () => {
    expectArrayOfLength(once('test71', 'span'), 2);
    expectArrayOfLength(once('test72', 'span'), 2);

    // NodeList.
    expectArrayOfLength(once.filter('test71', pSpan), 1);
    expectArrayOfLength(once.filter('test72', pSpan), 1);
    // Element.
    expectArrayOfLength(once.filter('test71', pSpan[0]), 1);
    expectArrayOfLength(once.filter('test72', pSpan[0]), 1);
    // Selector no context
    expectArrayOfLength(once.filter('test71', 'span'), 2);
    expectArrayOfLength(once.filter('test72', 'span'), 2);
    // Selector with context.
    expectArrayOfLength(once.filter('test71', 'span', context), 1);
    expectArrayOfLength(once.filter('test72', 'span', context), 1);
    // no match.
    expectArrayOfLength(once.filter('test-empty', pSpan), 0);
  });

  it('execute once.find', () => {
    expectArrayOfLength(once('test81', pSpan), 1);
    expectArrayOfLength(once.find('test81'), 1);

    expectArrayOfLength(once('test82', 'span'), 2);
    expectArrayOfLength(once.find(), 2);
  });

  it('Use a string input for once and once.remove no context', () => {
    expectArrayOfLength(once('test9', 'span'), 2);
    expectArrayOfLength(once.remove('test9', 'span'), 2);
  });

  it('Use a string input for once and once.remove with context', () => {
    expectArrayOfLength(once('test10', 'span', context), 1);
    expectArrayOfLength(once.remove('test10', 'span', context), 1);
  });

  it('Use a single element input for once and once.remove', () => {
    expectArrayOfLength(once('test11', pSpan[0]), 1);
    expect(pSpan[0]).dom.to.equal('<span data-once="test11">test</span>');

    expectArrayOfLength(once.remove('test11', pSpan[0]), 1);
    expect(pSpan[0]).dom.to.equal('<span>test</span>');
  });

  it('Use a string input for once and once.remove with document as context', () => {
    expectArrayOfLength(once('test12', 'span', document), 2);
    expectArrayOfLength(once.remove('test12', 'span', document), 2);
  });

  it('Calling once without parameters should fail', () => {
    assert.throws(() => once(), TypeError, 'once ID must be a string');
  });

  it('Calling once with an element as first parameter should fail with ID validation error', () => {
    assert.throws(
      () => once(document.body),
      TypeError,
      'once ID must be a string',
    );
  });

  it('Calling once without selector should fail', () => {
    assert.throws(
      () => once('test14'),
      TypeError,
      'Selector must not be empty',
    );
  });
});
