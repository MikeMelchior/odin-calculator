
let zoom = false;
let currentColor = null;
let displayText = '';
let answer = '';
let insideBrackets = '';
let addFlag = false;
let subtractFlag  = false;
let multiplyFlag = false;
let divideFlag = false;
let leftBracket = false;
let maxDisplay = 18;


const root = document.querySelector('.root');
const colorPicker = document.querySelector('#colorPicker');
const changeBackgroundButton = document.querySelector('#change-background');
const calculator = document.querySelector('.calculator');
const changeCalcColorButton = document.querySelector('#change-calc-color');
const calcButtons = document.querySelectorAll('.column button');
const changeButtonColorButton = document.querySelector('#change-button-color');
const zoomButton = document.querySelector('#zoom');
const clearButton = document.querySelector('.clear')
const display = document.querySelector('#display')
const decimalButton = document.querySelector('.decimal')
const numberButtons = document.querySelectorAll('#number.btn')
const plusMinusButton = document.querySelector('.plus-minus')
const percentButton = document.querySelector('.percent')
const sqrtButton = document.querySelector('.sqrt')

const setColor = () => {
    currentColor = colorPicker.value;
};

const changeBackground = () => {
    root.style.backgroundColor = currentColor;
    // avoid ugly color picker square
    colorPicker.style.backgroundColor = currentColor;
};

const changeCalcColor = () => {
    calculator.style.backgroundColor = currentColor;
};

const changeCalcButtons = () => {
    calcButtons.forEach(button => button.style.backgroundColor = currentColor);
};

const zoomCalc = () => {
        calculator.classList.toggle('zoomed');
};

const clearDisplay = () => {
    displayText = ''
    display.textContent = ''
};

const add = (x, y) => {
    answer = x + y;
};

const subtract = (x, y) => {
    answer = x - y; 
};

const multiply = (x, y) => {
    answer = x * y;
};

const divide = (x, y) => {
    answer = x / y;
};

const calculateSqrt = () => {
    displayText = + displayText;
    displayText = displayText ** (1/2);
    displayText = displayText.toString();
    addToDisplay();
};

const addDecimal = () => {
    if(displayText.indexOf('.') != -1) {
        return
    };
    displayText += '.';
    addToDisplay();
};

const addToDisplay = () => {
    display.textContent = displayText;
};

const displayNum = (e) => {
    displayText += e.target.textContent;
    addToDisplay();
};

const plusMinus = () => {
    displayText = +displayText;
    displayText -= displayText *2;
    displayText = displayText.toString();
    addToDisplay();
};

const calculatePercent = () => {
    displayText = +displayText;
    displayText *= .01;
    displayText = displayText.toString();
    addToDisplay();
};



changeBackgroundButton.addEventListener('click', setColor);
changeBackgroundButton.addEventListener('click', changeBackground);

changeCalcColorButton.addEventListener('click', setColor);
changeCalcColorButton.addEventListener('click', changeCalcColor);

changeButtonColorButton.addEventListener('click', setColor);
changeButtonColorButton.addEventListener('click', changeCalcButtons);

zoomButton.addEventListener('click', zoomCalc);

clearButton.addEventListener('click', clearDisplay);

decimalButton.addEventListener('click', addDecimal);

numberButtons.forEach(button => {
    button.addEventListener('click', displayNum);
});

plusMinusButton.addEventListener('click', plusMinus);

percentButton.addEventListener('click', calculatePercent);

sqrtButton.addEventListener('click', calculateSqrt);