main(getTeamWins);

function main(func) {
    d3.csv('./data/Teams.csv', function(error, data) {
        if (error) {
            console.error('problem loading data');
        }

        func(data);
    });
}

// get total team wins in format:
// {
//    'teamName1': totWins,
//    'teamName2': totWins,
//    'teamName2': totWins,
//    ...
// }

function getTeamWins(data) {
    // first method
    var teams = {};
    data.forEach(function(d) {
        if (Object.keys(teams).indexOf(d.name) >= 0) {
            teams[d.name] += +d.W;
            // teams[d.name]  = teams[d.name] + d.w
        } else {
            teams[d.name] = +d.W;
        }
    });

    console.log(teams);

    // second method
    var teams = [];
    data.sort(function(a, b) {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
    });

    data.forEach(function(d, i, a) {
        if (i === 0 || d.name !== a[i - 1].name) {
            teams.push(d.name);
        }
    });

    console.log(teams);

    var wins = {};
    teams.forEach(function(t) {
        var teamRows = data.filter(function(d) {
            return d.name === t;
        });

        wins[t] = d3.sum(teamRows, function(d) {
            return +d.W;
        });
    });

    console.log(wins);
}

// get yearly max wins in AL and NL in format:
// [
//    {
//        year: yyyy,
//        AL: maxWins,
//        NL: maxWins,
//    }
// ]

function getYearWins(data) {
    // something
}
