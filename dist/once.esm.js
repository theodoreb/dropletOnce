/* once - v3.2.0 - 2020-11-21 */
/**
 * Mark DOM elements as processed to prevent multiple initializations.
 *
 * @module once-dom
 *
 * @example <caption>Use as a module</caption>
 * <script type="module">
 *   import once from 'https://unpkg.com/once-dom@latest/dist/once.esm.js';
 *   const elements = once('my-once-id', 'div');
 *   // Initialize elements.
 *   elements.forEach(el => el.innerHTML = 'processed');
 * </script>
 *
 * @example <caption>Use as a regular script</caption>
 * <script src="https://unpkg.com/once-dom@latest/dist/once.min.js"></script>
 * <script>
 *   const elements = once('my-once-id', 'div');
 *   // Initialize elements.
 *   elements.forEach(el => el.innerHTML = 'processed');
 * </script>
 * @example <caption>Using a single element as input</caption>
 * // once methods always return an array, to simplify the use with a single
 * // element use destructuring or the shift method.
 * const [myElement] = once('my-once-id', document.body);
 * const myElement = once('my-once-id', document.body).shift();
 */

/**
 * Illegal spaces in ids.
 *
 * @private
 *
 * @type {RegExp}
 */
const wsRE = /[\11\12\14\15\40]+/;

/**
 * Name of the HTML attribute containing an element's once ids.
 *
 * @private
 *
 * @type {string}
 */
const attrName = 'data-once';

/**
 * Shortcut to access the html element.
 *
 * @private
 *
 * @type {HTMLElement}
 */
const html = document.documentElement;

/**
 * Helper to access element attributes.
 *
 * @private
 *
 * @param {Element} element
 *   The Element to access the data-once attribute from.
 * @param {string} op
 *   The action to take on the element.
 * @param {string} [value]
 *   Optional value for setAttribute.
 *
 * @return {string|undefined|null|boolean}
 *   Result of the attribute method.
 */
function attr(element, op, value) {
  const method = `${op}Attribute`;
  return method in element && element[method](attrName, value);
}

/**
 * Verify the validity of the once id.
 *
 * @private
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
  if (typeof id !== 'string') {
    throw new TypeError('once ID must be a string');
  }
  if (id === '' || wsRE.test(id)) {
    throw new RangeError('once ID must not be empty or contain spaces');
  }
  return id;
}

/**
 * Return the attribute selector.
 *
 * @private
 *
 * @param {string} id
 *   The once id to select.
 *
 * @return {string}
 *   The full CSS attribute selector.
 */
function attrSelector(id) {
  return checkId(id) && `[${attrName}~="${id}"]`;
}

/**
 * Verifies that an item is an instance of Element.
 *
 * This function is used during filtering to ensure only DOM elements are
 * processed. once() makes use of get/setAttribute, which are methods
 * inherited from the Element object, so only of Element can be used.
 *
 * @private
 *
 * @param {*} itemToCheck
 *   The item to check.
 *
 * @return {boolean}
 *   True if the item is an instance of Element
 *
 * @throws {TypeError}
 */
function checkElement(itemToCheck) {
  if (!(itemToCheck instanceof Element)) {
    throw new TypeError('The element must be an instance of Element');
  }
  return true;
}

/**
 * Process arguments, query the DOM if necessary.
 *
 * @private
 *
 * @param {NodeList|Array.<Element>|Element|string} selector
 *   A NodeList or array of elements.
 * @param {HTMLElement} [context=document.documentElement]
 *   An element to use as context for querySelectorAll.
 *
 * @return {Array.<Element>}
 *   An array with the processed Id and the list of elements to process.
 */
function getElements(selector, context = html) {
  // Assume selector is an array-like value.
  let elements = selector;

  // This is a selector, query the elements.
  if (typeof selector === 'string' && checkElement(context)) {
    elements = context.querySelectorAll(selector);
  }
  // This is a single element.
  else if (selector instanceof Element) {
    elements = [selector];
  }

  return elements;
}

