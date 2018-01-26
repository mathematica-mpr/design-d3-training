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
    // something
}

// get yearly max wins in AL and NL in format:
// [
//    {
//        year: yyyy,
//        AL: maxWins,
//        NL: maxWins,
//    }
// ]

function getTeamWins(data) {
    // something
}
