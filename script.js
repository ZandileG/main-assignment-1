let displayValue = "0";
let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;
const display = document.getElementById("display");

function updateDisplay() {
    display.textContent = displayValue;
}
function inputDigit(digit) {
    if (resetDisplay || displayValue === "0") {
        displayValue = digit;
        resetDisplay = false;
} else {
    displayValue += digit;
}
}
updateDisplay();

function chooseOperator(operator) {
    if (currentOperator !== null && !resetDisplay) {
        const result = operate(currentOperator, firstNumber, Number(displayValue));
        displayValue = String(result);
        firstNumber = result;
        updateDisplay();
} else {
    firstNumber = Number(displayValue);
}
    currentOperator = operator;
    resetDisplay = true;
}

function calculate() {
    if (currentOperator === null || resetDisplay) {
    return;
}
    const result = operate(currentOperator, firstNumber, Number(displayValue));
    displayValue = String(result);
    firstNumber = null;
    currentOperator = null;
    resetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    displayValue = "0";
    firstNumber = null;
    currentOperator = null;
    resetDisplay = false;
    updateDisplay();
}
document.querySelectorAll(".digit").forEach(function (button) {
    button.addEventListener("click", function () {
        inputDigit(button.textContent);
});
});

document.querySelectorAll(".operator").forEach(function (button) {
    button.addEventListener("click", function () {
        chooseOperator(button.dataset.operator);
});
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearCalculator);
