const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

strNum1 = "";
strNum2 = "";
opr = "";
collectedNum1 = false;
collectedNum2 = false;
collectedOpr = false;
collectedNum1point = false;
collectedNum2point = false;

buttons.forEach(eventListner)

function eventListner(button){
    button.addEventListener("click",dataCollection);
}

function dataCollection(e){
    data = e.srcElement.id;
    //console.log(data);
    if((0 <= data -"0") && (data - "0" <= 9)){
        //console.log("got number " + data);
        if(!collectedOpr){
            strNum1 = strNum1 + data;
            collectedNum1 = true;
            console.log("updates num1");
            updateDisplay();
        }else{
            strNum2 = strNum2 + data;
            collectedNum2 = true;
            updateDisplay();    
        }

    }
    if((data == "+") || (data == "-")){
        if(!collectedNum1){
            strNum1 = data;
            updateDisplay()
            return;
        }
        if(collectedNum2){
            displayError();
            return;
        }
        opr = data;
        collectedOpr = true;
        updateDisplay();
    }
    if((data == "*") || (data == "/")){
        if((!collectedNum1) || (collectedNum2)){
            displayError();
            return;
        }
        opr = data;
        collectedOpr = true;
        updateDisplay();
    }
    if(data == "="){
        if(collectedNum1 && !collectedOpr){
            strNum1 = String(Number(strNum1));
            updateDisplay();
            return;
        }
        if(collectedNum2){
            num1 = Number(strNum1);
            num2 = Number(strNum2);
            strNum1 = String(operation(num1,num2, opr));
            strNum2 = "";
            opr = "";
            regex = /\./;
            collectedNum1 = true;
            collectedNum2 = false;
            collectedOpr = false;
            collectedNum1point = regex.test(strNum1);
            collectedNum2point = false;
            updateDisplay();
            return;
        }
        displayError();
    }
    if(data == "refresh"){
        strNum1 = "";
        strNum2 = "";
        opr = "";
        collectedNum1 = false;
        collectedNum2 = false;
        collectedOpr = false;
        collectedNum1point = false;
        collectedNum2point = false;
        updateDisplay();
        console.log("display cleared");
    }
    if(data == "."){
        
        console.log("data = .");
        if(!collectedOpr && !collectedNum1point){
            strNum1 = strNum1 + data;
            collectedNum1point = true;
            updateDisplay();
            return;
        }
        if(collectedOpr && !collectedNum2point){
            strNum2 = strNum2 + ".";
            collectedNum2 = true;
            updateDisplay();
            return;
        }
        displayError();
    }
    if(data == "clear"){
        // Add this functionality later
        regex = /.$/;
        if(collectedNum2){
            if(strNum2.match(regex)[0] == "."){
                collectedNum2point = false;
            }
            strNum2 = strNum2.replace(regex,"");
            collectedNum2 = (strNum2.length > 0);
            updateDisplay();
            return;
        }
        if(!collectedNum2 && collectedOpr){
            collectedOpr = false;
            opr = "";
            updateDisplay();
            return;
        }
        if(collectedNum1 && !collectedOpr){
            if(strNum1.match(regex)[0] == "."){
                collectedNum1point = false;
            }
            strNum1 = strNum1.replace(regex,"");
            collectedNum1 = (strNum1.length > 0);
            updateDisplay();
            return;
        }
        if(!collectedNum1){
            strNum1 = "";
            updateDisplay();
            return;
        }
    }
}

function updateDisplay(){
    textToPrint = strNum1 + opr + strNum2;
    display.textContent = textToPrint
    console.log("dispaly updated")
}

function displayError(){
    display.setAttribute("style","background-color:orangered")
    setTimeout(() =>{
        display.setAttribute("style", "background-color:white")
    },200);
}

function operation(num1, num2, opr) {
    var result;
    switch(opr){
        case "+":
            result  = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1/num2;
            break
        default:
            console.log("in function operation unknown opr found");
            return NaN;
            break;
    }
    return result;
}

