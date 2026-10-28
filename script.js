let displayValue = "0";
let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;
const display = document.getElementById("display");

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
}

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
    updateDisplay();
}

function backspace() {
    if (resetDisplay) {
        return;
    }
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
    updateDisplay();
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
document.getElementById("backspace").addEventListener("click", backspace);