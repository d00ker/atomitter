var favorites_nav = document.createElement('li');
favorites_nav.setAttribute("id", "global-nav-favorites");
favorites_nav.setAttribute("data-global-action", "favorites");

var favorites_link = document.createElement('a');
favorites_link.setAttribute("data-nav","favorites");
favorites_link.setAttribute("data-component-term","favorites_nav");
favorites_link.setAttribute("data-placement","bottom");
favorites_link.setAttribute("class","js-nav js-tooltip js-dynamic-tooltip");
favorites_link.setAttribute("href","/favorites");
favorites_nav.appendChild(favorites_link);

var icon_span = document.createElement('span');
icon_span.setAttribute("class","Icon Icon--favorite Icon--large");
favorites_link.appendChild(icon_span);

var text_span = document.createElement('span');
text_span.setAttribute("class","text");
text_span.textContent = "Favorites";
favorites_link.appendChild(text_span);

if ($('#global-nav-favorites').length == 0) { // check if exist
	$('#global-nav-home').after(favorites_nav);
}

$('#global-nav-favorites:hover').find('a').attr('data-original-title', 'Favorites');

if ($('.dashboard').length != 0) { // check if not exist
	var dashboardFullHeight = $('.dashboard').height() + $('.dashboard').offset().top;

	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var wideTimelineWidth = 680;
		var narrowTimelineWidth = 590;
		if ((dashboardFullHeight < scrollTop)) {
			$('#timeline').width(wideTimelineWidth);
			$('#discover-stories').width(wideTimelineWidth)
			$('.dashboard').css('display','none');
		} else if ((dashboardFullHeight > scrollTop)) {
			$('#timeline').width(narrowTimelineWidth);
			$('#discover-stories').width(narrowTimelineWidth)
			$('.dashboard').css('display','block');
		}
	});
};

$('.js-actionRetweet').click(function() {
	$('.quote-action').remove();
	$('<button class="btn primary-btn quote-action">Quote Retweet</button>').prependTo('#retweet-tweet-dialog .modal-footer');
	$('.retweet-action').before($('.quote-action'));
	$('.quote-action').click(function() {
		$('#retweet-tweet-dialog .modal-close').click();
		var tweetText = $(this).parent('.modal-footer').siblings('#retweet-tweet-dialog-body').find('.js-tweet-text').html();
		var userName = $(this).parent('.modal-footer').siblings('#retweet-tweet-dialog-body').find('.username').html();
		$('#global-new-tweet-button').click();
		$('#global-tweet-dialog-header').text('Quote Retweet');
		$('#tweet-box-global').html('"'+userName+': '+tweetText+'" ');
	});
});

$('.people.notifications').find('.count-inner').bind('DOMSubtreeModified',function(){
	var pes = $(this).text();
});