var G = G || {};
G.List = (function(){

	var elem;
	var selectedPage;

	function _init(selector, selected) {
		selectedPage = selected;
		elem = $(selector);
		G.Cache.getPageTitles(function(data){
			_draw(data)
		});
		_initEvents();
	};

	function _draw(data) {
		var html = _createListHtml(data);
		elem.find('ul').html(html);
		_selectPage(selectedPage);
	}

	function _selectPage(pageId) {
		elem.find('ul li').removeClass('selected'); 	
		elem.find('ul li#' + pageId).addClass('selected'); 	
	}

	function _createListHtml(data) {
		var html = "";
		for (var i=0; i < data.length; i++) {
			html += '<li id="' + i + '">' + data[i] + '</li>'
		}
		return html		
	}

	function _initEvents() {
		elem.find('li').click(function(e){
			selectedPage = parseFloat($(this).attr('id')) 
			_selectPage(selectedPage);
			G.Content.displayPage(selectedPage);
		})
	}

	return {
		init: _init,
		selectPage: _selectPage
	}
}());