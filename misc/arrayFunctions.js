module.exports = new FlightShopper();

var flightData = [
    {
        airline: 'SouthWest',
        flights: {
            'SFO:LAX': 100,
            'SFO:LAS': 250,
            'SJC:TUC': 300
        }
    },
    {
        airline: 'United',
        flights: {
            'SFO:LAX': 250,
            'SFO:LAS': 100
        }
    },
    {
        airline: 'Delta',
        flights: {
            'SFO:LAX': 400,
            'SFO:LAS': 50
        }
    },
    {
        airline: 'Spirit',
        flights: {
            'SFO:LAX': 75,
            'SFO:LAS': 300
        }
    }
];

function FlightShopper() {
    this.comparePrices = comparePrices;
    this.flightAvailable = flightAvailable;
    this.flightPathUniversallyAvailable = flightPathUniversallyAvailable;
}


/**
 * By using two native array functions we can quickly pull the lowest price for a particular flight path
 *
 * @param {string} flightPath
 * @returns {Number} bestPrice
 */
function comparePrices (flightPath) {

    var prices,
        bestPrice;

    //This will build a new array of prices based on the passed in flight path using Array.prototype.map
    prices = flightData.map(function (airlineData) {
        return airlineData.flights[flightPath];
    });

    //This will return the lowest price by using Array.prototype.reduce to pass along the min price of generated prices
    bestPrice = prices.reduce(function (prev, current) {
        if(current < prev) {
            return current;
        }
        return prev;
    });

    return bestPrice;
}

/**
 * By using Array.prototype.some the return value is the result of ANY element passing the supplied condition fn
 *
 * @param {string} flightPath
 * @returns {boolean} pathAvailable
 */
function flightAvailable (flightPath) {
    var pathAvailable = flightData.some(function (airlineData) {
        return !!airlineData.flights[flightPath];
    });
    return pathAvailable;
}

/**
 * By using Array.prototype.every the return value is the result of ALL elements passing the supplied condition fn
 *
 * @param {string} flightPath
 * @returns {boolean} universallyAvailable
 */
function flightPathUniversallyAvailable (flightPath) {
    var universallyAvailable = flightData.every(function (airlineData) {
        return !!airlineData.flights[flightPath];
    });
    return universallyAvailable;
}