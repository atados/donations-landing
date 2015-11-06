// jshint devel:true

$(document).ready(function() {
  /** Contribute **/
  $('.help').click(function(e) {
    e.preventDefault();

      $('html, body').animate({
        scrollTop: $('#contribuir').offset().top
      }, 200);
  })

  /** Video Player **/
  setupVideoPlayer();

  /** Menu **/
  $('.menu').autoMenu({
    1: function() {
    },
    2: function() {
    },
    3: function() {
      $('.help').fadeIn().css("display","inline-block");;
    },
    4: function() {
      $('.help').fadeOut();
    }
  });

  $('.menu a').click(function(e) {
    e.preventDefault();
    var target = $(e.target).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 200);
  })

  /** Effects **/
  var controller = new ScrollMagic.Controller();
  var scene = new ScrollMagic.Scene({
      triggerElement: '.menu',
      triggerHook: 'onLeave',
  }).setPin('.menu');

  controller.addScene([scene]);
});

function setupVideoPlayer() {
  videojs("#main-video").ready(function(){
    var player = this;

    $('.btn-video-play').click(function() {
      if ($(window).width > 991) {
        $('#main-video').addClass('open');
        $('.logo').addClass('small');
        $('.intro .close').fadeIn();
        player.play();
      } else {
        window.open('https://www.youtube.com/watch?v=KQKBRoY17q0', '_blank');
      }
    });

    $('.intro .close').click(function() {
      $('#main-video').removeClass('open');
      $('.logo').removeClass('small');
      $('.intro .close').fadeOut();
      player.pause();
    });
  });
};

$.fn.autoMenu = function(callback) {
  var inst = this;
  var blocks = $('body').find('[data-menu-target]');
  var half_window_height = $(window).height()/2;

  /* Functions */
  var generateBreakpoints = function(blocks) {
    var breakpoints = [];
    blocks.each(function(i, v) {
      breakpoints.push({point: $(v).offset()['top'], element: v});
    });
    breakpoints.sort(function(a, b) {
      if (a.point < b.point)
        return -1;
      if (b.point < a.point)
        return 1;
      return 0;
    })

    return breakpoints;
  }

  var setMenu = function(block) {
    inst.find('.active').removeClass('active');
    var m = inst.find('[data-menu="' + $(block).data('menu-target') + '"]')
    m.addClass('active');

    var index = m.index();
    
    if (typeof callback[index] == 'function') {
      callback[index]();
    }
  }

  /* Events */
  $(document).resize(function() {
    breakpoints = generateBreakpoints(blocks);
    half_window_height = $(window).height()/2;
  })

  $(document).scroll(function() {
    var scrollTop = $(document).scrollTop() + half_window_height;
    var block, lastBlock;

    $.each(breakpoints, function(i, br) {
      if (scrollTop >= br.point) {
        lastBlock = br.element;
      } else {
        block = lastBlock;
        return false;
      }
      block = lastBlock;
    });

    setMenu(block);
  });

  /* Run */
  var breakpoints = generateBreakpoints(blocks);
};
