import deriveMap from "./StaticData/RateDerivationMap";
import rates from "./StaticData/FxRates";
import React from "react";
import ReactDOM from 'react-dom';
const rateConversionUtils = {
    convert: (fromCurrency, toCurrency, enteredAmount) => {
        let conversionAmount = 0;
        conversionAmount = rateConversionUtils.convertInternal(fromCurrency, toCurrency, enteredAmount);
        console.log("Conversion Amount is ", conversionAmount);
        if (conversionAmount == null) {
            //check if can be crossed via another currency
            const ccyPair = fromCurrency + toCurrency;
            const crossingCcyReference = deriveMap.filter(ccy => ccy.ccypair == ccyPair)[0];
            if (crossingCcyReference != null) {
                console.log("Cross currency reference", crossingCcyReference);
                const baseCcyCrossPairRate = rateConversionUtils.round(rateConversionUtils.derivateCcyPairRate(fromCurrency + crossingCcyReference.value));
                console.log("Base Rate" + baseCcyCrossPairRate);
                const termCcyCrossPairRate = rateConversionUtils.round(rateConversionUtils.derivateCcyPairRate(toCurrency + crossingCcyReference.value));
                console.log("Term Rate" + termCcyCrossPairRate);
                conversionAmount = (baseCcyCrossPairRate / termCcyCrossPairRate) * enteredAmount;
            }
        }
        return rateConversionUtils.round(conversionAmount);
    }
    ,
    round: (num) => {
        return Math.round(num * 100) / 100;
    },
    convertInternal: (fromCurrency, toCurrency, enteredAmount) => {
        let conversionAmount = null;
        if (fromCurrency == toCurrency) {
            conversionAmount = enteredAmount;
        }
        else {
            const ccyPair = fromCurrency + toCurrency;
            const invertedCcyPair = toCurrency + fromCurrency;
            let ccyPairReference = deriveMap.filter(ccy => ccy.ccypair == ccyPair)[0];
            console.log(ccyPairReference);
            if (ccyPairReference.value == "D") {
                conversionAmount = rateConversionUtils.directCcyPair(enteredAmount, ccyPair);
            }
            else if (ccyPairReference.value == "Inv") {
                conversionAmount = rateConversionUtils.invertedCcyPair(invertedCcyPair, enteredAmount);
            }
        }
        return conversionAmount;
    },
    invertCcyPair: (ccyPair) => {
        return ccyPair.substring(3) + ccyPair.substring(0, 3);
    },
    derivateCcyPairRate: (ccyPair) => {
        console.log("Deriving rate for ..." + ccyPair);
        let ccyPairReference = deriveMap.filter(ccy => ccy.ccypair == ccyPair)[0];
        if (ccyPairReference.value == "D") {
            return rateConversionUtils.getRate(ccyPair);
        }
        else if (ccyPairReference.value == "Inv") {
            return 1 / rateConversionUtils.getRate(rateConversionUtils.invertCcyPair(ccyPair));
        }
    },
    invertedCcyPair: (invertedCcyPair, enteredAmount) => {
        let inv = 1 / rateConversionUtils.getRate(invertedCcyPair);
        console.log(inv)
        return enteredAmount * inv;
    }
    ,
    directCcyPair: (enteredAmount, ccyPair) => {
        return enteredAmount * rateConversionUtils.getRate(ccyPair);
    },
    getRate: (ccyPair) => {
        console.log("reading rate", ccyPair);
        return rates.filter(rate => rate.ccypair == ccyPair)[0].rate;
    }
}
export default rateConversionUtils;

