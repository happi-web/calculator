const displayArea = document.querySelector("#display-area");
const numbers = document.querySelectorAll(".num");
const operatorButton = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const point = document.querySelector("#point");
const percentage = document.querySelector("#percentage");
const equals = document.querySelector("#equals");

let currentOperand = "";
let previousOperand = "";
let operation = "";


displayArea.setAttribute("style", "color:red; font-size:48px;text-align:left; font-weight:bold;")
// Handle number button clicks
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand === "0" && button.textContent === "0") return; // Prevent multiple leading zeros
    if (operation === "" && previousOperand === "") {
      currentOperand = currentOperand; // Ensure decimal numbers aren't cleared
    }
    currentOperand += button.textContent; // Append the clicked number
    updateDisplay();
  });
});

// Handle decimal point
point.addEventListener("click", () => {
  if (currentOperand === "") {
    currentOperand = "0"; // Add leading zero if empty
  }
  if (!currentOperand.includes(".")) {
    currentOperand += "."; // Append decimal point
  }
  updateDisplay();
});

// Update the display
function updateDisplay() {
  if (operation && previousOperand) {
    displayArea.textContent = `${previousOperand} ${operation} ${currentOperand}`;
  } else {
    displayArea.textContent = currentOperand || "0";
  }
}

// Handle operator button clicks
operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand === "") return; // Do nothing if no number is entered
    if (previousOperand !== "") calculate(); // Calculate if there's a previous operand
    operation = button.textContent; // Set the clicked operator
    previousOperand = currentOperand; // Move current to previous
    currentOperand = ""; // Clear currentOperand for new input
    updateDisplay();
  });
});

// Perform the calculation
function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return; // Prevent calculation if invalid inputs
  let result;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString(); // Store the result as a string
  operation = ""; // Clear operation
  previousOperand = ""; // Clear previousOperand
  updateDisplay(); // Update the display with the result
}

// Handle equals button click
equals.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

// Handle clear button click
clear.addEventListener("click", () => {
  currentOperand = "";
  previousOperand = "";
  operation = "";
  displayArea.textContent = "0"; // Explicitly clear the display
});

// Handle percentage button click
percentage.addEventListener("click", () => {
  if (currentOperand !== "") {
    currentOperand = (parseFloat(currentOperand) / 100).toString(); // Convert to percentage
    updateDisplay();
  }
});
