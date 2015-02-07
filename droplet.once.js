/*!
 * droplet Once v0.0.1
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */

/**
 * @class  dropletOnce
 * @param  {NodeList}  elements
 * @param  {String}  [id="once"]
 */
function dropletOnce (elements, id) {
  "use strict";

  var dataId = this.checkId(id);

  var filtered = Array.prototype.filter.call(elements, function (element) {
    return element.getAttribute(dataId) == null;
  });

  filtered.map(function (element) {
    element.setAttribute(dataId, "");
  });

  return filtered;
}

dropletOnce.prototype = {
  constructor: dropletOnce,
  /**
   * Ensures that the given ID is valid, returning "data-drupal-once" if one is not given.
   *
   * @param {string} [id="once"]
   *   A string representing the ID to check. Defaults to `"once"`.
   *
   * @returns The valid ID name.
   *
   * @throws Error when an ID is provided, but not a string.
   * @public
   */
  checkId: function (id) {
    "use strict";

    id = id || "once";
    if (typeof id !== "string") {
      throw new Error("The Once id parameter must be a string");
    }
    return "data-drupal-" + id;
  },
  /**
   * Removes the once data from elements, based on the given ID.
   *
   * @param {string} [id="once"]
   *   A string representing the name of the data ID which should be used when
   *   filtering the elements. This only filters elements that have already been
   *   processed by the once function. The ID should be the same ID that was
   *   originally passed to the once() function. Defaults to `"once"`.
   *
   * @example
   * ``` javascript
   * // Remove once data with the "changecolor" ID. The result set is the
   * // elements that had their once data removed.
   * dropletOnce.removeONce(document.querySelectorAll('.test' + j), 'changecolor');
   * ```
   *
   * @see dropletOnce
   * @this dropletOnce
   *
   * @global
   * @public
   */
  removeOnce: function (elements, id) {
    "use strict";

    Array.prototype.forEach.call(elements, function (element) {
     element.removeAttribute(dropletOnce.checkId(id));
    });
  }
};

/**
 * @class  dropletOnce
 * @param  {NodeList}  elements
 * @param  {String} [id="once"]
 */
dropletOnce.init = function (elements, id) {
  "use strict";
  return new dropletOnce(elements, id);
};

dropletOnce.checkId = dropletOnce.prototype.checkId;
dropletOnce.removeOnce = dropletOnce.prototype.removeOnce;

dropletOnce.version = "1.0.0";
