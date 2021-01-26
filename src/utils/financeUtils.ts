export function calculateTaxes(income: number) {
  let remaining: number = income;
  let tax: number = 0

  const brackets = [0, 9950, 40525, 86375, 164925, 209425, 523600]
  const rates = [0, 0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]

  for (let i = 1; i < brackets.length && remaining > 0; i++) {
    let margin = Math.min(brackets[i] - brackets[i - 1], remaining)
    tax += rates[i] * margin;
    remaining -= margin;
  }

  return tax
}

export function calculateCompoundGrowth(initialInvestment: number, contribution: number, interestRate: number, compoundFrequency: number, years: number) {
  const interest = Math.pow((1 + (interestRate / compoundFrequency)), compoundFrequency * years)
  const term1 = initialInvestment * interest
  const term2 = (contribution / compoundFrequency) * ((interest - 1) / (interestRate / compoundFrequency))
  return term1 + term2;
}

export function balancePerYear(initialInvestment: number, contribution: number, interestRate: number, compoundFrequency: number, years: number) {
  const balances = []
  for (let i = 1; i <= years; i++) {
    balances.push(calculateCompoundGrowth(initialInvestment, contribution, interestRate, compoundFrequency, i));
  }
  return balances;
}

export function getPaymentFrequency(frequency: string) {
  if (frequency === 'MONTHLY') {
    return 12;
  }
  if (frequency === 'SEMI_MONTHLY') {
    return 24;
  }
  if (frequency === 'BIWEEKLY') {
    return 26;
  }
  if (frequency === 'WEEKLY') {
    return 52;
  }
  return 1;
}

function getTaxOverYears(wages: number[], years: number) {
  let tax: number = 0;
  wages.forEach(income => tax += calculateTaxes(income))
  return tax;
}

function getWithdrawalPerPeriod(yearlyWithdrawal: number) {
  return yearlyWithdrawal / 12;
}

export function calculateGrowthAndTax(currentAge: number, retirementAge: number, currentSalary: number, paymentFrequency: string, salaryRate: number, traditionalInitialInvestment: number, rothInitialInvestment: number, investmentRate: number, annualContribution: number, traditionalContributionPercentage: number, rothContributionPercentage: number) {
  const investmentYears = retirementAge - currentAge;
  const compoundFrequency = getPaymentFrequency(paymentFrequency);

  const traditionalContribution = (traditionalContributionPercentage / 100) * annualContribution;
  const rothContribution = (rothContributionPercentage / 100) * annualContribution;

  const annualWages = balancePerYear(currentSalary - traditionalContribution, 0, salaryRate / 100, compoundFrequency, investmentYears);
  const totalTaxesOnWages = getTaxOverYears(annualWages, investmentYears);

  const traditionalValueAtRetirement = calculateCompoundGrowth(traditionalInitialInvestment, traditionalContribution / compoundFrequency, investmentRate / 100, compoundFrequency, investmentYears);
  const rothValueAtRetirement = calculateCompoundGrowth(rothInitialInvestment, rothContribution / compoundFrequency, investmentRate / 100, compoundFrequency, investmentYears);

  console.log('Annual Wages');
  console.log(annualWages);
  console.log('Total Tax');
  console.log(totalTaxesOnWages);
  console.log('Traditional');
  console.log(traditionalValueAtRetirement);
  console.log('Roth');
  console.log(rothValueAtRetirement);

  const retirementYears = 100 - retirementAge;
  const retirementIncome = annualWages[annualWages.length - 1]


  const totalValueAtRetirement = traditionalValueAtRetirement + rothValueAtRetirement;
  const traditionalWithdrawalPercentage = traditionalValueAtRetirement / totalValueAtRetirement;
  const rothWithdrawalPercentage = rothValueAtRetirement / totalValueAtRetirement;

  const withdrawalsFromTraditional = balancePerYear(traditionalValueAtRetirement, -1 * getWithdrawalPerPeriod(retirementIncome * traditionalWithdrawalPercentage), investmentRate / 100, 12, retirementYears);
  const withdrawalsFromRoth = balancePerYear(rothValueAtRetirement, -1 * getWithdrawalPerPeriod(retirementIncome * rothWithdrawalPercentage), investmentRate / 100, 12, retirementYears);

  const totalTaxesOnRetirement = calculateTaxes(retirementIncome / 2) * retirementYears;

  console.log('Withdrawals Traditional');
  console.log(withdrawalsFromTraditional);
  console.log('Withdrawals Roth');
  console.log(withdrawalsFromRoth);
  console.log('Retirement Taxes');
  console.log(totalTaxesOnRetirement);

  console.log('Lifetime Taxes');
  console.log(totalTaxesOnWages + totalTaxesOnRetirement);
}

export function getContributionPercentages(salary: number, annualContribution: number, traditionalPercentage: number, rothPercentage: number) {
  const contributionAsPercentageOfSalary = annualContribution / salary
  return [contributionAsPercentageOfSalary * traditionalPercentage / 100, contributionAsPercentageOfSalary * rothPercentage / 100];
}

export function adjustValueForInflation(value: number, yearsFromNow: number, inflationRate?: number) {
  const rate = inflationRate || 0.014;
  return value / calculateCompoundGrowth(1, 0, rate, 1, yearsFromNow);
}
