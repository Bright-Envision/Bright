(function(window, undefined){
	var bright = function(selector, context){
	 	return new bright.fn.init(selector, context);	
	}

	bright.fn = bright.prototype = {
		init: function(selector){
			this.length = 1;
			this.selector = selector;
			return this;
		}
	}

	bright.prototype = bright.fn;

	window.bright = bright;

})(window);