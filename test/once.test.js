/**
 * @file
 * Main library tests. Requires a browser to run.
 */

import { expect, assert } from '@open-wc/testing';
import once from '../src/once';

describe('once', () => {
  let span;

  beforeEach(() => {
    document.body.innerHTML = '<p><span>test</span></p><span></span>';
    span = document.querySelectorAll('p span');
  });

  it('require ID to be a string', () => {
    assert.throws(() => once(123, [document.body]), TypeError);
  });

  it('require ID to not have spaces', () => {
    assert.throws(() => once('BAD ID', [document.body]), RangeError);
  });

  it("only process 'Element' objects", () => {
    assert.throws(
      () => once('test3', [document.body, 'wrong element']),
      TypeError,
    );
  });

  it("executes once('test4') and check the return type", () => {
    // Check the return of the function.
    expect(once('test4', span))
      .to.be.a('array')
      .with.lengthOf(1);

    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span data-once="test4">test</span>');
  });

  it("execute once('test5') and make sure it returns an element only once", () => {
    expect(once('test5', span)).to.have.lengthOf(1);

    // Ensure it is not run twice.
    expect(once('test5', span)).to.have.lengthOf(0);
  });

  it('execute once with different ids', () => {
    expect(once('test51', span)).to.have.lengthOf(1);
    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span data-once="test51">test</span>');

    expect(once('test52', span)).to.have.lengthOf(1);
    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span data-once="test51 test52">test</span>');
  });

  it('execute once.remove', () => {
    expect(once('test61', span)).to.have.lengthOf(1);
    expect(span[0]).dom.to.equal('<span data-once="test61">test</span>');

    expect(once('test62', span)).to.have.lengthOf(1);
    expect(span[0]).dom.to.equal('<span data-once="test61 test62">test</span>');

    expect(once.remove('test62', span))
      .to.have.lengthOf(1)
      .and.deep.equal([span[0]]);
    expect(span[0]).dom.to.equal('<span data-once="test61">test</span>');

    expect(once.remove('test61', span))
      .to.have.lengthOf(1)
      .and.deep.equal([span[0]]);
    expect(span[0]).dom.to.equal('<span>test</span>');
  });

  it('execute once.filter', () => {
    expect(once('test71', span)).to.have.lengthOf(1);
    expect(once('test72', span)).to.have.lengthOf(1);

    expect(once.filter('test71', span)).to.have.lengthOf(1);
    expect(once.filter('test72', span)).to.have.lengthOf(1);
    expect(once.filter('test-empty', span)).to.have.lengthOf(0);
  });

  it('execute once.find', () => {
    expect(once('test81', span)).to.have.lengthOf(1);
    expect(once('test82', span)).to.have.lengthOf(1);

    expect(once.find('test81')).to.have.lengthOf(1);
  });

  it('Use a string input for once and once.remove no context', () => {
    // Check the return of the function.
    expect(once('test9', 'span'))
      .to.be.a('array')
      .with.lengthOf(2);

    // Check the return of the function.
    expect(once.remove('test9', 'span'))
      .to.be.a('array')
      .with.lengthOf(2);
  });

  it('Use a string input for once and once.remove with context', () => {
    const context = document.querySelector('p');
    // Check the return of the function.
    expect(once('test10', 'span', context))
      .to.be.a('array')
      .with.lengthOf(1);

    // Check the return of the function.
    expect(once.remove('test10', 'span', context))
      .to.be.a('array')
      .with.lengthOf(1);
  });

  it('Use a single element input for once and once.remove', () => {
    // Check the return of the function.
    expect(once('test11', span[0]))
      .to.be.a('array')
      .with.lengthOf(1);

    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span data-once="test11">test</span>');

    // Check the return of the function.
    expect(once.remove('test11', span[0]))
      .to.be.a('array')
      .with.lengthOf(1);

    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span>test</span>');
  });

  it('Use a string input for once and once.remove with document as context', () => {
    // Check the return of the function.
    expect(once('test12', 'span', document))
      .to.be.a('array')
      .with.lengthOf(2);

    // Check the return of the function.
    expect(once.remove('test12', 'span', document))
      .to.be.a('array')
      .with.lengthOf(2);
  });
});
