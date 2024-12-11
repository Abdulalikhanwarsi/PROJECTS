
const selectBtnFromDom = document.querySelector(".buttons");

const inputField = document.querySelector(".screen");

selectBtnFromDom.addEventListener("click", function (e) {
  const currentElement = e.target;

  const getNumAttribute = currentElement.getAttribute("data-num");

  if (getNumAttribute) {
    inputField.value += getNumAttribute;
  }

  if (currentElement.classList.contains("btn-clear")) {
    inputField.value = "";
  }

  if (currentElement.classList.contains("btn-equal")) {
    inputField.value = eval(inputField.value);
  }
});
