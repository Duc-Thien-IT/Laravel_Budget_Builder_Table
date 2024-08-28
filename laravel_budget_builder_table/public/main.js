document.addEventListener('DOMContentLoaded', () => {
    const months = [
        'January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024',
        'July 2024', 'August 2024', 'September 2024', 'October 2024', 'November 2024', 'December 2024'
    ];
    
    const valueDefault = {
        '0,0':'Start Period V end Period V',
        '1,0': 'Income',
        '2,0': 'General Income',
        '6,0': 'Sub Totals',
        '8,0': 'Other income',
        '12,0': 'Sub Totals',
        '14,0': 'Add new parent category',
        '16,0': 'Income Total',
        '18,0': 'Expenses',
        '19,0': 'Operational Expenses',
        '23,0': 'Sub total',
        '25,0': 'Salaries & Wages',
        '30,0': 'Sub Total',
        '32,0': 'Add new parent category',
        '34,0': 'Total Expenses',
        '35,0': 'Profit / Loss',
        '36,0':  'Opening Balance',
        '37,0': 'Closing Balance'
    };

    const rowNumber = 50;
    const colNumber = 13;
    const container = document.getElementById('gridContainer');

    //Tạo bảng
    createTable(container, months, valueDefault, rowNumber, colNumber);

    //Di chuyển chuột
    const inputs = document.querySelectorAll('#gridContainer .input');
    MoveMouse(inputs, colNumber);

    //Tổng
    calculateTotalsGeneralIncome(colNumber);
    calculateToTalsOtherIncome(colNumber);
    calculateTotalsIncome(colNumber);
    calculateToTalExpenses(colNumber);
    calculateToTalsSalariesWages(colNumber);
    calculateToTalsExpenses(colNumber);
    calculateProfitLoss(colNumber);
    calculateOpeningBalance(colNumber);
    calculateClosingBalance(colNumber);

    inputs.forEach(input => {
        input.addEventListener('input', () => calculateTotalsGeneralIncome(colNumber));
        input.addEventListener('input', () => calculateToTalsOtherIncome(colNumber));
        input.addEventListener('input', () => calculateTotalsIncome(colNumber));
        input.addEventListener('input', () => calculateToTalExpenses(colNumber));
        input.addEventListener('input', () => calculateToTalsSalariesWages(colNumber));
        input.addEventListener('input', () => calculateToTalsExpenses(colNumber));
        input.addEventListener('input', () => calculateProfitLoss(colNumber));
        input.addEventListener('input', () => calculateOpeningBalance(colNumber));
        input.addEventListener('input', () => calculateClosingBalance(colNumber));
    });

});

function submitForm() {
        document.getElementById('budgetForm').submit();
}

//
function createTable(container, months, valueDefault, rowNumber, colNumber) {
    for (let i = 0; i < rowNumber; i++) {
        const row = document.createElement('div');
        row.className = 'row1'; 

        for (let j = 0; j < colNumber; j++) {
            const col = document.createElement('div');
            col.className = 'col';

            const input = document.createElement('input');
            input.className = 'input';
            input.type = 'text'; 
            input.dataset.row = i;
            input.dataset.col = j;

            if (i === 0 && j > 0 && j <= months.length) {
                input.value = months[j - 1];
                input.name = `months[${j}]`; 
            } else {
                const tmp = `${i},${j}`;
                if (valueDefault[tmp]) {
                    input.value = valueDefault[tmp];
                }
                if (j === 0) {
                    input.name = `categories[${i}]`; 
                } else {
                    input.name = `amounts[${i}][${j}]`; 
                }
            }

            col.appendChild(input);
            row.appendChild(col);
        }

        container.appendChild(row);
    }
}

