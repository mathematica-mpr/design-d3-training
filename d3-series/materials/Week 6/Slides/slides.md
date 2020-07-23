## Maps

===

## Review

[Assignment 5](https://github.com/mathematica-mpr/design-d3-training/blob/development/d3-series/materials/Week%205/Assignment/Assignment%205.md)

Notes:

* Gotchas:
    * data vs. datum for lines and points
    * double data binding


===

## Components of a map in D3

---

### Components

1. GeoJSON data
2. D3 Projections
3. D3 GeoPaths
4. Other data

===

## GeoJSON

---

### What is GeoJSON?

* JSON data with a specific organization that defines geographic areas

```json
{
    "type":"FeatureCollection",
    "features":[
        {
            "type":"Feature",
            "properties":{"name":"Afghanistan"},
            "id":"AFG",
            "geometry":{
                "type":"Polygon",
                "coordinates":[
                    [
                        [61.210817,35.650072],[62.230651,35.270664],...
                    ]
                ]
            }
        },
        ...
```

---

### How do I read it?

* Each element in the "features" array represents one thing that will turn into an SVG path
* The geometry.coordinates attribute is an array of lat/long coordinates that define the thing

---

### There is also TopoJson

* Extension of GeoJson 
* More complicated object structure, but reduces redundancies
* Smaller file size, but need to convert to GeoJson with compatible libraries
* [docs](https://github.com/topojson/topojson/blob/master/README.md)

---

### Where can I find geoJSON?

* [census.gov](https://www.census.gov/geo/maps-data/data/tiger-line.html)
* [bl.ocks.org](https://bl.ocks.org/)
* Google, like with everything else
* Conversion tools:
    * [mapshaper](http://mapshaper.org)
    * GDAL/ogr2ogr
        * [Command line interface](http://www.gdal.org/ogr2ogr.html)
        * [web client](https://ogre.adc4gis.com/)

===

## D3 Projections

---

### What are they?

* D3 projections convert latitude and longitude coordinate pairs to x and y pixel coordinates
* You've probably heard of some! (Mercator, Orthographic)
* [more](https://github.com/d3/d3-geo-projection#projections)

---

### Example

```javascript
var mercatorProj = d3
    .geoMercator()
    .scale(130)
    .rotate([71.110556, 0]) // rotate projection [yaw (east-west), pitch (north-south), roll (3rd axis)]
    .center([0, 42.373611]) // set center of projection
    .translate([innerWidth / 2, innerHeight / 2]);

// get x, y coordinates for Cambridge, MA
mercatorProj([42.373611, -71.110556]);
```
---

[Projection example](/materials/Week%206/Slides/examples/projections/)

===

## D3 GeoPaths

---

### What are they?

* D3 GeoPaths convert GeoJSON data to SVG path 'd' strings using a specified projection
* [docs](https://github.com/d3/d3-geo#geoPath)

---

### Example

```javascript
var geoPath = d3.geoPath().projection(mercatorProj);

g
    .selectAll('path')
    .data(geoJsonData.features) // array of geoJSON features
    .enter()
    .append('path')
    .attr('fill', 'black')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5)
    .attr('d', geoPath);
```
===

[Putting it all together](/materials/Week%206/Slides/examples/map/)

===

### Assignment 6

* [Details](https://github.com/mathematica-mpr/design-d3-training/blob/development/d3-series/materials/Week%206/Assignments/Assignment%206.md)
