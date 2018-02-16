# Course Syllabus

**Instructor:** Linus Marco

**TA:** Charlie Hanley

### Overview and Goals 
This 10-week course is designed to teach you (the student) the fundamentals of data visualization and how to apply these concepts in a practical manner using D3. Most lessons and course activities will revolve around the following concepts:

- Fundamentals of web development
- Principles of data visualization design
- Constructing data visualizations in D3
- Data visualization at Mathematica

By the end of the course you should have enough mastery of these concepts to comfortably independently take on a data visualization task for a project at Mathematica, including requirements gathering, design, and programming.

---

### Expectations
#### Students
There are no specific prerequisites for the course beyond some general experience working with data. No experience with JavaScript or web development is required, but all of the programming in the course and it's assignments will be in JavaScript. We will not spend much time covering basic JavaScript programming, but resources (including the first assignment) will be provided to help you learn how to program in JavaScript.

You will be expected to devote a significant amount of time to this course outside of the allotted class time. There will be weekly assignments of varying length and difficulty, but most will require multiple hours of work.

In addition to attending classes and completing assignments, I also expect and encourage you to be proactive in your learning. Please ask questions and give me feedback early and often during classes and by email/phone/Jabber between classes.

#### Instructor
Beyond providing informative lectures and assignments, I will be responsible for providing prompt and detailed feedback on all assignments (as relevant). Additionally, I will make myself as accessible as possible for questions outside of class time. 

I will also hold a weekly open office hours session.

---

### Required Materials/Software
- Git
- Node.js
- Text editor or IDE (Sublime Text, Atom, Visual Studio, VS Code, etc.)
- Google Chrome
- Create an account on [GitHub](https://github.com/)

You will need ITS to install 1-3 if you do not have them already

---

### Schedule

#### Week 1: Basics of Visualization Design, Part 1
##### Key Concepts
- Effective use of dimensions (shapes, color, width, height, angle)
- General design principles
    + Data-ink ratio
    + Simplicity
    + Focus, drawing attention to important points
    + Avoiding bias and distortion
    + Intentionality

##### Materials
- Class slides

##### Reading
[Interactive Data Visualization for the Web: Chapter 3](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html) (due week 3)

This is an overview and introduction to web technologies including HTML, CSS and JavaScript

##### Assignments
[Assignment 1](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%201/Assignment/Assignment%201.md)

##### Additional Resources
- For learning HTML/CCS/JS: [codecademy.com](https://www.codecademy.com)

---

#### Week 2: Basics of Visualization Design, Part 2
##### Key Concepts
- Types of visualization tools 
    + Dashboards
    + Exploration tools
    + Narrative tools
- Strengths/weaknesses of each tool
- Fitting goals and client needs to a type of visualization

##### Materials
- Class slides

##### Reading
[Interactive Data Visualization for the Web: Chapter 3](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html) (continued from week 1)

This is an overview and introduction to web technologies including HTML, CSS and JavaScript

##### Assignments
[Assignment 2](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%202/Assignment/Assignment%202.md)

##### Additional Resources
- For learning HTML/CCS/JS: [codecademy.com](https://www.codecademy.com)
- [Information Dashboard Design: Chapter 1](LINK)

---

#### Week 3: D3 Fundamentals
##### Key Concepts
- Review of web concepts (HTML/CSS/JS)
    + Asynchronous JavaScript
- Setting up a simple development environment
- D3 overview
    + What is it? What isn't it?
    + Data binding and selections
    + General update pattern (enter/exit/update)
    + Creating SVG elements and manipulating properties
- SVG Concepts
- SVG building block elements

##### Materials
- Class slides
- Code on GitHub

##### Assignments
1. Find dataset(s) out in the wild that you would like to use for your final project
2. [Assignment 3](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%203/Assignment/Assignment%203.md)

---

#### Week 4: Static Charts, Part 1
##### Key Concepts
- Setting up a D3 visualization
    + Size, margins, code structure
- Scales and axes in D3
- Making a bar chart
- Making a scatterplot

##### Materials
- Class slides
- Code on GitHub

##### Assignments
[Assignment 4](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%204/Assignment/Assignment%204.md)

---

#### Week 5: Static Charts, Part 2
##### Key Concepts
- Making a line chart
- More detail on scales and axes
    + Time
- Legends

##### Materials
- Class slides
- Code on GitHub

##### Assignments
1. Sketch of final project
2. [Assignment 5](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%205/Assignment/Assignment%205.md)

---

#### Week 6: Data Manipulation in JavaScript
##### Key Concepts
- Basic JavaScript data structures
    + Arrays
    + Objects
    + JSON
- Important functions
    + forEach
    + map
    + filter
    + reduce
- Math library and D3 functions
- Missing data: NaN, null, undefined
- Floating point arithmetic and strict equality

##### Materials
- Class slides
- Code on GitHub

##### Assignments
[Assignment 6](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%206/Assignment/Assignment%206.md)

---

#### Week 7: Maps
##### Key Concepts
- Working with geographic data (GeoJSON, TopoJSON)
- Binding quantitative data to a map
- Projections
- Putting it all together

##### Materials
- Class slides
- Code on GitHub

##### Assignments
[Assignment 7](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%207/Assignment/Assignment%207.md)


---

#### Week 8: Interactions and Transitions
##### Key Concepts
- Event handling in D3
- Tooltips
- Transitions and data binding
- Easing functions
- Delays
- Chaining

##### Materials
- Class slides
- Code on GitHub

##### Assignments
1. [Assignment 8](https://github.com/linusmarco/d3-training/blob/master/src/materials/Week%208/Assignment/Assignment%208.md)
2. Re-read [Interactive Data Visualization for the Web: Chapter 3](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html) (continued from week 1)

---

#### Week 9: TBD

##### Materials
- Class slides
- Code on GitHub

##### Assignments
Finish final project 

---

#### Week 10: MPRCharts and Presentations
##### Key Concepts
- Introducing the MPRCharts library
- Presentations of final projects

##### Materials
- Class slides
- Code on GitHub

---

### Final Project
For your final project you will create a data visualization tool meeting the following minimum requirements:

1. At least three different types of charts/visualizations
2. At least two types of interaction (tooltips, filters, etc.)
3. At least one transition

Along with your tool, you will submit a brief written document including:

1. The goals of the tool (what are you trying to show? Who is your intended audience?)
2. Why you chose the type of tool you did (dashboard/exploration tool/narrative/infographic)
3. How each feature (chart, interaction, etc.) contributes to meeting the visualization goals

Your tool can use any data that you choose.
