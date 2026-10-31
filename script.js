let displayValue = "0";
let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;
let hasError = false;

const MAX_DIGITS = 12;
const display = document.getElementById("display");
const decimalButton = document.getElementById("decimal");

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
    if (number2 === 0) {
        return null;
    }
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
        default:
            return number2;
    }
}

function digitCount(value) {
    return value.replace(".", "").replace("-", "").length;
}

function formatResult(result) {
    if (!Number.isFinite(result)) {
        return null;
    }

    const rounded = Number.parseFloat(result.toPrecision(10));
    let formatted = String(rounded);

    if (formatted.includes("e")) {
        formatted = rounded.toExponential(6);
    }

    if (formatted.length > MAX_DIGITS) {
        formatted = rounded.toExponential(6);
    }

    return formatted;
}

function currentNumberHasDecimal() {
    return !resetDisplay && displayValue.includes(".");
}

function updateDecimalButton() {
    decimalButton.disabled = hasError || currentNumberHasDecimal();
}

function updateDisplay() {
    display.textContent = displayValue;
    display.classList.toggle("error", hasError);

    if (hasError) {
        display.style.fontSize = "";
    } else if (displayValue.length > 10) {
        display.style.fontSize = "1.6rem";
    } else if (displayValue.length > 8) {
        display.style.fontSize = "2.2rem";
    } else {
        display.style.fontSize = "";
    }

    updateDecimalButton();
}

function showError(message) {
    hasError = true;
    displayValue = message;
    firstNumber = null;
    currentOperator = null;
    resetDisplay = true;
    updateDisplay();
}

function inputDigit(digit) {
    if (hasError) {
        clearCalculator();
    }

    if (resetDisplay || displayValue === "0") {
        displayValue = digit;
        resetDisplay = false;
    } else if (digitCount(displayValue) >= MAX_DIGITS) {
        return;
    } else {
        displayValue += digit;
    }

    updateDisplay();
}

function inputDecimal() {
    if (hasError) {
        clearCalculator();
        displayValue = "0.";
        updateDisplay();
        return;
    }

    if (resetDisplay) {
        displayValue = "0.";
        resetDisplay = false;
        updateDisplay();
        return;
    }

    if (displayValue.includes(".")) {
        return;
    }

    displayValue += ".";
    updateDisplay();
}

function backspace() {
    if (hasError) {
        clearCalculator();
        return;
    }

    if (resetDisplay) {
        if (currentOperator !== null) {
            return;
        }
        resetDisplay = false;
    }

    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === "-" || displayValue === "-0") {
            displayValue = "0";
        }
    } else {
        displayValue = "0";
    }

    updateDisplay();
}

function chooseOperator(operator) {
    if (hasError) {
        return;
    }

    if (currentOperator !== null && !resetDisplay) {
        const result = operate(currentOperator, firstNumber, Number(displayValue));
        if (result === null) {
            showError("Nice try — no dividing by zero");
            return;
        }
        const formatted = formatResult(result);
        if (formatted === null) {
            showError("Nice try — no dividing by zero");
            return;
        }
        displayValue = formatted;
        firstNumber = Number(formatted);
        updateDisplay();
    } else {
        firstNumber = Number(displayValue);
    }

    currentOperator = operator;
    resetDisplay = true;
    updateDecimalButton();
}

function calculate() {
    if (hasError) {
        return;
    }

    if (currentOperator === null || firstNumber === null || resetDisplay) {
        return;
    }

    const result = operate(currentOperator, firstNumber, Number(displayValue));
    if (result === null) {
        showError("Nice try — no dividing by zero");
        return;
    }

    const formatted = formatResult(result);
    if (formatted === null) {
        showError("Nice try — no dividing by zero");
        return;
    }

    displayValue = formatted;
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
    hasError = false;
    updateDisplay();
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        event.preventDefault();
        inputDigit(key);
        return;
    }

    switch (key) {
        case ".":
            event.preventDefault();
            inputDecimal();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            event.preventDefault();
            chooseOperator(key);
            break;
        case "Enter":
        case "=":
            event.preventDefault();
            calculate();
            break;
        case "Backspace":
            event.preventDefault();
            backspace();
            break;
        case "Escape":
            event.preventDefault();
            clearCalculator();
            break;
        default:
            break;
    }
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

decimalButton.addEventListener("click", inputDecimal);
document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("backspace").addEventListener("click", backspace);
document.addEventListener("keydown", handleKeyboardInput);

updateDisplay();
