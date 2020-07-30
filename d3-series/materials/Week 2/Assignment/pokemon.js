/* part 1 */
var data = require('./pokemon.json');

console.log("number of records", data.length)
/*   Calculate the average weight (lbs) and height (in inches) of the pokemon. Note you will have to convert the units to lbs and inches.  */

var total_weight = data.reduce(function(s, d, i) {
    return s + parseInt(data[i].weight)
}, 0);

console.log("avg weight (lbs): ", total_weight * 2.20462 /data.length)

var total_height = data.reduce(function(s, d, i) {
    return s + parseInt(data[i].height)
}, 0);

console.log("avg height (in): ", total_height*3.28084*12 /data.length)

/*   What is the total egg distance (value on egg property) for all pokemon who have a weakness of 'Psychic'. 
'Weaknesses' is a property on each pokemon object that contains a list of strings. Note: some 'egg' properties say 'Not in Eggs'. 
consider this value a -1 in your summation. */
var psychics = data.filter(d => d.weaknesses.includes("Psychic"))

var egg_dist = psychics.reduce(function(s, d, i) {
    if (psychics[i].egg == "Not in Eggs") {
        s +- 1;
    } else {
        s += parseInt(psychics[i].egg)
    }
    return s;
}, 0)

console.log("total egg distance: ", egg_dist, " km")

/*   Determine which type of pokemon has the most weaknesses on average. List the types of pokemon and the number 
of their weaknesses in a list in descending order. Note: a pokemon can have more than one type. Because of this the same pokemon can be 
counted for more than one type. For example: the first object with id:1 would count as both 'Grass' and 'Poison' type.
*/

var pokemon_types = [];
data.forEach(d => {
    d.type.forEach(e => {
        if (! pokemon_types.includes(e)){
            pokemon_types.push(e);
        }
        return(pokemon_types);
    });
    return(pokemon_types);
});

var weaknesses_per_type = pokemon_types.map(function(e, i, a) {
    var data_filt = data.filter(d => d.type.includes(e))
    return [e, data_filt.length];
}); 

var sorted_weaknesses_per_type = weaknesses_per_type.sort(function (a, b) {return b[1] - a[1]})
console.log("pokemon types by weakness:", weaknesses_per_type)


/*  break the pokemon down into 5 equal buckets of weight classes and then average 
the spawn_time (show in minutes) of each weight class */