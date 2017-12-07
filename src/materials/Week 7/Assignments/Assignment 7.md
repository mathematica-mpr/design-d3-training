# Assignment 7

This assignment focuses on inserting various SVG elements in the DOM using D3. Unless otherwise stated, all tasks should be done using D3.

### Part 1:
1. Use the `us-named.json` file and `NRDB_StationMeta.csv` to create a us map with solar stations.
    - use albersUSA projection to create your map
    - superimpose the stations onto the map using the latitude and longitude properties. Each station should be represents by a dot.
    - Color the stations (dots) by the Class variable (and create a legend for it)
    - have the station (dots) radius be associated with elevation of the station. Us a logistic scale for this with the minimal elevation being 2 px in radius and the max being 15.
    - The chart should have a title

### Part 2
1. Use the `us-county` file and laucnty12.csv-laucnty16.csv (county level unemployment data 2012-2016)
- First convert the csv files to json and combine them into a single array.
- You will then need to merge this data on us-county data using the FIPS code. Note you will have to combine the FIPS code on the csvs (StateCode + CountyCode)
- You will create 5 chloropleth maps using the unemployment percentage. You can choose the color scheme. Put each map next to each other on an imaginary horizontal axis. 
- Create one legend that will serve all 5 maps
- Each chart should have its own title 

### Part 3
Review `Viz Critique.png` and use what you have learned about data visualization design principles to come up with 5-10 notes about aspects of the visualization that you think are either good or bad (as many in each category as you feel is appropriate). In addition, come up with your own design for a visualization that displays the same data. Submit your design as a rough sketch or mock-up exported from a piece of drawing or design software. Also write a couple of sentences on why you think that your design effectively presents the data.


### Materials
1. `Assignment 7.md`: This document
2. `us-named.json` and `population.json`: The data that you will use throughout this assignment
3. `Viz Critique.png`: Visualization to critique

### What to submit
1. Your visualizations:
    - `us-station.html`: Part 1
    - `us-employment.html`: Part 2
2. `Critique.md`: Your critique from Part 3
3. `Alt.[ext]`: Your alternate design from Part 3