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
					this.context = document;
					this.elements = Array(window);
					return this;
				}  else {
					if (!this.elements && !selector.elements){
						this.elements = [selector];
						this.context = document;
					} else {
						this.elements = this.elements;
						this.context = this.context;
					}
				}
			} else if (typeof selector == 'string'){
				this.elements = bright.find(selector);			
			}


			this.context = this.context || context || document;
			this.selector = this.selector || selector;
			this.length = this.length || this.elements.length || 0;
			return this;
		},
		config: {
			debug: true,
			sockets: false,
			ajax: true
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
	bright.w3c = w3c;

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

	




	bright.extend(bright.fn, {
		delay: function(callback, delay){
			setTimeout(callback, delay);
		}
	});	

	bright.version = 1.0;

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
	bright.ismobile = function(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 return true;
		}
		return false;
	}	

	bright.media = function(){
		var supports = [];
		var audio = document.createElement('audio');
			console.log(audio);
			/*audio.support = function(){

			}*/
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

})(window);;bright.extend(bright.fn, {
		ajax: function(options){
			var defaults = {
				url: '/',
				data: 'null',
				type: 'post'
			}
			
			var options = bright.extend(options, defaults);	
			
			//main ajax call function...
			var xhr = new XMLHttpRequest();		
				if (options.type.toUpperCase() == "GET"){
					xhr.open('GET', options.url+"?"+options.data, true);
				} else	{			
					xhr.open('POST', options.url, true);
				}	
				
			
				if (options.progress && typeof options.progress == 'function') {
					var progressFunc = options.progress;
					xhr.addEventListener("progress", progressFunc, false);
				}
					
				xhr.onreadystatechange = function() {
					//Call a function when the state changes.
					if(xhr.readyState == 4 && xhr.status == 200) {
						if (options.success && typeof options.success == 'function') {
							options.success(xhr.responseText);
						}
					} else if (xhr.readyState == 4 && xhr.status != 200) {
						if (options.error && typeof options.error == 'function') {
							options.error(xhr.responseText, xhr.status);
						}
					}
				}
			if (options.type.toUpperCase() == "GET") {
				try {
					xhr.send(null);
				} catch (exception){
					if (options.error){
						options.error(null, exception.code, exception);
					}
				}
			} else {	
				try {	
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(options.data);
				} catch (exception){
					if (options.error){
						options.error(null, exception.code, exception);
					}
				}
			}
		}
});

bright.ajax = bright.fn.ajax;;//standard events
var w3c = bright.w3c;
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
});	;bright.extend(bright.fn, {	
	internalCache: {},
	/*
	*	Appends data to the object, which is called "internal cache"
	*	@param: element {obj|node} The element you want to the data to stay
	*	@param: name {string} The name you want to use
	*	@param: data {object || string || boolean} This can be any type of information, as it's only setting that value...
 	*/
	data: function(element, name, data){
		if (!element && !this.elements || !name){
			return null
		}

		var lib = this;
		bright.each(this.elements, function(){
			var actualElement = this;
			if (typeof name == 'string'){
				alert('test');
			} else if (typeof element == 'string') {
				if (lib.internalCache[actualElement]){
					//already apart of the internalCache...
					if (typeof name == 'object') {
						lib.internalCache[actualElement][element] = name;
					}
				} else {
					//the element doesn't have any data :)
					lib.internalCache[actualElement] = {};
					lib.internalCache[actualElement][element] = {};
					if (typeof name == 'object'){
						lib.internalCache[actualElement][element] = name;
					}
				}
			}
		});
		return this;
	},
	/*
	*	This does the opposite to addData, it will just remove the data 
	*/
	removeData: function(element, name, data){
		if (!element && !this.elements){
			return null
		}

		var lib = this;
		bright.each(this.elements, function(){
			var actualElement = this;
			if (typeof name == 'string'){				
			} else if (typeof element == 'string') {
				if (lib.internalCache[actualElement]){
					//already apart of the internalCache...
					if (typeof name == 'object') {
						delete lib.internalCache[actualElement][element];
					} else if (typeof element == 'string'){
						delete lib.internalCache[actualElement][element];	
					}
				} else {
					//the element doesn't have any data :)
					lib.internalCache[actualElement] = {};
					delete lib.internalCache[actualElement][element];					
				}
			}
		});
		return this;
	}
});;bright.extend(bright.fn, {
    /*
    *
    * @param: prop = {object} || {string} the css element's you want to change, this can be either a string or an element depending on the the user
    * @param: value = {string} || {int} the value you want to set the css property.
    */
   css: function(prop, value){
       var self = this;
       if (typeof prop == 'string'){
           self.each(self.elements, function(){
              if (this.style && this.style.hasOwnProperty(prop)){
                  if (!value){
                      return this.style[prop];
                  } else {
                      if (typeof value == 'number'){
                          this.style[prop] = value + 'px';
                      } else {
                          this.style[prop] = value;
                      }
                  }
              }
           });
       } else {
           //loops through the properties object and sets all the css.
           self.each(self.elements, function(){
               var el = this;
               self.each(prop, function(i, value){
                   if (el.style && el.style.hasOwnProperty(i)){
                       if (typeof value == 'number'){
                           el.style[i] = value + 'px';
                       } else {
                           el.style[i] = value;
                       }
                   }
               });
           });
       }
       return self;
   }
});
;Array.prototype.toSelector = function(){
	console.log('yay');
}

Audio.prototype.supports = function(){
	alert('test');
};/* main selector for the new library */
bright.find = function(selector, context){
	var selector = selector;
	var context = context || document;

	var selectors = selector.split(/[,]/); // "blue, yellow, red" ["blue", "red", "yellow"]
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
		var seperator = selector.indexOf(' ');	//.class > .freddy

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