/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 24/06/20
 */

class itemPrice {
    constructor(JSONResponse) {
        this.typeID = JSONResponse.buy.forQuery.types[0];
        this.region = JSONResponse.buy.forQuery.regions[0];
        this.system = JSONResponse.buy.forQuery.systems[0];

        this.buy = {
            volume: JSONResponse.buy.volume,
            avg: JSONResponse.buy.avg,
            median: JSONResponse.buy.median,
            fivePercent: JSONResponse.buy.fivePercent,
            max: JSONResponse.buy.max,
            min: JSONResponse.buy.min
        };

        this.sell = {
            volume: JSONResponse.sell.volume,
            avg: JSONResponse.sell.avg,
            median: JSONResponse.sell.median,
            fivePercent: JSONResponse.sell.fivePercent,
            max: JSONResponse.sell.max,
            min: JSONResponse.sell.min
        };
    }
}

module.exports = itemPrice;

