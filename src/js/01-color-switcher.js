import '../css/common.css';

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop'),
  body: document.body,
};

let intervalId = null;

refs.startButton.addEventListener('click', onStartBtnClick);
refs.stopButton.addEventListener('click', onStopBtnClick);
refs.stopButton.setAttribute('disabled', '');

function onStartBtnClick(e) {
  intervalId = setInterval(changeBodyColor, 1000);
  e.target.setAttribute('disabled', '');
  refs.stopButton.removeAttribute('disabled', '');
}

function onStopBtnClick(e) {
  clearInterval(intervalId);
  e.target.setAttribute('disabled', '');
  refs.startButton.removeAttribute('disabled', '');
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
