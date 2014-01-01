(function(window, undefined){
	var w3c = !!document.addEventListener,
	isReady = false,
	fns = Array();

	bright = function(selector, context){
		return new bright.fn.init(selector, context);
	}

	bright.fn = bright.prototype = {
		init: function(selector, context){
			if (!selector) {return this};		

			if (typeof selector == 'object'){
				//lets test if it's an bright object				
				if (this.isSame(selector, window)){ //checks if the selector is the same as the 'window' object
					this.context = window;
					this.elements = Array(window);
					return this;
				} 
				return bright.fn;
			} else if (typeof selector == 'string'){
				this.elements = bright.find(selector);			
			}

			this.context = this.context || context || document;
			this.selector = this.selector || selector;
			this.length = this.length || this.elements.length || 0;

			return this;
		},
		version: 0.1,
		config: {
			debug: true
		},
		isSame: function(sel, context){
			if (sel === context){ 
				return true;
			}
			return false;
		},
		bindReady: function(){
			if (w3c){
				document.addEventListener("DOMContentLoaded", bright.fn.contentLoaded, true);
 			    window.addEventListener('load',  bright.fn.doReady, false);
			} else {
				document.addEvent('onreadystatechange', bright.fn.contentLoaded);
				window.attachEvent('onload', bright.fn.doReady);
				try {
					toplevel = window.frameElement === null;
				} catch (e) {}

				if (document.documentElement.doScroll & toplevel) {
					bright.fn.scrollCheck();
				}
			}
		},
		contentLoaded: function(){				
			(w3c)?
			document.removeEventListener("DOMContentLoaded", bright.fn.contentLoaded, true) :
			document.readyState === "complete" && 
			document.detachEvent("onreadystatechange", bright.fn.contentLoaded);
			bright.fn.doReady();
		},
		ready: function(fn){
			if (!isReady){
				bright.fn.bindReady();
			}			
			return (isReady)? fn.call(document) : fns.push(fn);		
		},
		scrollCheck: function(){
			if (isReady){
				return;
			}

			try {
				document.documentElement.doScroll('left');
			} catch (e){
				window.setTimeout(arguments.callee, 15);
			}	
			this.doReady();
		},
		doReady: function(){		
			if (isReady){
				return;
			} 

			isReady = true;
			var len = fns.length;
			var i =0;
			for (var i = 0; i < len; i++){
				fns[i].call(document);
			}

		}
	}

	bright.fn.init.prototype = bright.fn;

	bright.extend = bright.fn.extend =  function(){
		//extend function based on the jQuery extend function
		var options, name, src, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
		if (typeof target == 'boolean'){
			deep = target;
			target = arguments[1] || {}
		}

		if (typeof target != 'object' && typeof target != 'function'){
			target = {};
		}

		if (length === i){
			target = this;
			i--;
		}

		for (; i < length; i++){
			if ((options = arguments[i]) != null){
				for (name in options){
					src = target[name];
					copy = options[name];

					if (target === copy){
						continue;
					} 

					if (deep && copy && (bright.isPlainObject(copy) || (copyIsArray = bright.isArray(copy)))){
						if (copyIsArray){
							copyIsArray = false;
							clone = src && bright.isArray(src) ? src : [];							
						} else {
							clone = src && bright.isArray(src) ? src : {};
						}
						target[name] = bright.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	}

	bright.isArray = function(src){
		return typeof src === 'array' ? true : false;
	}

	bright.isPlainObject = function(obj){
		if (!obj || typeof obj !== 'object' || obj.nodeType){
			return false;
		}

		try {
			if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')){
				return false;
			}
		} catch (e){
			return false;
		}

		var key;
		for (key in obj){};

		return key === undefined || hasOwn.call(obj, key);
	}

	bright.each = bright.fn.each = function (object, callback, args) {		
	    var name, i = 0,
	        length = object.length,
	        isObj = length === undefined || typeof object == 'function';

	    if (args) {
	        if (isObj) {
	            for (name in object) {
	                if (callback.apply(object[name], args) === false) {
	                    break;
	                }
	            }
	        } else {
	            for (; i < length;) {
	                if (callback.apply(object[i++], args) === false) {
	                    break;
	                }
	            }
	        }

	        // A special, fast, case for the most common use of each
	    } else {
	        if (isObj) {
	            for (name in object) {
	                if (callback.call(object[name], name, object[name]) === false) {
	                    break;
	                }
	            }
	        } else {
	            for (; i < length;) {
	                if (callback.call(object[i], i, object[i++]) === false) {
	                    break;
	                }
	            }
	        }
	    }

	    return object;
	}
	

	//standard events

	bright.extend(bright.fn, {
		click: function(callback){
			if (w3c){
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.addEventListener('click', callback, false);
						}
					});
				}
			} else {
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.attachEvent('onclick', callback);
						}
					});
				}
			}
			return this;
		},
		hover: function(fnOver, fnOut){
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		},
		mouseenter: function(callback){
			if (w3c){
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.addEventListener('mouseenter', callback, false);
						}
					});
				}
			} else {
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.attachEvent('onmouseenter', callback);
						}
					});
				}
			}
			return this;
		}, 
		mouseleave: function(callback){
			if (w3c){
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.addEventListener('mouseleave', callback, false);
						}
					});
				}
			} else {
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.attachEvent('onmouseleave', callback);
						}
					});
				}
			}
			return this;
		},
		mousemove: function(callback){
			if (w3c){
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.addEventListener('mousemove', callback, false);
						}
					});
				}
			} else {
				if (this.elements) {
					bright.each(this.elements, function(i, val){
						if (val){
							val.attachEvent('onmousemove', callback);
						}
					});
				}
			}
			return this;
		}
	});


	bright.extend(bright.fn, {
		delay: function(callback, delay){
			setTimeout(callback, delay);
		}
	});	


	//html5 feature detection, http://diveintohtml5.info/detect.html
	bright.detection = function(){
			//this will run through all the detections and return an object with them..
			var obj = {};
			obj.canvas = bright.canvas();
			obj.localstorage = bright.localstorage();
			obj.audio = bright.audio();
			obj.video = bright.video();
			obj.applicationCache = bright.applicationCache();
			obj.fileApi = bright.fileApi();
			obj.workers = bright.workers();
			obj.geolocation = bright.geolocation();
			return obj;
	}
	bright.canvas = function(){
			return !!document.createElement('canvas').getContext
	}
	bright.localstorage = function(){
			return !!window.localStorage;
	}
	bright.audio = function(){
			return !!window.Audio;
	}
	bright.video = function(){
			return !!document.createElement('video').canPlayType;
	}
	bright.applicationCache = function(){
			return !!window.applicationCache;
	}
	bright.fileApi = function(){
			return !!FileReader;
	}
	bright.workers = function(){
			return !!window.Worker;
	}	
	bright.geolocation = function(){
			return !!navigator.geolocation;
	}
	bright.mobile = function(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 return true;
		}
		return false;
	}


	/* main selector for the new library */

	bright.find = function(selector, context){
		var selector = selector;
		var context = context || document;

		var selectors = selector.split(/[,]/);
		var selectorslength = selectors.length;

		var elements = Array();

		for (var i = 0; i < selectorslength; i++){
			var currentSelector = selectors[i];
			if (currentSelector.charAt(0) === '.'){
				var el = findSelectors(currentSelector, 'class', context);
				if (el.length > 1) {
					elements = el;
				} else {
					elements.push(findSelectors(currentSelector, 'class', context));
				}
			}
		}
		function findSelectors(selector, type, context){

			var returnArray = Array();
			var seperator = selector.indexOf(' ');	

			if (seperator !== -1){ 
				if (hasCss3Selector(selector)){
						if (selector.indexOf('>') != -1){
							//css3 child selector...
							//so now we need to split the selector, and then we need to also need to 
							//find the first element e.g .class 
							var css3Selector = selector.split('>');
							if (css3Selector.length == 2) {
								//just an easy css3 selector e.g element > div
								var parent;
								css3Selector[0] = css3Selector[0].replace(/[ \s]/gi, ''); //removes the space
								if (css3Selector[0].charAt(0) == '.'){
									parent = findSelectors(css3Selector[0], 'class', context);
								} else if (css3Selector[0].charAt(0) == '#'){
									//id so #id > div
									parent = findSelectors(css3Selector[0], 'id', context);
								} else {
									//ordanary tag so div
									parent = findSelectors(css3Selector[0], null, context);
								}

								if (parent) {
									css3Selector[1] = css3Selector[1].replace(/[ \s]/gi, '');
									if (css3Selector[1].charAt(0) == '.'){
										return new findSelectors(css3Selector[1], 'class', parent);										
									} else if (css3Selector[1].charAt(0) == '#') {
										return new findSelectors(css3Selector[1], 'id', parent);		
									} else {
										return new findSelectors(css3Selector[1], 'element', parent);
									}
								} else {
									return null; //no parent, so we dont do anything....
								}
							}
						}

				} else {
					var classes = selector.split(' ');
					var amountClass = classes.length;
					for (var i = 0; i < amountClass; i++){
						console.log(classes[i]);
						//var ele = findClass(classes[i], context);
					}
				}
			} else if (type == 'class') {
				return findClass(selector, context);
			} else if (type == 'id') {
				return findId(selector, context);
			} else {
				return findElements(selector, context);
			}
		}


		function findClass(selector, context){
			var elements = context.getElementsByTagName('*'); //gets all the elements on the page
			var elLen = elements.length;
			var element = Array();
			selector = selector.replace(/[.]/gi, ''); //replaces the dots that are/will be in the selector string

			for (var i = 0; i < elLen; i++){ //loops through all the elements and then checks the classnames
				if (elements[i] && elements[i].className === selector){
					element.push(elements[i]);
				}
			}
			if (element.length > 1){
				return element;
			} else {
				return element[0] || null;
			}
		}


		function findId(selector, context){
			//returns the id... we can just use getElementByID..., but we need to filter the id so we removes the spaces and such
			return context.getElementByID(selector.replace(/[ \s]/gi, ''));
		}

		function findElements(selector, context){
			//lets filter the selector...
			selector = selector.replace(/[ \s]/gi, '');
			var elements = context.getElementsByTagName(selector);	
			var elLen = elements.length;
			var element = Array();

			for (var i = 0; i < elLen; i++){ //loops through all the elements and then checks the classnames
					element.push(elements[i]);
			}
			if (element.length > 1){
				return element;
			} else {
				return element[0] || null;
			}
		}

		function specialSelectors(){

		}

		function css3Selector(){

		}

		function hasCss3Selector(selector){
			if (selector && (selector.indexOf(':') !== -1 || selector.indexOf(':') != -1 || selector.indexOf('+') != -1 ||
			selector.indexOf('::') != -1 || selector.indexOf('~'))) {
				return true;
			}
			return false;
		}

		return elements;
	}

	//now lets expose bright to the world :)
	if (!window.bright){
		window.bright = bright;
	} else {
		//hmm window.bright is already taken??				
		if (window.bright().version && (window.bright().version !== bright().version)){	
			window['bright' + bright().version] = bright;
			//this is less obstructive and can have multiple versions of the library....
		}
	}

})(window);