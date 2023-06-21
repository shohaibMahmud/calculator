const mainDisplay = document.querySelector("#main-display");
const miniDisplay = document.querySelector("#mini-display");

let operands = ["0", "0"];
let currentOperand = 0;
let operate = null;
let operandResult = false;
let operandFloat = false;

clear();

function clear(){
    operands[0] = "0";
    operands[1] = "0";
    currentOperand = 0;
    operate = null;
    operandResult = false;
    operandFloat = false;
    mainDisplay.textContent = "0";
    miniDisplay.textContent = "";
}

function evaluate(){
    if (operate){
        miniDisplay.textContent += ` ${operands[currentOperand]}`;
        const a = Number(operands[0]);
        const b = Number(operands[1]);
        if (isNaN(a) || isNaN(b)){
            clear();
            mainDisplay.textContent = "Invalid operand(s)";
        }
        else{
            const res = operate(a, b)
            mainDisplay.textContent = res;
            operands[0] = res;
            operands[1] = "0"
            currentOperand = 1;
            operandResult = true;
            operate = null;
        }
    }
}

function add(a,b){
    return (a+b).toString();
}
function subtract(a,b){
    return (a-b).toString();
}
function multiply(a,b){
    return (a*b).toString();
}
function divide(a,b){
    if (b == 0) return "Indeterminate";
    else return (a/b).toString();
}

function setOperator(e){
    if (operate) evaluate();
    
    const operator = e.target.getAttribute("id");
    if (operandResult) miniDisplay.textContent += ` ${operator}`;
    else{
        miniDisplay.textContent += `${operands[currentOperand]} ${operator}`;
        currentOperand += 1;
        mainDisplay.textContent = operands[currentOperand];
    }
    
    operandResult = false;
    operandFloat = false;
    
    if (operator == "+") operate = add;
    else if (operator == '-') operate = subtract;
    else if (operator == 'x') operate = multiply;
    else operate = divide;
}

function updateOperand(e){
    if (operandResult) clear();
    const digit = e.target.getAttribute("id");
    if (operands[currentOperand]=="0"){ //operand is set to 0. So, discard any leading zero.
        operands[currentOperand] = digit;
        mainDisplay.textContent = digit;
    }
    else{
        operands[currentOperand] += digit;
        mainDisplay.textContent += digit;
    }
}

function toggleSign(){
    if (operands[currentOperand].charAt(0) == "-")
        operands[currentOperand] = operands[currentOperand].slice(1, operands[currentOperand].length);
    else if (operands[currentOperand] != "0")
        operands[currentOperand] = ("-"+operands[currentOperand]);
    mainDisplay.textContent = operands[currentOperand];
}

function makeFloat(){
    if (!operandFloat){
        operands[currentOperand] += ".";
        mainDisplay.textContent += ".";
    }
}

function backSpace(){
    if (operandResult) clear();
    else{
        const len = operands[currentOperand].length;
        if (len==1) operands[currentOperand] = "0";    
        else{
            operands[currentOperand].charAt(len-1) == "." ?
            operandFloat = false : operandFloat = operandFloat;
            operands[currentOperand] = operands[currentOperand].slice(0, operands[currentOperand].length-1);
        }
        mainDisplay.textContent = operands[currentOperand];
    }
}

document.querySelector("#clear").addEventListener("click", clear)

document.querySelectorAll(".number").forEach(button=>{
    button.addEventListener("click", updateOperand);
});


document.querySelectorAll(".operator").forEach(button=>{
    button.addEventListener("click", setOperator);
});

document.querySelector("#sign").addEventListener("click", toggleSign);

document.querySelector("#evaluate").addEventListener("click", evaluate);

document.querySelector("#decimal-point").addEventListener("click", makeFloat)

document.querySelector("#backspace").addEventListener("click", backSpace)

