"use strict";

const incomeTaxRates = [
  {min: 0, max: 18200, rate: 0, rateType: 'marginal'},
  {min: 18201, max: 37000, rate: .19, rateType: 'marginal'},
  {min: 37001, max: 90000, rate: .325, rateType: 'marginal'},
  {min: 90001, max: 180000, rate: .37, rateType: 'marginal'},
  {min: 180001, max: Infinity, rate: .45, rateType: 'marginal'}
];

const medicareLevyIndividualRates = [
  {min: 0, max: 21980, rate: 0, rateType: 'marginal'},
  {min: 21981, max: 27475, rate: .1, rateType: 'marginal'},
  {min: 27476, max: Infinity, rate: .02, rateType: 'average'}
];

const medicareLevyFamilyRates = [
  {min: 0, max: 37089, rate: 0, rateType: 'marginal'},
  {min: 37090, max: 46360, rate: .1, rateType: 'marginal'},
  {min: 46361, max: Infinity, rate: .02, rateType: 'average'}
];

const medicareLevyFamilyChildIncrement = 4257;

const medicareLevySurchargeIndividualRates = [
  {min: 0, max: 90000, rate: 0, rateType: 'average'},
  {min: 90001, max: 105000, rate: .01, rateType: 'average'},
  {min: 105001, max: 140000, rate: .0125, rateType: 'average'},
  {min: 140001, max: Infinity, rate: .015, rateType: 'average'}
];

const medicareLevySurchargeFamilyRates = [
  {min: 0, max: 180000, rate: 0, rateType: 'average'},
  {min: 180001, max: 210000, rate: .01, rateType: 'average'},
  {min: 210001, max: 280000, rate: .0125, rateType: 'average'},
  {min: 280001, max: Infinity, rate: .015, rateType: 'average'}
];

const medicareLevySurchargeFamilyChildIncrement = 1500;

const helpRepaymentRates = [
  {min: 0, max: 51956, rate: 0, rateType: 'average'},
  {min: 51957, max: 57729, rate: .02, rateType: 'average'},
  {min: 57730, max: 64306, rate: .04, rateType: 'average'},
  {min: 64307, max: 70881, rate: .045, rateType: 'average'},
  {min: 70882, max: 74607, rate: .05, rateType: 'average'},
  {min: 74608, max: 80197, rate: .055, rateType: 'average'},
  {min: 80198, max: 86855, rate: .06, rateType: 'average'},
  {min: 86856, max: 91425, rate: .065, rateType: 'average'},
  {min: 91426, max: 100613, rate: .07, rateType: 'average'},
  {min: 100614, max: 107213, rate: .075, rateType: 'average'},
  {min: 107214, max: Infinity, rate: .08, rateType: 'average'}
];

const lmitoRates = [
  {min: 0, max: 37000, rate: 0, rateType: 'marginal'},
  {min: 37001, max: 48000, rate: -.03, rateType: 'marginal'},
  {min: 48001, max: 90000, rate: 0, rateType: 'marginal'},
  {min: 90001, max: 125333, rate: .015, rateType: 'marginal'},
  {min: 125334, max: Infinity, rate: 0, rateType: 'marginal'}
];

const lmitoBase = -200;

const litoRates = [
  {min: 0, max: 37000, rate: 0, rateType: 'marginal'},
  {min: 37001, max: 66667, rate: .015, rateType: 'marginal'},
  {min: 66668, max: Infinity, rate: 0, rateType: 'marginal'}
]

const litoBase = -200;
