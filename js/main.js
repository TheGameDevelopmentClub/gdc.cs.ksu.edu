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
