## D3 Fundamentals

===

## Review

[Assignment 2](materials/Week 2/Assignment)

Notes:

* Going over critiques of visualizations from homework
* Ask for questions on reading

===

## Web Concepts

---

### 3 Components

* **HTML**: Content and structure
* **CSS**: Appearance
* **JavaScript**: Dynamism and interaction

Notes:

* JavaScript is actually taking over a lot of the domain once covered by HTML and CSS
  * JS can generate HTML & CSS too
  * Front-end frameworks

---

### HTML

The core of the DOM

* Tags
* Attributes
* Text

```html
<div class="my-class">Hello world</div>
```

---

### CSS

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

### JavaScript

* Dynamically typed language used to manipulate the DOM

```js
document.querySelector('body').append('<p>Hello world</p>');
```

* Or add interaction and <span id="dynamic">dynamic content</span>

```js
document.getElementById('dynamic').onclick = function() {
    var i = 21;
    var mult = 1;
    setInterval(function() {
        if (i === 60) mult = -1;
        if (i === 20) mult = 1;
        mult === 1 ? i++ : i--;
        document
            .getElementById('dynamic')
            .setAttribute('style', 'position:fixed; top: 40%; left:' + i + '%');
    }, 20);
};
```

Notes:

* Can do much more than DOM manipulation, but that's the original purpose and the main thing we'll use it for in this class

---

### Asynchrony in JS

* Code doesn't always execute 'in order'

```js
console.log('Mathematica');

setTimeout(function() {
    console.log('Policy');
});

console.log('Research');
```

Note:

* Talk about reasoning behind this
* Always be aware

===

## D3: Data Driven Documents

---

### What is D3?

* Front-end Javascript library
* Uses data from JS to manupulate the DOM
* Primarily used with SVG

---

### What isn't D3?

* A graphing or charting library
  * e.g. no 'bar chart' function
* Something you need to install
* Simple

Notes:

* Lots of charting libraries exist out there, many build on top of D3
* Runs in the browser, just like all JS code
* Lots of complexity

===

## Simple Development Environment

---

index.html

```html
<html>
    <head>
        <title>Dev Env</title>

        <style>
            #my-viz {
                color: red;
            }
        </style>
    </head>

    <body>
        <div id="my-viz">

        </div>

        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script>
            d3.select('#my-viz').html('Hello world');
        </script>
    </body>
</html>
```

Notes:

* Go over elements of page
* Don't talk about D3 code for now

===

## D3 Fundamentals

---

### Selections

* D3 uses CSS-style selectors

```js
d3.select('#my-viz');
```

```js
d3.selectAll('p span.my-class');
```

Notes:

* Ask what these will do

---

### Working with attributes

```js
d3
    .select('p')
    .attr('class', 'red')
    .style('color', 'red');
```

Result:

```html
<p class="red" style="color: red;"></p>
```

Notes:

* `.style` is a convenience method

---

### Data Binding

* Using `selectAll.data`

```js
d3
    .selectAll('p')
    .data([10, 19, 23])
    .html(function(d) {
        return d;
    })
    .style('font-size', function(d) {
        return d;
    });
```

Notes:

* `.html` changes the text within the selected element tag

---

### Enter/Exit/Update Selections

* What if you don't have the same number of data elements and DOM elements?

```js
var paragraphs = d3
    .select('body')
    .selectAll('p')
    .data([25, 36, 48]);

paragraphs
    .enter()
    .append('p')
    .html(function(d) {
        return d;
    })
    .style('font-size', function(d) {
        return d;
    })
    .attr('class', 'enter')
    .style('color', 'blue');

paragraphs
    .exit()
    .append('p')
    .html('exit')
    .style('font-size', 20)
    .attr('class', 'exit')
    .style('color', 'red');

paragraphs
    .html(function(d) {
        return d;
    })
    .style('font-size', function(d) {
        return d;
    });
```

---

### Enter/Exit/Update cont'd

* ENTER is for data elements with no corresponding DOM element
* EXIT is for DOM elements with no corresponding data elements
* UPDATE is for DOM elements with a corresponding data element
* For basic data binding (no keys), you will have an ENTER or EXIT selection but not both

---

<img class="img" src="materials/Week 3/Slides/resources/datajoin.png" style="width:80%">
<div class="source">Source: http://cs.wellesley.edu/~mashups/pages/am5d3p1.html</div>

---

### Practice

---

1

```html
<div class="a"></div>
<div class="a"></div>
<div class="a"></div>
```

```js
d3.selectAll('.a').data([1, 2, 3]);
```

---

2

```html
<div class="a"></div>
<div class="a"></div>
```

```js
d3.selectAll('.a').data([1]);
```

---

3

```html
<div class="a"></div>
<div class="a"></div>
<div class="a"></div>
```

```js
d3.selectAll('.a').data([1, 2, 3]);
```

---

4

```html
<div class="a"></div>
<div class="a"></div>
<div class="b"></div>
<div class="a"></div>
```

