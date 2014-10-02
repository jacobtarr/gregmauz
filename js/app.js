

/* Initialize Wow.js script
=============================== */
new WOW().init();



/* Configure HTML5 audio samples
=============================== */

var audioSource = document.getElementById('audio-source');
var duration;
var playButton = document.getElementById('play-button');
var playhead = document.getElementById('playhead');
var timeline = document.getElementById('timeline');
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// Timeupdate event listener
audioSource.addEventListener("timeupdate", timeUpdate, false);

// Makes timeline clickable
timeline.addEventListener("click", function (event) {
	moveplayhead(event);
	audioSource.currentTime = duration * clickPercent(event);
}, false);

// Returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
	return (event.pageX - timeline.offsetLeft) / timelineWidth;
}

// Makes playhead draggable 
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that mouse is moved on mouseUp only when the playhead is released 
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
	onplayhead = true;
	window.addEventListener('mousemove', moveplayhead, true);
	audioSource.removeEventListener('timeupdate', timeUpdate, false);
}

function mouseUp(e) {
	if (onplayhead == true) {
		moveplayhead(e);
		window.removeEventListener('mousemove', moveplayhead, true);
		// change current time
		audioSource.currentTime = duration * clickPercent(e);
		audioSource.addEventListener('timeupdate', timeUpdate, false);
	}
	onplayhead = false;
}

function moveplayhead(e) {
	var newMargLeft = e.pageX - timeline.offsetLeft;
	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
}

function timeUpdate() {
	var playPercent = timelineWidth * (audioSource.currentTime / duration);
	playhead.style.marginLeft = playPercent + "px";
	if (audioSource.currentTime == duration) {
		playButton.className = "";
		playButton.className = "play";
	}
}

// Play and Pause
function play() {
	// start audio
	if (audioSource.paused) {
		audioSource.play();
		// remove play, add pause
		playButton.className = "";
		playButton.className = "pause";
	} else { // pause audio
		audioSource.pause();
		// remove pause, add play
		playButton.className = "";
		playButton.className = "play";
	}
}

// Gets audio file duration
audioSource.addEventListener("canplaythrough", function () {
	duration = this.duration;  
}, false);


/* Remove placeholder attribute when input is focused
=============================== */

$(function removePlaceholder() {

	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder'))
		$(this).attr('placeholder','');
	});
	$('input,textarea').blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});

});

/* Change CSS on span element on input focus
=============================== */

$(function changeInputAddonCSS() {

	$('.contact-name-input').focus(function() {
		$('.contact-input-addon').first().css({
			'background-color' : '#138A72',
			'color'			   : '#1ABC9C'
		});
	});
	$('.contact-name-input').blur(function() {
		$('.contact-input-addon').first().css({
			'background-color' : '#0C5748',
			'color'			   : '#138A72'
		});
	});

	$('.contact-email-input').focus(function() {
		$('.contact-input-addon').last().css({
			'background-color' : '#138A72',
			'color'			   : '#1ABC9C'
		});
	});
	$('.contact-email-input').blur(function() {
		$('.contact-input-addon').last().css({
			'background-color' : '#0C5748',
			'color'			   : '#138A72'
		});
	});

});


$(function smoothScroll() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      		var target = $(this.hash);
      		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      	if (target.length) {
	        	$('html,body').animate({
	          		scrollTop: target.offset().top
	        	}, 1000);
	        	return false;
      		}
    	}
  	});

});
	










