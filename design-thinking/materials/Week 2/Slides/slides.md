## Basics of Visualization Design (Part 2)

##### Types of visualization tools

===

## Review

[Assignment 1](materials/Week 1/Assignment)

Notes:

* Check in to make sure people had no issues with Git, etc.
* Going over critiques of visualizations from homework
* Ask for questions on reading, remind it's due next week
* Go over how to update your local repo

===

### General Design Principles

In *The Visual Display of Quantitative Information (1982)*, Edward Tufte presents six fundamental principles of design:

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

### 3 Types:

* Explanatory (narrative)
* Exploratory
* Dashboards

===

## Explanatory/Narrative Tools

---

### What are they?

* Can range from single charts to large infographics
* Describe a specific aspect of the data, with the goal of communicating a predefined message
* Typically found in articles and reports
* Static (usually)

---

### When should they be used?

* When you have a piece of information or a message that you want to communicate to the user/reader/client
* To explain the results of an analysis or study
* In support of an argument
* When the user may not have deep prior knowledge of the data

---

### Strengths

* Focused and direct
* More easily customizable
* Easier to design/build

Notes:

* Only needs to handle a single instance of data, and thus can be designed to fit the data rather than needing to adapt to any data that may be plugged into it

---

### Weaknesses

* Inflexible
* Context-dependent

---

## Examples

---

https://www.mathematica-mpr.com/dataviz/county-unemployment-map

---

https://www.mathematica-mpr.com/dataviz/snap

---

http://guns.periscopic.com/?year=2013

===

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

### Weaknesses

* Unfocused, harder to control
* Harder to design/build
* Can allow user to come to less-than-sound conclusions if they have bias or ignorance coming in

Notes:

* Mention 538 "now-cast" as pitfall when you let user decide

---

## Examples

---

https://trends.google.com/trends/explore?date=all&q=%2Fm%2F018w8,%2Fm%2F018jz

---

https://demos.qlik.com/qliksense/OpioidCrisisAnalysis

---

https://projects.fivethirtyeight.com/mortality-rates-united-states/

===

## Dashboards

---

### What are they?

* Concise, quickly digestible overviews presenting immediately actionable information
* Focuses on few key indicators
* Meant to be checked frequently (daily or more)
* Makes use of streaming (frequently changing) data

Notes:

* Simplest dashboard could just be simple OK/Not OK box

---

### When should they be used?

* For monitoring frequently-changing data
* When specific actions can and should be taken on a frequent basis
* When timing and quick response is a priority

Notes:

* The term "dashboard" is overused
* Dashboards are meant to meet the specific need to informing real-time actions of its users
* If it is looked at less frequently or contains more information and detail, then it is really a report, or series of explanatory tools

---

### Strengths

* Actionable
* Quickly digestible
* Real-time

---

### Weaknesses

* Limited amount of data
* Lack of deep insights
* Require frequent attention

---

## Examples

---

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

[Google: "dashboard"](https://www.google.com/search?client=firefox-b-ab&biw=1600&bih=777&tbm=isch&sa=1&ei=H_IpWp3TF6fG_Qbu35TIBw&q=dashboard&oq=dashboard&gs_l=psy-ab.3...0.0.0.493638.0.0.0.0.0.0.0.0..0.0....0...1c..64.psy-ab..0.0.0....0.voboXBkcBME)

---

<img class="img" src="materials/Week 2/Slides/resources/trafficlights1.gif" style="width:80%">
<div class="source">Source: http://blog.robbowley.net/2009/10/28/visualising-the-internal-quality-of-software-part-1/</div>

===

## Hybrids

---

https://www.mathematica-mpr.com/dataviz/urbanization

===

## The Design Process

---

### Step 1: Requirements Gathering

* Figure out what the client/user needs
* What key questions are they trying to answer?
* What points are they trying to make?
* Don't talk about what it will look like until after you have requirements

---

### Step 2: Initial Design and Feedback

* Rough sketch or mockup
* Verbal or written description to client
* Negotiate design elements
* Try to stick to your guns on good design principles

Notes:

* Lots of thought, less drawing

---

### Step 3: Full Mock-up and Feedback

* Using mock-up software
* As close to the real thing as possible
* Minimal feedback and changes
* Deliver revised final mock-up

---

### Step 4: Development and Feedback

* Build it!
* Show pieces along the way, get feedback as necessary

---

### Step 5: Deployment and Updates

* Gather feedback and update reports as appropriate

===

## Data Visualization at MPR

---

### Challenges

* Lack of knowledge about options
* Inexperience with design
* Entrenched tools
* Budget priorities

===

### Cool Tools

* [Colorbrewer](http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3)
* [Colorgorical](http://vrl.cs.brown.edu/color)
* [Spectrum](https://chrome.google.com/webstore/detail/spectrum/ofclemegkcmilinpcimpjkfhjfgmhieb)

===

### Assignment 2

[Details](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%202/Assignment/Assignment%202.md)

===

### Final Project

[Details](materials/Syllabus.html)
