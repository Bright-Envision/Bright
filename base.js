(function(window, undefined){
	var w3c = !!window.addEventListener,
		class2type = {};

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

	bright.fn.init.prototype = bright.fn;



	bright.extend = bright.fn.extend = function(dest, src, clone, deep){
		var i = 1, deep, length;

		if (!src || !dest) {
			return null;
		}

		if (typeof dest == 'boolean'){
			deep = dest;
			i = 2;
		}

		if (typeof dest == 'object' && !bright.isFunction(dest)){
			dest = {};
		}

		if (length === i){
			dest = this;
			i--;
		}

		for (;i < length; i++){

		}


		if (isArray(src) || isArray(dest)){
			alert('test');
		}

	}


	bright.each = bright.fn.each = function(){
		
	}

	bright.fn.isArray = Array.isArray || function( obj ) {
		return bright.type( obj ) === 'array';
	}

	bright.fn.isFunction = function( obj ){
		return bright.type( obj ) === 'function';
	}


	bright.fn.type = function( obj ) {
		if (obj == null){
			return String(obj);
		}

		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	}





	window.bright = bright;

})(window);