let operations = {
    "÷": function(a,b) { return a/b;},
    "×": function(a,b) { return a*b;},
    "-": function(a,b) { return a-b;},
    "+": function(a,b) { return parseFloat(a)+parseFloat(b);}
  }
  
  let operatorChars = Object.keys(operations);
  let input = document.getElementById('input');
  let numbers = document.querySelectorAll('.numbers div'); 
  let operators = document.querySelectorAll('.operators div'); 
  let result = document.getElementById('result'); 
  let clear = document.getElementById('clear');
  let resultDisplayed = false; 
  
 
  for (let i=0; i<numbers.length; i++) {
    numbers[i].addEventListener("click", function(e) {
      let currentString = input.innerHTML;
      let lastChar = currentString[currentString.length - 1];
  
      if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
      } 
      else if (resultDisplayed === true && operatorChars.indexOf(lastChar) >= 0) {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } 
      else {
        resultDisplayed = false;
        input.innerHTML = e.target.innerHTML;
      }
  
    });
  }
  
  
  for (let i=0; i<operators.length; i++) {
    operators[i].addEventListener("click", function(e) {
  
      
      let currentString = input.innerHTML;
      let lastChar = currentString[currentString.length - 1];
      
      if (operatorChars.indexOf(lastChar) >= 0) {
        let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } 
      else if (currentString.length !== 0) {
        input.innerHTML += e.target.innerHTML;
      }
  
  });
  }
  
  
  result.addEventListener("click", function() {
  
    let inputString = input.innerHTML;
    let numbers = inputString.split(/\+|\-|\×|\÷/g);
    let operators = inputString.replace(/[0-9]|\./g, "").split("");
    let operatorChars = Object.keys(operations);

    for (let i=0; i<operatorChars.length; i++) {
      let currentOperator = operatorChars[i];
      let currentOperation = operations[currentOperator];
      let nextOperationToExecute = operators.indexOf(currentOperator);

      while (nextOperationToExecute !== -1) {
          
        let nextResult = currentOperation(numbers[nextOperationToExecute], numbers[nextOperationToExecute + 1]);
        numbers.splice(nextOperationToExecute, 2, nextResult);
        operators.splice(nextOperationToExecute, 1);
        let nextOperationToExecute = operators.indexOf(currentOperator);
      }
    }
      
    input.innerHTML = numbers[0]; 
    resultDisplayed = true; 
  });
  clear.addEventListener("click", function() {
    input.innerHTML = "";
  })