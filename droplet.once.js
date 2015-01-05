/*!
 * droplet Once v0.0.1
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */

var dropletOnce = (function () {

  function init(elements, id) {
    var name = checkId(id);

    var filtered = Array.prototype.filter.call(elements, function (element) {
      return !element.getAttribute(name);
    });

    filtered.map(function (element) {
      // element.dataset[name] = true;
      element.setAttribute(name, true);
    });

    return filtered;
  }

  function checkId(id) {
    id = id || "once";
    if (typeof id !== "string") {
      throw new Error("The Once id parameter must be a string");
    }
    return id;
  }

  function removeOnce(elements, id) {
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute(dropletOnce.checkId(id));
    });
  }

  var API = {};
  API.init = init;
  API.removeOnce = removeOnce;

  return API;
}());

//
// Uncomment if you like jQuery way
//
//(function ($, dropletOnce) {
//  "use strict";
//
//  function Plugin(option) {
//    return dropletOnce.init($(this), option);
//  }
//
//  $.fn.once = Plugin;
//  $.fn.once.Constructor = dropletOnce;
//})(jQuery, dropletOnce);