/**
 * A helper for applying DOM changes to a filtered set of elements.
 *
 * This makes it possible to filter items that are not instances of Element,
 * then modify their DOM attributes in a single array traversal.
 *
 * @private
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
 * @private
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
  return result.join(' ');
}

/**
 * Ensures a JavaScript callback is only executed once on a set of elements.
 *
 * Filters a NodeList or array of elements, removing those already processed
 * by a callback with a given id.
 * This method adds a `data-once` attribute on DOM elements. The value of
 * this attribute identifies if a given callback has been executed on that
 * element.
 *
 * @global
 *
 * @example <caption>Basic usage</caption>
 * const elements = once('my-once-id', '[data-myelement]');
 * @example <caption>Input parameters accepted</caption>
 * // NodeList.
 * once('my-once-id', document.querySelectorAll('[data-myelement]'));
 * // Array or Array-like of Element.
 * once('my-once-id', jQuery('[data-myelement]'));
 * // A CSS selector without a context.
 * once('my-once-id', '[data-myelement]');
 * // A CSS selector with a context.
 * once('my-once-id', '[data-myelement]', document.head);
 * // Single Element.
 * once('my-once-id', document.querySelector('#some-id'));
 * @example <caption>Using a single element</caption>
 * // Once always returns an array, event when passing a single element. Some
 * // forms that can be used to keep code readable.
 * // Destructuring:
 * const [myElement] = once('my-once-id', document.body);
 * // By changing the resulting array, es5 compatible.
 * const myElement = once('my-once-id', document.body).shift();
 *
 * @param {string} id
 *   The id of the once call.
 * @param {NodeList|Array.<Element>|Element|string} selector
 *   A NodeList or array of elements.
 * @param {HTMLElement} [context=document.documentElement]
 *   An element to use as context for querySelectorAll.
 *
 * @return {Array.<Element>}
 *   An array of elements that have not yet been processed by a once call
 *   with a given id.
 */
function once(id, selector, context) {
  return filterAndModify(
    getElements(selector, context),
    `:not(${attrSelector(id)})`,
    element => {
      let value = id;
      if (attr(element, 'has')) {
        value = updateAttribute({
          value: attr(element, 'get'),
          add: id,
        });
      }
      attr(element, 'set', value);
    },
  );
}

/**
 * Removes a once id from an element's data-drupal-once attribute value.
 *
 * If a once id is removed from an element's data-drupal-once attribute value,
 * the JavaScript callback associated with that id can be executed on that
 * element again.
 *
 * @method once.remove
 *
 * @example <caption>Basic usage</caption>
 * const elements = once.remove('my-once-id', '[data-myelement]');
 * @example <caption>Input parameters accepted</caption>
 * // NodeList.
 * once.remove('my-once-id', document.querySelectorAll('[data-myelement]'));
 * // Array or Array-like of Element.
 * once.remove('my-once-id', jQuery('[data-myelement]'));
 * // A CSS selector without a context.
 * once.remove('my-once-id', '[data-myelement]');
 * // A CSS selector with a context.
 * once.remove('my-once-id', '[data-myelement]', document.head);
 * // Single Element.
 * once.remove('my-once-id', document.querySelector('#some-id'));
 *
 * @param {string} id
 *   The id of a once call.
 * @param {NodeList|Array.<Element>|Element|string} selector
 *   A NodeList or array of elements to remove the once id from.
 * @param {HTMLElement} [context=document.documentElement]
 *   An element to use as context for querySelectorAll.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that had been processed by the provided id,
 *   and are now able to be processed again.
 */
once.remove = (id, selector, context) => {
  return filterAndModify(
    getElements(selector, context),
    attrSelector(id),
    element => {
      const value = updateAttribute({
        value: attr(element, 'get'),
        remove: id,
      });
      if (value === '') {
        attr(element, 'remove');
      } else {
        attr(element, 'set', value);
      }
    },
  );
};

/**
 * Finds elements that have been processed by a given once id.
 *
 * Filters a NodeList or array, returning an array of the elements already
 * processed by the provided once id. If a selector is needed use the {@link
 * once.find} method.
 *
 * @method once.filter
 *
 * @example <caption>Basic usage</caption>
 * const filteredElements = once.filter('my-once-id', '[data-myelement]');
 * @example <caption>Input parameters accepted</caption>
 * // NodeList.
 * once.filter('my-once-id', document.querySelectorAll('[data-myelement]'));
 * // Array or Array-like of Element.
 * once.filter('my-once-id', jQuery('[data-myelement]'));
 *
 * @param {string} id
 *   The id of the once call.
 * @param {NodeList|Array.<Element>} elements
 *   A NodeList or array of elements to be searched.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that have already been processed by the
 *   provided once id.
 */
once.filter = (id, elements) => filterAndModify(elements, attrSelector(id));

/**
 * Finds elements that have been processed by a given once id.
 *
 * Query the 'context' element for elements that already have the
 * corresponding once id value.
 *
 * @method once.find
 *
 * @example <caption>Basic usage</caption>
 * const oncedElements = once.find('my-once-id');
 * @example <caption>Input parameters accepted</caption>
 * // Call without a context.
 * once.find('my-once-id');
 * // Call with a context.
 * once.find('my-once-id', document.head);
 *
 * @param {string} id
 *   The id of the once call.
 * @param {Element} [context=document.documentElement]
 *   Scope of the search for matching elements.
 *
 * @return {Array.<Element>}
 *   A filtered array of elements that have already been processed by the
 *   provided once id.
 */
once.find = (id, context = html) => getElements(attrSelector(id), context);

export default once;
