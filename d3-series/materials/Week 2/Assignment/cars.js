/* part 1 */
var cars = require('./cars.json');

/*  How many makes are considered common (where property make_is_common is 1)*/

const n_common = cars.reduce(function(s, d, i) {
    if (cars[i].make_is_common == 1) {
        s += 1;
    } 
    return s;
}, 0)

var n_common_2 = cars.reduce(function(s, d, i) {
    return s + parseInt(cars[i].make_is_common)
}, 0);

console.log("num common makes")
console.log(n_common_2)

/*  How many makes are there per country */

var countries = cars.reduce(function(s, d) {
    if (! s.includes(d.make_country)){
        s.push(d.make_country);
    }
    return(s);
}, []);

console.log("\nmakes per country")
var makes_per_country = countries.forEach(function(e, i, a) {
    var cars_filt = cars.filter(d => d.make_country == e)
    console.log(e, cars_filt.length)
});

/*  How many makes are there by country and broken down by common and uncommon */

console.log("\nmakes per country, common/uncommon")
var common_uncommon = ["0", "1"]

var makes_per_country = countries.forEach(function(c, i, a) {
    var cars_filt_country = cars.filter(d => d.make_country == c)
    common_uncommon.forEach(function(e, i, a){
        var cars_filt = cars_filt_country.filter(d => d.make_is_common == e)
        console.log(c, e, cars_filt.length)
    })
});