//
function MoveMouse(inputs, colNumber) {
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowRight': 
                    event.preventDefault();
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                    break;
                case 'ArrowLeft': 
                    event.preventDefault();
                    if (index > 0) {
                        inputs[index - 1].focus();
                    }
                    break;
                case 'ArrowDown': 
                    event.preventDefault();
                    if (index + colNumber < inputs.length) {
                        inputs[index + colNumber].focus();
                    }
                    break;
                case 'ArrowUp': 
                    event.preventDefault();
                    if (index - colNumber >= 0) {
                        inputs[index - colNumber].focus();
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (index + colNumber < inputs.length) {
                        inputs[index + colNumber].focus();
                    }
                    break;
            }
        });
    });
}

// document.getElementById('enterButton').addEventListener('click', function() {
//     const startMonthInput = document.getElementById('startMonth').value;
//     const endMonthInput = document.getElementById('endMonth').value;

//     const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     const year = 2024; 
//     let startMonthIndex = parseInt(startMonthInput) - 1; 
//     let endMonthIndex = parseInt(endMonthInput) - 1; 

//     if(isNaN(startMonthIndex) || isNaN(endMonthIndex) || startMonthIndex < 0 || endMonthIndex > 11 || startMonthIndex > endMonthIndex) {
//         alert('Invalid month range');
//         return;
//     }

//     const table = document.querySelector('table');
//     const row = table.querySelector('tr');

//     let colIndex = 1; 
//     for (let i = startMonthIndex; i <= endMonthIndex; i++) {
//         const cell = row.querySelector(`td[data-col="${colIndex}"]`);
//         if (cell) {
//             cell.innerText = `${months[i]} ${year}`;
//         }
//         colIndex++;
//     }
// });


//Tiền lời bth
function calculateTotalsGeneralIncome(colNumber) {
    let generalIncomeTotals = Array(colNumber).fill(0);
    for (let j = 1; j <= colNumber; j++) {
        let total = 0;

        for (let i = 1; i < 6; i++) {
            const input = document.querySelector(`.input[data-row="${i}"][data-col="${j}"]`);
            if (input) {
                const value = parseFloat(input.value) || 0;
                total += value;
            }
        }

        generalIncomeTotals[j - 1] = total;
        const totalCell = document.querySelector(`.input[data-row="6"][data-col="${j}"]`);
        if (totalCell) {
            totalCell.value = total.toFixed(2);
        }
    }
    return generalIncomeTotals;
}

//tiền lời thêm
function calculateToTalsOtherIncome(colNumber){
    let otherIncomeTotals = Array(colNumber).fill(0);
    for (let j = 1 ; j <= colNumber; j++) {
        let totalOtherIncome = 0;

        for (let i = 9; i < 12; i++) {
            const input = document.querySelector(`.input[data-row="${i}"][data-col="${j}"]`);
            if(input) {
                const value = parseFloat(input.value) || 0;
                totalOtherIncome += value;
            }

            otherIncomeTotals[j - 1] = totalOtherIncome;
            const totalCell = document.querySelector(`.input[data-row="12"][data-col="${j}"]`);
            if (totalCell) {
                totalCell.value = totalOtherIncome.toFixed(2);
            }
        }
    }
    return otherIncomeTotals;
}

//tổng tiền lời
function calculateTotalsIncome(colNumber){
    let totalIncomeArr = Array(colNumber).fill(0);
    const generalIncomeTotals = calculateTotalsGeneralIncome(colNumber);
    const otherIncomeTotals = calculateToTalsOtherIncome(colNumber); 

    for (let j = 1; j <= colNumber; j++) {
        const totalIncome = (generalIncomeTotals[j - 1] + otherIncomeTotals[j - 1]).toFixed(2);

        totalIncomeArr[j - 1] = totalIncome;
        const totalCell = document.querySelector(`.input[data-row="16"][data-col="${j}"]`);
        if (totalCell) {
            totalCell.value = totalIncome;
        }
    }
    return totalIncomeArr;
}

