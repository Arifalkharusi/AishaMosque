// selectors
const sliderContainer = document.querySelectorAll(".slide");
const slideBtn = document.querySelector(".slide-btn");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const timetableTime = document.querySelector(".timetable-sections");
const timeToPray = timetableTime.querySelectorAll("h2");
const prayerName = timetableTime.querySelectorAll("h1");
const trackPrayerDiv = document.querySelectorAll(".track-prayer");
const prayerTag = document.querySelector(".prayer-name-tag");
const navBar = document.querySelector(".nav-bar");
const navContainer = navBar.querySelector(".container");
const navConAref = navContainer.querySelectorAll("a");
const openMenue = document.querySelector("#open-menue");
const closeMenue = document.querySelector("#close-menue");

// variables
let curSlide = 0;
let timy;
let timeMain;
let trackPrayer;
// date variables
let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let currTime = +`${new Date().getHours()}${
  new Date().getMinutes() < 10
    ? String(Math.trunc(new Date().getMinutes())).padStart(2, 0)
    : new Date().getMinutes()
}`;

// fuctions
// slider fuctions
const slidy = function (slide) {
  sliderContainer.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// set silder at postion 0 on load
slidy(0);

// silder button selector
const sliderBtnFunc = function (slide) {
  slidy(slide);
  document
    .querySelectorAll(".slide-button")
    .forEach((x) => x.classList.remove("slide-active"));

  document
    .querySelector(`.slide-button[data-slide="${slide + 1}"]`)
    .classList.add("slide-active");
};
// slider button fuctions
slideBtn.addEventListener("click", function (e) {
  const slide = e.target.dataset.slide;
  if (!e.target.classList.contains("slide-button")) return;
  sliderBtnFunc(slide - 1);
  curSlide = Number(slide - 1);
  timer();
});
// slider timer fuction (every 7 sec, next slide)
const timer = function () {
  // clears timer on each itteration
  clearInterval(timy);
  timy = setInterval(function () {
    if (curSlide === sliderContainer.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    sliderBtnFunc(curSlide);
  }, 7000);
};
// sets timer on load
timer();

// date fuction
const dateTime = function () {
  setInterval(function () {
    const now = new Date();
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      weekday: "long",
    };
    // fotmats the date to GB standard
    date.innerHTML = new Intl.DateTimeFormat("en-GB", options).format(now);
    time.innerHTML = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
    }).format(now);
  }, 1000);
};
// sets date on load
dateTime();
// extract time from DOM
timeToPray.forEach((x, i) => {
  const time = Number(x.innerHTML.replace(":", ""));
  if (time < +currTime) {
    trackPrayer = i + 1;
  }
});
// sets date to next day if final prayer
if (currTime > Number(timeToPray[5].innerHTML.replace(":", "")) + 1) {
  day++;
  trackPrayer = 0;
}
// counts down to next prayer, and selects the next prayer time on the DOM
const timeFunc = function () {
  clearInterval(timeMain);
  timeMain = setInterval(function () {
    // current time
    let timeTime =
      new Date(`${month}/${day}/${year} ${timeToPray[trackPrayer].innerHTML}`) -
      new Date();
    // sets hours
    const hr = String(Math.trunc((timeTime / 1000 / 60 / 60) % 24)).padStart(
      2,
      0
    );
    // sets min & secs
    const min = String(Math.trunc((timeTime / 1000 / 60) % 60)).padStart(2, 0);
    const sec = String(Math.trunc((timeTime / 1000) % 60)).padStart(2, 0);
    // sets hr, min & sec in HTML
    hours.innerHTML = hr;
    minutes.innerHTML = min;
    seconds.innerHTML = sec;
    // counts down
    timeTime -= 1000;
    // removes the current prayer class on all
    trackPrayerDiv.forEach((x) => x.classList.remove("timetable-active"));
    // add the current player class
    trackPrayerDiv[trackPrayer].classList.add("timetable-active");
    prayerTag.innerHTML = `${prayerName[trackPrayer].innerHTML}`;
    // sets the current prayer
    if (timeTime < 1) {
      trackPrayer++;
    }
    if (trackPrayer > 5) {
      trackPrayer = 0;
      day++;
    }
  }, 1000);
};
// set count down on load
timeFunc();

// menue bar on mobile
openMenue.addEventListener("click", function () {
  const classNamee = this.getAttribute("class");

  if (classNamee === "fa-solid fa-bars") {
    navContainer.style.display = "flex";
    this.className = "fa-solid fa-xmark";
  } else {
    navContainer.style.display = "none";
    this.className = "fa-solid fa-bars";
  }
});
