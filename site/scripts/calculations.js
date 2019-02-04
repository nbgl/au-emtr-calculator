"use strict";

function to2dp(x) {
  return Math.round(x * 100) / 100;
}

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
  return total;
}

function findRate(input, rates) {
  return amountFromRates(input, rates) / input;
}

function calculateIncomeTax(taxableIncome) {
  return to2dp(amountFromRates(taxableIncome, incomeTaxRates));
}

function calculateLmito(taxableIncome, incomeTax) {
  let result = lmitoBase + amountFromRates(taxableIncome, lmitoRates);
  result = Math.max(result, -incomeTax);
  return to2dp(result);
}

function calculateLito(taxableIncome, incomeTax) {
  let result = litoBase + amountFromRates(taxableIncome, litoRates);
  result = Math.max(result, -incomeTax);
  return to2dp(result);
}

function calculateHelp(taxableIncome, hasHelpDebt) {
  if (hasHelpDebt) {
    return to2dp(amountFromRates(taxableIncome, helpRepaymentRates));
  } else {
    return 0;
  }
}

function offsetBrackets(rates, offset) {
  /*  Offset tax brackets by `offset`, except the min of the first one.
      This is useful for the calculating the Medicare levy and the Medicare levy
      surcharge for families with children.
  */
  const result = [];
  for (const i in rates) {
    const rate = rates[i];
    // Do not offset the first rate.
    const newMin = i == 0 ? rate.min : rate.min + offset;
    const newMax = rate.max + offset;  // This works with infinity too.
    const newRate = {
      min: newMin,
      max: newMax,
      rate: rate.rate,
      rateType: rate.rateType
    };
    result.push(newRate);
  }
  return result;
}

function calculateMedicare(taxableIncome, familyIncome, isFamily, numChildren) {
  let rate;
  if (isFamily) {
    // Offset the brackets by amount proportional to number of children.
    const bracketsOffset = numChildren * medicareLevyFamilyChildIncrement;
    const offsetRates = offsetBrackets(medicareLevyFamilyRates, bracketsOffset);
    rate = findRate(familyIncome, offsetRates);
  } else {
    rate = findRate(taxableIncome, medicareLevyIndividualRates);
  }
  return to2dp(rate * taxableIncome);
}

function calculateMedicareSurcharge(taxableIncome, familyIncome,
                                    isFamily, numChildren, hasHealthCover) {
  if (hasHealthCover) {
    return 0;
  } else {
    let rate;
    if (isFamily) {
      // Offset the brackets by amount proportional to number of children.
      const bracketsOffset = (
        numChildren * medicareLevySurchargeFamilyChildIncrement);
      const offsetRates = offsetBrackets(medicareLevySurchargeFamilyRates,
                                         bracketsOffset);
      rate = findRate(familyIncome, offsetRates);
    } else {
      rate = findRate(taxableIncome, medicareLevySurchargeIndividualRates);
    }
    return to2dp(rate * taxableIncome);
  }
}

function calculateTotalTax(taxableIncome, hasHelpDebt, familyIncome,
                           isFamily, numChildren, hasHealthCover) {
  const incomeTax = calculateIncomeTax(taxableIncome);
  const lito = calculateLito(taxableIncome, incomeTax);
  const lmito = calculateLmito(taxableIncome, incomeTax + lito);
  const helpAmt = calculateHelp(taxableIncome, hasHelpDebt);
  const medicare = calculateMedicare(taxableIncome, familyIncome,
                                     isFamily, numChildren);
  const medicareSurcharge = calculateMedicareSurcharge(
    taxableIncome, familyIncome, isFamily,
    numChildren, hasHealthCover);

  return incomeTax + lito + lmito + helpAmt + medicare + medicareSurcharge;
}
