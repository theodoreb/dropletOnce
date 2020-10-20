/**
 * @file
 * jQuery wrapper for once.
 */

(($, once) => {
	/**
	 * Replaces window and document object with the documentElement.
	 *
	 * Makes sure that the once function will receive an Element while keeping
	 * the ability to call once from jQuery with window and document.
	 *
	 * @param {jQuery} elements
	 *   The jQuery collection to check.
	 * @param {string} id
	 *   The once id value.
	 * @param {function} method
	 *   The callback to apply to elements.
	 *
	 * @return {Array.<Element>}
	 *   The return of the method callback.
	 */
	function alias(elements, id, method) {
		if (
			elements.length === 1 &&
			(elements[0] === window || elements[0] === document)
		) {
			const result = method(id, [document.documentElement]);
			// Return the original argument to keep jQuery chaining working as
			// expected.
			return result.length ? elements : [];
		}
		return method(id, elements);
	}

	/**
	 * Filter elements that have yet to be processed by the given data ID.
	 *
	 * @param {string} id
	 *   The data ID used to determine if an element has already been processed.
	 *
	 * @return {jQuery}
	 *   jQuery collection of elements that have not yet been processed by the
	 *   callback with the given id.
	 *
	 * @see once
	 */
	$.fn.once = function jqueryOnce(id) {
		return $(alias(this, id, once));
	};
	/**
	 * Filters elements that have already been processed by a given ID.
	 *
	 * @param {string} id
	 *   The data ID used in a call to $.fn.once() to search for.
	 *
	 * @return {jQuery}
	 *   jQuery collection of elements that have been processed by a callback
	 *   with the given id.
	 *
	 * @see once.find
	 */
	$.fn.findOnce = function jqueryFindOnce(id) {
		return $(alias(this, id, once.filter));
	};
	/**
	 * Removes the once data from elements based on the given ID.
	 *
	 * @param {string} id
	 *   A data ID used in a call to $.fn.once().
	 *
	 * @return {jQuery}
	 *   A jQuery collection of elements that had the provided id removed from
	 *   their once data.
	 *
	 * @see once.remove
	 */
	$.fn.removeOnce = function jqueryRemoveOnce(id) {
		return $(alias(this, id, once.remove));
	};
})(jQuery, once);
