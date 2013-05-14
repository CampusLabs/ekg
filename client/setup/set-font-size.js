(function () {
  'use strict';

  var $ = window.jQuery;

  var setFontSize = function () {
    $('body').css({fontSize: ($(window).width() + $(window).height()) / 2});
  };

  $(window).on('resize', setFontSize);
  $(setFontSize);
})();
