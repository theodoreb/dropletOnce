## Modules

<dl>
<dt><a href="#module_once-dom">once-dom</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#once">once(id, elements)</a> ⇒ <code>Array.&lt;Element&gt;</code></dt>
<dd><p>Ensures a JavaScript callback is only executed once on a set of elements.</p>
<p>Filters a NodeList or array of elements, removing those already processed
by a callback with a given id.
This method adds the data-drupal-once attribute on DOM elements. The value of
this attribute identifies if a given callback has been executed on that
element.</p>
</dd>
</dl>

<a name="module_once-dom"></a>

## once-dom
**Example** *(Use as a module)*  
```js
<script type="module">
  import once from "https://unpkg.com/once-dom@2.0.1/src/once.js";
  const elements = once("my-id", document.querySelectorAll("div"));
  // Initialize elements.
  elements.forEach(el => el.innerHTML = "processed");
</script>
```
**Example** *(Use as a regular script)*  
```js
<script src="https://unpkg.com/once-dom@2.0.1/dist/once.min.js"></script>
<script>
  const elements = once("my-id", document.querySelectorAll("div"));
  // Initialize elements.
  elements.forEach(el => el.innerHTML = "processed");
</script>
```
**Example** *(Use jQuery integration)*  
```js
<script src="https://unpkg.com/jquery@3.5.1/dist/jquery.min.js"></script>
<script src="https://unpkg.com/once-dom@2.0.1/dist/once.min.js"></script>
<script src="https://unpkg.com/once-dom@2.0.1/dist/once.jquery.min.js"></script>
<script>
  jQuery("div")
    .once("my-id")
    .each(function () {
      this.innerHTML = "processed";
    });
</script>
```
<a name="once"></a>

## once(id, elements) ⇒ <code>Array.&lt;Element&gt;</code>
Ensures a JavaScript callback is only executed once on a set of elements.

Filters a NodeList or array of elements, removing those already processed
by a callback with a given id.
This method adds the data-drupal-once attribute on DOM elements. The value of
this attribute identifies if a given callback has been executed on that
element.

**Kind**: global function  
**Returns**: <code>Array.&lt;Element&gt;</code> - An array of elements that have not yet been processed by a once call
  with a given id.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the once call. |
| elements | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> | A NodeList or array of elements. |

**Example**  
```js
const elements = once(
  'my-once-id',
  document.querySelectorAll('[data-myelement]'),
);
```

* [once(id, elements)](#once) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.remove(id, elements)](#once.remove) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.filter(id, elements)](#once.filter) ⇒ <code>Array.&lt;Element&gt;</code>
    * [.find(id, [context])](#once.find) ⇒ <code>Array.&lt;Element&gt;</code>

<a name="once.remove"></a>

### once.remove(id, elements) ⇒ <code>Array.&lt;Element&gt;</code>
Removes a once id from an element's data-drupal-once attribute value.

If a once id is removed from an element's data-drupal-once attribute value,
the JavaScript callback associated with that id can be executed on that
element again.

**Kind**: static method of [<code>once</code>](#once)  
**Returns**: <code>Array.&lt;Element&gt;</code> - A filtered array of elements that had been processed by the provided id,
  and are now able to be processed again.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of a once call. |
| elements | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> | A NodeList or array of elements to remove the once id from. |

**Example**  
```js
const removedOnceElements = once.remove(
  'my-once-id',
  document.querySelectorAll('[data-myelement]'),
);
```
<a name="once.filter"></a>

### once.filter(id, elements) ⇒ <code>Array.&lt;Element&gt;</code>
Finds elements that have been processed by a given once id.

Filters a NodeList or array, returning an array of the elements already
processed by the provided once id.

**Kind**: static method of [<code>once</code>](#once)  
**Returns**: <code>Array.&lt;Element&gt;</code> - A filtered array of elements that have already been processed by the
  provided once id.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the once call. |
| elements | <code>NodeList</code> \| <code>Array.&lt;Element&gt;</code> | A NodeList or array of elements to be searched. |

**Example**  
```js
const filteredElements = once.filter(
  'my-once-id',
  document.querySelectorAll('[data-myelement]'),
);
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

**Example**  
```js
const oncedElements = once.find('my-once-id');
```
