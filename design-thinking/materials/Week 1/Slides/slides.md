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

---

*In its most basic form, visualization is simply mapping data to geometry and color.* (Yau, 2013, p. 93)

Notes:

- Way to translate data or real life to graphics or visual representations

---

### Why Data Visualization?

* Mental processing speed
* Discovery of patterns
* Distillation of large datasets

---

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
        margin:auto;
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

---

[Insert talking points for tidy data reading]

===

## Using dimensions

---

#### What are dimensions?

In *Semiology of Graphics (1967)*, Jacques Bertin presented the following dimensions as "visual variables":
* Position
* Size
* Shape
* Value
* Color hue
* Orientation
* Texture

Notes:

* Visual representation of quantitative values in a graphic

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

### Not all dimensions are created equal

* Preattentive attributes: those that are distinguishable and comparable at first glance, without any thinking or specific attention
  * Length
  * Color

Notes:

* Visual variables make up "the world of images" - Jacques Bertin
* This is a bit of a nebulous area. Attributes can be preattentive in some contexts but not in others
* Your choice can depend a lot on context and other constraints
  * color on maps rather than length

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

---

## Practice your eye

## Use your best judgment

Notes:

* Look out for data visualization in the wild and critique it
* Think about whether there would be a clearer way
* Learn to trust your gut--not all visualizations will be obviously good or bad

===

### A Cool Prototyping Tool

* [Figma](https://www.figma.com/)

===

### Assignment 1

[Details](https://github.com/mathematica-mpr/design-d3-training/blob/development/D3/materials/Week%201/Assignment/Assignment%201.md)

Notes:

* Also mention reading

---

### Submitting Assignments

[Instructions](https://github.com/mathematica-mpr/design-d3-training/blob/development/resources/Assignment%20Submission%20Instructions.md)
