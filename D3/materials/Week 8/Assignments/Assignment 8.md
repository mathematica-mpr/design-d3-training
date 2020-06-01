# Assignment 8

This assignment focuses on using interactions and transitions in d3 visualizations. The homework will revisit past visualizations to add interaction and transitions to them. Unless otherwise stated, all tasks should be done using D3.

### Part 1:

1. Use your outcome assignment for Assignment 4, `air_quality.html`, to add interaction and transitions.
    * create three radio buttons on the html page labeled 'Sort By State', 'Sort By Emissions Descending', 'Sort By Emissions Ascending'
    * Each radio button should when clicked result in the data being sorted either by state alphabetical order, emissions (high to low), or emissions (low to high) respectively
    * After the data is sorted your chart should be updated correctly. This update should happen through the use of a transition that takes 1.5 seconds.
    * NOTE: nothing on the chart should be re-drawn during this update/transition
    * Once you have completed this, add a text box to your html file with a label of Delay(in milliseconds).
    * The number in this box will be used so that it represents the number of millisecond delay that each element must wait before transitioning. This delay should be implemented so that all elements start and finish at different times according to their current order. Therefore, the first element should be delayed 1 x (number of millseconds in text box), the second element should be delayed 2 x (number of milliseconds in text box), and so on and so forth. The implementation should be fairly straight forward, if you sense you are hacking this together, take a step back and try to think through the solution based on everything you have used to date. 
    * NOTE: This textbox should only take a number (you must handle in your javascript if it is not a number and alert the user that they must enter a number). You can do this by using the javascript alert method.
  
### Part 2

1. Use the outcome of your assignment for Assignment 7, `us-station.html`, to add interaction and transitions

* Create a list of checkboxes where each checkbox represents a class of stations. All checkboxes should be checked. 
* When a class checkbox is unchecked: the circles that represent those stations should be removed from the visualization (not hidden, but their elements removed). They should have a a transition when they are removed which is the circles being removed should have their radius shrink until the circles disappear.
* When a checkbox that is unchecked is checked, the circles should re-appear on the map. Their entrance transition should be the opposite of the removal transition. The circles should appear in their correct spaces with a radius that goes from 0 to their appropriate size. 
* Create two textboxes that take numbers. The textboxes will represent the min and max elevation of the stations you want to keep on the map. Create a button that says filter stations. On click, the javascript should ensure that both inputs have a number in them (if not alert the user similiar to part 1). If there is no value in min or max assume that the user wants to keep down to the lowest value (if min is empty) or up to the highest value (if max is empty).
* When a circle falls outside the range it should be removed from the visualization. Its transition should appear as if the circle "falls off the bottom of page". When a circle that has been removed should re-appear it should "fall from the top of the page" and land in its appropriate spot given its lat/long. 

### Part 3

Review the interactive visualization here https://blog.csaladen.es/refugees/ (feel free to skip the intro after a couple of minutes if you get bored). Use what you have learned about data visualization design principles to come up with 5-10 notes about aspects of the visualization that you think are either good or bad (as many in each category as you feel is appropriate). In addition, come up with your own design for a visualization that displays the same data. Submit your design as a rough sketch or mock-up exported from a piece of drawing or design software. Also write a couple of sentences on why you think that your design effectively presents the data.

### Materials

1. `Assignment 8.md`: This document
2. `us-named.json` and `population.json`: The data that you will use throughout this assignment
3. The link to the visualization provided in this assignment (https://blog.csaladen.es/refugees/): Visualization to critique

### What to submit

1. Your visualizations:
    * `us-station_interaction.html`: Part 1
    * `us-employment.html`: Part 2
2. `Critique.md`: Your critique from Part 3
3. `Alt.[ext]`: Your alternate design from Part 3
