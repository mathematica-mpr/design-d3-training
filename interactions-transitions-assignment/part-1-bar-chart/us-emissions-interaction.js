function createChart(elementId) {

    // container dimensions
    const height = 500;
    const width = 1000;
    const margins = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };
  
    // calculate dimensions without margins
    const innerHeight = height - margins.top - margins.bottom;
    const innerWidth = width - margins.left - margins.right;
  
    // create svg element
    const svg = d3
      .select(elementId)
      .append('svg')
      .attr('height', height)
      .attr('width', width);
  
    // create inner group element
    const g = svg
      .append('g')
      .attr('class', 'svg-group')
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
  

    // read in air quality data
    d3.csv('air_quality.csv').then(function( data) {
        console.log(data);

        // map and transitions code goes here
    });
};

createChart('#chart-container');