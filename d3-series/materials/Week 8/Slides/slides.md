## Smörgåsbord

===

### Menu

* Deep dive on Homework 8
* CSS (and HTML) review
* Cross-browser support
* Real-world development environments
    * Transpiling and Babel
    * Webpack
    * ECMAScript 6
    * TypeScript
* Q & A

===

## Review

[Assignment 8](materials/Week 8/Assignment)

Example

Notes:

* Getting radio button and input values
* Index-dependent delays
* Sorting transitions

===

## HTML and CSS

===

## HTML

---

### The core of the DOM

* Tags
* Attributes
* Text

```html
<div class="my-class">Hello world</div>
```

---

### Common tags

```html
<h1>I'm a large heading</h1>

<p>I'm a paragraph</p>

<input type="radio|checkbox|text|..."/> <!-- I'm an input -->

<select> <!-- I'm a dropdown menu -->
    <option value="val1"></option>
</select>

<div>I'm a div. I hold things</div>
```

===

## CSS

---

<div style="font-size: 0.5em">Inline Styles</div>

```html
<div style="color:red">Hello world</div>
```

<div style="font-size: 0.5em">Internal Style Sheet</div>

```html
<style>
.my-class {
    color: red;
}
</style>
<div class="my-class">Hello world</div>
```

<div style="font-size: 0.5em">External Style Sheet</div>

```html
<link rel="styles.css">
<div class="my-class">Hello world</div>
```

```css
.my-class {
    color: red;
}
```

---

### CSS in D3

```javascript
g.selectAll('.text-label').style('font-size', 12);
```

vs

```css
.text-label {
    font-size: 12px;
}
```

---

### Common attributes

```css
p {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
    color: red;
}

div {
    padding: 0 5px 0 10px;
    margin: auto;
    width: 100px;
    height: 100px;
    background-color: black;
}
```

---

### More info and tutorials:

[Week 1/2 reading](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html)
[codecademy.com tutorials](https://www.codecademy.com/en/tracks/web)

===

## Browser support

---

### Common browsers

* Chrome
* FireFox
* Edge
* Safari
* Internet Explorer
    * 8, 9, 10, 11

Different browsers are different!

---

### How?

* Fonts, positioning
* Update frequency
    * Chrome, FireFox, Edge: frequent auto-updates
    * IE: major versions, no updates
* Specification implementation

---

### IE: The Black Sheep

* Bundled with Windows, opt-in updates
* Versions 8 and earlier don't support newer HTML, CSS, JS features
* Discontinued! (but still prevalent...)

===

## Real-world development

---

### Transpilation

* Translating your code into something that all browsers can understand
* Helps with (but does not guarantee!) browser support
* Babel
    * Translate modern JS into older syntax
* TypeScript
    * JS-like language with typing
    * Compiles to JS

---

### Webpack

* Packages up larger, multi-file JS applications
* Transpiles code
* Much, much more

===

## Q & A

===

### Cool Tools

* [codepen](https://codepen.io/)

===

### Assignment 9

Finish your final projects!!
