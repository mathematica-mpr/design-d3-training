## How to conceptualize data and why data visualizations?

##### Representing data effectively

Notes:

* Before lecture:
  * Go over syllabus
  * Questions
  * Final project
  * Show them GitHub repo

===

## What is data visualization?

*In its most basic form, visualization is simply mapping data to geometry and color* (Yau, 2013, p. 93).

Notes:

- Way to translate data or real life to graphics or visual representations
- Data visualization can also encompass aesthetics, but the core of this class will be focusing on binding data to graphics and dimensions (for example color)

---

### Why Data Visualization?

* Mental processing speed
* Discovery of patterns
* Distillation of large datasets

---

<!-- .slide: class="processing-speed" data-state="processing-speed" -->

<style>
    .processing-speed table { margin-left: 0; }
    .processing-speed table, 
    .processing-speed .viz {
        float:left;
    } 
    .processing-speed .viz { margin: 50px; };
</style>

### Mental Processing Speed

What year had the highest sales?

| Year | Sales |
| ---- | ----- |
| 2000 | $45   |
| 2001 | $56   |
| 2002 | $36   |
| 2003 | $58   |
| 2004 | $75   |
| 2005 | $62   |

<div class="viz"></div>

Notes:

* Immediately obvious from the graph which was highest

---

<!-- .slide: class="pattern-discovery" data-state="pattern-discovery" -->

<style>
    .pattern-discovery .img {
        float:left;
        width:40%;
        margin:5%;
        border:none;
    }
</style>

### Pattern Discovery

<img class="img" src="materials/Week 1/Slides/resources/Census-time-machine.png">
<img class="img" src="materials/Week 1/Slides/resources/morris-feature-messi-2.png">

<div style="clear:both">
<div class="source">Source: https://www.nytimes.com/interactive/2017/06/22/upshot/Census-Time-Machine-Demographics-in-America.html</div>
<div class="source">Source: https://fivethirtyeight.com/features/lionel-messi-is-impossible/</div>
</div>

Notes:

* Patterns
  * Regional trends in a map
  * Outlier detection in a scatterplot

---

<!-- .slide: class="big-data" data-state="big-data" -->

<style>
    .big-data .img {
        /* margin:auto; */
        border:none;
    }
</style>

### Large Datasets

<img class="img" src="materials/Week 1/Slides/resources/Track-National-Unemployment-Job-Gains-and-Job-Losses-–-Wall-Street-Journal-.png">
<div class="source">Source: http://graphics.wsj.com/job-market-tracker/</div>

---

### People love it!

---

### How can we conceptualize data?
#### Long vs. wide data

Notes:

- Before we dive into how to create data viz, it's important to understand the data set you're working with and how to identify the metrics you want to visualize

---

In *Tidy Data (2014)*, Hadley Wickham lays out the benefits of tidy data and how to use it.

#### Wide data: Untidy data set
|            | Blue   | Red   | Yellow |
| ----       | -----  | ----- | -----  |
| Main St    | 18     | 2     | 54     |
| Maple Ave  | 38     | 5     | 12     |
| Baker Lane | 10     | 29    | 34     |
| Fourth St  | 17     | 15    | 22     |

Notes:

- Article is written from the perspective of a data scientists using R
- Goal of paper is to propose a set of standards of how to tidy data for data processing, analyzing, and visualizing
- Typical data set you might get
- The way this is laid out, the single dimension of house color is split across different columns
- Wide data can be easier to analyze if you're curious on how many yellow houses Fourth St has

---

#### Long data: tidy data set
|            | Color  | Value |
| ----       | -----  | ----- |
| Main St    | Blue   | 18    |
| Maple Ave  | Blue   | 38    |
| Baker Lane | Blue   | 10    |
| Fourth St  | Blue   | 17    |
| Main St    | Red    | 2     |
| Maple Ave  | Red    | 5     |
| Baker Lane | Red    | 29    |
| Fourth St  | Red    | 15    |
| Main St    | Yellow | 54    |
| Maple Ave  | Yellow | 12    |
| Baker Lane | Yellow | 34    |
| Fourth St  | Yellow | 22    |

Notes:
- But I'd argue that long data, which happens to follow the tidy data structure enables us to draw a connection between the physical structure of data and with the metrics we'd be interested in visualizing
- Here every value belongs to a variable (column) and observation (row)
- The table structure helps us to assign variables to axes and identify which visual graphics we want to map to the data

---

### Ways to tidy up messy data

- Column headers are variables and not values
- Each column contains one variable
- Observations constitue a row, variables a column
- Multiple types of observations aren't stored in one table
- One type of observation isn't stored across multiple tables

===

## Using dimensions

Notes:

* Once you identify which metrics you'd like to visual, it's time to consider how you'll visually do that

---

#### What are dimensions?

In *Semiology of Graphics (1967)*, Jacques Bertin presented the following dimensions as "visual variables":

* Position
* Size
* Shape
* Value (lightness)
* Color hue
* Orientation
* Texture

Notes:

* Visual representation of quantitative values in a graphic
* Visual variables make up "the world of images" - Jacques Bertin
* This could be encoding length, area, volume to be represent a data point's magnitude
* Within certain cultural context, color (red and blue) could denote hot and cold
* Light to dark can represent a continuous scale of increasing values

---

In *Data Points: Visualization That Means Something (2013)*, Nathan Yau presented the following dimensions as "visual cues":

* Position
* Length
* Angle
* Direction
* Shapes
* Area
* Volume
* Color saturation
* Color hue

---

### Example 1: Length vs. Angle

<img class="img" src="materials/Week 1/Slides/resources/class2_4.jpg">
<div class="source">Source: http://vizthinker.com/grudge-match-pie-chart-vs-bar-chart/</div>

---

### Example 2: The problem with area

<img class="img" src="materials/Week 1/Slides/resources/class2_31.jpg">
<div class="source">Source: http://blog.fastfedora.com/2011/01/2011-state-of-the-union-visualizations.html</div>

Notes:

* Area is proportional to the square of the radius
* Making the obvious change here avoids bias, but makes it less clear that the largest circle is actually almost as large as the rest combined.

---

### Example 3: Bars aren't always king

<img class="img" src="materials/Week 1/Slides/resources/3D_Bar_on_Flatten_Surface.png">
<div class="source">Source: https://www.originlab.com/doc/Tutorials/3D-Bar-FlatSurf</div>

Notes:

* A simple choropleth map would have been more effective
* Also ask what do we want to get out of the data viz?
* If it's not compare areas relative to one another, this data viz accomplishes that

---

## Practice your eye

## Use your best judgment

Notes:

* Look out for data visualization in the wild and critique it
* Think about whether there would be a clearer and more intentional way to show something
* Learn to trust your gut--not all visualizations will be obviously good or bad

===

### A Cool Prototyping Tool

* [Figma](https://www.figma.com/)

===

### Assignment 1

[Details](https://github.com/mathematica-mpr/design-d3-training/blob/development/design-series/materials/Week%201/Assignment/Assignment%201.md)

Notes:

* Also mention reading

---

### Submitting Assignments

[Instructions](https://github.com/mathematica-mpr/design-d3-training/blob/development/resources/Assignment%20Submission%20Instructions.md)
