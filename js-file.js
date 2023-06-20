const mainDisplay = document.querySelector("#main-display");
const miniDisplay = document.querySelector("#mini-display");

let operands = ["0", "0"];
let currentOperand = 0;
let operate = null;

clear();

function clear(e=null, mainText="0", miniText="0"){
    operands[0] = "0";
    operands[1] = "0";
    currentOperand = 0;
    operate = null;
    mainDisplay.textContent = mainText;
    miniDisplay.textContent = miniText;
}

function evaluate(){
    if (operate){
        const a = Number(operands[0]);
        const b = Number(operands[1]);
        miniDisplay.textContent += (" "+operands[1]);
        mainDisplay.textContent = operate(a, b);
        clear(null, mainDisplay.textContent, miniDisplay.textContent);
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
    if (operate) currentOperand -= 1;
    const operator = e.target.getAttribute("id");
    miniDisplay.textContent = operands[currentOperand]+" "+operator;
    currentOperand += 1;
    if (operator == "+") operate = add;
    else if (operator == '-') operate = subtract;
    else if (operator == 'x') operate = multiply;
    else operate = divide;
}

function updateOperand(e){
    const digit = e.target.getAttribute("id");
    if (operands[currentOperand]!="0" || digit==".") operands[currentOperand] += digit;
    else operands[currentOperand] = digit;
    mainDisplay.textContent = operands[currentOperand];
}

document.querySelector("#clear").addEventListener("click", clear)

document.querySelectorAll(".number").forEach(button=>{
    button.addEventListener("click", updateOperand);
});


document.querySelectorAll(".operator").forEach(button=>{
    button.addEventListener("click", setOperator);
});

document.querySelector("#evaluate").addEventListener("click", evaluate);


