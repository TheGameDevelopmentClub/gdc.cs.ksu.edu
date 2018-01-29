var UpdateAlertLoc;

$(document).ready(() => {
  var alertBox1 = $('#alert1');
  UpdateAlertLocFunc();
  setTimeout(UpdateAlertLoc(() => {
    alertBox1.delay(1000).slideDown();
  }), 100);
});

$('#alert1-close').click(() => {
  var alertBox1 = $('#alert1');
  alertBox1.slideUp();
});

$(window).resize(() => {
  var alertBox = $('#alert1');
  UpdateAlertLocFunc();
  setTimeout(UpdateAlertLoc, 100);
});

$(window).scroll(function() {
  var alertBox = $('#alert1');
  if ($("#mainNav").offset().top > 100) $("#mainNav").addClass("navbar-shrink");
  else $("#mainNav").removeClass("navbar-shrink");
  setTimeout(UpdateAlertLoc, 100);
});

function UpdateAlertLocFunc() {
  if($(window).width() < 992) UpdateAlertLoc = UpdateSmallAlert;
  else UpdateAlertLoc = UpdateLargeAlert;
}

function GetMenuCenter() {
  var alertBox = $('#alert1');
  var eventTab = $('#event-menu-item');
  var gamesTab = $('#games-menu-item');
  var aboutTab = $('#about-menu-item');
  var contactTab = $('#contact-menu-item');
  var centerX = eventTab.outerWidth() + gamesTab.outerWidth() + aboutTab.outerWidth() + contactTab.outerWidth();
  return eventTab.position().left + centerX/2;
}

function UpdateLargeAlert(cb) {
  var alertBox = $('#alert1');
  var bottom = $('#mainNav').outerHeight() - 10;
  alertBox.css('left', GetMenuCenter() - alertBox.outerWidth()/2);
  alertBox.css('top', bottom);
  if(cb) cb();
}

function UpdateSmallAlert(cb) {
  var alertBox = $('#alert1');
  var bottom = $('#mainNav').outerHeight() - 10;
  alertBox.css('left', $('header').width()/2 - alertBox.outerWidth()/2);
  alertBox.css('top', bottom);
  if(cb) cb();
}

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
    var msg = '';
    if (days != 1) msg += `${days} days, `;
    else msg += `${days} day, `;
    if (hours != 1) msg += `${hours} hours, `;
    else msg += `${hours} hour, `;
    if (minutes != 1) msg += `${minutes} minutes, `;
    else msg += `${minutes} minute, `;
    if (seconds != 1) msg += `${seconds} seconds`;
    else msg += `${seconds} second`;
    clock.innerHTML = msg;
  }

  setInterval(setTime, 1000);
  document.getElementById(elementId).appendChild(clock);
}

createCountDown('alert-countdown', Date.parse('February 9, 2018 6:00 PM'));
// createCountDown('event-countdown', Date.parse(''));