//tiền phải chi
function calculateToTalExpenses(colNumber){
    let expenses = Array(colNumber).fill(0);
    for (let j = 1 ; j <= colNumber; j++) {
        let totalExpenses = 0;

        for (let i = 19; i < 23; i++) {
            const input = document.querySelector(`.input[data-row="${i}"][data-col="${j}"]`);
            if(input) {
                const value = parseFloat(input.value) || 0;
                totalExpenses += value;
            }

            expenses[j - 1] = totalExpenses;
            const totalCell = document.querySelector(`.input[data-row="23"][data-col="${j}"]`);
            if (totalCell) {
                totalCell.value = totalExpenses.toFixed(2);
            }
        }
    }
    return expenses;
}

//tiền chi thêm
function calculateToTalsSalariesWages(colNumber){
    let salaries = Array(colNumber).fill(0);
    for (let j = 1 ; j <= colNumber; j++) {
        let totalSalaries = 0;

        for (let i = 26; i < 30; i++) {
            const input = document.querySelector(`.input[data-row="${i}"][data-col="${j}"]`);
            if(input) {
                const value = parseFloat(input.value) || 0;
                totalSalaries += value;
            }

            salaries[j - 1] = totalSalaries;
            const totalCell = document.querySelector(`.input[data-row="30"][data-col="${j}"]`);
            if (totalCell) {
                totalCell.value = totalSalaries.toFixed(2);
            }
        }
    }
    return salaries;
} 

//tổng tiền phải chi
function calculateToTalsExpenses(colNumber){
    let totalExpensesArr = Array(colNumber).fill(0);
    const Expenses = calculateToTalExpenses(colNumber);
    const Salaries = calculateToTalsSalariesWages(colNumber);

    for(let j = 1; j <= colNumber; j++){
        const totalExpenses = (Expenses[j - 1] + Salaries[j - 1]).toFixed(2);

        totalExpensesArr[j - 1] = totalExpenses
        const totalCell = document.querySelector(`.input[data-row="34"][data-col="${j}"]`);
        if (totalCell) {
            totalCell.value = totalExpenses;
        }
    }
    return totalExpensesArr;
}

//tính tiền lãi lỗ lời
function calculateProfitLoss(colNumber){
    const incomeTotals = calculateTotalsIncome(colNumber);
    const expensesTotals = calculateToTalsExpenses(colNumber);
    let profitLoss = Array(colNumber).fill(0);

    for (let j = 1; j <= colNumber; j++) {
        const profitLossValue = (parseFloat(incomeTotals[j - 1]) - parseFloat(expensesTotals[j - 1])).toFixed(2);
        
        profitLoss[j - 1] = profitLossValue;
        const totalCell = document.querySelector(`.input[data-row="35"][data-col="${j}"]`);
        if (totalCell) {
            totalCell.value = profitLossValue;
        }
    }
    return profitLoss;
}

function calculateOpeningBalance(colNumber) {
    let openingBalance = Array(colNumber).fill(0);

    openingBalance[0] = 0;
    document.querySelector(`.input[data-row="36"][data-col="1"]`).value = openingBalance[0].toFixed(2);

    for (let j = 2; j <= colNumber; j++) {
        openingBalance[j - 1] = parseFloat(document.querySelector(`.input[data-row="37"][data-col="${j - 1}"]`).value) || 0;
        const openingBalanceCell = document.querySelector(`.input[data-row="36"][data-col="${j}"]`);
        if (openingBalanceCell) {
            openingBalanceCell.value = openingBalance[j - 1].toFixed(2);
        }
    }
    return openingBalance;
}


function calculateClosingBalance(colNumber) {
    const openingBalance = calculateOpeningBalance(colNumber);
    const profitLoss = calculateProfitLoss(colNumber);
    let closingBalance = Array(colNumber).fill(0);

    for (let j = 1; j <= colNumber; j++) {
        const closingBalanceValue = (parseFloat(openingBalance[j - 1]) + parseFloat(profitLoss[j - 1])).toFixed(2);

        closingBalance[j - 1] = closingBalanceValue;

        const closingBalanceCell = document.querySelector(`.input[data-row="37"][data-col="${j}"]`);
        if (closingBalanceCell) {
            closingBalanceCell.value = closingBalance[j - 1];
        }
    }
    return closingBalance;
}

