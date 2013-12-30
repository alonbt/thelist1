var G = G || {};
G.Main = (function(){
	var selectedPage = parseFloat(localStorage.getItem('lastSelectedPage')) || 0;
	var isPageSelected = parseFloat(localStorage.getItem('isPageSelected')) || false;
	G.List.init('#list', selectedPage);
	G.Content.init('#content', selectedPage, isPageSelected);
}())