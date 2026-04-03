// selecting DOM Element
const range = document.querySelector(".range");
const result = document.querySelector(".password-generated");
const copy = document.querySelector(".icon");
const checkBoxes = document.querySelectorAll(".input-checkbox");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const number = document.getElementById("number");
const symbols = document.getElementById("symbols");
const initialText = "P4$5W0rD!";
const strengthBoxes = document.querySelectorAll(".box");

document.querySelector(".copy").addEventListener("click", () => {
  navigator.clipboard
    .writeText(result.textContent)
    .then(copyText())
    .catch((err) => console.log(err.message));
});

// initial values
let count = 0;
const color = "rgb(248, 205, 101)";

//Handling character length
function handleCharacterLength() {
  if (range.value < 10) {
    result.innerHTML = `<p class='error'>character length low than 10</p>`;

    setTimeout(() => {
      result.textContent = initialText;
    }, 1000);
  } else {
    if (!generatePassword(Number(range.value))) {
      result.innerHTML = `<p class='error'>choose at least one or two characters</p>`;
    } else {
      result.textContent = generatePassword(Number(range.value) + 1);
      result.style.color = "#fff";
    }
  }
}

// control the range slider
range.addEventListener("input", function (e) {
  const percentage =
    ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100 +
    "%";
  e.target.style.setProperty("--percent", percentage);
  e.target.style.background = `liniar-gradient(to right, #a4ffaf ${percentage}, #000 ${percentage})`;
  document.querySelector(".value").textContent = range.value;
});

// copied password
function copyText() {
  if (result.textContent === initialText) return;
  document.querySelector(".copy-text").style.display = "flex";
  setTimeout(function () {
    document.querySelector(".copy-text").style.display = "none";
  }, 500);
}

function generatePassword(length) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolsChars = "!@#$%^&*()";

  let allowedChars = "";

  allowedChars += lowercase.checked ? lowercaseChars : "";
  allowedChars += uppercase.checked ? uppercaseChars : "";
  allowedChars += number.checked ? numberChars : "";
  allowedChars += symbols.checked ? symbolsChars : "";

  let password = "";

  if (allowedChars.length === 0) {
    result.innerHTML = `<p class='error'>choose at least one or two characters</p>`;
    setTimeout(() => {
      result.innerHTML = initialText;
    }, 1000);
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }
  }
  return password;
}

// generatePassword(12);

checkBoxes.forEach((el) => el.addEventListener("input", function (e) {}));

document.querySelector(".btn-generate").addEventListener("click", function (e) {
  e.preventDefault();
  handleCharacterLength();
});

checkBoxes.forEach((el) =>
  el.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.checked) {
      count++;
      checkCount(count);
    } else {
      count--;
      const lastColorEl = [...strengthBoxes].findLast((el) => {
        return el.style.background === color;
      });
      document.querySelector(`#${lastColorEl.id}`).style.background = "#000";
      checkCount(count);
    }
    switch (count) {
      case 1:
        return (strengthBoxes[0].style.background = color);
      case 2:
        return (
          (strengthBoxes[0].style.background = color) &&
          (strengthBoxes[1].style.background = color)
        );
      case 3:
        return (
          (strengthBoxes[0].style.background = color) &&
          (strengthBoxes[1].style.background = color) &&
          (strengthBoxes[2].style.background = color)
        );
      case 4:
        return (
          (strengthBoxes[0].style.background = color) &&
          (strengthBoxes[1].style.background = color) &&
          (strengthBoxes[2].style.background = color) &&
          (strengthBoxes[3].style.background = color)
        );
    }
  }),
);

function checkCount(count) {
  if (count === 0 || count < 3) {
    document.querySelector(".info").textContent = "WEAK";
  } else if (count === 3) {
    document.querySelector(".info").textContent = "MEDIUM";
  } else {
    document.querySelector(".info").textContent = "STRONG";
  }
}
