// jshint devel:true


$(document).ready(function() {
  var v1_1 = new Vivus('v1-1', {type: 'scenario-sync', duration: 60, start: 'autostart', animTimingFunction: Vivus.EASE});
  var v1_2 = new Vivus('v1-2', {type: 'scenario-sync', duration: 60, start: 'autostart', animTimingFunction: Vivus.EASE});
  
  setupVideoPlayer();
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
