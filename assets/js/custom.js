(function($) {
	var $window = $(window),
		$body = $('body'),
		$featured = $('#featured-slider');

	$(document).ready(function() {

		// Hidden sections
		$('#show-sidebar, #hide-sidebar, #more-sidebar').on('click', function (e) {
			$body.toggleClass('sidebar--opened');
			e.preventDefault();
		});
		$('#site-overlay').on('click', function(e){
			$body.removeClass('sidebar--opened search--opened');
			searchField.clear();
			e.preventDefault();
		});

		var dropzone = document.getElementById('page'),
    draggable = document.getElementById('sidebar'),
    leftOffset,
    leftX,
    overallMovement;


function onTouchStart(event) {
  var $this = $('#sidebar');
  var offset = $this.offset();
  var width = $this.outerWidth();
  var height = $this.outerHeight();
  leftX = offset.left;
  var touches = event.changedTouches;
  leftOffset = touches[0].clientX - leftX;
}

function onTouchMove(event) {
  event.preventDefault();
  var $this = $('#sidebar');
  var touches = event.changedTouches;
  var leftMovement = touches[0].clientX - leftOffset;
  $this.css({'position': 'absolute',
             'left': leftMovement});
  overallMovement = Math.abs(leftMovement - leftX);
  $('p.info').text(overallMovement + ' / 200 pixels required for dismissal' );
  if (overallMovement > 199) {
    $this.fadeOut(200);
  }
}

function onTouchEnd(event) {
  if (overallMovement < 200) {
    $('#sidebar').css({'left': leftX});
    $('p.info').text('');
  }
} 

draggable.addEventListener('touchstart', onTouchStart, false);
draggable.addEventListener('touchmove', onTouchMove, false);
draggable.addEventListener('touchend', onTouchEnd, false);
		
		// Featured carousel
		$featured.slick({
			autoplay: true,
			arrows : true,
			dots : false,
			fade : true,
			appendArrows : $('.featured-nav'),
			prevArrow : $('.featured-prev'),
			nextArrow : $('.featured-next')
		});
		$featured.fadeIn(600, function(){
			$featured.parents().removeClass('slider-loading');
		});

		// Back to top button
		$('#top-link').on('click', function(e) {
			$('html, body').animate({'scrollTop': 0});
			e.preventDefault();
		});
		$window.scroll(function () {
			if ( $(this).scrollTop() > 600 ) {
				$body.addClass('is--scrolled');
			} else {
				$body.removeClass('is--scrolled');
			}
		});

		// Responsive videos
		$('.post').fitVids();

		// Image adjustments
		if ( $body.hasClass( 'post-template' ) || $body.hasClass( 'page-template' ) ) {
			adjustImages();
		}

		// Grid layout
		if ( $.isFunction( $.fn.masonry ) && $('#post-wrapper').length ) {
			gridLayout.refresh();
		}

	});

	$window.on('debouncedresize', onResize);

	var gridLayout = (function() {
		var $container = $('#post-wrapper'),
			$items = $container.children().addClass('post--loaded'),
			initialized = false,
			init = function() {
				$container.imagesLoaded(function() {
					$container.masonry({
						itemSelector: '.post',
						columnWidth: '.post',
						transitionDuration: 0
					});
					setTimeout(function() {
						$container.masonry('layout');
					}, 100);
					showItems($items);
					initialized = true;
				});
			},
			refresh = function() {
				if (!initialized) {
					init();
					return;
				}
				$container.masonry('layout');
			},
			showItems = function($items) {
				$items.each(function(i, obj) {
					var $postInside = $(obj).find('.post-inside');
					animatePost($postInside, i * 100);
				});
			},
			animatePost = function($postInside, delay) {
				setTimeout(function() {
					$postInside.addClass('is--visible');
				}, delay);
			};
		return {
			init: init,
			refresh: refresh
		}
	})();

	function onResize() {
		if ( $body.hasClass( 'post-template' ) || $body.hasClass( 'page-template' ) ) {
			adjustImages();
		}
		if ( $.isFunction( $.fn.masonry ) && $('#post-wrapper').length ) {
			gridLayout.refresh();
		}
	}

})(jQuery);
