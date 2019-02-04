function refreshFamilyFields() {
  const familyCheckbox = document.getElementById('family-checkbox');
  const familyIncomeField = document.getElementById('family-income-field');
  const dependentsField = document.getElementById('dependents-field');

  // Enable family fields as needed.
  const lodgingAsFamily = familyCheckbox.checked;
  familyIncomeField.disabled = !lodgingAsFamily;
  dependentsField.disabled = !lodgingAsFamily;
}

function getInfoFromInput() {
  const incomeField = document.getElementById('income-field');
  const helpCheckbox = document.getElementById('help-checkbox');
  const hospitalCoverCheckbox = document.getElementById(
    'hospital-cover-checkbox');
  const familyCheckbox = document.getElementById('family-checkbox');
  const familyIncomeField = document.getElementById('family-income-field');
  const dependentsField = document.getElementById('dependents-field');

  const info = {}
  info.income = parseInt(incomeField.value);
  info.hasHelp = helpCheckbox.checked;
  info.hospitalCover = hospitalCoverCheckbox.checked;
  info.family = familyCheckbox.checked;
  info.familyIncome = parseInt(familyIncomeField.value);
  info.dependents = parseInt(dependentsField.value);
  return info;
}

function refreshCalculation(info) {
  const incomeTaxBox = document.getElementById('income-tax-box');
  const litoBox = document.getElementById('lito-box');
  const lmitoBox = document.getElementById('lmito-box');
  const helpBox = document.getElementById('help-box');
  const medicareBox = document.getElementById('medicare-box');
  const medicareSurchargeBox = document.getElementById(
    'medicare-surcharge-box');
  const totalTaxBox = document.getElementById('total-tax-box');
  const disposableIncomeBox = document.getElementById('disposable-income-box');
  
  if (isNaN(info.income)
      || (info.family
          && (isNaN(info.familyIncome)
              || isNaN(info.dependents)))) {
    incomeTaxBox.innerHTML = '';
    litoBox.innerHTML = '';
    lmitoBox.innerHTML = '';
    helpBox.innerHTML = '';
    medicareBox.innerHTML = '';
    medicareSurchargeBox.innerHTML = '';
    totalTaxBox.innerHTML = '';
    disposableIncomeBox.innerHTML = '';
    return;
  }

  const incomeTax = calculateIncomeTax(info.income);
  const lito = calculateLito(info.income, incomeTax);
  const lmito = calculateLmito(info.income, incomeTax + lito);
  const helpAmt = calculateHelp(info.income, info.hasHelp);
  const medicare = calculateMedicare(info.income, info.familyIncome,
                                     info.family, info.dependents);
  const medicareSurcharge = calculateMedicareSurcharge(
    info.income, info.familyIncome, info.family,
    info.dependents, info.hospitalCover);
  const totalTax = (incomeTax + lito + lmito + helpAmt
                    + medicare + medicareSurcharge);

  // Sanity check
  if (totalTax != calculateTotalTax(
      info.income, info.hasHelp, info.familyIncome,
      info.family, info.dependents, info.hospitalCover)) {
    throw new Error('inconsistent total tax');
  }
  
  const disposableIncome = info.income - totalTax;

  incomeTaxBox.innerHTML = incomeTax;
  litoBox.innerHTML = lito;
  lmitoBox.innerHTML = lmito;
  helpBox.innerHTML = helpAmt;
  medicareBox.innerHTML = medicare;
  medicareSurchargeBox.innerHTML = medicareSurcharge;
  totalTaxBox.innerHTML = totalTax;
  disposableIncomeBox.innerHTML = disposableIncome;
}

function refresh() {
  refreshFamilyFields();
  const info = getInfoFromInput();
  refreshCalculation(info);
}
