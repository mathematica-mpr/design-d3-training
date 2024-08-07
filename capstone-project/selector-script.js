document.addEventListener('DOMContentLoaded', () => {
    const vizSelector = document.getElementById('vizSelector');
    const vizContainers = document.querySelectorAll('#frame .viz');
    
    vizSelector.addEventListener('change', () => {
        const selectedViz = vizSelector.value;

        vizContainers.forEach(viz => {
            viz.style.display = 'none';
        });

        const selectedVizContainer = document.getElementById(selectedViz);
        if (selectedVizContainer) {
            selectedVizContainer.style.display = 'block';
        }
    });

    // Optionally, trigger a change event to display the default visualization on load
    vizSelector.dispatchEvent(new Event('change'));
});
