# Assignment 2

This assignment focuses on data manipulation and you may use d3 or any techniques you learned in class to finish this homework. Do not use other third party libraries unless they were mentioned in class for use with this homework.

### Part 1
1. Use the `cars.json` file to calculate the following list of counts:
    - How many makes are considered common (where property make_is_common is 1)
    - How many makes are there per country.
    - How many makes are there by country and broken down by common and uncommon

### Part 2
1. Use `pokemon.json` to calculate the following items:
    - Calculate the average weight (lbs) and height (in inches) of the pokemon. Note you will have to convert the units to lbs and inches. 
    - What is the total egg distance (value on egg property) for all pokemon who have a weakness of 'Psychic'. 'Weaknesses' is a property on each pokemon object that contains a list of strings. Note: some 'egg' properties say 'Not in Eggs'. consider this value a -1 in your summation.
    - Determine which type of pokemon has the most weaknesses on average. List the types of pokemon and the number of their weaknesses in a list in descending order. Note: a pokemon can have more than one type. Because of this the same pokemon can be counted for more than one type. For example: the first object with id:1 would count as both 'Grass' and 'Poison' type.
    - break the pokemon down into 5 equal buckets of weight classes and then average teh spawn_time (show in minutes) of each weight class

### BONUS: Part 3 - lodash
- re-do all of the above using lodash. A data manipulation library in javascript. Note: it should make everything A LOT easier. Documentation at https://lodash.com/docs/4.17.4 and include the script in your html file with `<script src ="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>`


### Materials
1. `Assignment 2.md`: This document
2. `pokemon.json` and `cars.json`: The data that you will use throughout this assignment

### What to submit
1. Your files:
    - `cars.html`: Part 1
    - `pokemon.html`: Part 2
    - `lodash.html`: Part 3