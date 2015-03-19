$('.topics').after('<li id="fav-btn" data-global-action="discover"><a data-nav="discover" data-component-term="discover_nav" data-placement="bottom" class="js-nav js-tooltip js-dynamic-tooltip fav-link" href="/favorites/"><span class="Icon Icon--discover Icon--large">&#9734;</span><span class="text">Favorites</span></a></li>');

$('#fav-btn:hover').find('a').attr('data-original-title', 'Favorites');

var dashboardFullHeight = $('.dashboard').height() + $('.dashboard').offset().top;

$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var wideTimelineWidth = 680;
	var narowTimelineWidth = 590;

	if ((dashboardFullHeight < scrollTop)) {
		$('#timeline').width(wideTimelineWidth);
		$('.dashboard').css('display','none');
	} else if ((dashboardFullHeight > scrollTop)) {
		$('#timeline').width(narowTimelineWidth);
		$('.dashboard').css('display','block');
	}
});

$('.js-actionRetweet').click(function() {
	$('.quote-action').remove();
	$('<button class="btn primary-btn quote-action">Процитировать</button>').prependTo('#retweet-tweet-dialog .modal-footer');
	$('.retweet-action').before($('.quote-action'));
	$('.quote-action').click(function() {
	$('#retweet-tweet-dialog .modal-close').click();
		var tweetText = $(this).parent('.modal-footer').siblings('#retweet-tweet-dialog-body').find('.js-tweet-text').html();
		var userName = $(this).parent('.modal-footer').siblings('#retweet-tweet-dialog-body').find('.username').html();
		$('#global-new-tweet-button').click();
		$('#global-tweet-dialog-header').text('Процитировать');
		$('#tweet-box-global').html('"'+userName+': '+tweetText+'" ');
	});
});

$('.people.notifications').find('.count-inner').bind("DOMSubtreeModified",function(){
	var pes = $(this).text();
	//alert(pes);
});