// Countdown Timer Attachment
const MS_IN_SEC = 1000;
const MS_IN_MIN = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MIN;
const MS_IN_DAY = 24 * MS_IN_HOUR;

function createCountDown(elementId, startTime) {
  var clock = document.createElement('div');

  function setTime() {
    var time = startTime - Date.now();
    var days = Math.floor(time / MS_IN_DAY);
    time -= days * MS_IN_DAY;
    var hours = Math.floor(time / MS_IN_HOUR);
    time -= hours * MS_IN_HOUR;
    var minutes = Math.floor(time / MS_IN_MIN);
    time -= minutes * MS_IN_MIN;
    var seconds = Math.floor(time / MS_IN_SEC);
    msg = '';
    msg += `${ (days < 10) ? `0${days}` : `${days}` } : `;
    msg += `${ (hours < 10) ? `0${hours}` : `${hours}` } : `;
    msg += `${ (minutes < 10) ? `0${minutes}` : `${minutes}` } : `;
    msg += `${ (seconds < 10) ? `0${seconds}` : `${seconds}` }`;
    clock.innerHTML = msg;
  }
  setTime();
  setInterval(setTime, 1000);
  const cdElem = document.getElementById(elementId);
  if(cdElem) cdElem.appendChild(clock);
}
