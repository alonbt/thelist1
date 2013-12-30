var G = G || {};
G.Cache = (function(){
	var data = JSON.parse(localStorage.getItem('data'));

	function _getData(callback) {
		if (!data) {
			G.dataRetriever.get(function(_data){
				data = _data;
				localStorage.setItem('data', JSON.stringify(data));
				callback(data);
			});
		} else {
			callback(data);
		}
	}

	function _pageListFitler(element) {
		return element.title;
	}

	return {
		getPageTitles: function (callback) {
			_getData(function(data) {
				if (!data.items) {
					$('body').trigger('errorEvent', ['no items to display']);
					return;
				}
				var titlesList = $.map(data.items, function(elem) {
				  return elem.title
				})
				callback(titlesList);
			});
		},
		getSinglePage: function (pageId, callback) {
			_getData(function(data) {
				if (!data.items || !data.items[pageId]) {
					$('body').trigger('errorEvent', ['page Id ' + pageId + ' does not exist']);
					return;
				}
				callback(data.items[pageId]);
			});
		}
	}
}());
var shuki