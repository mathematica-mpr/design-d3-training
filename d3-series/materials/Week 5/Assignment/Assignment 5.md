# Assignment 5

This assignment focuses on inserting various SVG elements in the DOM using D3. Unless otherwise stated, all tasks should be done using D3.

### Part 1
1. Use the `climate.json` file (from your most last homework) to create a simple line chart shows yearly global temperatures. Your chart should meet the following criteria:
    - Use a D3 time scale for the x axis. 
    - The y axis should represent the temperature and the x axis should have a label for each point indicating which year that temperature represents.
    - Each point in the line chart should be represented by a circle with a radius of 3 and have the same color as the line. The circle should be drawn over the line.
    - The chart should have a title, axes, and axis labels

### Part 2
1. Use `population.json` to create a multi-line  chart that shows population by country. Your chart should meet the following criteria:
    - Use a D3 time scale for x axis and d3 linear scale for y axis
    - There should be two lines on the chart one representing each country. In addition, you should write your render code in a way that could scale to 15 countries easily. You should not use a for loop and you should not have to rely on copying and pasting code.
    - Each line should be its own color and the chart should be accompanied by a legend indicating which line represents which country. 
    - The chart should have a title, axes, and axis labels

### Part 3
Review `Viz Critique.png` and use what you have learned about data visualization design principles to come up with 5-10 notes about aspects of the visualization that you think are either good or bad (as many in each category as you feel is appropriate). In addition, come up with your own design for a visualization that displays the same data. Submit your design as a rough sketch or mock-up exported from a piece of drawing or design software. Also write a couple of sentences on why you think that your design effectively presents the data.


### Materials
1. `Assignment 5.md`: This document
2. `climate.json` and `population.json`: The data that you will use throughout this assignment
3. `Viz Critique.png`: Visualization to critique

### What to submit
1. Your visualizations:
    - `climate-line.html`: Part 1
    - `population.html`: Part 2
2. `Critique.md`: Your critique from Part 3
3. `Alt.[ext]`: Your alternate design from Part 3