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

var favorites_icon_span = document.createElement('span');
favorites_icon_span.setAttribute("class","Icon Icon--favorite Icon--large");
favorites_link.appendChild(favorites_icon_span);

var favorites_text_span = document.createElement('span');
favorites_text_span.setAttribute("class","text");
favorites_text_span.textContent = "Favorites";
favorites_link.appendChild(favorites_text_span);

if ($('#global-nav-favorites').length == 0) { // check if isn't exist
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

var ipc = require('ipc');

setInterval(function(){
	if ($('.people.notifications').find('.count').css('display') == 'block') {
	 	var numberOfNotifications = $('.people.notifications').find('.count-inner').text();
	 	numberOfNotifications = parseInt(numberOfNotifications);
	} else { var numberOfNotifications = 0;};

	if ($('.dm-nav').find('.dm-new').css('display') == 'block') {
	 	var numberOfUnreadMessages = $('.dm-nav').find('.count-inner').text();
	    numberOfUnreadMessages = numberOfUnreadMessages == '' ? 0 : parseInt(numberOfUnreadMessages);
	} else { var numberOfUnreadMessages = 0;};
  	// var numberOfUnreadTweets = $('.stream-item').find('.new-tweets-bar').attr('data-item-count');
    // numberOfUnreadTweets = numberOfUnreadTweets === undefined ? 0 : parseInt(numberOfUnreadTweets);
 	ipc.send('to_badge', numberOfNotifications + numberOfUnreadMessages);
},3000);