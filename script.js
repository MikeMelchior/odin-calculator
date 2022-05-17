
let zoom = false;
let currentColor = null;
let firstNum = '';
let currentNum = '';
let answered = false;
let addFlag = false;
let subtractFlag  = false;
let multiplyFlag = false;
let divideFlag = false;
let leftBracket = false;
let maxDisplay = 12;


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
const operators = document.querySelectorAll('button.operator')
const addButton = document.querySelector('.plus');
const subtractButton = document.querySelector('.minus');
const divideButton = document.querySelector('.divide');
const multiplyButton = document.querySelector('.multiply');


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


const toggleActive = (e) => {
    //change opacity of selected operator
    operators.forEach(button => {
        if (button.classList.length == 4) {
            button.classList.toggle('active')
        }});
    e.target.classList.toggle('active')
};

const clearDisplay = () => {
    firstNum = '';
    currentNum = '';
    display.textContent = '';
};

// const checkDisplay = () => {
//     if (currentNum.length > maxDisplay) {
//         let eValue = currentNum.slice(maxDisplay).length;
//         console.log(eValue)
//     }
// };

const captureFirstNum = () => { 
    firstNum = +currentNum;
};

const add = () => {
    if (!firstNum) {
        captureFirstNum();
    } else {
        display.textContent = firstNum + +currentNum;
        firstNum = firstNum + +currentNum;
    }

};

const subtract = (x, y) => {
    return (x-y).toString();
 
};

const multiply = (x, y) => {
    return (x*y).toString();

};

const divide = (x, y) => {
    return (x/y).toString();

};

const calculateSqrt = () => {
    currentNum = + currentNum;
    currentNum = currentNum ** (1/2);
    currentNum = currentNum.toString();
    addToDisplay();
};

const addDecimal = () => {
    if(currentNum.indexOf('.') != -1) {
        return
    };
    currentNum += '.';
    addToDisplay();
};

const addToDisplay = () => {
    display.textContent = currentNum.slice(0, maxDisplay);
    if (currentNum.length > maxDisplay) {
        display.textContent += '..'
    }
};

const displayNum = (e) => {
    if (firstNum) currentNum = '';
    currentNum += e.target.textContent;
    addToDisplay();
};

const plusMinus = () => {
    currentNum = +currentNum;
    currentNum -= currentNum *2;
    currentNum = currentNum.toString();
    addToDisplay();
};

const calculatePercent = () => {
    currentNum = +currentNum;
    currentNum *= .01;
    currentNum = currentNum.toString();
    addToDisplay();
};

const equals = () => {







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

operators.forEach(button => {
    button.addEventListener('click', toggleActive)
});

addButton.addEventListener('click', add)