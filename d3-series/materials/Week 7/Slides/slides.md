## Interactions and Transitions

===

## Review

[Assignment 7](materials/Week 7/Assignment)

Notes:

* Talk about small multiples
* (http://www.juiceanalytics.com/writing/better-know-visualization-small-multiples)

===

## Transitions

---

### What is a d3 transition?

* A way to animate changes to the elements on the page
* Commonly used to animate elements':
    * position
    * size
    * color
    * opacity
    * shape (`d`)

---

### Example

```javascript
// make circle
var myCircle = g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'red');

// transition
myCircle
    .transition()
    .duration(1000) // time in milliseconds
    .attr('r', 100);
```

---

### Anatomy

1. Call the `transition` method on any selection
2. Define a `duration` in milliseconds
3. Modify attributes to their end state

Notes:

* Show that you can chain transition to creation
* Show that you can transition multiple attributes

---

### Delays

```javascript
g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'red')
    .transition()
    .duration(1000)
    .delay(3000)
    .attr('r', 100);
```

---

### Easing functions

* Easing functions define rate at which the transition occurs

```javascript
g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'red')
    .transition()
    .duration(1000)
    .delay(3000)
    .ease(d3.easeBounce)
    .attr('r', 100);
```

---

### Easing functions (cont'd)

* [docs](https://github.com/d3/d3-ease)

    * `d3.easeLinear`
    * `d3.easeQuad`

* Please don't ever use `d3.easeBounce`
* [explorer](https://bl.ocks.org/mbostock/248bac3b8e354a9103c4)

---

### Transition chaining

* What if you want to do one thing and then another?

```javascript
g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'red')
    .transition() // transition 1
    .duration(1000)
    .delay(3000)
    .attr('r', 100)
    .transition() // transition 2
    .duration(1000)
    .attr('fill', 'blue');
```

---

### Combining it all

```javascript
g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'yellow')
    .transition()
    .duration(1000)
    .delay(3000)
    .attr('r', 100)
    .attr('fill', 'red')
    .transition()
    .duration(1000)
    .attr('r', 25)
    .attr('fill', 'yellow');
```

---

### What can you transition?

* Numeric attributes and styles
* Colors
* Transforms
* SVG path shaped (`d` attribute)

===

## Event Handling

---

### What's event handling?

* Doing something when something else (an "event") happens
* Examples:
    * Change the size of a circle when user hovers
    * Change the data in a graph when a user selects an item in a dropdown menu

---

### How do we do it?

* In D3, we use the `.on()` method to handle events

```javascript
g
    .append('circle')
    .attr('cx', 250)
    .attr('cy', 250)
    .attr('r', 25)
    .attr('fill', 'blue')
    .on('click', function() {
        d3
            .select(this)
            .transition()
            .duration(1000)
            .delay(3000)
            .attr('r', 100)
            .attr('fill', 'red');
    });
```

---

### What just happened?

* The `.on()` method takes two arguments
    1. A string indicating what event to listen for
    2. A function to run when the event occurs
        * The function takes the 3 usual arguments (`d`, `i`, `a`)
        * Inside the function, `this` is the element that the event was bound to

---

### Events to listen for

* `click`
* `mouseover`
* `mouseout`
* `input`
* [others](https://developer.mozilla.org/en-US/docs/Web/Events)

===

[Example](/materials/Week%208/Slides/examples/bar%20chart/)

===

Live Coding (if we have time)

===

### Cool Tools

* [Observable](https://beta.observablehq.com/)

===

### Assignment 8

1. [Assignment 8](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%208/Assignment/Assignment%208.md)
2. Re-read [Interactive Data Visualization for the Web: Chapter 3](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html) (continued from week 1)
