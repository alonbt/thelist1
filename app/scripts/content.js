var G = G || {};
G.Content = (function(){

	var elem, isPageSelected, selectedPage, maxPage;

	function _init(selector, _selectedPage, _isPageSelected) {
		G.Cache.getPageTitles(function(data){
			maxPage = data.length
		});
		isPageSelected = _isPageSelected;
		selectedPage = _selectedPage
		elem = $(selector)
		G.Cache.getSinglePage(selectedPage, function(data){
			_draw(data)
		});
		_initEvents();
	};

	function _draw(data) {
		var html = _createListHtml(data);
		elem.find('.content-data').html(html);
		setConentLeftPosition();
		elem.toggleClass('open',isPageSelected);
	}

	function setConentLeftPosition() {
		var pageWidth = window.outerWidth;
		if (isPageSelected) {
			elem.css('left', 0);
		} else {
			elem.css('left', pageWidth - 60)
		}
	}

	function _createListHtml(data) {
		var html = '<div class="article-title">' + data.title + '</div><div class="article-content">' + data.content + '</div>' 
		return html;
	}

	function _displayPage(pageId) {
		selectedPage = pageId;
		G.Cache.getSinglePage(pageId, function(data){
			isPageSelected = true;
			_draw(data)
		});	
	}

	function _initEvents() {
		$('#back-to-menu').click(function(e){
			e.preventDefault();
			_togglePageState();
			elem.toggleClass('open',isPageSelected);
		});

    	Hammer(elem).on("swipeleft", function(event) {
    	    selectedPage++;
    	    if (selectedPage > maxPage) {
    	    	selectedPage = maxPage;
    	    }
    	    _displayPageAfterSwipe(selectedPage);
	    });

	    Hammer(elem).on("swiperight", function(event) {
    	    selectedPage--;
    	    if (selectedPage < 0) {
    	    	selectedPage = 0;
    	    }
			_displayPageAfterSwipe(selectedPage);
	    });

	    $( window ).resize(function() {
  			setConentLeftPosition();
		});

	}

	function _displayPageAfterSwipe(selectedPage) {
		_displayPage(selectedPage);
    	G.List.selectPage(selectedPage);
	}

	function _togglePageState() {
		isPageSelected = !isPageSelected;
		setConentLeftPosition();
	}

	return {
		init: _init,
		displayPage: _displayPage
	}
}());