```js
d3.selectAll('.a').data([1, 2, 3, 4]);
```

===

## SVG: Scalable Vector Graphics

---

### What is SVG?

* XML-based markup language (like HTML)
* Valid within an HTML web page
* Uses shapes to define images

---

### The `<svg>` Element

* Defines an area in which you will build your graphic
* Origin (0,0) in upper-left corner
* No graphical properties of its own

```html
<svg width="500" height="500"></svg>
```

* `width`: total width of area
* `height`: total height of area

Notes:

* Think of it as a "canvas" you'll draw on, but don't use "canvas" terminology

---

### The `<rect>` Element

```html
<svg>
    <rect x="10" y="10" width="100" height="50"/>
</svg>
```

* `x`: X-coordinate of upper-left corner of rectangle
* `y`: Y-coordinate of upper-left corner of rectangle
* `width`: Width of rectangle
* `height`: Height of rectangle

Notes:

* Mention that SVG tags only valid within SVG tag

---

### The `<circle>` Element

```html
<svg>
    <circle cx="10" cy="10" r="100"/>
</svg>
```

* `cx`: X-coordinate of center of circle
* `cy`: Y-coordinate of center of circle
* `r`: Radius

---

### The `<line>` Element

```html
<svg>
    <circle x1="0" x2="100" y1="0" y2="50"/>
</svg>
```

* `x1`: X-coordinate of line start
* `x2`: X-coordinate of line start
* `y1`: Y-coordinate of line end
* `y2`: Y-coordinate of line end

---

### The `<text>` Element

```html
<svg>
    <text x="0" y="0">Hello world</text>
</svg>
```

* `x`: X-coordinate of text
* `y`: Y-coordinate of text

---

### `<text>` cont'd

* `text-anchor`: Defines how to orient the text around the `X` coordinate
  * `start`: `X` is the start of the text
  * `middle`: `X` is the middle of the text
  * `end`: `X` is the end of the text
* `dominant-baseline`: Defines how to orient the text around the `Y` coordinate
  * `baseline`: `Y` is bottom of text
  * `central`: `Y` is middle of text
  * `hanging`: `Y` is top of text

---

### The `<polygon>` Element

```html
<svg>
    <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
</svg>
```

* `points`: Space-seperated X,Y pairs defining the shape's points

---

### The `<path>` Element

```html
<svg>
    <path d="M 100 100 L 300 100 L 200 300 z"/>
</svg>
```

---

### `<path>` cont'd

* `d`: Description of path (like a pencil drawing)
  * `M [X] [Y]`: Pick up pencil and move to the (X, Y) coordinate of SVG
  * `m [X] [Y]`: Pick up pencil and move to a point `X` pixels to the right of and `Y` pixels below the previous point
  * `L [X] [Y]`: Draw a line from the previous point to the (X, Y) coordinate of SVG
  * `l [X] [Y]`: Draw a line from the previous point to a point `X` pixels to the right of and `Y` pixels below the previous point

---

### `<path>` cont'd

* `d` (cont'd)
  * `z`: Draw a line from the previous point to the first point
  * Others...

---

### The `<g>` Element

```html
<svg>
    <g>
        <rect x="10" y="10" width="100" height="50"/>
        <text x="55" y="30" text-anchor="middle">Hello world</text>
    </g>
</svg>
```

Used to group other SVG elements together

Notes:

* Useful for semantic purposes but also for transformations

---

### SVG Transforms

* `transform`: Changes various aspects of the element
  * `translate(X, Y)`: Moves the element relative to its own defined position
  * `scale(X [, Y])`: Scales the element's size (1 = no change) in the X and Y directions
  * `rotate(A [, X, Y])`: Rotates element `A` degrees around the origin (or the point (`X`, `Y`))
  * Other...

---

### SVG Transforms (cont'd)

* Transforms are applied in order for RIGHT to LEFT

```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="25" transform="translate(-50, -50) scale(2)" />
</svg>
```

Notes:

* End up with 50-radius circle centered at (50,50)

---

### SVG styling

* `fill`: Fill color of element
* `stroke`: Border color of element
* `stroke-width`: Border width
* `stroke-dasharray`: Border dash definition (e.g. `3 3`)
* `style`: To add other generic CSS attributes

===

## Putting it all together

---

### Specs

Using D3:

1. Start with a 500x500 SVG
2. Draw a red circle with a black border at the center with a diameter of 150px
3. Draw a square circumscribing the circle (black border, no fill)
4. Draw a line from the center of the circle to the top-right of the square

===

### Cool Tools

* Chrome Developer Tools
* [SVG Cheat Sheet](https://learn-the-web.algonquindesign.ca/topics/svg-cheat-sheet/)
* [MDN SVG Reference](https://developer.mozilla.org/en-US/docs/Web/SVG)
* [D3 API Reference](https://github.com/d3/d3/blob/master/API.md)

===

### Assignment 3

* [Details](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%203/Assignment/Assignment%203.md)
* Find a dataset for final project

---

### Final Project

[Details](materials/Syllabus.html)
