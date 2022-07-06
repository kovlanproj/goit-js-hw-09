import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  date: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  displayDays: document.querySelector('[data-days]'),
  displayHours: document.querySelector('[data-hours]'),
  displayMinutes: document.querySelector('[data-minutes]'),
  displaySeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1, // start week on Monday
  },

  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    deltaTime = selectedDate - currentDate;

    if (deltaTime <= 0) Notify.failure('Please choose a date in the future');
    else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

const targetDate = flatpickr(refs.date, options);
refs.startBtn.setAttribute('disabled', '');

function onStartBtnClick() {
  outputTimer(targetDate.selectedDates[0].getTime());
  intervalId = setInterval(
    outputTimer,
    1000,
    targetDate.selectedDates[0].getTime()
  );
  refs.startBtn.setAttribute('disabled', '');
  refs.date.setAttribute('disabled', '');
  console.log(refs.startBtn);
}

function currentTimerValue(targetTime) {
  return convertMs(targetTime - Date.now());
}

function displayTimer({ days, hours, minutes, seconds }) {
  refs.displayDays.textContent = days;
  refs.displayHours.textContent = pad(hours);
  refs.displayMinutes.textContent = pad(minutes);
  refs.displaySeconds.textContent = pad(seconds);
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(intervalId);
    Notify.info('The time is over!');
    refs.date.removeAttribute('disabled');
  }
}

function outputTimer(selectedDate) {
  displayTimer(currentTimerValue(selectedDate));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
