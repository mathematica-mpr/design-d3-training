function buildChart(id) {
  var width = 750;
  var height = 300;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.top - margin.bottom;

  var svg = d3.select(id).append("svg").attr("height", height).attr("width", width);

  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("./data/countries.json", function (error, geojson) {
    handleError(error, "failed to read geoJSON data");

    d3.csv("./data/Olympic_Medals.csv", function (error, olympicMedals) {
      handleError(error, "failed to read olympic data");
      var countries = prepCountryMedals(olympicMedals);
      var medalsPerYear = prepCountryYears(olympicMedals);
      drawMap(geojson, countries, medalsPerYear);
    });
  });

  function handleError(error, msg) {
    if (error) {
      console.error(msg);
    }
  }

  function prepCountryMedals(data) {
    var countries = {};
    data.forEach((d) => {
      if (!countries[d["Country_Code"]]) {
        countries[d["Country_Code"]] = {
          total: 0,
          gold: 0,
          silver: 0,
          bronze: 0,
        };
      }
      checkMedals(countries, d);
    });
    return countries;
  }

  function checkMedals(countries, d) {
    countries[d["Country_Code"]].total++;
    if (d.Medal === "Gold") {
      countries[d["Country_Code"]].gold++;
    } else if (d.Medal === "Silver") {
      countries[d["Country_Code"]].silver++;
    } else if (d.Medal === "Bronze") {
      countries[d["Country_Code"]].bronze++;
    }
  }

  function prepCountryYears(data) {
    let countries = [];
    data.forEach((d) => {
      const country = {
        code: d["Country_Code"],
        name: d.Country,
        years: {},
      };
      const filteredCountries = countries.filter((c) => {
        return c.code === country.code;
      });
      if (filteredCountries.length === 0) {
        countries.push(country);
      }
    });
    prepYears(data, countries);
    return countries;
  }

  function prepYears(data, countries) {
    countries.forEach((country) => {
      data.forEach((d) => {
        if (!country.years[d["Year"]]) {
          country.years[d["Year"]] = {
            Gold: 0,
            Silver: 0,
            Bronze: 0,
          };
        }
      });
    });
    prepMedalsPerYear(data, countries);
    return countries;
  }

  function prepMedalsPerYear(data, countries) {
    countries.forEach((country) => {
      data.forEach((d) => {
        if (country.name === d["Country"]) {
          country.years[d["Year"]][d["Medal"]]++;
        }
      });
    });
    return countries;
  }

  function drawMap(geojson, countries, medalsPerYear) {
    appendLegend("#legend");

    geojson.features.forEach((f) => {
      var country = countries[f.id];
      if (country) {
        f.properties.medals = country;
      }
    });

    var mercatorProj = d3
      .geoMercator()
      .scale(130)
      .translate([innerWidth / 2, innerHeight / 2]);

    var geoPath = d3.geoPath().projection(mercatorProj);

    var opacityScale = d3.scaleLinear().domain([0, 1992]).range([0.2, 1]);

    var tooltip = d3.select("body").append("div").attr("class", "tooltip").attr("opacity", 0);

    g.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", geoPath)
      .style("fill", function (d) {
        if (d.properties.medals) {
          return "darkblue";
        } else {
          return "white";
        }
      })
      .style("stroke", "grey")
      .style("stroke-width", 0.5)
      .attr("fill-opacity", function (d) {
        if (d.properties.medals) {
          return opacityScale(d.properties.medals.total);
        }
      })
      .on("mouseover", function (d) {
        tooltip
          .transition()
          .duration(100)
          .style("opacity", 0.9)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
        if (d.properties.medals) {
          tooltip.html(
            d.properties.name +
              "<br>" +
              "Total Medals: " +
              d.properties.medals.total +
              "<br>" +
              "Gold: " +
              d.properties.medals.gold +
              "<br>" +
              "Silver: " +
              d.properties.medals.silver +
              "<br>" +
              "Bronze: " +
              d.properties.medals.bronze
          );
        } else {
          tooltip.html(d.properties.name + "<br>" + "No medals");
        }
      })
      .on("mouseout", function (d) {
        tooltip.transition().duration(100).style("opacity", 0);
      })
      .on("click", function (d) {
        clearContainer("total-medals");
        clearContainer("medals-over-time");
        drawMedalsChart(d);
        drawYearsChart(d, medalsPerYear);
      });
  }

  function drawMedalsChart(d) {
    var chart2 = d3
      .select("#total-medals")
      .append("svg")
      .attr("height", height)
      .attr("width", width - 350)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (d.properties.medals) {
      var medalTypes = Object.keys(d.properties.medals);
      var medalValues = Object.values(d.properties.medals);
      var medalCount = medalTypes.map((t, i) => {
        medal = {
          type: t,
          count: +medalValues[i],
        };
        return medal;
      });
      medalCount.shift();

      var x = d3
        .scaleBand()
        .domain(
          medalCount.map(function (mc) {
            return mc.type;
          })
        )
        .range([0, innerWidth - 350])
        .padding(0.2);

      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(medalCount, function (mc) {
            return mc.count;
          }),
        ])
        .range([innerHeight, 0]);

      var xAxis = d3.axisBottom(x);

      chart2
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(xAxis);

      var yAxis = d3.axisLeft(y).ticks(5);

      chart2.append("g").attr("class", "y-axis").call(yAxis);

      chart2
        .selectAll(".bar")
        .data(medalCount)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (mc) {
          return x(mc.type);
        })
        .attr("y", function (mc) {
          return y(mc.count);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (mc) {
          return innerHeight - y(mc.count);
        })
        .attr("fill", "darkblue")
        .attr("stroke", "none");

      chart2
        .selectAll(".text")
        .data(medalCount)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function (mc) {
          return x(mc.type) + 25;
        })
        .attr("y", function (mc) {
          return y(mc.count) + 25;
        })
        .text(function (mc) {
          return mc.count;
        })
        .attr("fill", "white");

      chart2
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", (innerWidth - 350) / 2)
        .attr("y", innerHeight + 30)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .style("font-size", 12)
        .text("Medal Rank");

      chart2
        .append("text")
        .attr("class", "y-axis-label")
        .attr("x", -30)
        .attr("y", innerHeight / 2)
        .attr("transform", "rotate(-90,-30," + innerHeight / 2 + ")")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "baseline")
        .style("font-size", 12)
        .text("Number of Awarded Medals");

      chart2
        .append("text")
        .attr("class", "title")
        .attr("x", (innerWidth - 350) / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "baseline")
        .style("font-size", 16)
        .text("Total Medals Awarded to " + d.properties.name + " 1976 - 2008");
    } else {
      chart2
        .append("text")
        .attr("class", "title")
        .attr("x", (innerWidth - 350) / 2)
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "baseline")
        .style("font-size", 16)
        .text(d.properties.name + " was not awarded a medal between 1976 and 2008");
    }
  }

  function drawYearsChart(d, medalsPerYear) {
    var yearChartHeight = 500;
    var yearChartWidth = 900;

    var yearInnerHeight = height - margin.top - margin.bottom;
    var yearInnerWidth = width - margin.left - margin.right;

    var chart3 = d3
      .select("#medals-over-time")
      .append("svg")
      .attr("height", yearChartHeight)
      .attr("width", yearChartWidth)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (d.properties.medals) {
      const timeData = medalsPerYear.filter((mpy) => {
        return mpy.code === d.id;
      });

      var years = Object.keys(timeData[0].years);
      years.pop();

      var yearValues = Object.values(timeData[0].years);
      yearValues.pop();

      var parseTime = d3.timeParse("%Y");

      var yearCount = years.map((y, i) => {
        year = {
          year: parseTime((+y).toString()),
          count: yearValues[i],
        };
        return year;
      });

      console.log(yearCount);

      var x = d3
        .scaleTime()
        .domain(
          d3.extent(yearCount, function (yc) {
            return yc.year;
          })
        )
        .range([0, yearInnerWidth]);

      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(yearCount, function (yc) {
            return yc.count.Gold + yc.count.Silver + yc.count.Bronze;
          }),
        ])
        .range([yearInnerHeight, 0]);

      var xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(4));

      chart3
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + yearInnerHeight + ")")
        .call(xAxis);

      var yAxis = d3.axisLeft(y).ticks(10);

      chart3.append("g").attr("class", "y-axis").call(yAxis);

      var line = d3
        .line()
        .x(function (yc) {
          return x(yc.year);
        })
        .y(function (yc) {
          let total = +yc.count.Gold + +yc.count.Silver + +yc.count.Bronze;
          return y(total);
        });

      chart3
        .append("path")
        .datum(yearCount)
        .attr("fill", "none")
        .attr("stroke", "darkblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      chart3
        .selectAll(".medal-count-point")
        .data(yearCount)
        .enter()
        .append("circle")
        .attr("class", ".medal-count-point")
        .attr("fill", "darkblue")
        .attr("stroke", "none")
        .attr("cx", function (yc) {
          return x(yc.year);
        })
        .attr("cy", function (yc) {
          let total = +yc.count.Gold + +yc.count.Silver + +yc.count.Bronze;
          return y(total);
        })
        .attr("r", 3);

      chart3
        .selectAll(".text")
        .data(yearCount)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function (yc) {
          return x(yc.year) - 8;
        })
        .attr("y", function (yc) {
          let total = +yc.count.Gold + +yc.count.Silver + +yc.count.Bronze;
          return y(total) - 8;
        })
        .text(function (yc) {
          let total = +yc.count.Gold + +yc.count.Silver + +yc.count.Bronze;
          return total;
        })
        .attr("fill", "black")
        .attr("font-size", 12);

      chart3
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", yearInnerWidth / 2)
        .attr("y", yearInnerHeight + 30)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .style("font-size", 12)
        .text("Year");

      chart3
        .append("text")
        .attr("class", "y-axis-label")
        .attr("x", -30)
        .attr("y", yearInnerHeight / 2)
        .attr("transform", "rotate(-90,-30," + yearInnerHeight / 2 + ")")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "baseline")
        .style("font-size", 12)
        .text("Number of Awarded Medals");

      chart3
        .append("text")
        .attr("class", "title")
        .attr("x", yearInnerWidth / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "baseline")
        .style("font-size", 16)
        .text("Total Medals Awarded to " + d.properties.name + " per year");
    }
  }

  function appendLegend(id) {
    var legendWidth = 350;
    var legendHeight = 50;

    var key = d3.select(id).append("svg").attr("width", legendWidth).attr("height", legendHeight);

    var legend = key
      .append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend.append("stop").attr("offset", "0%").attr("stop-color", "darkblue").attr("stop-opacity", 0.25);

    legend.append("stop").attr("offset", "33%").attr("stop-color", "darkblue").attr("stop-opacity", 0.5);

    legend.append("stop").attr("offset", "66%").attr("stop-color", "darkblue").attr("stop-opacity", 0.75);

    legend.append("stop").attr("offset", "100%").attr("stop-color", "darkblue").attr("stop-opacity", 1);

    key
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear().range([350, 0]).domain([1992, 20]);

    var yAxis = d3.axisBottom().scale(y).ticks(10);

    key
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,30)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");
  }

  function clearContainer(id) {
    const container = document.getElementById(id);
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }
}

buildChart("#map");
