jQuery(document).ready(function() {
  const $landing = jQuery('#home-landing');
  const $pupilLeft = jQuery('.pupil.left');
  const $pupilRight = jQuery('.pupil.right');
  const $cloudFront = jQuery('.cloud-front');
  const $cloudBack = jQuery('.cloud-back');

  const canvasHeight = $landing.height();
  const canvasWidth = $landing.width();

  const getInitialLocation = function(pupil) {
    return {
      left: `${(parseFloat(pupil.css('left').split('px')[0]) / canvasWidth) *
        100}%`,
      top: `${(parseFloat(pupil.css('top').split('px')[0]) / canvasHeight) *
        100}%`,
      transform: 'translate3d(75%, 40%, 0)'
    };
  };

  const leftEyeLocation = getInitialLocation($pupilLeft);
  const rightEyeLocation = getInitialLocation($pupilRight);
  $pupilLeft.css(leftEyeLocation);
  $pupilRight.css(rightEyeLocation);

  $landing.on('mousemove', function(event) {
    const x = (event.pageX / canvasWidth) * 80;
    const y = (event.pageY / canvasHeight) * 80;
    $pupilLeft.css({ transform: `translate3d(${x}%, ${y}%, 0)` });
    $pupilRight.css({ transform: `translate3d(${x}%, ${y}%, 0)` });

    $cloudFront.css({ transform: `translateX(${x / 40}%)` });
    // $cloudBack.css({ transform: `translateX(${x / 150}%)` });
    // console.log(event.pageX, event.pageY);
  });

  // Gallery
  jQuery('.filter-button-group').on('click', 'button', function() {
    var filterValue = jQuery(this).attr('data-filter');
    jQuery('.grid').isotope({ filter: filterValue });
  });

  jQuery('.grid').isotope({
    filter: '*',
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use element for option
      columnWidth: '.grid-item'
    }
  });
});
