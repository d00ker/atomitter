$('.topics').after('<li id="fav-btn" data-global-action="discover"><a data-nav="discover" data-component-term="discover_nav" data-placement="bottom" class="js-nav js-tooltip js-dynamic-tooltip fav-link" href="/favorites/"><span class="Icon Icon--discover Icon--large">&#9734;</span><span class="text">Favorites</span></a></li>');
$('#fav-btn:hover').find('a').attr('data-original-title', 'Favorites');

function dashboardLeftHeight () {
	var dL = $('.dashboard-left').offset();
	var dLH = $('.dashboard-left').height();
	var topSc = dL.top + dLH;
	return topSc;
}

$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var newTopSc = dashboardLeftHeight();
	if (newTopSc <= scrollTop) {
		$('#timeline').width(890);
	} else {
		$('#timeline').width(590);
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