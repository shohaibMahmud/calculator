const MAIN_DIS_CHAR_LIM = 28;
const MINI_DIS_CHAR_LIM = 56;
const mainDisplay = document.querySelector("#main-display");
const miniDisplay = document.querySelector("#mini-display");

let operands = ["0", "0"];  // Operands value set to 0 as default
let currentOperand = 0;     // Denotes first or second operand
let operate = null;        // reference to add, mul... function
let operandResult = false; //denotes operand 0 is from previous result
let operandFloat = false; //denotes current operand is a float

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

function updateMiniDisplay(text){
    if ((miniDisplay.textContent.length+text.length)<MINI_DIS_CHAR_LIM){
        miniDisplay.textContent += text;
    }
    else if(miniDisplay.textContent.length != MINI_DIS_CHAR_LIM){
        const temp = (miniDisplay.textContent+text).slice(0, MINI_DIS_CHAR_LIM-3)+"...";
        miniDisplay.textContent = temp;
    }
}

function evaluate(){
    if (operate){
        //miniDisplay.textContent += ` ${operands[currentOperand]}`;
        updateMiniDisplay(` ${operands[currentOperand]}`)
        const a = Number(operands[0]);
        const b = Number(operands[1]);
        if (isNaN(a) || isNaN(b)){
            clear();
            mainDisplay.textContent = "Invalid operand(s)";
        }
        else{
            let res = operate(a, b);
            if (res.length > MAIN_DIS_CHAR_LIM){   //Rounding number to fit display. Not tested thoroughly
                const decim_chars = res.indexOf(".");
                if (decim_chars == -1) res = res.slice(0, MAIN_DIS_CHAR_LIM);
                else res = Number(res).toFixed(MAIN_DIS_CHAR_LIM-decim_chars);
            }
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
    return (a+b).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 20, useGrouping: false});
}
function subtract(a,b){
    return (a-b).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 20, useGrouping: false});
}
function multiply(a,b){
    return (a*b).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 20, useGrouping: false});
}
function divide(a,b){
    if (a==0 && b == 0) return "Undefined";
    else if (b == 0) return "Indeterminate";
    else return (a/b).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 20, useGrouping: false});
}

function setOperator(e){
    if (operate) evaluate();
    
    const operator = e.target.getAttribute("id");
    if (operandResult) updateMiniDisplay(` ${operator}`);
    else{
        updateMiniDisplay(`${operands[currentOperand]} ${operator}`);
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
    else if(operands[currentOperand].length<MAIN_DIS_CHAR_LIM){
        operands[currentOperand] += digit;
        mainDisplay.textContent += digit;
    }
}

function toggleSign(){
    if (operandResult) clear();
    if (operands[currentOperand].charAt(0) == "-")
        operands[currentOperand] = operands[currentOperand].slice(1, operands[currentOperand].length);
    else if (operands[currentOperand] != "0")
        operands[currentOperand] = ("-"+operands[currentOperand]);
    mainDisplay.textContent = operands[currentOperand];
}

function makeFloat(){
    if (operandResult) clear();
    if (!operandFloat){
        operands[currentOperand] += ".";
        mainDisplay.textContent = operands[currentOperand];
        operandFloat = true;
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
clear();
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

