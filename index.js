const selectElement = (element) => {
  return document.querySelector(element);
};
const showErrorMessage = (
  errorElement,
  errorMessage = "This field is required"
) => {
  let selectedElement = errorElement
    .closest("div")
    .querySelector(".error-message");
  let selectedLabel = errorElement.closest("div").querySelector("label");
  console.log(selectedElement);
  console.log(errorMessage);
  selectedLabel.style.color = "red";
  errorElement.style.borderColor = "red";
  selectedElement.textContent = errorMessage;
  selectedElement.style.display = "block";
};
const clearErrorMessage = (errorElement) => {
  errorElement.style.borderColor = "black";
  errorElement.closest("div").querySelector(".error-message").style.display =
    "none";
  errorElement.closest("div").querySelector("label").style.color = "black";
};

const checkingWithValidValue = (input, value) => {
  return input.value >= value ? false : true;
};

const calculateAge = (days, months, years) => {
  const today = new Date();
  const userDob = new Date(years, months - 1, days);
  let userAgeYear = today.getFullYear() - userDob.getFullYear();
  let userAgeMonth = null;
  let userAgeDay = null;
  if (userDob.getMonth() > today.getMonth()) {
    userAgeYear--;
    userAgeMonth = 12 - userDob.getMonth() + today.getMonth();
    console.log(userAgeMonth);
  } else {
    userAgeMonth = today.getMonth() - userDob.getMonth();
  }
  if (today.getDate() < userDob.getDate()) {
    userAgeMonth--;
    let dayInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      0
    ).getDate();
    userAgeDay = dayInPreviousMonth + today.getDate() - userDob.getDate();
  } else {
    userAgeDay = today.getDate() - userDob.getDate();
  }
  selectElement(".month-range").textContent = userAgeMonth;
  selectElement(".year-range").textContent = userAgeYear;
  selectElement(".day-range").textContent = userAgeDay;
  return true;
};

const clearInputField = () => {
  selectElement("#mm").value = "";
  selectElement("#dd").value = "";
  selectElement("#yy").value = "";
};
const checkDateValid = (days, months) => {
  let month = parseInt(months.value);
  let day = parseInt(days.value);
  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      if (day > 30) {
        showErrorMessage(days, "Must be a valid date");
        return false;
      }
      break;
    case 2:
      if (day > 29) {
        showErrorMessage(days, "Must be a valid date");
        return false;
      }
      break;
    default:
      break;
  }
  return true;
};

const inputBlankCheck = (...rest) => {
  let isValid = true;
  for (const input of rest) {
    let currentInputValue = parseInt(input.value.length);
    // Check empty input first
    if (currentInputValue === 0) {
      showErrorMessage(input);
      isValid = false;
      continue;
    }
    switch (input.id) {
      case "dd":
        if (!checkingWithValidValue(input, 32)) {
          showErrorMessage(input, "Must be a valid day");
          isValid = false;
          continue;
        }
        break;
      case "mm":
        if (!checkingWithValidValue(input, 13)) {
          showErrorMessage(input, "Must be a valid month");
          isValid = false;
          continue;
        }

        break;
      case "yy":
        const currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        if (!checkingWithValidValue(input, currentYear + 1)) {
          showErrorMessage(input, "Must be in the past");
          isValid = false;
          continue;
        }
        break;
      default:
        console.log("I am in error case");
        break;
    }
    clearErrorMessage(input);
  }
  return isValid;
};

document.addEventListener("DOMContentLoaded", function () {
  selectElement(".button-box").addEventListener("click", function () {
    let monthBox = selectElement("#mm");
    let dayBox = selectElement("#dd");
    let yearBox = selectElement("#yy");
    if (inputBlankCheck(dayBox, monthBox, yearBox)) {
      if (checkDateValid(dayBox, monthBox)) {
        calculateAge(dayBox.value, monthBox.value, yearBox.value);
        clearInputField();
        return;
      }
      console.log("Validation Fail");
    }
  });
});
