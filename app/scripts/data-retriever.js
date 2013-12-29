var G = G || {};
G.dataRetriever = (function() {
	function _get(callback) {
		$.getJSON( "_api/data.json" )
		  .done(function(data) {
		  	if (!data) {
		  		$('body').trigger('errorEvent', [err]);
		  		return;	
		  	}
		  	callback(data);
		  })
		  .fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    $('body').trigger('errorEvent', [err])
		});

	}
	
	return {
		get: _get
	}
}());