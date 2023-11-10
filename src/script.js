// Getting our elements
const counterWrapper = document.querySelector(".counter-wrapper");
const inputText = document.querySelector(".input-text");
const inputDate = document.querySelector(".input-date");
const submitBtn = document.querySelector(".submit-date");
const formEl = document.querySelector(".form");
const header = document.querySelector(".header");
const header2 = document.querySelector(".header-2");

// Elements after submit date
const counterOnWrapper = document.querySelector(".counter-on");
const contentTitle = document.querySelector(".name-count");
const contentDays = document.querySelector(".number-days");
const contentHours = document.querySelector(".number-hours");
const contentMin = document.querySelector(".number-min");
const contentSec = document.querySelector(".number-sec");
const restBtn = document.querySelector(".rest-btn");

const errorText = document.createElement("p");
const newDate = new Date().toISOString().split("T")[0];

let countDowntitle = "";
let countDownDate = "";
let countDownValue = 0;
let countDownActive;
let savedCount;

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;

inputDate.setAttribute("min", newDate);

function updateDom() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const mints = Math.floor((distance % hour) / min);
    const seconds = Math.floor((distance % min) / second);

    // Put values to our UI
    contentTitle.textContent = countDowntitle;
    contentDays.textContent = days;
    contentHours.textContent = hours;
    contentMin.textContent = mints;
    contentSec.textContent = seconds;

    // Hide
    header.classList.add("active");
    header2.classList.add("active");
  }, second);
}

function updateCountDown(e) {
  e.preventDefault();
  countDowntitle = inputText.value;
  countDownDate = inputDate.value;
  console.log(countDowntitle, countDownDate);

  // Get number version of the current date, updateDom
  savedCount = {
    title: countDowntitle,
    date: countDownDate,
  };
  console.log(savedCount);
  localStorage.setItem("savedCount", JSON.stringify(savedCount));

  if (countDownDate === "") {
    console.log("error");
  } else {
    countDownValue = new Date(countDownDate).getTime();
    console.log(countDownValue);
    updateDom();
  }
}

// Reset all values
function reset() {
  header2.classList.remove("active");
  header.classList.remove("active");
  clearInterval(countDownActive);
  countDowntitle = "";
  countDownDate = "";
  localStorage.removeItem("savedCount");
}

function restoreStoredCountDown() {
  if (localStorage.getItem("savedCount")) {
    header.classList.add("active");
    header2.classList.add("active");
    savedCount = JSON.parse(localStorage.getItem("savedCount"));
    countDowntitle = savedCount.title;
    countDownDate = savedCount.date;

    countDownValue = new Date(countDownDate).getTime();
    updateDom();
  }
}

formEl.addEventListener("submit", updateCountDown);
restBtn.addEventListener("click", reset);

document.addEventListener("DOMContentLoaded", function () {
  restoreStoredCountDown();
});
