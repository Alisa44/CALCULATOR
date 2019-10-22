const screen = document.querySelector('.screen');
const digitBtns = document.querySelectorAll('.btn-grey');
const equalBtn = document.querySelector('.btn-equal');
const clearBtn = document.querySelector('.btn-clear');
const mathBtns = document.querySelectorAll('.btn-math');

let a, b;
let result;
let operator;
let keyName;
let number;
let digitBtnClicked = false;
let equalBtnClicked = false;
screen.value = 0;

function digitKey () {
    if (screen.value === '-') {
        screen.value += number
    } else {
        if (equalBtnClicked && result) {
            clear();
            screen.value = '';
            screen.value += number;
        } else {
            if (!b && !digitBtnClicked ||
                !digitBtnClicked && result ||
                screen.value === '0' ||
                (a && b && !result)) {
                screen.value = '';
                screen.value += number
            } else {
                screen.value += number
            }
        }
    }
    digitBtnClicked = true;
}

function mathKey() {
    if (!a && !digitBtnClicked && keyName === '-') {
        screen.value = '-'
    } else {
        if (!a) {
            a = Number(screen.value);
            operator = keyName;
        } else {
            b = Number(screen.value);
            math();
            operator = keyName;
        }
    }
    digitBtnClicked = false;
}

for (let x = 0; x < mathBtns.length; x++) {
    mathBtns[x].addEventListener('click', (event) => {
        if (!a && !digitBtnClicked && event.target.innerText === '-') {
            screen.value = '-'
        } else {
            if (!a) {
                a = Number(screen.value);
                operator = event.target.innerText;
            } else {
                b = Number(screen.value);
                math();
                operator = event.target.innerText;
            }
            digitBtnClicked = false;
        }
    })
}

function math() {
    if (digitBtnClicked) {
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
        }
        screen.value = result;
        a = result;
        digitBtnClicked = false;
        console.log(`Math is done. a = ${a}, b = ${b}, result = ${result}; 
        digitBtn = ${digitBtnClicked}, equalBtn = ${equalBtnClicked}` )
    }
}

function equal() {
    if (equalBtnClicked === false && a && digitBtnClicked === true || equalBtnClicked === true && digitBtnClicked === true && !operator) {
        b = Number(screen.value);
        digitBtnClicked = true;
        math();
        console.log('if 1');
    } else {
        if (!a) {
            console.log(`else if !a; a = ${a}`);
            a = Number(screen.value);
            result = a;
            digitBtnClicked = true;
        } else {
            if (!b) {
                console.log('else if 2');
                b = a;
                digitBtnClicked = true;
                math();
            } else {
                console.log('else');
                digitBtnClicked = true;
                math();
            }
        }

    }
    equalBtnClicked = true;
    console.log(`equalBtn is ${equalBtnClicked}`);
}

for (let i = 0; i < digitBtns.length; i++) {
    digitBtns[i].addEventListener('click', () => {
        number = digitBtns[i].getAttribute('data-num');
        digitKey()
    })
}

equalBtn.addEventListener('click', () => equal());

clearBtn.addEventListener('click', () => clear());

document.addEventListener('keyup',(event) => {
        keyName = event.key;
        switch (keyName) {
            case '.' :
                number = '.';
                digitKey();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                number = Number(keyName);
                digitKey();
                break;
            case '/' :
            case '*' :
            case '+' :
            case '-' :
                mathKey();
                break;
            case '=':
            case 'Enter':
                equal();
                break;
            case 'Escape':
                clear();
                break;
        }
    });

function clear() {
    digitBtnClicked = false;
    equalBtnClicked = false;
    operator = undefined;
    screen.value = 0;
    a = 0;
    b = 0;
    result = 0;
}

//screen.addEventListener('input', () => console.log('changed'));
