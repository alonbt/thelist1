var G = G || {};
G.ErrorHandler = (function() {
	$('body').on("errorEvent", function(event, errMsg) {
		console.error(errMsg);
	});
}());