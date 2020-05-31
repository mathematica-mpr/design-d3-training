# Assignment 7

This assignment focuses on inserting various SVG elements in the DOM using D3. Unless otherwise stated, all tasks should be done using D3.

### Part 1:

1. Use the `us-states.json` file and `NRDB_StationMeta.csv` to create a us map with solar stations.
    * use the d3.geoAlbersUsa projection to create your map
    * superimpose the stations onto the map using the latitude and longitude properties. Each station should be represents by a dot.
    * Color the stations (dots) by the Class variable (and create a legend for it)
    * have the station (dots) radius be associated with elevation of the station. Use a logistic scale for this with the minimal elevation being 2 px in radius and the max being 15.
    * The chart should have a title
    * HINT: If a `[long, lat]` cordinate pair is outside of the bounds of the projection, `projection([long, lat])` will be `null`. You will have to deal with this fact in the assignment. Feel free to not display any stations that don't fall within the projection.

### Part 2

1. Use the `us-counties.json` file and `laucnty12.csv`-`laucnty16.csv` (county level unemployment data 2012-2016)

* First read in the csv files and combine them into a single array.
* You will then need to merge this data on `us-counties` data using the FIPS code. Note you will have to combine the FIPS code on the csvs (StateCode + CountyCode). FIPS code is the value of the `id` attribute on each feature in the `features` array of `us-counties`
* Create 5 choropleth maps (one for each year) using the unemployment percentage. Color each county based on it's unemployment rate in that year. You can choose the color scheme. Put each map next to each other on an imaginary horizontal axis.
* Create one legend that will serve all 5 maps
* Each chart should have its own title

### Part 3

Review `Viz Critique.png` and use what you have learned about data visualization design principles to come up with 5-10 notes about aspects of the visualization that you think are either good or bad (as many in each category as you feel is appropriate). In addition, come up with your own design for a visualization that displays the same data. Submit your design as a rough sketch or mock-up exported from a piece of drawing or design software. Also write a couple of sentences on why you think that your design effectively presents the data.

### Materials

1. `Assignment 7.md`: This document
2. `us-named.json` and `population.json`: The data that you will use throughout this assignment
3. `Viz Critique.png`: Visualization to critique

### What to submit

1. Your visualizations:
    * `us-station.html`: Part 1
    * `us-employment.html`: Part 2
2. `Critique.md`: Your critique from Part 3
3. `Alt.[ext]`: Your alternate design from Part 3
