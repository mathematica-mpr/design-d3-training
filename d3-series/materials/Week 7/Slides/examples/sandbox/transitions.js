function buildMap(containerId) {
    // size globals
    var width = 600;
    var height = 600;

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

    circleTransition();

    function circleTransition() {
        // // BASIC
        // var myCircle = g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'red');
        // myCircle
        //     .transition()
        //     .duration(1000) // time in milliseconds
        //     .attr('r', 100);
        //
        // // DELAY
        // g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'red')
        //     .transition()
        //     .duration(1000)
        //     .delay(3000)
        //     .attr('r', 100);
        //
        // // EASE
        // g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'red')
        //     .transition()
        //     .duration(1000)
        //     .delay(3000)
        //     .ease(d3.easeBounce)
        //     .attr('r', 100);
        //
        // // CHAINING
        // g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'red')
        //     .transition()
        //     .duration(1000)
        //     .delay(3000)
        //     .attr('r', 100)
        //     .transition()
        //     .duration(1000)
        //     .attr('fill', 'blue');
        //
        // // COMBO
        // g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'yellow')
        //     .transition()
        //     .duration(1000)
        //     .delay(3000)
        //     .attr('r', 100)
        //     .attr('fill', 'red')
        //     .transition()
        //     .duration(1000)
        //     .attr('r', 25)
        //     .attr('fill', 'yellow');
        //
        // // BASIC CLICK EVENT
        // g
        //     .append('circle')
        //     .attr('cx', 250)
        //     .attr('cy', 250)
        //     .attr('r', 25)
        //     .attr('fill', 'blue')
        //     .on('click', function() {
        //         d3
        //             .select(this)
        //             .transition()
        //             .duration(1000)
        //             .attr('r', 100)
        //             .attr('fill', 'red');
        //     });
    }

    function handleError(error, msg) {
        if (error) {
            console.error(msg);
        }
    }
}

buildMap('#svg-holder');
