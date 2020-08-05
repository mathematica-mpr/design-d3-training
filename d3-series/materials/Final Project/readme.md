# Summer Olympic Medals per Country 1976 - 2008

## What data set did you choose to create the data visualization tool?

I used a data set that identified Summer Olympic medals awarded to countries between 1976 and 2008.

## What is the goal(s) of your data visualization tool?

The goal is educate users about how Summer Olympic medals have been distributed across different countries over
time. The heat map shows which countries have the most medals overall through the opacity of the country's color.
When the user hovers, they can see the total number of medals awarded numerically. When the user clicks a country,
they can see the breakdown of total number of medals per type (gold, silver, bronze) and also how the country
has performed in the Summer Olympics over time.

## How did you identify which metrics from the data set to use in the tool?

Since I was focusing no quantities of medals per country and per year, I focused on metrics that provided
information about country, year and medals. I knew I would need the country ID to match with the geoJson data,
and the country name to display in the title and tooltip for the chart.

## Who is your intended audience of the tool?

General audience.

## What design decisions went into creating the tool?

I had to decide how I was going to display the three charts.

My first design decision came with the opacity scale of the map. Since the US, China, Russia and Australia
are by far the most decorated countries, the countries with under 100 awarded medals were not appearing on the
chart. I had to set the opacity to start at a higher decimal to account for this.

Another design decision was how to display information about individual countries. I decided to allow the
user to hover over each country to get more info but also to click a country to see more in-depth bar and line charts.

## How did you choose the tool’s format (exploration, narrative, infographic), chart types, and user interactions? How do they support the goal of the data visualization tool?

I chose the map since the Olympics is a global competition with several countries competing. I chose the hide the visualizations about an
individual country until the user clicked, so they can explore the countries they are interested in on their own. Users will be able
to explore on their own which countries they would like information on.

## After visualizing the data, did you discover any interesting patterns or characteristics of the data?

It seems like the more developed country, the more medals have been awarded.

Also, if a country name has changed during this time period. For example, it looks like Russia did not win any medals
prior to 1992. However, the Soviet Union did win Olympic medals.
