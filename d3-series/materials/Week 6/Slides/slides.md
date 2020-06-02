## Data Manipulation in JavaScript

===

## Review

[Assignment 5](materials/Week 5/Assignment)

Notes:

* Gotchas:
    * data vs. datum for lines and points
    * double data binding

===

### Disclaimer

* In general, JavaScript is not the best tool for doing data manipulation.
    * Speed
    * Limited functionality and ease
* You will generally want to do as much of your data manipulation as you can before passing data to JS.
* But, you will almost always need to do some amount of manipulation in JS

===

## JS Array Manipulation

---

### Unifying concept

* JS data manipulation functions are Array methods that take a function (iterator) as an argument
* That function is applied to each element of the array
* Depending on the specific method (e.g. reduce, map, filter), the return values of those function calls are used to create the return value of the method

---

### Array.forEach

* The most simple of the data manipulation methods

_Syntax_

```javascript
arr.forEach(function callback(currentValue[, index[, array]]) {
    // do something for each element of array
});
```

---

Arguments

* `callback`: 'iterator' function that is applied to each array element

    * `currentValue`: array element (often called `d`)
    * `index`: index of array element (often called `i`)
    * `array`: original array (sometimes called `a` or `arr`)

* returns `undefined`

---

```javascript
var arr = [1, 2, 'three', 4, 'five'];
```

Basic looping

```javascript
arr.forEach(function(d) {
    console.log(d);
});
// logs each array element
```

Modifying the array

```javascript
arr.forEach(function(d, i, a) {
    a[i] = d + 1;
});
// arr is [2, 3, 'three1', 5, 'five1']
// BE CAREFUL WITH THIS
```

---

### Array.map

* Creates new array with modified values

_Syntax_

```javascript
var newArr = arr.map(function callback(currentValue[, index[, array]]) {
    // do something for each element of array
    // return new array value
});
```

---

Arguments

* `callback`: 'iterator' function that is applied to each array element

    * `currentValue`: array element (often called `d`)
    * `index`: index of array element (often called `i`)
    * `array`: original array (sometimes called `a` or `arr`)

* returns a new array with the same number of elements as the original. Elements of the new array are the return values of the iterator function.

---

```javascript
var arr = [1, 2, 'three', 4, 'five'];

var newArr = arr.map(function(d, i) {
    return d + 1;
});
// newArr is [2, 3, 'three1', 5, 'five1']
// arr is unchanged
```

---

### Array.filter

* Creates a new array with a subset of the original array's elements

_Syntax_

```javascript
var newArr = arr.filter(function callback(currentValue[, index[, array]]) {
    // do something for each element of array
    // return true or false
});
```

---

Arguments

* `callback`: 'iterator' function that is applied to each array element

    * `currentValue`: array element (often called `d`)
    * `index`: index of array element (often called `i`)
    * `array`: original array (sometimes called `a` or `arr`)

* returns a new array with only the elements of the original for which the iterator returned `true`

---

```javascript
var arr = [1, 2, 'three', 4, 'five'];

var newArr = arr.filter(function(d) {
    return !isNaN(d);
});
// newArr is [1, 2, 4]
// arr is unchanged
```

---

### Array.reduce

* Starts with an initial value `initialValue`
* Loops through array in order, ececuting `callback` for each element
* Return value of `callback` becomes the `accumulator` argument for the next element's `callback` call
* Final result is the last return value of `callback`

_Syntax_

```javascript
var acc = arr.reduce(function callback(accumulator, currentValue[, index[, array]]) {
    // return new accumulator value
}, initialValue);
```

---

Arguments

* `callback`: 'iterator' function that is applied to each array element

    * `accumulator`: current value of the accumulator
    * `currentValue`: array element (often called `d`)
    * `index`: index of array element (often called `i`)
    * `array`: original array (sometimes called `a` or `arr`)

* `initialValue`: intial value of accumulator

---

Sum

```javascript
var arr = [1, 2, 3];

var sum = arr.reduce(function(s, d) {
    return s + d;
}, 0);
// sum is 6
// arr is unchanged
```

---

Running totals

```javascript
var arr = [1, 2, 3];

var runTots = arr.reduce(function(tots, d, i) {
    if (i === 0) {
        tots.push(d);
    } else {
        tots.push(tots[tots.length - 1] + d);
    }
    return tots;
}, []);
// runTots is [1, 3, 6]
// arr is unchanged
```

---

### Array.sort

* Sorts the array based on the values of the callback function

_Syntax_

```javascript
arr.sort(function compare(a, b) {
    // return a number
});
```

---

Arguments

* `compare`: function that is used to compare array elements

    * `a`: first value to compare
    * `b`: second value to compare

* Sorts values based on the return value of `compare`:
    * If returns a positive number, `a` should go after `b`
    * If returns a negative number, `b` should go after `a`
    * If returns 0, leave unsorted

---

```javascript
var arr = [2, 1, 3];
```

```javascript
arr.sort();
// arr is [1, 2, 3]
```

```javascript
arr.sort(function(a, b) {
    return b - a;
});
// arr is [3, 2, 1]
```

---

### Other Array functions

* `arr.push(el)`: append `el` to the end of `arr`
* `arr.pop()`: removes last element of `arr` and returns it (in place)
* `arr.slice(begin[, end])`: returns new array containing only items for index `start` to `end` (not including `end`)
* `arr.reverse()`: reverses the order of the array (in place)
* `arr.indexOf(val)`: returns the first array index whose value matches `val`. returns `-1` otherwise

===

## JS Math

---

### Math functions

* `Math.min(a[, b, c, ...])`: returns minimum value of arguments
* `Math.max(a[, b, c, ...])`: returns maximum value of arguments
* `Math.abs(n)`: returns absolute value of `n`
* `Math.sqrt(n)`: returns square root of `n`
* `Math.pow(base, exp)`: returns `base` raised to `exp`
* `Math.random()`: returns random number between `0` and `1` (inclusive)
* Much more...

===

## D3 Stats functions

---

* Return the specified stat for `array`, with accessor applied to data via `.map()`
    * `d3.min(array[, accessor])`
    * `d3.max(array[, accessor])`
    * `d3.sum(array[, accessor])`
    * `d3.mean(array[, accessor])`
    * `d3.median(array[, accessor])`

```javascript
var arr = [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }];

d3.mean(arr, function(d) {
    return d.a;
}); // returns 2
d3.max(arr, function(d) {
    return d.b;
}); // returns 4
```

---

* `d3.extent(array[, accessor])`: returns a two element array `[min, max]` where the first element is the minimum and second is the maximum
    * Equivalent to `[d3.min(array[, accessor]), d3.max(array[, accessor])]`, with same `array` and `accessor` arguments for each function

===

### Cool Tools

* [lodash](https://lodash.com/)

===

### Assignment 6

* [Details](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%206/Assignment/Assignment%206.md)
