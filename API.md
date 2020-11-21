## Modules

<dl>
<dt><a href="#module_once-dom">once-dom</a></dt>
<dd><p>Mark DOM elements as processed to prevent multiple initializations.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#once">once(id, selector, [context])</a> ⇒ <code>Array.&lt;Element&gt;</code></dt>
<dd><p>Ensures a JavaScript callback is only executed once on a set of elements.</p>
<p>Filters a NodeList or array of elements, removing those already processed
by a callback with a given id.
This method adds a <code>data-once</code> attribute on DOM elements. The value of
this attribute identifies if a given callback has been executed on that
element.</p>
</dd>
</dl>

<a name="module_once-dom"></a>

## once-dom
Mark DOM elements as processed to prevent multiple initializations.

**Example** *(Use as a module)*  
```js
<script type="module">
  import once from 'https://unpkg.com/once-dom@latest/dist/once.esm.js';
  const elements = once('my-once-id', 'div');
  // Initialize elements.
  elements.forEach(el => el.innerHTML = 'processed');
</script>
```
**Example** *(Use as a regular script)*  
```js
<script src="https://unpkg.com/once-dom@latest/dist/once.min.js"></script>
<script>
  const elements = once('my-once-id', 'div');
  // Initialize elements.
  elements.forEach(el => el.innerHTML = 'processed');
</script>
```
**Example** *(Using a single element as input)*  
```js
// once methods always return an array, to simplify the use with a single
// element use destructuring or the shift method.
const [myElement] = once('my-once-id', document.body);
const myElement = once('my-once-id', document.body).shift();
```
<a name="once"></a>

## once(id, selector, [context]) ⇒ <code>Array.&lt;Element&gt;</code>
Ensures a JavaScript callback is only executed once on a set of elements.

Filters a NodeList or array of elements, removing those already processed
by a callback with a given id.
This method adds a `data-once` attribute on DOM elements. The value of
this attribute identifies if a given callback has been executed on that
element.

**Kind**: global function  
**Returns**: <code>Array.&lt;Element&gt;</code> - An array of elements that have not yet been processed by a once call
  with a given id.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | The id of the once call. |
| selector | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> \| <code>Element</code> \| <code>string</code> |  | A NodeList or array of elements. |
| [context] | <code>HTMLElement</code> | <code>document.documentElement</code> | An element to use as context for querySelectorAll. |

**Example** *(Basic usage)*  
```js
const elements = once('my-once-id', '[data-myelement]');
```
**Example** *(Input parameters accepted)*  
```js
// NodeList.
once('my-once-id', document.querySelectorAll('[data-myelement]'));
// Array or Array-like of Element.
once('my-once-id', jQuery('[data-myelement]'));
// A CSS selector without a context.
once('my-once-id', '[data-myelement]');
// A CSS selector with a context.
once('my-once-id', '[data-myelement]', document.head);
// Single Element.
once('my-once-id', document.querySelector('#some-id'));
```
**Example** *(Using a single element)*  
```js
// Once always returns an array, event when passing a single element. Some
// forms that can be used to keep code readable.
// Destructuring:
const [myElement] = once('my-once-id', document.body);
// By changing the resulting array, es5 compatible.
const myElement = once('my-once-id', document.body).shift();
```

* [once(id, selector, [context])](#once) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.remove(id, selector, [context])](#once.remove) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.filter(id, elements)](#once.filter) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.find(id, [context])](#once.find) ⇒ <code>Array.&lt;Element&gt;</code>

<a name="once.remove"></a>

### once.remove(id, selector, [context]) ⇒ <code>Array.&lt;Element&gt;</code>
Removes a once id from an element's data-drupal-once attribute value.

If a once id is removed from an element's data-drupal-once attribute value,
the JavaScript callback associated with that id can be executed on that
element again.

**Kind**: static method of [<code>once</code>](#once)  
**Returns**: <code>Array.&lt;Element&gt;</code> - A filtered array of elements that had been processed by the provided id,
  and are now able to be processed again.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | The id of a once call. |
| selector | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> \| <code>Element</code> \| <code>string</code> |  | A NodeList or array of elements to remove the once id from. |
| [context] | <code>HTMLElement</code> | <code>document.documentElement</code> | An element to use as context for querySelectorAll. |

**Example** *(Basic usage)*  
```js
const elements = once.remove('my-once-id', '[data-myelement]');
```
**Example** *(Input parameters accepted)*  
```js
// NodeList.
once.remove('my-once-id', document.querySelectorAll('[data-myelement]'));
// Array or Array-like of Element.
once.remove('my-once-id', jQuery('[data-myelement]'));
// A CSS selector without a context.
once.remove('my-once-id', '[data-myelement]');
// A CSS selector with a context.
once.remove('my-once-id', '[data-myelement]', document.head);
// Single Element.
once.remove('my-once-id', document.querySelector('#some-id'));
```
<a name="once.filter"></a>

### once.filter(id, elements) ⇒ <code>Array.&lt;Element&gt;</code>
Finds elements that have been processed by a given once id.

Filters a NodeList or array, returning an array of the elements already
processed by the provided once id. If a selector is needed use the [find](#once.find) method.

**Kind**: static method of [<code>once</code>](#once)  
**Returns**: <code>Array.&lt;Element&gt;</code> - A filtered array of elements that have already been processed by the
  provided once id.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the once call. |
| elements | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> | A NodeList or array of elements to be searched. |

**Example** *(Basic usage)*  
```js
const filteredElements = once.filter('my-once-id', '[data-myelement]');
```
**Example** *(Input parameters accepted)*  
```js
// NodeList.
once.filter('my-once-id', document.querySelectorAll('[data-myelement]'));
// Array or Array-like of Element.
once.filter('my-once-id', jQuery('[data-myelement]'));
```
<a name="once.find"></a>

### once.find(id, [context]) ⇒ <code>Array.&lt;Element&gt;</code>
Finds elements that have been processed by a given once id.

Query the 'context' element for elements that already have the
corresponding once id value.

**Kind**: static method of [<code>once</code>](#once)  
**Returns**: <code>Array.&lt;Element&gt;</code> - A filtered array of elements that have already been processed by the
  provided once id.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | The id of the once call. |
| [context] | <code>Element</code> | <code>document.documentElement</code> | Scope of the search for matching elements. |

**Example** *(Basic usage)*  
```js
const oncedElements = once.find('my-once-id');
```
**Example** *(Input parameters accepted)*  
```js
// Call without a context.
once.find('my-once-id');
// Call with a context.
once.find('my-once-id', document.head);
```
