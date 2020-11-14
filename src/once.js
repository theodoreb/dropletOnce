/**
 * @file
 * Functionality to limit repeat JavaScript callbacks on a set of elements.
 */

/**
 * @module once-dom
 */

/**
 * Illegal spaces in ids.
 *
 * @type {RegExp}
 */
const wsRE = /[\11\12\14\15\40]+/;

/**
 * Name of the HTML attribute containing an element's once ids.
 *
 * @type {string}
 */
const attrName = "data-once";

/**
 * Verify the validity of the once id.
 *
 * @param {string} id
 *   The id passed by a call to a once() function.
 *
 * @return {string}
 *   A valid id, used for indicating an element has been processed.
 *
 * @throws {TypeError|RangeError}
 */
function checkId(id) {
  if (typeof id !== "string") {
    throw new TypeError("The once id parameter must be a string");
  }
  if (id === "" || wsRE.test(id)) {
    throw new RangeError(
      "The once id parameter must not be empty or contain spaces"
    );
  }
  return id;
}

/**
 * Verifies that an item is an instance of Element.
 *
 * This function is used during filtering to ensure only DOM elements are
 * processed. once() makes use of get/setAttribute, which are methods
 * inherited from the Element object, so only of Element can be used.
 *
 * @param {*} itemToCheck
 *   The item to check.
 *
 * @return {bool}
 *   True if the item is an instance of Element
 *
 * @throws {TypeError}
 */
function checkElement(itemToCheck) {
  if (!(itemToCheck instanceof Element)) {
    throw new TypeError("The element must be an instance of Element");
  }
  return true;
}

/**
 * A helper for applying DOM changes to a filtered set of elements.
 *
 * This makes it possible to filter items that are not instances of Element,
 * then modify their DOM attributes in a single array traversal.
 *
 * @param {NodeList|Array.<Element>} elements
 *   A NodeList or array of elements passed by a call to a once() function.
 * @param {string} selector
 *   A CSS selector to check against to each element in the array.
 * @param {function} [apply]
 *   An optional function to apply on all matched elements.
 *
 * @return {Array.<Element>}
 *   The array of elements that match the CSS selector.
 */
function filterAndModify(elements, selector, apply) {
  return Array.prototype.filter.call(elements, element => {
    const selected = checkElement(element) && element.matches(selector);
    if (selected && apply) {
      apply(element);
    }
    return selected;
  });
}

/**
 * Add or remove an item from a list of once values.
 *
 * This function removes duplicates while adding or removing a once id in a
 * single array traversal.
 *
 * @param {string} value
 *   A space separated string of once ids from a data-drupal-once attribute.
 * @param {string} add
 *   The once id to add to the list of values.
 * @param {string} remove
 *   The once id to remove from the list of values.
 *
 * @return {string}
 *   A space separated string of once ids, to be assigned to a
 *   data-drupal-once attribute value.
 */
function updateAttribute({ value, add, remove }) {
  const result = [];
  value
    .trim()
    .split(wsRE)
    .forEach(item => {
      if (result.indexOf(item) < 0 && item !== remove) {
        result.push(item);
      }
    });
  if (add) {
    result.push(add);
  }
  return result.join(" ");
}

/**
 * Ensures a JavaScript callback is only executed once on a set of elements.
 *
 * Filters a NodeList or array of elements, removing those already processed
 * by a callback with a given id.
 * This method adds the data-drupal-once attribute on DOM elements. The value of
 * this attribute identifies if a given callback has been executed on that
 * element.
 *
 * @global
 *
 * @example
 * const elements = once(
 *   'my-once-id',
 *   document.querySelectorAll('[data-myelement]'),
 * );
 *
 * @param  {string} id
 *   The id of the once call.
 * @param  {NodeList|Array.<Element>} elements
 *   A NodeList or array of elements.
 *
 * @return {Array.<Element>}
 *   An array of elements that have not yet been processed by a once call
 *   with a given id.
 */
function once(id, elements) {
  const dataId = checkId(id);
  return filterAndModify(
    elements,
    `:not([${attrName}~="${dataId}"])`,
    element => {
      let value = dataId;
      if (element.hasAttribute(attrName)) {
        value = updateAttribute({
          value: element.getAttribute(attrName),
          add: dataId
        });
      }
      element.setAttribute(attrName, value);
    }
  );
}

/**
 * Removes a once id from an element's data-drupal-once attribute value.
 *
 * If a once id is removed from an element's data-drupal-once attribute value,
 * the JavaScript callback associated with that id can be executed on that
 * element again.
 *
 * @example
 * const removedOnceElements = once.remove(
 *   'my-once-id',
 *   document.querySelectorAll('[data-myelement]'),
 * );
 *
 * @param  {string} id
 *   The id of a once call.
 * @param  {NodeList|Array.<Element>} elements
 *   A NodeList or array of elements to remove the once id from.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that had been processed by the provided id,
 *   and are now able to be processed again.
 */
once.remove = (id, elements) => {
  const dataId = checkId(id);
  return filterAndModify(elements, `[${attrName}~="${dataId}"]`, element => {
    const value = updateAttribute({
      value: element.getAttribute(attrName),
      remove: dataId
    });
    if (value === "") {
      element.removeAttribute(attrName);
    } else {
      element.setAttribute(attrName, value);
    }
  });
};

/**
 * Finds elements that have been processed by a given once id.
 *
 * Filters a NodeList or array, returning an array of the elements already
 * processed by the provided once id.
 *
 * @example
 * const filteredElements = once.filter(
 *   'my-once-id',
 *   document.querySelectorAll('[data-myelement]'),
 * );
 *
 * @param  {string} id
 *   The id of the once call.
 * @param  {NodeList|Array.<Element>} elements
 *   A NodeList or array of elements to be searched.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that have already been processed by the
 *   provided once id.
 */
once.filter = (id, elements) => {
  const dataId = checkId(id);
  return filterAndModify(elements, `[${attrName}~="${dataId}"]`);
};

/**
 * Finds elements that have been processed by a given once id.
 *
 * Query the 'context' element for elements that already have the
 * corresponding once id value.
 *
 * @example
 * const oncedElements = once.find('my-once-id');
 *
 * @param  {string} id
 *   The id of the once call.
 * @param  {Element} [context]
 *   Scope of the search for matching elements.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that have already been processed by the
 *   provided once id.
 */
once.find = (id, context = document.documentElement) => {
  const dataId = checkId(id);
  return (
    checkElement(context) &&
    // Ensure the return is an Array and not a NodeList.
    Array.prototype.slice.call(
      context.querySelectorAll(`[${attrName}~="${dataId}"]`)
    )
  );
};

export default once;
