
let zoom = false;
let currentColor = null;
let prevNum = '';
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
const equalsButton = document.querySelector('.equals')


let ePower = currentNum.slice(maxDisplay).length


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
    addFlag = false;
    subtractFlag = false;
    multiplyFlag = false;
    divideFlag = false;
    prevNum = '';
    currentNum = '';
    display.textContent = '';
};

const addToDisplay = () => {
    display.textContent = currentNum;
    if (display.textContent.length > maxDisplay) {
        display.textContent = currentNum.slice(0, maxDisplay) + '..' + `e+${ePower}`
    }
};

const displayNum = (e) => {
    currentNum += e.target.textContent;
    addToDisplay();
};

const capturePrevNum = () => {
    if (prevNum === '') {
        prevNum = currentNum;
        currentNum = '';
        return
    }
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


const plusMinus = () => {
    currentNum = +currentNum;
    currentNum = -currentNum
    currentNum = currentNum.toString();
    addToDisplay();
};

const calculatePercent = () => {
    currentNum = +currentNum;
    currentNum *= .01;
    currentNum = currentNum.toString();
    addToDisplay();
};



const switchFlags = (flag) => {
    if (flag === 'addFlag') {
        addFlag = true;
        subtractFlag = false;
        multiplyFlag = false;
        divideFlag = false;
    } else if (flag === 'subtractFlag') {
        addFlag = false;
        subtractFlag = true;
        multiplyFlag = false;
        divideFlag = false;
    } else if (flag === 'multiplyFlag'){
        addFlag = false;
        subtractFlag = false;
        multiplyFlag = true;
        divideFlag = false;
    } else if (flag === 'divideFlag'){
        addFlag = false;
        subtractFlag = false;
        multiplyFlag = false;
        divideFlag = true;
    } 
}



const solve = () => {
    if (addFlag) {
        currentNum = (+prevNum + +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (subtractFlag) {
        currentNum = (+prevNum - +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (multiplyFlag) {
        if (currentNum === '') {
            currentNum = 1;
        };
        currentNum = (+prevNum * +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (divideFlag) {
        if (currentNum === '') {
            currentNum = 1;
        }
        currentNum = (+prevNum / +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    }
};


const add = () => {
    if(!addFlag) {
        solve();
        switchFlags('addFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('addFlag');
};


const subtract = () => {
    if (!subtractFlag) {
        solve();
        switchFlags('subtractFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('subtractFlag');
};

const multiply = () => {
    if (!multiplyFlag) {
        solve();
        switchFlags('multiplyFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('multiplyFlag');
};

const divide = () => {
    if (!divideFlag) {
        solve();
        switchFlags('divideFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('divideFlag');
};






changeBackgroundButton.addEventListener('click', setColor);
changeBackgroundButton.addEventListener('click', changeBackground);

changeCalcColorButton.addEventListener('click', setColor);
changeCalcColorButton.addEventListener('click', changeCalcColor);

changeButtonColorButton.addEventListener('click', setColor);
changeButtonColorButton.addEventListener('click', changeCalcButtons);

zoomButton.addEventListener('click', zoomCalc);

operators.forEach(button => {
    button.addEventListener('click', toggleActive)
});

clearButton.addEventListener('click', clearDisplay);








decimalButton.addEventListener('click', addDecimal);

plusMinusButton.addEventListener('click', plusMinus);

percentButton.addEventListener('click', calculatePercent);

sqrtButton.addEventListener('click', calculateSqrt);






numberButtons.forEach(button => {
    button.addEventListener('click', displayNum);
});

equalsButton.addEventListener('click', solve)

addButton.addEventListener('click', add)

subtractButton.addEventListener('click', subtract)

multiplyButton.addEventListener('click', multiply)

divideButton.addEventListener('click', divide)

// have clear remove the active status for opertaors