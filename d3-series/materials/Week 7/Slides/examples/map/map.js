function buildMap(containerId) {
    // size globals
    var width = 960;
    var height = 500;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // calculate dimensions without margins
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    // create svg element
    var svg = d3
        .select(containerId)
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    // create inner group element
    var g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // read in our data
    d3.json('data/countries.json', function(error, geojson) {
        handleError(error, 'failed to read geoJSON data');

        d3.csv('data/populations.csv', function(error, countries) {
            handleError(error, 'failed to read population data');

            d3.csv('data/cities.csv', function(error, cities) {
                handleError(error, 'failed to read population data');

                countries = prepDataCountries(countries);
                cities = prepDataCities(cities);

                // draw(geojson, countries, cities);
                rotate(geojson);
            });
        });
    });

    function handleError(error, msg) {
        if (error) {
            console.error(msg);
        }
    }

    function prepDataCountries(data) {
        var pops = {};

        data.forEach(function(d) {
            if (d['Variant'] === 'No change') {
                pops[d['Country or Area']] = +d['Value'] * 1000;
            }
        });

        return pops;
    }

    function prepDataCities(data) {
        return data
            .filter(function(d) {
                return d.pop >= 1e6;
            })
            .map(function(d) {
                return {
                    name: d.city,
                    pop: +d.pop,
                    loc: [+d.lng, +d.lat]
                };
            });
    }

    function draw(geojson, countries, cities) {
        geojson.features.forEach(function(f) {
            var pop = countries[f.properties.name];
            if (pop) {
                f.properties.pop = pop;
            }
        });

        var opacityScale = d3
            .scaleLinear()
            .domain([0, 1.5e9])
            .range([0, 1]);

        var mercatorProj = d3
            .geoMercator()
            .scale(130)
            .center([0, 30])
            .translate([innerWidth / 2, innerHeight / 2]);

        var geoPath = d3.geoPath().projection(mercatorProj);

        g
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geoPath)
            .style('fill', function(d) {
                if (d.properties.pop) {
                    return 'red';
                } else {
                    return 'grey';
                }
            })
            .style('stroke', 'black')
            .style('stroke-width', 0.5)
            .attr('fill-opacity', function(d) {
                if (d.properties.pop) {
                    return opacityScale(d.properties.pop);
                } else {
                    return 1;
                }
            });

        g
            .selectAll('circle')
            .data(cities)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return mercatorProj(d.loc)[0];
            })
            .attr('cy', function(d) {
                return mercatorProj(d.loc)[1];
            })
            .attr('r', 1.5)
            .attr('fill', 'black')
            .attr('stroke', 'none');
    }

    function rotate(geojson) {
        var orthoProj = d3
            .geoOrthographic()
            .scale(200)
            .translate([innerWidth / 2, innerHeight / 2]);

        var geoPath = d3.geoPath().projection(orthoProj);

        g
            .append('circle')
            .attr('cx', innerWidth / 2)
            .attr('cy', innerHeight / 2)
            .attr('r', 199.2)
            .attr('fill', '#0077be')
            .attr('stroke', 'none');

        var countries = g
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geoPath)
            .style('fill', function(d) {
                var arctics = ['Antarctica', 'Greenland', 'Iceland'];
                if (arctics.indexOf(d.properties.name) > -1) {
                    return 'white';
                } else {
                    return '#669966';
                }
            })
            .style('stroke', 'white')
            .style('stroke-width', 0.2);

        var deg = 0;
        setInterval(function() {
            deg += 1;
            orthoProj.rotate([deg, 0, 0]);
            geoPath = d3.geoPath().projection(orthoProj);
            countries.attr('d', geoPath);
        }, 1000 / 60);
    }
}

buildMap('#map-holder');
