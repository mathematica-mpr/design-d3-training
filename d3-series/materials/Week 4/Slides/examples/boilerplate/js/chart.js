function buildChart(containerId) {
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

    // append all of your chart elements to g
}

buildChart('#chart-holder');
