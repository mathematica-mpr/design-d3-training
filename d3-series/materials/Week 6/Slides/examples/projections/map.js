function buildMap(containerId) {
  // size globals
  var width = 1200;
  var height = 800;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
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
  d3.json('data/countries.json', function (error, geojson) {
    handleError(error, 'failed to read geoJSON data');

    var mercatorProj = d3
      .geoMercator()
      // .geoOrthographic()
      .rotate([71.110556, 0]) // rotate projection [yaw (east-west), pitch (north-south), roll (3rd axis)]
      .center([0, 42.373611]) // set center of projection
      // .fitExtent(
      //   [
      //     [margin.left, margin.top],
      //     [width - margin.right, height - margin.bottom],
      //   ],
      //   geojson
      // );
      .scale(200)
      .translate([innerWidth / 2, innerHeight / 2]);

    var geoPath = d3.geoPath().projection(mercatorProj);

    g.selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', geoPath)
      .style('fill', 'dimgrey')
      .style('stroke', 'white')
      .style('stroke-width', 0.5);
  });

  function handleError(error, msg) {
    if (error) {
      console.error(msg);
    }
  }
}

buildMap('#map-holder');
