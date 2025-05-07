"use strict";
// Calculator of investment results often
function calculateInvestment(data) {
    // destructure data{}
    const { initial_amount, annual_contribution, expected_return, duration } = data;
    if (initial_amount < 0) {
        return 'Initial investment amount must be more than zero';
    }
    //if i am investing less than a year does not make any sense
    if (duration <= 0) {
        return 'No valid amount of years provided';
    }
    if (expected_return < 0) {
        return 'Expected return must be at least zero';
    }
    //
    let total = initial_amount;
    let total_contributions = 0; // At the beginning is zero
    let total_interest_earned = 0;
    const annualResults = [];
    // set up a loop as long as i is less than durantion(x amount of years)
    // standard javascript loop
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expected_return);
        total_interest_earned = total - total_contributions - initial_amount;
        total_contributions = total_contributions + annual_contribution;
        total = total + annual_contribution;
        annualResults.push({
            year: `Year ${i + 1}`,
            total_amount: total,
            total_interest_earned,
            total_contributions,
        });
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results == 'string') {
        console.log(results);
        return; // no ther code afther gets executed
    }
    for (const yearEndResult of results) {
        console.log(yearEndResult.year);
        console.log(`Total: ${yearEndResult.total_amount.toFixed(0)}`); //to fixed method: to omit everything after the decimal
        console.log(`Total Contributions: ${yearEndResult.total_contributions.toFixed(0)}`);
        console.log(`Total Interest Earned: ${yearEndResult.total_interest_earned.toFixed(0)}`);
        console.log('------------------');
    }
}
const investment_data = {
    initial_amount: 8000,
    annual_contribution: 800,
    expected_return: 0.07,
    duration: 10
};
const results = calculateInvestment(investment_data);
printResults(results);
