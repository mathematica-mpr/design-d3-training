## Static Charts

### (Part 1)

===

## Review

[Assignment 3](materials/Week 3/Assignment)

Notes:

* Review transform from Week 3 lecture

===

## Development Workflow

---

### Node.js

* Commonly referred to as "Node"
* Allows you to run JavaScript outside of a browser
* Run through the command line

```bash
> node myProgram.js
```

---

### npm

* Node Package Manager
* Gives access to an enormous number of JS libraries/modules/packages
* Run through the command line
* Common commands
  * `npm search [keywords]`
  * `npm install [-g] [package]`
* BE CAREFUL

---

### Local Servers

* Why?
  * Browser security
* How?

```bash
> npm install -g http-server

> cd [path/to/my/folder]

> http-server
```

Notes:

* Also show people how to access slides and other course materials

===

## Setting up your chart

---

### Boilerplate

[link](materials/Week 4/Slides/examples/boilerplate)

* Folder structure
* Code structure
* Height, width and margins
* `svg` and `g` elements

===

## D3 Scales

---

### What is a scale in D3?

* Maps input values (domain) to output values (range)

```javascript
var myScale = d3
    .scaleLinear() // initialize a linear, continuous scale
    .domain([0, 10]) // define input range
    .range([0, 100]); // define output range

console.log(myScale(3)); // result: 30
```

* Most often used to convert data values to pixel values for location and size of elements

---

### Types of scales: Continuous

* `d3.scaleLinear()`
* `d3.scaleLog()`
* `d3.scalePow()`
* `d3.scaleTime()`

---

### Types of scales: Ordinal

* `d3.scaleOrdinal()`
* `d3.scaleBand()`

---

### Types of scales: Other

* `d3.scaleQuantile()`: divides data equally
* `d3.scaleQuantize()`: divides range equally

===

## D3 Axes

---

### Axis types

* `d3.axisLeft(scale)`
* `d3.axisRight(scale)`
* `d3.axisTop(scale)`
* `d3.axisBottom(scale)`

---

### Creating an axis

```javascript
var svg = d3
    .select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

var myScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, 300]);

var axisDefinition = d3.axisBottom(myScale);

svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(100, 400)')
    .call(axisDefinition);
```

---

### Axis options

```javascript
d3
    .axisBottom(scale)
    .ticks(10) // sets number of ticks
    .tickValues([1, 5, 8]) // sets exact values for ticks
    .tickFormat(d3.format(',.1f')) // sets format for tick values
    .tickSize(10) // sets length of tick lines
    .tickSizeInner(10) // sets length of tick lines inside axis
    .tickSizeOuter(10); // sets length of tick lines at beginning and end of axis
```

===

## Making a Bar Chart

---

[Example](materials/Week 4/Slides/examples/bar chart)

---

===

## Making a Scatterplot

---

[Example](materials/Week 4/Slides/examples/scatterplot)

===

### Cool Tools

* [bl.ocks.org](https://bl.ocks.org/)

===

### Assignment 4

* [Details](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%204/Assignment/Assignment%204.md)
