/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll(".button");
const calculator = document.querySelector("#calculator");
const display = document.querySelector(".display");

/*-------------------------------- Variables --------------------------------*/
let currentInput = "";
let previousInput = "";
let operator = "";

/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener("click", (event) => {
  const char = event.target.innerText;

  if (event.target.classList.contains("number")) {
    currentInput += char;
    display.innerText = currentInput;
  }

  if (event.target.classList.contains("operator")) {
    if (currentInput !== "") {
      previousInput = currentInput;
      currentInput = "";
    }
    operator = char;
  }

  if (event.target.classList.contains("equals")) {
    if (previousInput !== "" && currentInput !== "") {
      calculation = calFunction(previousInput, operator, currentInput);
      display.innerText = calculation;
      previousInput = calculation.toString();
      currentInput = "";
    }
  }

  if (char === "C") {
    currentInput = "";
    previousInput = "";
    operator = "";
    display.innerText = "0";
  }
});

/*-------------------------------- Functions --------------------------------*/

function calFunction(previousInput, operator, currentInput) {
  switch (operator) {
    case "+":
      return Number(previousInput) + Number(currentInput);
    case "*":
      return Number(previousInput) * Number(currentInput);
    case "-":
      return Number(previousInput) - Number(currentInput);
    case "/":
      return Number(previousInput) / Number(currentInput);
  }
}
