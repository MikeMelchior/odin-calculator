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
const clearButton = document.querySelector('.clear');
const display = document.querySelector('#display');
const decimalButton = document.querySelector('.decimal');
const numberButtons = document.querySelectorAll('#number.btn');
const plusMinusButton = document.querySelector('.plus-minus');
const percentButton = document.querySelector('.percent');
const sqrtButton = document.querySelector('.sqrt');
const operators = document.querySelectorAll('button.operator');
const addButton = document.querySelector('.plus');
const subtractButton = document.querySelector('.minus');
const divideButton = document.querySelector('.divide');
const multiplyButton = document.querySelector('.multiply');
const equalsButton = document.querySelector('.equals');
const undoButton = document.querySelector('.undo');


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
    try {
        e.target.classList.toggle('active')
    }
    catch {
        console.log('error: numpad e.target is body')
    }
};

const removeActive = () => {
    operators.forEach(operator => {
        operator.classList.remove('active');
})};

const clearAnswered = () => {
    if (answered && !addFlag && !subtractFlag && !multiplyFlag && !divideFlag) {
        prevNum = '';
        answered = false;
}};

const clearDisplay = () => {
    addFlag = false;
    subtractFlag = false;
    multiplyFlag = false;
    divideFlag = false;
    prevNum = '';
    currentNum = '';
    display.textContent = '';
    removeActive();
};

const undo = () => {
    currentNum = currentNum.slice(0, currentNum.length-1);
    addToDisplay();
};

const addToDisplay = () => {
    display.textContent = currentNum;
    if (currentNum.indexOf('e') != -1) {
        if(currentNum.length < maxDisplay) {
            display.textContent = currentNum;
            return
        }  
    } else if (display.textContent.length > maxDisplay) {
        display.textContent = currentNum.slice(0, maxDisplay) + `e+${currentNum.slice(maxDisplay).length}`
}};

const displayNum = (e) => {
    currentNum += e.target.textContent;
    addToDisplay();
};

const capturePrevNum = () => {
    if (prevNum === '') {
        prevNum = currentNum;
        currentNum = '';
        return
}};

const calculateSqrt = () => {
    currentNum = + currentNum;
    currentNum = currentNum ** (1/2);
    currentNum = currentNum.toString();
    addToDisplay();
};

const addDecimal = () => {
    clearAnswered();
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
}};

const solve = () => {
    if (addFlag) {
        answered = true;
        currentNum = (+prevNum + +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (subtractFlag) {
        answered = true;
        currentNum = (+prevNum - +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (multiplyFlag) {
        answered = true;
        if (currentNum === '') {
            currentNum = 1;
        };
        currentNum = (+prevNum * +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    } else if (divideFlag) {
        answered = true;
        if (currentNum === '') {
            currentNum = 1;
        } else if (currentNum === '0') {
            clearDisplay();
            display.textContent = "you can't do that";
            return;
        }
        currentNum = (+prevNum / +currentNum).toString();
        addToDisplay();
        prevNum = currentNum;
        currentNum = '';
    }
    addFlag = false;
    subtractFlag = false;
    multiplyFlag = false;
    divideFlag = false;
};

const add = () => {
    answered = false;
    if(!addFlag) {
        solve();
        switchFlags('addFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('addFlag');
};

const subtract = () => {
    answered = false;
    if (!subtractFlag) {
        solve();
        switchFlags('subtractFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('subtractFlag');
};

const multiply = () => {
    answered = false;
    if (!multiplyFlag) {
        solve();
        switchFlags('multiplyFlag');
    }
    capturePrevNum();
    solve();
    switchFlags('multiplyFlag');
};

const divide = () => {
    answered = false;
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

const toggler = operators.forEach(button => {
    button.addEventListener('click', toggleActive)
});

clearButton.addEventListener('click', clearDisplay);

decimalButton.addEventListener('click', addDecimal);

plusMinusButton.addEventListener('click', plusMinus);

percentButton.addEventListener('click', calculatePercent);

sqrtButton.addEventListener('click', calculateSqrt);

numberButtons.forEach(button => {
    button.addEventListener('click', displayNum);
    button.addEventListener('click', clearAnswered);
});

equalsButton.addEventListener('click', removeActive);
equalsButton.addEventListener('click', solve);

addButton.addEventListener('click', add);

subtractButton.addEventListener('click', subtract);

multiplyButton.addEventListener('click', multiply);

divideButton.addEventListener('click', divide);

// have clear remove the active status for operators

undoButton.addEventListener('click', undo)

const useKeyboard = (e) => {
    switch (e.code) {
        case 'Numpad0':
            currentNum += 0;            
            addToDisplay();
            break;
        case 'Numpad1':
            currentNum += 1;
            addToDisplay();
            break;
        case 'Numpad2':
            currentNum += 2;
            addToDisplay();
            break;
        case 'Numpad3':
            currentNum += 3;
            addToDisplay();
            break;
        case 'Numpad4':
            currentNum += 4;
            addToDisplay();
            break;
        case 'Numpad5':
            currentNum += 5;
            addToDisplay();
            break;
        case 'Numpad6': 
            currentNum += 6;
            addToDisplay();
            break;
        case 'Numpad7':
            currentNum += 7;
            addToDisplay();
            break;
        case 'Numpad8':
            currentNum += 8;
            addToDisplay();
            break;
        case 'Numpad9':
            currentNum += 9;
            addToDisplay();
        default:
            break;
    };
    switch (e.keyCode) {
        // enter button (equals)
        case 13:
            removeActive();
            solve();
            break;
        // numpad '+' 
        case 107:
            toggleActive();
            document.querySelector('.plus').classList.add('active');
            add();
            break;
        // numpad '-'
        case 109:
            toggleActive();
            document.querySelector('.minus').classList.add('active');
            subtract();
            break;
        // numpad '*'
        case 106:
            toggleActive();
            document.querySelector('.multiply').classList.add('active');
            multiply();
            break;
        // numpad '/'
        case 111:
            toggleActive();
            document.querySelector('.divide').classList.add('active');
            divide();
            break;
        //numpad '.'
        case 46:
            addDecimal();
            break;
        // num lk (A/C)
        case 144:
            clearDisplay();
            break;
        // '+/=' button, (calc sqrt)
        case 187:
            calculateSqrt();
            break;
        // '-/_' button (calc percent)
        case 189:
            calculatePercent();
            break;
        // ')/0' button (positive/negative)
        case 48:
            plusMinus();
            break;
        // backspace (undo)
        case 8:
            undo();
            break;
        default:
            break;
}};

document.addEventListener('keydown', useKeyboard);