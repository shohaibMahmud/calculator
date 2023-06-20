const mainDisplay = document.querySelector("#main-display");
const miniDisplay = document.querySelector("#mini-display");

let operands = ["0", "0"];
let currentOperand = 0;
let operate = null;
let operandResult = false;

clear();

function clear(){
    operands[0] = "0";
    operands[1] = "0";
    currentOperand = 0;
    operate = null;
    operandResult = false;
    mainDisplay.textContent = "0";
    miniDisplay.textContent = "0";
}

function evaluate(){
    if (operate){
        const a = Number(operands[0]);
        const b = Number(operands[1]);
        if (isNaN(a) || isNaN(b))
            mainDisplay.textContent = "Invalid operand(s)";
        else{
            const res = operate(a, b)
            let miniText =  miniDisplay.textContent + ` ${operands[1]}`;
            mainDisplay.textContent = res;
            miniDisplay.textContent = miniText;
            operands[0] = res;
            operands[1] = "0"
            currentOperand = 0;
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
    if (operandResult) miniDisplay.textContent += " "+operator;
    else miniDisplay.textContent = operands[currentOperand]+" "+operator;
    operandResult = false;
    currentOperand += 1;
    if (operator == "+") operate = add;
    else if (operator == '-') operate = subtract;
    else if (operator == 'x') operate = multiply;
    else operate = divide;
}

function updateOperand(e){
    if (operandResult) clear();
    const digit = e.target.getAttribute("id");
    if (operands[currentOperand]!="0" || digit==".") operands[currentOperand] += digit;
    else operands[currentOperand] = digit;
    mainDisplay.textContent = operands[currentOperand];
}

function toggleSign(){
    if (operands[currentOperand].charAt(0) == "-")
        operands[currentOperand] = operands[currentOperand].slice(1, operands[currentOperand].length);
    else
        operands[currentOperand] = ("-"+operands[currentOperand]);
    mainDisplay.textContent = operands[currentOperand];
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


