import { createChart as createChartViz1 } from './data-vis1.js';
import { createChart as createChartViz2 } from './data-vis2.js';
import { createChart as createChartViz3 } from './data-vis3.js';
// import { createChart as createChartViz3 } from './data-vis3.js';

document.addEventListener('DOMContentLoaded', _ => {
    const vizSelector = document.getElementById('vizSelector');
    const vizContainers = document.querySelectorAll('#frame .viz');
    
    const chartCreators = {
        'viz1': createChartViz1,
        'viz2': createChartViz2,
        'viz3': createChartViz3
    };

    vizSelector.addEventListener('change', () => {
        const selectedViz = vizSelector.value;

        vizContainers.forEach(viz => {
            if (viz.id === selectedViz) {
                viz.style.display = 'block';
                const containerId = viz.id;
                const createChart = chartCreators[containerId];
                const container = document.querySelector(`#${containerId}`);
                if (createChart && container)
                    createChart(`#${containerId}`);
            }
            else viz.style.display = 'none';
        });
    });
});
