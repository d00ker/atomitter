$('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/u/15085042/atomitter.css">');
$('.topics').after('<li id="fav-btn" data-global-action="discover"><a data-nav="discover" data-component-term="discover_nav" data-placement="bottom" class="js-nav js-tooltip js-dynamic-tooltip fav-link" href="/favorites/"><span class="Icon Icon--discover Icon--large">&#9734;</span><span class="text">Favorites</span></a></li>');
$('#fav-btn:hover').find('a').attr('data-original-title', 'Favorites');
// var locHref = window.location.href;
// jQuery(document).ready(function() {
// 	if (window.location.href == 'https://twitter.com/favorites/') {
// 		alert(window.location.href);
// 		$('#fav-btn').addClass('active');
			
// 	} else {
// 		$('#fav-btn').removeClass('active');
// 	}
// });

alert ("test");

function dashboardLeftHeight () {
	var dL = $('.dashboard-left').offset();
	var dLH = $('.dashboard-left').height();
	var topSc = dL.top + dLH;
	return topSc;
}
dashboardLeftHeight();
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var newTopSc = dashboardLeftHeight();
	if (newTopSc <= scrollTop) {
		$('#timeline').width(890);
	} else {
		$('#timeline').width(590);
	}
});