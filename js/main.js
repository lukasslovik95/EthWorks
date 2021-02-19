/******** scroll to ********/
$.extend($.scrollTo.defaults, {
  offset: 0,
  duration: 400
});

$(document).on('click', '[data-scroll-target]', function(e){
  let target = $(this).data('scroll-target');
	if (target === 'this') {
		target = $(this);
	}
  const duration = $(this).data('scroll-duration');
  const offset = $(this).data('scroll-offset');
  $(window).scrollTo(target ,duration ,{offset:offset});
  if($(this).data('scroll-hash') !== undefined){
    window.location.hash = target;
  }
  return false;
});

/******** one page nav ********/
$('#topMenu').onePageNav({changeHash: true});

/******** fixed nav after scroll & refresh ********/
$(window).scroll(function(){
  const header = $('header.header'),
    scroll = $(window).scrollTop();

  if (scroll >= 150) header.addClass('fixed-header');
  else header.removeClass('fixed-header');
});

if ($(window).scrollTop() > 150) {
  $('header.header').addClass('fixed-header');
} else {
  $('header.header').removeClass('fixed-header');
}

$(document).ready(function(){

  /******** aos init ********/
  AOS.init();

  /******** scroll top btn ********/
  const checkWindowScroll = function() {
    if ($(window).scrollTop() > 150) {
      $('#icoGoTop').show();
    }else {
      $('#icoGoTop').hide();
    }

    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      $('#icoGoTop').addClass('is-bottom');
    }else{
      $('#icoGoTop').removeClass('is-bottom');
    }
  };
  checkWindowScroll();

  $(window).bind('scroll', function() {
    checkWindowScroll();
  });

  /******** bootstrap modal ********/
  $('.modal').on('show.bs.modal', function() {
  });

});

/******** message validation ********/
$.extend(
  $.validator.messages, {
    required: "To pole jest wymagane.",
    remote: "Proszę o wypełnienie tego pola.",
    email: "Proszę o podanie prawidłowego adresu email.",
    maxlength: $.validator.format("Proszę o podanie nie więcej niż {0} znaków."),
    minlength: $.validator.format("Proszę o podanie przynajmniej {0} znaków."),
  },
  $.validator.setDefaults({
    focusInvalid: false,
    invalidHandler: function(form, validator) {

      if (!validator.numberOfInvalids())
        return;

      $('html, body').animate({
        scrollTop: $(validator.errorList[0].element).offset().top -30
      }, 300);

    }
  })
);