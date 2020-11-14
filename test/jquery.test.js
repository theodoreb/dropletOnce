/**
 * @file
 * Automated tests for jQuery Once.
 */

import { html, fixture, expect, assert, should } from "@open-wc/testing";

describe("jQuery once", () => {
  let span;

  beforeEach(() => {
    document.body.innerHTML = "<p><span>test</span></p>";
    span = document.querySelectorAll("span");
  });

  it("Call once properly", () => {
    jQuery("span").once("test1");
    // Make sure the DOM has been updated properly.
    expect(span[0]).dom.to.equal('<span data-once="test1">test</span>');
  });

  it("Call once on window and document", () => {
    expect(jQuery(window).once("test2-alias1")).to.have.lengthOf(1);
    expect(jQuery(document).once("test2-alias2")).to.have.lengthOf(1);

    // Make sure the alias works.
    expect(document.documentElement).to.have.attribute('data-once', 'test2-alias1 test2-alias2');

    expect(jQuery(window).once("test2-alias1")).to.have.lengthOf(0);
  });

  it("calls removeOnce() correctly", () => {
    expect(jQuery("span").once("test3")).to.have.lengthOf(1);
    expect(span[0]).dom.to.equal('<span data-once="test3">test</span>');

    expect(jQuery("span").removeOnce("test3")).to.have.lengthOf(1);
    expect(span[0]).dom.to.equal('<span>test</span>');
  });

  it("calls findOnce() correctly", () => {
    expect(jQuery("span").once("test4")).to.have.lengthOf(1);
    expect(jQuery("span").findOnce("test4")).to.have.lengthOf(1);

    expect(jQuery("span").findOnce("test42")).to.have.lengthOf(0);
  });

});
