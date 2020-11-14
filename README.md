# once-dom

Select and filter DOM elements to process them only once.

## Documentation and examples

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

Full API documentation and examples in the [API docs](API.md).

## Contributors

These amazing people have contributed code to this project:

- [Rob Loach](https://github.com/RobLoach)
- [JohnAlbin](https://github.com/JohnAlbin)
- [Kay Leung](https://github.com/KayLeung)
- [Théodore Biadala](https://github.com/theodoreb)



