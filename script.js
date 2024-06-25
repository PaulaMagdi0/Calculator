const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const resetButton = document.querySelector('.reset');
const equalButton = document.querySelector('.equal');
const operatorButtons = document.querySelectorAll('.operator');
const themeSlider = document.querySelector('.theme-slider');

let currentInput = '0';
let previousInput = null;
let previousOperator = null;
let equalsClicked = false;

// Handle button clicks and keyboard input
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
        } else if (value === 'RESET') {
            currentInput = '0';
            previousInput = null;
            previousOperator = null;
        } else if (value === '=') {
            calculate();
            equalsClicked = true;
        } else if (['+', '-', '/', 'x'].includes(value)) {
            handleOperator(value);
        } else {
            if (equalsClicked) {
                currentInput = value;
                equalsClicked = false;
            } else {
                if (currentInput === '0') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
        }
        updateDisplay();
    });
});

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const keyValue = event.key;

    // Handle number keys (0-9)
    if (keyValue >= '0' && keyValue <= '9') {
        const value = keyValue;
        if (equalsClicked) {
            currentInput = value;
            equalsClicked = false;
        } else {
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
    }
    // Handle operator keys (+, -, x, /)
    else if (['+', '-', '*', '/'].includes(keyValue)) {
        handleOperator(keyValue);
    }
    // Handle equals key (=)
    else if (keyValue === '=' || keyValue === 'Enter') {
        calculate();
        equalsClicked = true;
    }
    // Handle backspace key
    else if (keyValue === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
    }
    // Handle clear key (Esc)
    else if (keyValue === 'Escape') {
        currentInput = '0';
        previousInput = null;
        previousOperator = null;
    }
    updateDisplay();
});

function handleOperator(operator) {
    if (previousOperator!== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = '0';
    previousOperator = operator;
}

function calculate() {
    let result = 0;
    switch (previousOperator) {
        case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
    }
    currentInput = result.toString();
    previousInput = null;
    previousOperator = null;
}

function updateDisplay() {
    display.textContent = currentInput;
}

// Handle theme slider change
themeSlider.addEventListener('input', () => {
    const themeValue = themeSlider.value;
    switch (themeValue) {
        case '1':
            document.body.style.backgroundColor = 'hsl(222, 26%, 31%)';
            document.querySelector('.calculator').style.backgroundColor = 'hsl(222, 26%, 31%)';
            document.querySelector('body').style.color = 'white';
            display.style.backgroundColor = 'hsl(224, 36%, 15%)';
            document.querySelector('.buttons').style.backgroundColor = 'hsl(223, 31%, 20%)';
            document.querySelector('.theme-slider').style.backgroundColor = 'hsl(223, 31%, 20%)';
            break;
        case '2':
            document.body.style.backgroundColor = 'hsl(0, 0%, 90%)';
            document.querySelector('.calculator').style.backgroundColor = 'hsl(0, 0%, 90%)';
            document.querySelector('body').style.color = 'black';
            display.style.backgroundColor = 'hsl(0, 0%, 93%)';
            document.querySelector('.buttons').style.backgroundColor = 'hsl(0, 5%, 81%)';
            document.querySelector('.theme-slider').style.backgroundColor = 'rgb(209, 204, 204)';
            break;
    }
});
