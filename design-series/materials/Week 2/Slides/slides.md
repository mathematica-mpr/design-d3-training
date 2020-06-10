## What is good data visualization?

##### Types of visualization tools

---

## Review

[Assignment 1](https://github.com/mathematica-mpr/design-d3-training/blob/development/design-series/materials/Week%201/Assignment/Assignment%201.md)

Notes:

* Check in to make sure people had no issues with Git, etc.
* Going over critiques of visualizations from homework
* Ask for questions on reading, remind it's due next week
* Go over how to update your local repo

===

### General Design Principles

* High data-ink ratio
* Simplicity
* Focus
* Objectivity
* Completeness
* Accessibility
* Intentionality

Notes:

* This class isn't about determining the best type of chart to use for a given data set
* Concepts will help to enbolden you (the designer) to make good decisions when creating a data viz 
---

### Maximize the Data-Ink Ratio

* *Above all else, show the data.* - Edward Tufte, 1983
* Reduce the amount of unnecessary frills

<img class="img" src="materials/Week 1/Slides/resources/data2ink.jpg" style="border:none">
<div class="source">Source: https://datahero.com/blog/2017/06/06/4-data-design-principles/</div>

Notes:

* *The Visual Display of Quantitative Information* (1983)
* Each element has a purpose
* It's possible to go overboard here

---

### Simplicity vs. Complexity

* User shouldn't need an instruction manual
* Prettier isn't always better
* Boring can be good

<a target="_blank" href="https://www.theguardian.com/environment/ng-interactive/2014/dec/01/carbon-emissions-past-present-and-future-interactive">Carbon Emissions</a> vs. <a target="_blank" href="https://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html">Rent or Buy</a>

Notes:

* Visualization should never add complexity to your data
* Complex concepts can sometimes require complex visualization
* Emissions: simple data visualized complexly
* Difficult to see change over time within an individual country
* NYT: complex concept visualized simply

---

### Focus

* *What do I want the audience to get out of the viz?* 
* Understand the needs/knowledge of your audience
* Draw attention to key values

Notes:

* This is VERY important on projects
* Gather requirements before putting pen to paper
  * You can create a beautiful, effective vis, but if it answers the wrong question then it's useless

---

<img class="img" src="materials/Week 2/Slides/resources/COVID_dataisugly.png" style="border:none; height: 600px">
<div class="source">Source: https://www.reddit.com/r/dataisugly/comments/fp3d4t/post_made_midpandemic_with_no_date_for_reference/</div>

Notes:

* Brainstorm with class other ways that this data could have been presented
---

<div style="float:left; width:50%"><img class="img" src="materials/Week 2/Slides/resources/COVID_dataisugly.png" style="border:none">
<div class="source" style="font-size:0.2em">Source: https://www.reddit.com/r/dataisugly/comments/fp3d4t/post_made_midpandemic_with_no_date_for_reference/</div></div>


<div style="float:right; width:50%"><img class="img" src="materials/Week 2/Slides/resources/COVID_dataisbeautiful.png" style="border:none">
<div class="source" style="font-size:0.2em">Source: https://www.reddit.com/r/dataisbeautiful/comments/fp76db/death_count_of_various_pandemics_as_a_ratio_of/?utm_medium=android_app&utm_source=share</div></div>

---

### Objectivity

* Be wary of introducing bias
* Explain assumptions, filters, and transformations
* Give appropriate context

<img class="img" src="materials/Week 1/Slides/resources/fox-apprehensions.jpg" style="border:none; height: 350px">
<div class="source">Source: https://www.mediamatters.org/blog/2013/04/05/fox-news-newest-dishonest-chart-immigration-enf/193507</div>

Notes:

* Axis doesn't start at zero
  * Bar charts ALWAYS have 0-start axes since bar charts are compared by their area and height
  * Line charts can be different, often have time as the x-axis and therefore can show change over time
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
  * Make sure that you design for your audience
  * Not everyone is a health policy expert

---

### Accessibility

* Color blindness

<img class="img" src="materials/Week 2/Slides/resources/COVID_heatmap.png" style="border:none; height:600px">
<div class="source">Source: https://www.reddit.com/r/dataisbeautiful/comments/gz66yv/heat_map_of_new_confirmed_cases_by_country/</div>

Notes:

* DON'T USE RED AND GREEN TO REPRESENT +/-

---

### Accessibility

* Not just 508 compliance

<img class="img" src="materials/Week 2/Slides/resources/evapotranspiration-map.jpg" style="border:none; width:70%">
<div class="source">Source: https://eagereyes.org/basics/rainbow-color-map</div>

Notes:

* This isn't readable by anyone, colorblind or not

---

### Intentionality

* Every element should have a purpose

<img class="img" src="materials/Week 2/Slides/resources/plot-lines-visualization.png" style="border:none; height:450px">
<div class="source">Source: https://ebookfriendly.com/best-book-visualizations/the-recipe-for-writing-a-bestseller-infographic-2/</div>

Notes:

* Don't do something just because it looks pretty

---

### Good and Bad Data Viz Examples

[r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/)

[r/dataisugly](https://www.reddit.com/r/dataisugly/)

===

### Types of data viz:

* Explanatory/Narrative
* Exploratory
* Dashboards

---

## Explanatory/Narrative Tools

---

### What are they?

* Can range from single charts to large infographics
* Describe a specific aspect of the data, with the goal of communicating a predefined message
* Typically found in articles and reports
* Static (usually)

---

### When should they be used?

* When you have a piece of information or a message that you want to communicate to the audience
* To explain the results of an analysis or study
* In support of an argument
* When the user may not have deep prior knowledge of the data

---

### Strengths

* Great story telling tool
* Lower LOE to design and build

Notes:

* only needs to handle a single instance of data
* can be designed to fit the data rather than needing to adapt to any data that may be plugged into it

---

## Examples

https://www.mathematica-mpr.com/dataviz/county-unemployment-map

https://www.mathematica-mpr.com/dataviz/snap

http://guns.periscopic.com/?year=2013

---

## Exploratory Tools

---

### What are they?

* Built to present a large amount of data in a digestible manner
* Interactive--allow the user to slice and filter the data as they like
* "BI-style" applications

---

### When should they be used?

* When you want to allow the user (mostly) free access to all of the data
* When you don't have a specific message or piece of knowledge to communicate
* When the user is already familiar with the data and has the knowledge necessary to responsibly come to conclusions on their own

---

### Strengths

* Very flexible
* Can communicate many messages
* Fun

---

### Drawbacks

* Unfocused, harder to control
* Higher LOE to design and build
* Can allow user to come to less-than-sound conclusions if they have bias or ignorance coming in

Notes:

* Mention 538 "now-cast" as pitfall when you let user decide

---

## Examples

https://trends.google.com/trends/explore?date=all&q=%2Fm%2F018w8,%2Fm%2F018jz

https://projects.fivethirtyeight.com/mortality-rates-united-states/

---

## Dashboards

Notes:

* The term "dashboard" is overused
* Dashboards are meant to meet the specific need to informing real-time actions of its users

---

### What are they?

* Concise, quickly digestible overviews presenting immediately actionable information
* Focuses on few key indicators
* Meant to be checked frequently (daily or more)
* Makes use of streaming (frequently changing) data

Notes:

* Simplest dashboard could just be simple Good/Bad box

---

### When should they be used?

* For monitoring frequently-changing data
* When specific actions can and should be taken on a frequent basis
* When timing and quick response is a priority

Notes:

* If it is looked at less frequently or contains more information and detail, then it is really a report, or series of explanatory tools

---

### Strengths

* Actionable
* Quickly digestible
* Real-time

---

### Drawbacks

* Limited amount of data
* Lack of deep insights
* Require frequent attention

---

## Examples

https://www.geckoboard.com/learn/dashboard-examples/call-center-dashboard-example/

---

<img class="img" src="materials/Week 2/Slides/resources/Dashboards_MashboardsLarge.png" style="width:80%">
<div class="source">Source: https://www.jaspersoft.com/dashboards</div>

---

<img class="img" src="materials/Week 2/Slides/resources/telesales-dashboard.jpg" style="width:80%">
<div class="source">Source: https://www.perceptualedge.com/blog/?p=154</div>

---

<img class="img" src="materials/Week 2/Slides/resources/dashboard-competition-runner-up.png" style="width:80%">
<div class="source">Source: https://www.perceptualedge.com/blog/?p=1374</div>

---

### Common Pitfalls

* Gauges, traffic lights, pie charts
* Too much information
* No context

Notes:

* It should not actually look like a car dashboard
* Weird obsession with pie charts
* Always need to present live stats with context that makes them useful and actionable

---

<img class="img" src="materials/Week 2/Slides/resources/trafficlights1.gif" style="width:80%">
<div class="source">Source: http://blog.robbowley.net/2009/10/28/visualising-the-internal-quality-of-software-part-1/</div>

---

## Hybrids

https://www.mathematica-mpr.com/dataviz/urbanization

===

## The Design Process

Notes:

- Over the next two courses we'll take a look the different phases and activities that go into designing a data visualization at Mathematica
- Next week we'll look at some UX activities to do when gathering requirements on a project
- The week after that we'll take a look at the different stages of creating a prototype

===

### Cool tools for choosing colors

* [Colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3)
* [Colorgorical](http://vrl.cs.brown.edu/color)
* [Spectrum](https://chrome.google.com/webstore/detail/spectrum/ofclemegkcmilinpcimpjkfhjfgmhieb)

---

### Assignment 2

[Details](https://github.com/mathematica-mpr/design-d3-training/blob/development/design-series/materials/Week%202/Assignment/Assignment%202.md)

---

### Final Project

[Details](https://github.com/mathematica-mpr/design-d3-training/blob/development/resources/Final%20Project.md)
