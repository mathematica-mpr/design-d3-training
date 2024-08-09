# Capstone Project

## Dataset

You will visualize the [AHRQ’s Social Determinants of Health (SDOH) Database (Beta Version)](https://www.ahrq.gov/sdoh/data-analytics/sdoh-data.html).

These files contain the beta version of AHRQ’s database on Social Determinants of Health (SDOH), which was created under a project funded by the Patient Centered Outcomes Research (PCOR) Trust Fund. The purpose of this project is to create easy to use, easily linkable SDOH-focused data to use in PCOR research, inform approaches to address emerging health issues, and ultimately contribute to improved health outcomes.

-   There is one excel file per year and each row represents a county.
-   [Data source documentation](https://www.ahrq.gov/sites/default/files/wysiwyg/sdohchallenge/data/sdoh_data_file_documentation.pdf) can be accessed to look up variables definitions and dataset methodology.
-   There is a Variable Cookbook excel file on the SDOH webpage that provides description statistics (mean, standard deviation, etc.) for each SDOH variable by year.

## Focus on a narrative

As you explore the data and decide the story you’d like to tell, write down statements you’re going to demonstrate with your visualization in [active voice](https://developers.google.com/tech-writing/one/active-voice).

Ex. In 2022, Essex County in Massachusetts had the most [roast beef sandwich](https://en.wikipedia.org/wiki/Roast_beef_sandwich) shops in the country.

At the beginning, please add constraints as to the types of data relationships to visualize. For example, you may decide you only want to look at a specific health outcome for a single state across multiple years or vice versa. Doing so will allow to spend less time sifting through data views (there are >280 columns of data) and more time crafting an interesting story with the constraints you’ve put on yourself. **The first constraint should be a health outcome (or set of related health outcomes) you’d like to examine.**

After you’ve reviewed the data, narrow down your statements to three that connect with one another to create a cohesive narrative. The three statements should guide your design thinking process when identifying which chart types to use and how the visualizations' data and visual elements connect with one another.

## Exploring the data

To craft your narrative statements, first you have to understand the data you’re working with. To facilitate data exploration and gather insights, we'd recommend visualizing some of the data with:

-   [Excel charts](https://support.microsoft.com/en-us/office/create-a-chart-with-recommended-charts-cd131b77-79c7-4537-a438-8db20cea84c0#:~:text=Excel%20will%20analyze%20your%20data%20and%20make%20suggestions%20for%20you.&text=Select%20the%20data%20you%20want,how%20your%20data%20will%20look.)
-   [Observable](https://observablehq.com/)
-   [RawGraphs](https://www.rawgraphs.io/)
-   [Flourish](https://flourish.studio/features/)

## Places to take inspiration from

1. The [Community Connector app](https://communityconnector.mathematica.org/) was designed and developed at Mathematica as any entry to [Visualization of Community-Level Social Determinants of Health Challenge](https://www.ahrq.gov/challenges/past/sdoh/index.html).
2. AHRQ developed a [dashboard](https://www.ahrq.gov/sdoh/data-analytics/sdoh-tech-poverty.html) that visualizes Poverty and Access to Internet, by County.

## Overview

1. What research questions does your data visualization tool seek to answer?

    - How have uninsured rates among individuals under 65 changed over time in different counties of Virginia?
    - Is there a relationship between population density and the percentage of uninsured individuals in Virginia counties?
    - Are there geographic disparities in the uninsured rates between coastal and inland counties in Virginia?

2. Who is the end-user for the data visualization and what are their research needs?

    - The primary users are likely to be health policy analysts, researchers, and policymakers interested in understanding health insurance coverage dynamics.Their research needs might be to identify trends and impacts of health policies on insurance coverage or require insights into regional disparities and areas that may need targeted interventions.

3. How did you identify which metrics from the data set to use in the tool?
    - Percentage of Uninsured Individuals Under 65: which is key to understanding the health insurance coverage landscape.
    - Total weighted population: Helps explore if more densely populated areas have better insurance coverage.
    - Geographic Region (Coastal vs. Inland): To analyze regional disparities in insurance coverage
    - Year: To see if there is change over time.
4. What design decisions did you make when prototyping the tool?

    - How did you choose the tool’s format (exploratory and/or narrative), chart types, and user interactions? How do they support the goal of the data visualization tool?

        - Focused on clarity and user interaction, making sure that the tool is intuitive and the data is presented in a way that is easy to understand and navigate. Line chart to show trends over time, scatterplot to show population density, and bar chart to show uninsured rates in between coastal vs inland counties.

    - If there was intention behind the hierarchy of information and layout, colors used, etc. please speak to those as well.
        - Titles and labels helps users quickly understand what the focus of each visualization
        - Color scheme helps differentiating different counties
        - Filter section at the top of the chart

5. After visualizing the data, did you discover any interesting patterns or characteristics of the data?

    - Notable decrease in uninsured rates from 2009 to 2020
    - Counties with a larger total weighted population all seem to have less than 15% of population uninsured.
    - Coastal and inland counties all seem to generally have a decrease in percent of uninsured population from 2009 to 2020.

6. How would you test your data visualization tool for quality control? What would be automated and what would be manual QA?
    - Automated testing: unit testing to check for data processing functions and chart update methods
    - Manual QA: usability testing to see how users interact with the tool.
