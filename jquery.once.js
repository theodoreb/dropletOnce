/*!
 * droplet Once v0.0.1
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */


(function ($, once) {
  "use strict";

  function Plugin(option) {
    return once.init($(this), option);
  }

  $.fn.once = Plugin;
  $.fn.once.Constructor = once;
})(jQuery, once);