/*!
 * droplet Once v0.0.1
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */


(function ($, dropletOnce) {
  "use strict";

  function Plugin(option) {
    return dropletOnce.init($(this), option);
  }

  $.fn.once = Plugin;
  $.fn.once.Constructor = dropletOnce;
})(jQuery, dropletOnce);