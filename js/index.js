var UpdateAlertLoc;

const AlertBox = $('#alert');

$(document).ready(() => {
  UpdateAlertLocFunc();
  setTimeout(UpdateAlertLoc(() => {
    AlertBox.delay(1000).slideDown();
  }), 100);
  createCountDown('alert-countdown', Date.parse('February 9, 2018 6:00 PM'));
});

$('#alert1-close').click(() => {
  AlertBox.slideUp();
});

$(window).resize(() => {
  UpdateAlertLocFunc();
  setTimeout(UpdateAlertLoc, 100);
});

$(window).scroll(function() {
  if ($("#mainNav").offset().top > 100) $("#mainNav").addClass("navbar-shrink");
  else $("#mainNav").removeClass("navbar-shrink");
  setTimeout(UpdateAlertLoc, 100);
});

function UpdateAlertLocFunc() {
  if($(window).width() < 992) UpdateAlertLoc = UpdateSmallAlert;
  else UpdateAlertLoc = UpdateLargeAlert;
}

function GetMenuCenter() {
  var eventTab = $('#event-menu-item');
  var gamesTab = $('#games-menu-item');
  var aboutTab = $('#about-menu-item');
  var contactTab = $('#contact-menu-item');
  var centerX = eventTab.outerWidth() + gamesTab.outerWidth() + aboutTab.outerWidth() + contactTab.outerWidth();
  return eventTab.position().left + centerX/2;
}

function UpdateLargeAlert(cb) {
  var bottom = $('#mainNav').outerHeight() - 10;
  AlertBox.css('left', GetMenuCenter() - AlertBox.outerWidth()/2);
  AlertBox.css('top', bottom);
  if(cb) cb();
}

function UpdateSmallAlert(cb) {
  var bottom = $('#mainNav').outerHeight() - 10;
  AlertBox.css('left', $('header').width()/2 - AlertBox.outerWidth()/2);
  AlertBox.css('top', bottom);
  if(cb) cb();
}

$('.ease-scroll').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});
