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

let curSlide = 0;
let timy;
let timeMain;
let trackPrayer;

let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
let currTime = +`${new Date().getHours()}${
  new Date().getMinutes() < 10
    ? String(Math.trunc(new Date().getMinutes())).padStart(2, 0)
    : new Date().getMinutes()
}`;

const slidy = function (slide) {
  sliderContainer.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
slidy(0);

const mainFunc = function (slide) {
  slidy(slide);
  document
    .querySelectorAll(".slide-button")
    .forEach((x) => x.classList.remove("slide-active"));

  document
    .querySelector(`.slide-button[data-slide="${slide + 1}"]`)
    .classList.add("slide-active");
};

slideBtn.addEventListener("click", function (e) {
  const slide = e.target.dataset.slide;
  if (!e.target.classList.contains("slide-button")) return;
  mainFunc(slide - 1);
  curSlide = Number(slide - 1);
  timer();
});

const timer = function () {
  clearInterval(timy);
  timy = setInterval(function () {
    if (curSlide === sliderContainer.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    mainFunc(curSlide);
  }, 7000);
};
timer();

const dateTime = function () {
  setInterval(function () {
    const now = new Date();
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      weekday: "long",
    };
    date.innerHTML = new Intl.DateTimeFormat("en-GB", options).format(now);
    time.innerHTML = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
    }).format(now);
  }, 1000);
};
dateTime();

timeToPray.forEach((x, i) => {
  const time = Number(x.innerHTML.replace(":", ""));
  if (time < +currTime) {
    trackPrayer = i + 1;
  }
});

if (currTime > Number(timeToPray[5].innerHTML.replace(":", "")) + 1) {
  day++;
  trackPrayer = 0;
}

const timeFunc = function () {
  clearInterval(timeMain);
  timeMain = setInterval(function () {
    let timeTime =
      new Date(`${month}/${day}/${year} ${timeToPray[trackPrayer].innerHTML}`) -
      new Date();
    const hr = String(Math.trunc((timeTime / 1000 / 60 / 60) % 24)).padStart(
      2,
      0
    );
    const min = String(Math.trunc((timeTime / 1000 / 60) % 60)).padStart(2, 0);
    const sec = String(Math.trunc((timeTime / 1000) % 60)).padStart(2, 0);
    hours.innerHTML = hr;
    minutes.innerHTML = min;
    seconds.innerHTML = sec;
    timeTime -= 1000;
    trackPrayerDiv.forEach((x) => x.classList.remove("timetable-active"));
    trackPrayerDiv[trackPrayer].classList.add("timetable-active");
    prayerTag.innerHTML = `${prayerName[trackPrayer].innerHTML}`;
    if (timeTime < 1) {
      trackPrayer++;
    }
    if (trackPrayer > 5) {
      trackPrayer = 0;
      day++;
    }
  }, 1000);
};
timeFunc();

openMenue.addEventListener("click", function () {
  navConAref.forEach((x) => (x.style.display = "block"));
  this.style.display = "none";
  closeMenue.style.display = "block";
});
closeMenue.addEventListener("click", function () {
  navConAref.forEach((x) => (x.style.display = "none"));
  this.style.display = "none";
  openMenue.style.display = "block";
});
