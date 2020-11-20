# once-dom

Select and filter DOM elements to process them only once.

## Documentation and examples

**Example** *(Use as a module)*
```html
<script type="module">
  import once from 'https://unpkg.com/once-dom@latest/dist/once.esm.js';
  const elements = once('my-once-id', 'div');
  // Initialize elements.
  elements.forEach(el => el.innerHTML = 'processed');
</script>
```
**Example** *(Use as a regular script)*
```html
<script src="https://unpkg.com/once-dom@latest/dist/once.min.js"></script>
<script>
  const elements = once('my-once-id', 'div');
  // Initialize elements.
  elements.forEach(el => el.innerHTML = 'processed');
</script>
```

Full API documentation and examples in the [API docs](API.md).

## Contributors

These amazing people have contributed code to this project:

- [Rob Loach](https://github.com/RobLoach)
- [JohnAlbin](https://github.com/JohnAlbin)
- [Kay Leung](https://github.com/KayLeung)
- [Théodore Biadala](https://github.com/theodoreb)



