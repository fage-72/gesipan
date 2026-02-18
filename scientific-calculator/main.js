const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function appendValue(value) {
    if (value === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && value !== '.') {
        currentOperand = value.toString();
    } else {
        currentOperand = currentOperand.toString() + value.toString();
    }
    updateDisplay();
}

function appendScientific(func) {
    if (currentOperand === '0') {
        currentOperand = func + '(';
    } else {
        currentOperand = currentOperand.toString() + func + '(';
    }
    updateDisplay();
}

function compute() {
    let expression = currentOperand
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/π/g, 'Math.PI')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

    try {
        // Simple security check or use a math library for production
        const result = eval(expression);
        previousOperand = currentOperand + ' =';
        currentOperand = result.toString();
        updateDisplay();
    } catch (e) {
        currentOperand = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    previousOperandTextElement.innerText = previousOperand;
}

// Keyboard support
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendValue(e.key);
    if (e.key === '.') appendValue('.');
    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) appendValue(e.key);
});
