// How many makes are considered common (where property make_is_common is 1)

const commonCars = carsData.reduce((acc, curr) => {
  if (curr.make_is_common === "1") {
    acc++
  }
  return acc
}, 0)

// How many makes are there per country

const carsPerCountry = carsData.reduce((acc, curr) => {
    if (acc.hasOwnProperty(curr.make_country)) {
        acc[curr.make_country]++
    } else {
        acc[curr.make_country] = 1
    }
    return acc
}, {})

// How many makes are there by country and broken down by common and uncommon

const commonCarsPerCountry = carsData.reduce(function (acc, curr) {
    if (acc.hasOwnProperty(curr.make_country)) {
        if (curr.make_is_common === '1') {
            acc[curr.make_country].common++
        } else {
            acc[curr.make_country].uncommon++
        }
    } else {
        if (curr.make_is_common === '1') {
            acc[curr.make_country] = {common: 1, uncommon: 0}
        } else {
          acc[curr.make_country] = {common: 0, uncommon: 1}
        }
    }
    return acc
}, {})