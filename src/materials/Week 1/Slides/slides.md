## Basics of Visualization Design (Part 1)

##### Representing data effectively

Notes:

* Before lecture:
  * Go over syllabus
  * Questions
  * Final project
  * Show them GitHub repo

===

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
        margin:auto;
        border:none;
    }
</style>

### Large Datasets

<img class="img" src="materials/Week 1/Slides/resources/Track-National-Unemployment-Job-Gains-and-Job-Losses-–-Wall-Street-Journal-.png">
<div class="source">Source: http://graphics.wsj.com/job-market-tracker/</div>

---

### People love it!

===

### General Design Principles

* High data-ink ratio
* Simplicity
* Focus
* Objectivity
* Completeness
* Accessibility
* Intentionality

---

### The Data-Ink Ratio

* Avoid unnecessary frills
* Each element has a purpose

<img class="img" src="materials/Week 1/Slides/resources/data2ink.jpg" style="border:none">
<div class="source">Source: https://datahero.com/blog/2017/06/06/4-data-design-principles/</div>

Notes:

* It's possible to go overboard here

---

### Simplicity

* User shouldn't need an instruction manual
* Prettier isn't always better
* Boring can be good

<a target="_blank" href="https://www.theguardian.com/environment/ng-interactive/2014/dec/01/carbon-emissions-past-present-and-future-interactive">Carbon Emissions</a>

VS

<a target="_blank" href="https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html">Rent or Buy</a>

Notes:

* Visualization should never add complexity to your data
* Complex concepts can sometimes require complex visualization
* Emissions: simple data visualized complexly
* NYT: complex concept visualized simply

---

### Focus

* Know your visualization's purpose
* Know your audience
* Draw attention to key values

<img class="img" src="materials/Week 1/Slides/resources/incarceration.png" style="border:none; height: 350px">
<div class="source">Source: https://priceonomics.com/is-mass-incarceration-in-america-actually-on-the/</div>

Notes:

* This is VERY important on projects
* Gather requirements before putting pen to paper
  * You can create a beautiful, effective vis, but if it answers the wrong question then it's useless
* Brainstorm with class other ways that this data could have been presented

---

### Objectivity

* Let the user make judgments, don't force yours
* Never purposely deceive
* Explain assumptions, filters, and transformations
* Give appropriate context

<img class="img" src="materials/Week 1/Slides/resources/fox-apprehensions.jpg" style="border:none; height: 350px">
<div class="source">Source: https://www.mediamatters.org/blog/2013/04/05/fox-news-newest-dishonest-chart-immigration-enf/193507</div>

Notes:

* Axis doesn't start at zero
  * Bar charts ALWAYS have 0-start axes
  * Line charts can be different
* Follow link to show context

---

### Completeness

* Don't make the user guess
* Labels, labels, labels
* Ask an outsider

<img class="img" src="materials/Week 1/Slides/resources/power-bi-color.png" style="border:none">
<div class="source">Source: https://docs.microsoft.com/en-us/power-bi/power-bi-visualization-best-practices</div>

Notes:

* Context is important here too
* We run into this a lot a MPR
  * Make sure that you design for your audience. Not everyone is a health policy expert

---

### Accessibility

* Color blindness
* Not just 508 compliance

<img class="img" src="materials/Week 1/Slides/resources/Gradientsbad1.png" style="border:none">
<div class="source">Source: http://www.dundas.com/support/blog/visualizing-for-the-color-blind</div>

Notes:

* DON'T USE RED AND GREEN TO REPRESENT +/-

---

<img class="img" src="materials/Week 1/Slides/resources/evapotranspiration-map.jpg" style="border:none; width:70%">
<div class="source">Source: https://eagereyes.org/basics/rainbow-color-map</div>

Notes:

* This isn't readable by anyone, colorblind or not

---

### Intentionality

* Every element should have a purpose

<img class="img" src="materials/Week 1/Slides/resources/plot-lines-visualization.png" style="border:none">
<div class="source">Source: https://saberni.com/use-data-visualization-data-mining-and-predictive-analytics-to-create-effective-b2b-marketing-campaigns/</div>

Notes:

* Don't do something just because it looks pretty

===

## Using dimensions

---

#### What are dimensions?

* Length
* Color (hue)
* Color (intensity)
* Angle
* Position
* Area
* Orientation
* Slope
* Added marks
* Many more

---

### Not all dimensions are created equal

* Preattentive attributes: those that are distinguishable and comparable at first glance, without any thinking or specific attention
  * Length
  * Color

Notes:

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

## Critiques

---

<a href="https://pudding.cool/2017/02/vocabulary/">https://pudding.cool/2017/02/vocabulary/</a>

Notes:

* Pros
  * Really good focus and annotations
  * Easy to see distribution (sort of like a stream graph)
* Cons
  * Faces might be a bit much
  * Missed opportunities
    * Size circles based on sales
    * Color based on subgenre
    * Reorganize circles when coloring by region

---

<img class="img" src="materials/Week 1/Slides/resources/tumblr_ms9pq9mvtR1sgh0voo1_1280.png" style="border:none; width:70%">
<div class="source">Source: http://viz.wtf/post/59697293967/hes-243-baby-boomer</div>

Notes:

* Pros
  * Data-ink ratio
  * Good labeling
* Cons
  * No reason for person shape
  * Don't stack percentages that don't add to 100
  * Sizes don't relate to percentages
  * What are the quotes for??
  * Numbers should be aligned

===

### Cool Tools

* [Figma](https://www.figma.com/)

===

### Assignment 1

[Details](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%201/Assignment/Assignment%201.md)

Notes:

* Also mention reading

---

### Submitting Assignments

[Instructions](https://github.com/linusmarco/d3-training/blob/master/src/materials/Assignment%20Submission%20Instructions.md)
