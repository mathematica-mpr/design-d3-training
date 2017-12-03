# Homework 1

This homework will focus on inserting various svg elements in the DOM using D3. Unless otherwise stated, all tasks should be done using D3. To begin, clone this repo using git. 

### PART 1
1. Create an HTML file that has a blue rectangle that is 100 pixels in width and 20 pixels in height.
2. Create 3 circles that are orange with a 2px thick blue border that with each circle being double the radius of the previous one. 
3. Create as many lines as needs to draw an octagon.

### PART 2
1. In a new HTML file, read in data.json file using d3. This file contains an array of 10 objects that have the following properties: size and color
2. In the top half the screen, using this data you will create 10 rectangles that have its pixels in width equal to the size property on said object and the color of the rectangle to be the color property on said object.
3. In the bottom half of the screen, you will create 10 circles (one for each object in the data) that are colored using the color property.  Now picture the html screen as an X, Y plane. The circle should be along  this X axis at the place where the size property, and the Y axis should be double the size property. 

### PART 3
1. In a new HTML file, read in data.json file using d3. You will create 10 circles (one for each object in the data) and randomly place them on the screen. The size property will be used for each circle's radius and the color to be used for each circles border color. 
2. You will do the above using an enter/exit/update pattern.
3. On your exit pattern you will remove the circle.
3. You will place the below function at the end of your read in function
`setInterval(function() { 
	var toRemove = Math.round(Math.random() * NAMEOFYOURDATARRAY.length);
	NAMEOFYOURDATAARRAY.splice(toRemove, 1);
}, 2000)`
This function will run every 2 seconds and randomly remove one value from your data array. Remeber to replace NAMEOFYOURDATAARRAY to whatever you named your data in this function. If you set up your d3 code properly one circle should disappear every 2 seconds.

Once completed submit a pull request to the repo with all of your code.  