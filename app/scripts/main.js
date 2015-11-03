// jshint devel:true

$(document).ready(function() {
  /** Contribute **/
  $('.help').click(function(e) {
    e.preventDefault();

      $('html, body').animate({
        scrollTop: $('#contribuir').offset().top
      }, 200);
  })

  /** Lines **/
  var v1_1 = new Vivus('v1-1', {type: 'scenario-sync', duration: 60, start: 'autostart', animTimingFunction: Vivus.EASE});
  var v1_2 = new Vivus('v1-2', {type: 'scenario-sync', duration: 60, start: 'autostart', animTimingFunction: Vivus.EASE});
  var v2 = new Vivus('v2', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v3_1 = new Vivus('v3-1', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v3_2 = new Vivus('v3-2', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v4_1 = new Vivus('v4-1', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v4_2 = new Vivus('v4-2', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v5 = new Vivus('v5', {type: 'delayed', duration: 100, start: 'manual', animTimingFunction: Vivus.EASE});
  var v6_1_1 = new Vivus('v6-1-1', {type: 'delayed', duration: 30, start: 'manual', animTimingFunction: Vivus.EASE});
  var v6_1_2 = new Vivus('v6-1-2', {type: 'delayed', duration: 30, start: 'manual', animTimingFunction: Vivus.EASE});
  var v6_1_3 = new Vivus('v6-1-3', {type: 'delayed', duration: 30, start: 'manual', animTimingFunction: Vivus.EASE});
  var v6_2_1 = new Vivus('v6-2-1', {type: 'delayed', duration: 30, start: 'manual', animTimingFunction: Vivus.EASE});
  var v6_2_2 = new Vivus('v6-2-2', {type: 'delayed', duration: 30, start: 'manual', animTimingFunction: Vivus.EASE});
  var v7_1 = new Vivus('v7-1', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  var v7_2 = new Vivus('v7-2', {type: 'delayed', duration: 60, start: 'manual', animTimingFunction: Vivus.EASE});
  
  /** Video Player **/
  setupVideoPlayer();

  /** Menu **/
  $('.menu').autoMenu({
    1: function() {
      v2.play();
    },
    2: function() {
      v3_1.play();
      v3_2.play();
    },
    3: function() {
      console.log('oi');
      v4_1.play();
      v4_2.play();
      setTimeout(function() {
        v5.play();

        setTimeout(function() {
          v6_1_1.play();
        }, 550);
        setTimeout(function() {
          v6_2_1.play();
        }, 700);
        setTimeout(function() {
          v6_1_2.play();
        }, 850);
        setTimeout(function() {
          v6_2_2.play();
        }, 1000);
        setTimeout(function() {
          v6_1_3.play();
        }, 1150);
      }, 600);
    },
    4: function() {
      v7_1.play();
      v7_2.play();
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
      $('#main-video').addClass('open');
      $('.logo').addClass('small');
      $('.intro .close').fadeIn();
      player.play();
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
