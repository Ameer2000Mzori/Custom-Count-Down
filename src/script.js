// getting our elements
const counterWrapper = document.getElementsByClassName("counter-wrapper")[0];
const inputText = document.getElementsByClassName("input-text")[0];
const inputDate = document.getElementsByClassName("input-date")[0];
const submitBtn = document.getElementsByClassName("submit-date")[0];
const formEl = document.getElementsByClassName("form")[0];
const header = document.getElementsByClassName("header")[0];
const header2 = document.getElementsByClassName("header-2")[0];

// elements after submit date
const counterOnWrapper = document.getElementsByClassName("counter-on")[0];
const contentTitle = document.getElementsByClassName("name-count")[0];
const contentDays = document.getElementsByClassName("number-days")[0];
const contentHours = document.getElementsByClassName("number-hours")[0];
const contentMin = document.getElementsByClassName("number-min")[0];
const contentSec = document.getElementsByClassName("number-sec")[0];
const restBtn = document.getElementsByClassName("rest-btn")[0];

const errorText = document.createElement("p");
const newDate = new Date().toISOString().split("T")[0];

let countDowntitle = "";
let countDownDate = "";
let countDownValue = Date;
let countDownActive;

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;

inputDate.setAttribute("min", newDate);

function updateDom() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const mints = Math.floor((distance % hour) / min);
    const seconds = Math.floor((distance % min) / second);
    console.log(days, hours, mints, seconds);

    //put values to our UI
    contentTitle.textContent = `${inputText.value}`;
    contentDays.textContent = `${days}`;
    contentHours.textContent = `${hours}`;
    contentMin.textContent = `${mints}`;
    contentSec.textContent = `${seconds}`;
    // hide
    header.classList.add("active");

    header2.classList.add("active");
  }, second);
}

function updateCountDown(e) {
  e.preventDefault();
  countDowntitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  console.log(countDowntitle, countDownDate);
  // get number version of current date, updateDom
  if (countDownDate === "") {
    console.log("error");
  } else {
    countDownValue = new Date(countDownDate).getTime();
    console.log(countDownValue);
    updateDom();
  }
}

//rest all values
function reset() {
  header2.classList.remove("active");
  header.classList.remove("active");
  clearInterval(countDownActive);
  contentTitle = "";
  countDownDate = "";
}

formEl.addEventListener("submit", updateCountDown);
restBtn.addEventListener("click", reset);
