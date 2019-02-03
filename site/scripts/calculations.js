"use strict";

function amountFromRates(input, rates) {
  let total = 0
  let oldMax = 0;
  for (const rate of rates) {
    if (rate.rateType === 'marginal') {
      if (input <= rate.max) {
        total += (input - oldMax) * rate.rate;
      } else {
        total += (rate.max - oldMax) * rate.rate;
      }
    } else if (rate.rateType == 'average') {
      // Forget the previous marginal calculation and replace.
      total = rate.rate * input;
    } else {
      throw new Error('unrecognised rate type');
    }
    oldMax = rate.max;
    if (input <= rate.max) {
      break;
    }
  }
}

function calculateIncomeTax(taxableIncome) {
  return amountFromRates(taxableIncome, incomeTaxRates);
}

function calculateLmito(taxableIncome, incomeTax) {
  let result = lmitoBase + amountFromRates(taxableIncome, lmitoRates);
  result = Math.max(result, -incomeTax);
  return result;
}

function calculateLito(taxableIncome, incomeTax) {
  let result = litoBase + amountFromRates(taxableIncome, litoRates);
  result = Math.max(result, -incomeTax);
  return result;
}

function calculateHelp(taxableIncome) {
  return amountFromRates(taxableIncome, helpRepaymentRates);
}

function offsetBrackets(rates, offset) {
  
}

function calculateMedicare(taxableIncome, isFamily, numChildren) {
  if (isFamily) {
    const bracketsOffset = numChildren * medicareLevyFamilyChildIncrement;
    throw Error('not implemented');
  } else {
    return amountFromRates(taxableIncome, medicareLevyIndividualRates);
  }
}
