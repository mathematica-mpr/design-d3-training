## Web Concepts: HTML, CSS, and JavaScript

---

### 3 Components

- **HTML**: Content and structure
- **CSS**: Appearance
- **JavaScript**: Dynamism and interaction

Notes:

- JavaScript is actually taking over a lot of the domain once covered by HTML and CSS
  - JS can generate HTML & CSS too
  - Front-end frameworks

---

### HTML

Basic structure

Example (index.html)

---

### DOM

Document Object Model: should be thought of as an API into your document.

<img class="img" src="materials/Week 1/Slides/resources/ExampleDOM.png" style="width:80%">

---

### CSS

Casading Style Sheets: Add style and much more

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

---

<div style="font-size: 0.5em">External Style Sheet</div>

```html
<link rel="styles.css" />
<div class="my-class">Hello world</div>
```

```css
.my-class {
  color: red;
}
```

---

### JavaScript

- High level, single threaded, garbage collected, interpreted, or just in time compiled, prototype based, multi-paradigm, dynamic language with a non-blocking loop

---

### High level

Relative to the hardware, lowest level is machine code.

---

### Single threaded

There is one event loop. This is really imporant for a lot of what we do in the web

Great Talk: https://www.youtube.com/watch?v=8aGhZQkoFbQ

---

### Garbage collected

Memory management, this process is obfuscated from us.

---

### Interpreted, or just in time (JIT) compiled

The computer runs the code line by line each time (sort of). JIT compiles just before runing but there is executeable that can passed around.

https://www.upwork.com/hiring/development/the-basics-of-compiled-languages-interpreted-languages-and-just-in-time-compilers/

---

### Prototype based

Class extention all the way up. Every object has a prototype, which allows us to re-use functionality by attaching it to the prototype.

---

### Multi-paradigm

JS doesn't lock us into Imperative (OOP, procedural, parallel processing) or Declarative (Logic, Functional, database)

https://medium.com/javascript-in-plain-english/what-are-javascript-programming-paradigms-3ef0f576dfdb

---

### Dynamic language

No types.

```
let x = 'a';
x = 1;
```

---

### Non-blocking loop

Asynchronous

---

- Used to manipulate the DOM

```js
document.querySelector('body').append('<p>Hello world</p>');
```

- Or add interaction and <span id="dynamic">dynamic content</span>

```js
document.getElementById('dynamic').onclick = function () {
  var i = 21;
  var mult = 1;
  setInterval(function () {
    if (i === 60) mult = -1;
    if (i === 20) mult = 1;
    mult === 1 ? i++ : i--;
    document.getElementById('dynamic').setAttribute('style', 'position:fixed; top: 40%; left:' + i + '%');
  }, 20);
};
```

---

### Asynchrony in JS

- Code doesn't always execute 'in order'

```js
console.log('Mathematica');

setTimeout(function () {
  console.log('Policy');
});

let promise = new Promise(function (resolve, reject) {
  if (true) {
    resolve('progress');
  } else {
    reject(Error('together'));
  }
});

promise.then(
  (x) => console.log(x),
  (err) => console.log(err)
);

console.log('Research');
```

Note:

- Talk about reasoning behind this
- Always be aware

---

### Resources

#### Interactive

- CodeWars -- https://www.codewars.com/
- Codecademy -- https://www.codecademy.com/
- nodeschool -- https://nodeschool.io/

---

#### Books

- JavaScript: The Good Parts By Douglas Crockford
- You Don't know JS (Series) -- https://github.com/getify/You-Dont-Know-JS

---

#### Videos

- js-must-watch -- https://github.com/bolshchikov/js-must-watch?utm_content=buffer7f8d6&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
