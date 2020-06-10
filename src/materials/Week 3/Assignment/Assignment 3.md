# Assignment 3

This assignment will focus on inserting various SVG elements in the DOM using D3. Unless otherwise stated, all tasks should be done using D3.

### Part 1
1. Create an HTML file containing a blue rectangle that is 100 pixels in width and 20 pixels in height.
2. Underneath the blue rectangle, create 3 orange circles next to each other, each with a 2px thick blue border. Each circle should have double the radius of the previous one.
3. Underneath the circles, create an octagon.

### Part 2
1. In a new HTML file, read in data.json file using D3. This file contains an array of 10 objects that have the following properties: size and color.
2. In the top half the screen, create 10 rectangles (one for each object in the data) with widths and fill colors equal to the `size` and `color` properties on the corresponding data object.
3. In the bottom half of the screen, create 10 circles (one for each object in the data) with fill colors equal to the `color` property on the corresponding data object.  Now picture the screen as an Cartesian plane with (0, 0) at the upper-left corner of the screen. Position each circle such that the coordinates of its center are (`size`, -2*`size`). 

### Part 3
1. In a new HTML file, write an `updateViz` function that takes `data` as an argument: 
    ```javascript
    function updateViz(data) {
        // do stuff
    }
    ```
2. Inside this function use `data`, along with the general enter/exit/update pattern to do the following:
    - For new data elements, create a circle with a radius equal to the data element's `size` property, and a border color equal to the data element's `color` property. Place this circle in a random location on the screen.
    - Remove any circles with no corresponding data element
3. Place the following piece of code in your script. This function will remove the last data element of the data passed every 2 seconds and then call your `updateViz` function to update the visualization.
    ```javascript
    function animate(data) {
        updateViz(data);
        var loop = setInterval(function() { 
            if (data.length === 0) { clearInterval(loop); }
            data.pop();
            updateViz(data);
        }, 2000);
    }
    ```
4. Read in data.json and call `animate` on the data.

### Part 4
Review `Viz Critique.png` and use what you have learned about data visualization design principles to come up with 5-10 notes about aspects of the visualization that you think are either good or bad (as many in each category as you feel is appropriate). In addition, come up with your own design for a visualization that displays the same data. Submit your design as a rough sketch or mock-up exported from a piece of drawing or design software. Also write a couple of sentences on why you think that your design effectively presents the data.

### Materials
1. `Assignment 3.md`: This document
2. `data.json`: The data that you will use throughout this assignment
3. `Viz Critique.png`: Visualization to critique

### What to submit
1. Your visualizations:
    - `Viz 1.html`: Part 1
    - `Viz 2.html`: Part 2
    - `Viz 3.html`: Part 3
2. `Critique.md`: Your critique from Part 4
3. `Alt.[ext]`: Your alternate design from Part 4
