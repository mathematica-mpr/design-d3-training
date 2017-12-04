## Basics of Visualization Design (Part 1)
##### Representing data effectively

------

### Why Data Visualization?
- Mental processing speed
- Discovery of patterns
- Distillation of large datasets

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
- Immediately obvious from the graph which was highest

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
<img class="img" src="materials/Week 1/Slides/Census-time-machine.png">
<img class="img" src="materials/Week 1/Slides/morris-feature-messi-2.png">

Notes:
- Patterns
    + Regional trends in a map
    + Outlier detection in a scatterplot

---

<!-- .slide: class="big-data" data-state="big-data" -->
<style>
    .big-data .img {
        margin:auto;
        border:none;
    }
</style>

### Large Datasets
<img class="img" src="materials/Week 1/Slides/Track-National-Unemployment-Job-Gains-and-Job-Losses-–-Wall-Street-Journal-.png">

Notes:
- Patterns
    + Regional trends in a map
    + Outlier detection in a scatterplot

---

#### People love it!

------

### General Design Principles
- High data-ink ratio
- Simplicity
- Focus
- Objectivity
- Completeness
- Accessibility

---

### The Data-to-Ink Ratio
- Avoid unnecessary frills
- Each element has a purpose

---

### Simplicity
- User shouldn't need an instruction manual
- Prettier isn't always better
- Boring can be good

---

### Focus
- Know your visualization's purpose
- Know your audience
- Draw attention to key values

Notes:
- This is VERY important on projects
- Gather requirements before putting pen to paper
    + You can create a beautiful, effective vis, but if it answers the wrong question then it's useless

---

### Objectivity
- Let the user make judgments, don't force yours
- Never purposely deceive
- Explain assumptions, filters, and transformations
- Give appropriate context

---

### Completeness
- Don't make the user guess
- Labels, labels, labels
- Ask an outsider

---

### Accessibility
- Not just 508 compliance

------

## Using dimensions

---

#### What are dimensions?
- Length
- Color (hue)
- Color (intensity)
- Angle
- Position
- Area
- Orientation
- Slope
- Added marks
- Many more

---

### Not all dimensions are created equal
- Preattentive attributes: those that are distinguishable and comparable at first glance, without any thinking or specific attention
    + Length
    + Color

Notes:
- This is a bit of a nebulous area. Attributes can be preattentive in some contexts but not in others
- Your choice can depend a lot on context and other constraints
    + color on maps rather than length

---

### Example 1: Length vs. Angle 
<img class="img" src="materials/Week 1/Slides/class2_4.jpg">

---

### Example 2: The problem with area
<img class="img" src="materials/Week 1/Slides/class2_31.jpg">

Notes:
- Area is proportional to the square of the radius
- Making the obvious change here avoids bias, but makes it less clear that the largest circle is actually almost as large as the rest combined.

---

### Example 3: Bars aren't always king
<img class="img" src="materials/Week 1/Slides/3D_Bar_on_Flatten_Surface.png">

Notes:
- A simple choropleth map would have been more effective

---

## Practice your eye
## Use your best judgment

------

### Assignment 1
[Details](materials/Week 1/Assignment/Assignment 1.html)

---

### Submitting Assignments
[Instructions](materials/Assignment Submission Instructions.html)
