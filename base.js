/*! 
*  Bright JavaScript Library v1.2
*  Author: Ryan Clough	
*/

(function( window, undefined ) {
	var version = 1.2,
	isready = false,
	queue = [],
	document = window.document,
	navigator = window.navigator,
	location = window.location,
	rmsPrefix = /^-ms-/,
	// regedit values
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,
	isSimple = /^.[^:#\[\.,]*$/,
	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,	
	// Used by bright.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},
	
	bright = function( selector, context ) {		
		return new bright.fn.init(selector, context);		
	};

	
	bright.fn = bright.prototype = {
		init:function(selector, context)
		{	
			/* 						*\
					Selector
			\* 						*/
			
			//Initialize....
			//the selectors	
			 if (!selector) {
				return this;
			}	
					
			this.selector = selector;
			this.context = document;
			this.length = 1;
			var elementArray = Array(); //houses the multiple elements		
			if (selector === "body" && !context && document.body) {		
				elementArray.push(document.body);
				this[0] = elementArray;
				return this;
			}		
		
			//first off we, will test the selector varible to see if its empty
			if (selector)
			{
				if (typeof selector === 'string'){
					//hmmm so lets see 
				

				}
			}
			else
			{
				this.length = 0;
				this.context = window;
				this.selector = "";
				return this;
			}
			
			
			//old model... but im re-doing...
			
			if (typeof selector === "object")
			{
		    	if (selector.length > 0)
				{
					if (typeof selector == 'object'){						
						this[0] = selector;
						return this;
					}
					else if ((typeof selector==="object") &&(selector.nodeType===1) && (typeof selector.style === "object") && (typeof selector.ownerDocument ==="object"))
					{
						alert('test');
					}
					else
					{
						alert('test1');
					}
				}
				else
				{				
					if (selector[0])
					{
						this[0] = selector[0];
						return this;
					}
					else
					{
						elementArray.push(selector);
						this[0] = elementArray;
						return this;
					}
				}
			}
			else if (selector.indexOf(" ") !== -1 && typeof selector === 'string')
			{
				//spaces in the code... for example bright(".class span").click...				
				var split = selector.split(/[ :]+?/g);					
				if (split[0].charAt(0) === "#")
				{
					var ele = document.getElementById(split[0].slice(1));
					//so it has the first element... now we have to check the second split...
					
					if (split[1].charAt(0) == ".")
					{						
						var fullele = el.getElementsByTagName('*');
						for (var i = 0;i < ele.length; i++)
						{							
							if (ele[i].className == (split[1].slice(1)))
							{													
								elementArray.push(ele[i]);
							}
						}
					  if (elementArray)
					  {	
						if (split[2])
						{
							var peices = split[2].split(/\(/g);
							if (peices[0] == "nth-child")
							{
								var num = peices[1].replace(')', '');	
								elementArray = [elementArray[parseInt(num)]];
								this[0] = elementArray;
								return this; 
								
							}
						}
						if (elementArray.length < 1){							
							this[0] = elementArray;
							return this;
						}
						this[0] = elementArray;
						return this;
					  }
					  else
					  {
						 return this;
					  }
					}
					else
					{
						//could be a id or a tag so we will check if its a id first...
						if (split[1].charAt(0) == "#")
						{
							var ele = el.getElementById(split[1].slice(1));
							this[0] = ele;
							return this;
						}
						else
						{
							//must be a tag...							
							var ele = ele.getElementsByTagName(split[1]);
							 //this will return a node list so we will sort out the node list into an array before we return it.
							 for (var i = 0; i < ele.length; i++)
							 {
								 elementArray.push(ele[i]);
							 }							
							 if (elementArray)
							 {								
								if (split[2])
								{
									var peices = split[2].split(/\(/g);
									if (peices[0] == "nth-child")
									{
										var num = peices[1].replace(')', '');	
										elementArray = [elementArray[parseInt(num)]];
										this[0] = elementArray;
										return this; 
										
									}
								}
							 	this[0] = elementArray;
								return this;
							 }
							 else
							 {								
								 return this;
							 }
							
						}
					}
				}
				
				if (split[0].charAt(0) === ".")
				{
					var el;
					var ele = document.body.getElementsByTagName('*');					
					for (var i = 0;i < ele.length; i++)
					{	
						if (ele[i].className.indexOf(" "))
						{
							//the classname has two classes in it so split!
							var cl = ele[i].className.split(" ");																
							if (cl == split[0].slice(1))
							{											
								el = ele[i]; //should be the first selector									
							}
						}
						else
						{
							if (ele[i].className == (split[0].slice(1)))
							{									
								el = ele[i]; //should be the first selector									
							}
						}
					}
					
					//now checks the second split...
					
					if (split[1].charAt(0) == ".")
					{	
						if (!el) return;
						var fullele = el.getElementsByTagName('*');
						for (var i = 0;i < ele.length; i++)
						{							
							if (ele[i].className == (split[1].slice(1)))
							{													
								elementArray.push(ele[i]);
							}
						}
					  if (elementArray)
						 {
						 	
							 this[0] = elementArray;
							return this;
						 }
						 else
						 {
							 return this;
						 }
					}
					else
					{
						//could be a id or a tag so we will check if its a id first...
						if (split[1].charAt(0) == "#")
						{
							var ele = el.getElementById(split[1].slice(1));
							return ele;
						}
						else
						{
							//must be a tag...							
							var ele = el.getElementsByTagName(split[1]);
							 //this will return a node list so we will sort out the node list into an array before we return it.
							 for (var i = 0; i < ele.length; i++)
							 {
								 elementArray.push(ele[i]);
							 }							
							 if (elementArray)
							 {
								if (split[2])
								{
									var peices = split[2].split(/\(/g);
									if (peices[0] == "nth-child")
									{
										var num = peices[1].replace(')', '');										
										this[0] = elementArray[parseInt(num)];
										return this; 
										
									}
								}
							 	this[0] = elementArray;
								return this;
							 }
							 else
							 {
								 return this;
							 }
							
						}
					}
				}
				
			}
			else if (selector.charAt(0) === "#")
			{
				//get ids
				var ele = document.getElementById(selector.slice(1));
				elementArray.push(ele);
				this[0] = elementArray;
				return this;
			}
			else if (selector.charAt(0) === ".")
			{
				//class...
				var elements = Array();
				var ele = document.body.getElementsByTagName('*');
				for (var i = 0;i < ele.length; i++)
				{
					if (ele[i].className == (selector.slice(1)))
					{	
						elements.push(ele[i]);						
					}
				}
				this[0] = elements;
				return this;
			}
			else
			{
				
				//must just want tags...
				var split = selector,
				elementArray = Array();
				if (selector.indexOf(":") != -1)
				{
					var split = selector.split(/[ :]+?/g);					
					var ele = el.getElementsByTagName(split[0]);
				}
				else
				{
						var ele = document.body.getElementsByTagName(selector);
				}
				 //this will return a node list so we will sort out the node list into an array before we return it.
				 for (var i = 0; i < ele.length; i++)
				 {
					 elementArray.push(ele[i]);
				 }							
				 if (elementArray)
				 {
					if (split[1])
					{
						var peices = split[1].split(/\(/g);
						if (peices[0] == "nth-child")
						{
							var num = peices[1].replace(')', '');										
							this[0] = elementArray[parseInt(num)];
							return this; 
							
						}
					}
					this[0] = elementArray;
					return this;
				 }
				 else
				 {
					 return this;
				 }
			}
			
		},
		constructor: function (selector, context) 
		{
			return new bright.fn.init(selector, context);		
		},
		show: function()
		{
			if (this[0].length > 0)
			{
				var ele = this[0];
				for (var i = 0; i < ele.length; i++)
				{
					ele[i].style.display = "block";
				}
			}
			else
			{
				//the base toggle function for just one element...
				this[0].style.display = "block";
			}
			return this;
		},
		hide: function()
		{
			
			if (this[0].length > 0)
			{
				var ele = this[0];			
				for (var i = 0; i < ele.length; i++)
				{
					ele[i].style.display = "none";
				}
			}
			else
			{
				//the base toggle function for just one element...
				
				this[0].style.display = "none";
			}
			return this;
		},
		toggle:function()
		{						
			if (this[0].length > 0)
			{				
				var ele = this[0];
				for (var i = 0; i < ele.length; i++)
				{
					if (ele[i].style.display != "none")
					{
						ele[i].style.display = "none";
					}
					else
					{
						ele[i].style.display = "block";
					}
				}
			}
			else
			{
				//the base toggle function for just one element...
				if (ele.style.display != "none")
					{
						this.style.display = "none";
					}
					else
					{
						this.style.display = "block";
					}
			}			
			return this;
		},
		click: function(e)
		{
			 if (this[0] == undefined)
			 	return false; //to stop some errors from arising	
				
		
		        if (this[0].length > 0) {
			        //not a single so we will loop the event handler list
		            if (e) {
		            	var ele = this[0];
		                for (var i = 0; i < ele.length; i++) {
		                    if (ele[i].addEventListener) {
		                        ele[i].addEventListener('click', e, false);
		                    } else {
		                        //for ie8 due to ie not working with addEventListener
		                        ele[i].attachEvent('onclick', e);
		                    }
		                }
		            }
		        } else if (this[0]) {       
		
		            if (this[0].addEventListener) {
		                this[0].addEventListener('click', e, false);
		            } else {
		                //for ie8 due to ie not working with addEventListener
		                this[0].attachEvent('onclick', e);
		            }
		        }
		

			},
			slideDown: function (e) {
	    	//its kind of self expantry it makes an element slide down...
	    
	    
	        //default options now we merge them with the $.extend function to get the right results
	        if (this[0].length > 0)
	        {
				var e = this[0];
				for (var i = 0; i < e.length; i++)
				{
					bright(e[i]).slideDown(e);
				}
			}	        
	        else
	        {
		        var ele = this[0]; //work on easing, with a formular with the speed	      
		      
		        var options = {
		            'speed': 500,
		            'maxHei': 500,
		            'minHei': 20,
		            'padding': false,
		            'border': false
		        }
		        var e = bright("").extend(options, e); //mainly internal use
		        var time = e.speed;
		
		        if (!e.padding) {
		
		            ele.style.padding = "0px";
		        }
		
		        if (!e.border) {
		            ele.style.border = "0px";
		        }
		
		
		        //this is the object
		        var slider = ele;
		        var timer = null;
		        var maxheight = ((e.minHeight = !undefined) ? e.maxHei : e.minHei); //20	
		
		        if (slider.style.height == '' && slider.style.display == '') {
		            slider.style.display = 'block';
		            slider.style.height = slider.offsetHeight + 'px';
		        }
		
		        function SlideDown() {		            
		            var instanceheight = parseInt(slider.style.height);
		            var init = (new Date()).getTime();
		            var height = maxheight;		           
		            var disp = height - parseInt(slider.style.height);
		            timer = setInterval(function () {
		                var instance = (new Date()).getTime() - init;
		                if (instance < time) {
		                    var pos = Math.floor(disp * instance / time);
		                    result = instanceheight + pos;
		                    slider.style.height = result + 'px';
		
		                } else {
		                    slider.style.height = height + 'px'; //safety side ^^
		                    clearInterval(timer);		                   
		                }
		            }, 1);
		        }
		        SlideDown();
		    }
			return this;
	    },
	    slideUp: function (e) {
	    	//its kind of self expantry it makes an element slide Up...
	        var ele = this[0];
	        if (!ele)
	        {
		        return; //something went wrong... their is no selector...
	        }
	        else
	        {
		        if (ele.length >  1)
		        {		        	
			        for (var i = 0; i < ele.length; i++)
			        {			        
				        bright(ele[i]).slideDown(); //
			        }
		        }
	        }


	        var options = {
	            'speed': 500,
	            'maxHei': 500,
	            'minHei': 20,
	            'padding': false,
	            'border': false
	        }
	        var e = bright.extend(options, e);
	        var time = e.speed;
	
	        if (!e.padding) {
	            //this removes the padding, if the user selects it.
	            ele.style.padding = "0px";
	        }
	
	        if (!e.border) {
	            ele.style.border = "0px";
	        }
	
	
	        var time = e.speed;
	
	        //this is the object
	        var slider = ele;
	        var timer = null;
	        var maxheight = ((e.minHeight = !undefined) ? e.minHei : e.maxHei); //20	
	
	        if (slider.style.height == '' && slider.style.display == '') {
	            slider.style.display = 'block';
	            slider.style.height = slider.offsetHeight + 'px';
	        }
	
	
	        function SlideUp() {
	            clearInterval(timer);
	            var instanceheight = parseInt(slider.style.height);
	            var init = (new Date()).getTime();
	            var height = maxheight;
	
	            var disp = height - parseInt(slider.style.height);
	            timer = setInterval(function () {
	                var instance = (new Date()).getTime() - init;
	                if (instance < time) {
	                    var pos = Math.floor(disp * instance / time);
	                    result = instanceheight + pos;
	                    slider.style.height = result + 'px';
	
	                } else {
	                    slider.style.height = height + 'px'; //safety side ^^
	                    clearInterval(timer);
	                }
	            }, 1);
	        }
	        SlideUp();
			return this;
	    },
	    slideToggle: function (e) {
	    	//its kind of self expantry it just toggles both slideup and slide down...
	    	
	        if (!e) {
	            //the will be the defualt values, just in case
	
	            var e = {
	                'speed': 500,
	                'maxHei': 500,
	                'minHei': 0,
	                'padding': false,
	                'border': false
	            }
	        }
	        var ele = this[0];
	        if (this[0].length > 0){
		        for (var i = 0; i < this[0].length; i++)
		        {		        	
			       if (parseInt(ele[i].offsetHeight) <= e.minHei || ele[i].style.height == "") {			       	
			            $(ele[i]).slideDown(e);
			        } else {
			            $(ele[i]).slideUp(e);
			        }
		        }
		     }
		     else
		     {		     	
			     if (parseInt(ele.offsetHeight) <= e.minHei || ele.style.height == "") {
			            $(ele).slideDown(e);
			        } else {
			            $(ele).slideUp(e);
			        }
		     }
			return this;
	      },
		  fadeOut: function()
		  {				
			bright(this[0]).each(function(i, element){
				var op = 1.0;  // initial opacity				
				var FadeOutTimer = setInterval(function () {					
					if (op <= 0.1){	
						clearInterval(FadeOutTimer);					
						element.style.display = 'none';
						element.style.opacity = 0;
						element.style.filter = 'alpha(opacity=' + 0 + ")";
						
					}						
					element.style.opacity = op;
					element.style.filter = 'alpha(opacity=' + op * 100 + ")";					
						
					op -= 0.1;
				}, 100);
			});
			return this;
		  },
		  fadeIn: function()
		  {
			if (this[0].length > 1)
			{
				var e = this[0];
				for (var i = 0; i < e.length; i++)
				{
					bright(e[i]).fadeOut();
				}
			}
			
			var element = this[0][0];
			var op = 0;  // initial opacity
				element.style.display = 'inherit';
				var timer = setInterval(function () {
					if (op >= 1.0){
						clearInterval(timer);						
					}					
					element.style.opacity = op;
					element.style.filter = 'alpha(opacity=' + op * 100 + ")";
					op += 0.1;
				}, 100);
			return this;
		  },
		  fadeToggle: function()
		  {
			if (this[0].length > 1)
			{
				var e = this[0];
				for (var i = 0; i < e.length; i++)
				{
					if (e[i].style.opacity >= 1.0 || !e[i].style.opacity)
					{
						bright(e[i]).fadeOut();				
					}
					else
					{
						bright(e[i]).fadeIn();
					}

				}
			}
			else
			{
				if (this[0].style.opacity >= 1.0 || !e[i].style.opacity)
				{
					bright(this[0]).fadeOut();				
				}
				else
				{
					bright(this[0]).fadeIn();
				}
			}
		  },
		  val: function(e)
		  {		

			
			if (this[0].length > 0)
			{
				var value = [];
				for (var i = 0; i < 6; i++){					
					if (e)
					{
						this[0][i].value = e;
					}
					else
					{						
						value.push(this[0][i].value);
					}
				}
				return value;
			}
			else
			{
				if (e)
				{
					this[0].value = e;
				}
				else
				{
					return this[0].value;
				}
			}
			return this;
		  },
		  wait: function(ms)
		  {
			//makes the function wait....
			return this;
		  },
		  placeholder: function(text)
		  {
			var eleList = Array();
				//we will create spans to span over the elements...
				if (this[0].length > 0){
						var ele = this[0];
						for (var i = 0; i < ele.length; i++){
							bright(ele[i]).placeholder(text);
						}
				}
				else
				{
					var inners = this[0].cloneNode(true);
					var parentEle = this[0].parentNode;
					var ele = document.createElement('div');
						ele.className = "brightInputHolder";
						ele.style.position = "relative";
						ele.style.display = "inline-block";
					parentEle.insertBefore(ele, this[0].nextSibling);	
					parentEle.removeChild(this[0]);
					ele.appendChild(inners);					
					
					var s = document.createElement('span');						
					s.className = "brightPlaceholder";	
					s.innerHTML = text;
					s.style.color = "#adadad";
					s.style.position = "absolute";
					s.style.left = "8px";
					s.style.top = "4px";
					ele.appendChild(s);	
					
					s.onclick = function()
					{						
						bright(s).hide();
						inners.focus();
					}
					
					inners.onfocus = function()
					{
						bright(s).hide();
					}
					
					inners.onblur = function()
					{
						if (inners.value == "")
							bright(s).show();
					}
				}
			 return this;
		  },
		  validate: function(borders, options, fun)
		  {
		  	var border = false,
		  	color = "";
		  	if ((typeof borders == "boolean") && borders)
		  	{
			  	//wants a border and stuff...
			  	border = true;
			  	color = options.color;
		  	}
			//this will  validate any form that gets inserted into it... it will be able to check if the user has put some values in... Simple Validate
			bright.each(this[0], function(i, elem)
				{
					
					var follow = true;
					var inputsElements = Array();
					
					var inputs = elem.getElementsByTagName('input');
					
					for (var i = 0; i < inputs.length; i++){
						var type = inputs[i].type.toUpperCase();					
						inputsElements.push(inputs[i]);				
						if (type == "SUBMIT"){											
							bright(inputs[i]).click(function(e){
								//the base click function...			
								var returnElements = [];
								e.preventDefault();
									
								for (var s = 0; s < inputsElements.length;s++)
								{	
									type = inputsElements[s].type.toUpperCase();												
									var filter = ((type == "CHECKBOX") || (type == "RADIO") || (type == "SUBMIT"));//filters out the ones we cant check...									
									if (!filter) //checks if all the filtering worked
										{	
											if ((inputsElements[s].value == undefined)||(inputsElements[s].value == "")){										
												if (inputsElements[s].value.length < 1)
												{	
													if (border)
													{
														bright(inputsElements[s]).css('border', '2px inset '+color+'');												
													}									
													returnElements.push(inputsElements[s]);
												}	
												else
												{
													if (border)
													{
														bright(inputsElements[s]).css('border', '2px inset');												
													}			
												}											
											}
											else
											{
												if (border)
												{
													bright(inputsElements[s]).css('border', '2px inset');												
												}			
											}									
										}
								}
								if (typeof fun == "function")
								{								
									if (returnElements.length > 0)
										fun(returnElements);								
								}
														
								
							});
						}
					}
				});
				return this;
			},
			html: function(text)
			{				
				if (this[0].length > 0)
				{
					var ele = this[0];
						for (var i = 0; i < ele.length; i++){
							bright(ele[i]).html(text);
						}

				}
				else
				{
					if (text){
						this[0].innerHTML = text;
					}
					else
					{
						return this[0].innerHTML;
					}
				}
				return this;
			},			
			lightbox: function()
			{
				lightbox(this);
				return this;
			}, 
			removeClass: function(value)
			{				
				var name = "";
				if (value && typeof value === "string") {
					bright(this[0]).each(function(i, element){
						if (element.className)
						{
							var splitName = element.className.split(' '); //split on the space
							for (var i = 0; i < splitName.length; i++)
							{
								if (splitName[i] != value)
								{
									name += splitName[i]+" ";
								}								
							}
							element.className = name;
						}
					});
				}
				return this;
			},
			is: function (selector) {				
				return !!selector && (typeof selector === "string" ? bright.filter(selector, this).length > 0 : this.filter(selector).length > 0);
			},
			filter: function (selector) {
				return this.pushStack(winnow(this, selector, true), "filter", selector);
			},
			animate: function(prop, speed, easing, callback)
			{				
				var optall = bright.speed( speed, easing, callback );
				if ( bright.isEmptyObject( prop ) ) {
					return this.each( optall.complete, [ false ] );
				}
		
				// Do not change referenced properties as per-property easing will be lost
				prop = bright.extend( {}, prop );				
				
				function doAnimation()
				{
					// XXX 'this' does not always have a nodeName when running the
					// test suite
					
					if ( optall.queue === false ) {
						bright._mark( this );
					}

					var opt = bright.extend( {}, optall ),
						isElement = this.nodeType === 1,
						hidden = isElement && bright(this[0]).is(":hidden"),
						name, val, p, e, hooks, replace,
						parts, start, end, unit,
						method;
					
					// will store per property easing and be used to determine when an animation is complete
					opt.animatedProperties = {};

					// first pass over propertys to expand / normalize
					for ( p in prop ) {
						name = bright.camelCase( p );
						if ( p !== name ) {
							prop[ name ] = prop[ p ];
							delete prop[ p ];
						}

						if ( ( hooks = bright.cssHooks[ name ] ) && "expand" in hooks ) {
							replace = hooks.expand( prop[ name ] );
							delete prop[ name ];

							// not quite $.extend, this wont overwrite keys already present.
							// also - reusing 'p' from above because we have the correct "name"
							for ( p in replace ) {
								if ( ! ( p in prop ) ) {
									prop[ p ] = replace[ p ];
								}
							}
						}
					}

					for ( name in prop ) {
						val = prop[ name ];
						// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
						if ( bright.isArray( val ) ) {
							opt.animatedProperties[ name ] = val[ 1 ];
							val = prop[ name ] = val[ 0 ];
						} else {
							opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
						}

						if ( val === "hide" && hidden || val === "show" && !hidden ) {
							return opt.complete.call( this );
						}

						if ( isElement && ( name === "height" || name === "width" ) ) {
							// Make sure that nothing sneaks out
							// Record all 3 overflow attributes because IE does not
							// change the overflow attribute when overflowX and
							// overflowY are set to the same value
							opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

							// Set display property to inline-block for height/width
							// animations on inline elements that are having width/height animated
							if ( bright.css( this, "display" ) === "inline" &&
									bright.css( this, "float" ) === "none" ) {

								// inline-level elements accept inline-block;
								// block-level elements need to be inline with layout
								if ( !bright.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
									this.style.display = "inline-block";

								} else {
									this.style.zoom = 1;
								}
							}
						}
					}

					if ( opt.overflow != null ) {
						this.style.overflow = "hidden";
					}

					for ( p in prop ) {						
						e = new bright.fx( this, opt, p );
						val = prop[ p ];

						if ( rfxtypes.test( val ) ) {

							// Tracks whether to show or hide based on private
							// data attached to the element
							method = bright._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
							if ( method ) {
								bright._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
								e[ method ]();
							} else {
								e[ val ]();
							}

						} else {
							parts = rfxnum.exec( val );
							start = e.cur();

							if ( parts ) {
								end = parseFloat( parts[2] );
								unit = parts[3] || ( bright.cssNumber[ p ] ? "" : "px" );

								// We need to compute starting value
								if ( unit !== "px" ) {
									bright.style( this, p, (end || 1) + unit);
									start = ( (end || 1) / e.cur() ) * start;
									bright.style( this, p, start + unit);
								}

								// If a +=/-= token was provided, we're doing a relative animation
								if ( parts[1] ) {
									end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
								}

								e.custom( start, end, unit );

							} else {
								e.custom( start, val, "" );
							}
						}
					}
					return true;
				}			
				return optall.queue === false ? this.each( doAnimation ) : this.queue( optall.queue, doAnimation );
			},
			parent: function()
			{			
				var ElementArray = [];
				if (this[0].length > 0)
				{
					for (var i = 0; i < this[0].length; i++)
					{
						ElementArray.push(this[0][i].parentNode);	
					}
				}
				else
				{
					ElementArray.push(this[0].parentNode);	
				}
				this[0] = ElementArray;
				return this;
			},
			attr: function(attribute, value)
			{
				if (attribute)
				{					
					if (value)
					{
						bright(this[0]).each(function(i, elem){
							elem.setAttribute(attribute, value); //= value	
						});
						return this;
					}
					else
					{
						var returnvalue = Array();
						bright(this[0]).each(function(i, elem){							
							returnvalue.push(elem.getAttribute(attribute));				
						});	
						return returnvalue;
					}
				}
				return this;
			},
			fileUpload: function(options)
			{			
				var defaults = {
					sendName: 'data',
					url: '#'
				}
				
				var options = bright.extend(defaults, options);
				bright(this[0]).dragAndDrop({
						filehandler: function(evt){
							evt.preventDefault();						
							evt.target.style.border = "0";						
							var files = evt.dataTransfer.files;					
							if (files.length > 0){
								for (var i = 0; i < files.length; i++){	
									var file = files[i];
									var filereader = new FileReader();								
									filereader.readAsDataURL(file);
									filereader.onload = function()
									{										
										var name = file.name;
										var result = this.result;
										var data = {											
											name: name,
											value: result
										}
										var Stringdata = JSON.stringify(data);
										var sendData = options.sendName + "=" + Stringdata;										
										//now do the upload....
										bright.ajax({
											type: 'POST',
											url: options.url,
											data: sendData,
											uploadFile: true,
											success: function (data)
											{
												alert(data);
											},
											progress: function(data)
											{
												
											}
										});
									}
									
								}
							}
						}					
					});				
			},
			dragAndDrop: function(options)
			{		
				/* this is a function that handles all html5 drag and drop features */
				
				var defaults = {
					filehandler: function(evt){
						evt.preventDefault();
					},
					enter: function(evt){
						evt.preventDefault();						
					},
					leave: function(evt){
						evt.preventDefault();						
					}
				}
				
				var options = bright.extend(defaults, options);
				var filehandler = options.filehandler;
				var dragover = options.enter;
				var dragleave = options.leave;		
			
				bright(this[0]).each(function(i, elem){					
					elem.addEventListener('drop', options.filehandler, false);
					elem.addEventListener('dragover', options.enter, false);	
					elem.addEventListener('dragexit', options.leave, false);					
				});
				return this;
			},			
			remove: function()
			{					
				if (this[0].length)
				{
					for (var i = 0; i < this[0].length; i++){
						var parent = bright(this[0][i]).parent()[0];					
						parent.removeChild(this[0][i]);
					}
				}
				else
				{
					var parent = bright(this[0]).parent()[0][0];							
						parent.removeChild(this[0]);
				}
							
				return this;
			},
			addClass: function(value)
			{				
				var name = "";
				if (value && typeof value === "string") {
					bright(this[0]).each(function(i, element){						
						if (element.tagName)
						{							
							var splitName = element.className.split(' '); //split on the seperator between the classNames
							for (var i = 0; i < splitName.length; i++)
							{								
								if (splitName[i].length < 1)
								{
									name += value;
								}
								else
								{
									name += splitName[i]+" "+value;
								}
							}
							element.className = name;
						}
					});
				}
				return this;
			},			
			text: function(obj)
			{
				
				var text = null;
				if (this[0])
				{
					if (!obj){
						text = this[0].innerText;
						return text;
					}
					else
					{
						this[0].innerText = obj;
						return this;
					}
				}
				
			},
			append: function(html)
			{	
				bright.each(this[0], function(i, elem)
				{							
					return elem.appendChild(html);	
				});			
			},
			findChild: function(elemName)
			{			
				var child = [];				
				if (elemName.charAt(0) == "."){
					//classes						
					bright(this[0]).each(function(s, elem){						
						var elem = elem.getElementsByTagName('*');
						for (var i = 0; i < elem.length; i++)
						{							
							if (elem[i].className == elemName.substr(1, elemName.length))
							{
								child.push(elem[i]);							
							}
						}
					});
				}				
				else
				{					
					var elem = this[0].getElementsByTagName('*');
					for (var i = 0; i < elem.length; i++)
					{						
						if (elem[i].tagName == elemName.toUpperCase())
						{
							child.push(elem[i]);							
						}
					}
				}
				this[0] = child;
				return this;
			},
			hover: function(func, func1)
			{
				if (this[0].length > 0)
				{										
					for (var i = 0; i < this[0].length; i++){
						this[0][i].addEventListener("mouseover", func, false);
						if (func2)
							this[0][i].addEventListener("mouseout", func1, false);
					}
				}
				else
				{					
					this[0].addEventListener("mouseover", func, false);
					if (func1)
						this[0].addEventListener('mouseout', func1, false);
				}
			},
			each: function(callback, args)
			{		
				return bright.each(this[0], callback, args);
			},
			bright: 1.2
}
	

// Give the init function the bright prototype for later instantiation	
bright.fn.init.prototype = bright.fn;
	
bright.extend = bright.fn.extend = function(){
		//from bright 1.7.2
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
		
		if (typeof target === "boolean") {
			deep = target;		
			 target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		
		if (typeof target !== "object" && !bright.isFunction(target))
		{
			target = {};
		}		
		
	    if (length === i) {
			target = this;
			--i;
		}		
		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (bright.isPlainObject(copy) || (copyIsArray = bright.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && bright.isArray(src) ? src : [];

						} else {
							clone = src && bright.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = bright.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

    // Return the modified object
    return target;
}

/* 				*\
	Base tools
\*				*/

bright.extend({
	each: function(obj, callback, args)
	{	
		if (!obj)
			return;
			
		var name, i = 0,
		length = obj.length,
		isObj = length === undefined || bright.isFunction(obj);
		
		if (args)
		{
			if (isObj)
			{		
				for (name in obj)
				{				
					if (callback.apply(obj[name], args) === false)
					{
						break;
					}
				}		
			}
			else
			{
				for (var i = 0; i < length; i++)
				{
					if (callback.apply(obj[i++], args) === false)
					{
						break;
					}
				}
			}	
		}
		else
		{
			if (isObj)
			{
				for (name in obj)
				{			
					if (callback.call(obj[name], name, obj[name]) === false)
					{
						break;
					}
				}		
			}
			else
			{
				for (var i = 0; i < obj.length;)
				{				
					if (callback.call(obj[i], i, obj[i++]) === false)
					{
						break;
					}
				}
			}
		}
		return obj;
	},
	isArray: function(src)
	{
		return typeof src == "array"? true : false
	},
	_mark: function (elem, type) {
		if (elem) {
			type = (type || "fx") + "mark";
			bright._data(elem, type, (bright._data(elem, type, undefined, true) || 0) + 1, true);
		}
	},
	inArray: function(array, value)
	{
		var returnValue = -1;
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] == value)
			{
				returnValue = i;
			}
		}
		return returnValue;
	},
	isFunction: function(obj)
	{
		return typeof obj === "function";
	},
	isPlainObject: function (obj) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (!obj || bright.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch(e) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {}

		return key === undefined || hasOwn.call(obj, key);
	},
	isWindow: function(obj){	
		return obj != null && obj == obj.window;
	},	
	type: function(obj)
	{
		return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	},
	isEmptyObject: function(obj){
		for (var name in obj) {
			return false;
		}
		return true;
	},
	now: function()
	{
		return (new Date()).getTime();
	},
	timers: [],
	camelCase: function (string) {
		return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	},
	grep: function (elems, callback, inv) {
		var ret = [],
			retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for (var i = 0, length = elems.length; i < length; i++) {
			retVal = !!callback(elems[i], i);
			if (inv !== retVal) {
				ret.push(elems[i]);
			}
		}

		return ret;
	},
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {		
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;
		
				
		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				bright.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && bright.isFunction( value );		
			
			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( bright( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}
			
			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );					
				} 
			}

			chainable = 1;
		}
		
		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = bright.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || bright.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				bright.merge( ret, array );
			}
		}

		return ret;
	},
	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			bright.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			bright.find.matches(expr, elems);
	},
	find: {
		matches: function(elems, expr)
		{	
			
			return false;
		},
		matchesSelector: function(expr, elems)
		{
			//console.log(expr, elems);
			return false;
		}
	}
});


/* 								*\
	Core Animation functions
\*								*/

	
		//affect base variables 
		var elemdisplay = {},
		iframe, iframeDoc,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		timerId,
		fxNow,
		fxAttrs = [
			// height animations
			[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
			// width animations
			[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
			// opacity animations
			[ "opacity" ]
		],
		class2type = {
			"[object Boolean]": "boolean",
			"[object Number]": "number",
			"[object String]": "string",
			"[object Function]": "function",
			"[object Array]": "array",
			"[object Date]": "date",
			"[object RegExp]": "regexp",
			"[object Object]": "object",
			"[object Error]": "error"
		};
	
		/* 									*\
				Animation base functions 
		\*									*/
		
		// Generate shortcuts for custom animations
		/*bright.each({
			slideDown: genFx( "show", 1 ),
			slideUp: genFx( "hide", 1 ),
			slideToggle: genFx( "toggle", 1 ),
			fadeIn: { opacity: "show" },
			fadeOut: { opacity: "hide" },
			fadeToggle: { opacity: "toggle" }
		}, function( name, props ) {
			bright.fn[ name ] = function( speed, easing, callback ) {
				return this.animate( props, speed, easing, callback );
			};
		});*/
			
		// Animations created synchronously will run synchronously
		function createFxNow() {
			setTimeout( clearFxNow, 0 );
			return ( fxNow = bright.now() );
		}
		
		function clearFxNow() {
			fxNow = undefined;
		}
		
		// Generate parameters to create a standard animation
		function genFx( type, num ) {
			var obj = {};
		
			bright.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
				obj[ this ] = type;
			});
		
			return obj;
		}
	
		bright.extend({			
			fx: function( elem, options, prop ) {
				this.options = options;
				this.elem = elem;
				this.prop = prop;
		
				options.orig = options.orig || {};		
				
			},
			speed: function( speed, easing, fn ) {		
				var opt = speed && typeof speed === "object" ? bright.extend( {}, speed ) : {
					complete: fn || !fn && easing ||
						bright.isFunction( speed ) && speed,
					duration: speed,
					easing: fn && easing || easing && !bright.isFunction( easing ) && easing
				};
				
				opt.duration = bright.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in bright.fx.speeds ? bright.fx.speeds[ opt.duration ] : bright.fx.speeds._default;
		
				
				// normalize opt.queue - true/undefined/null -> "fx"
				if ( opt.queue == null || opt.queue === true ) {
					opt.queue = "fx";
				}
		
				// Queueing
				opt.old = opt.complete;
		
				opt.complete = function( noUnmark ) {
					if ( bright.isFunction( opt.old ) ) {
						opt.old.call( this );
					}
		
					if ( opt.queue ) {
						bright.dequeue( this, opt.queue );
					} else if ( noUnmark !== false ) {
						bright._unmark( this );
					}
				};
		
				return opt;
			},			
			easing: {
				linear: function( p ) {
					return p;
				},
				swing: function( p ) {
					return ( -Math.cos( p*Math.PI ) / 2 ) + 0.5;
				}
			},
			timers: []				
		});
		

		bright.fx.prototype = {
				// Simple function for setting a style value
			update: function() {
				if ( this.options.step ) {
					this.options.step.call( this.elem, this.now, this );
				}		
				( bright.fx.step[ this.prop ] || bright.fx.step._default )( this );
			},

			// Get the current size
			cur: function() {
				if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
					return this.elem[ this.prop ];
				}

				var parsed,
					r = bright.css( this.elem, this.prop );
				// Empty strings, null, undefined and "auto" are converted to 0,
				// complex values such as "rotate(1rad)" are returned as is,
				// simple values such as "10px" are parsed to Float.
				return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
				},
			
				// Start an animation from one number to another
				custom: function( from, to, unit ) {
					var self = this,
						fx = bright.fx;
			
					this.startTime = fxNow || createFxNow();
					this.end = to;
					this.now = this.start = from;
					this.pos = this.state = 0;
					this.unit = unit || this.unit || ( bright.cssNumber[ this.prop ] ? "" : "px" );
			
					function t( gotoEnd ) {
						return self.step( gotoEnd );
					}
			
					t.queue = this.options.queue;
					t.elem = this.elem;
					t.saveState = function() {
						if ( bright._data( self.elem, "fxshow" + self.prop ) === undefined ) {
							if ( self.options.hide ) {
								bright._data( self.elem, "fxshow" + self.prop, self.start );
							} else if ( self.options.show ) {
								bright._data( self.elem, "fxshow" + self.prop, self.end );
							}
						}
					};
			
					if ( t() && bright.timers.push(t) && !timerId ) {
						timerId = setInterval( fx.tick, fx.interval );
					}
				},
			
				// Simple 'show' function
				show: function() {
					var dataShow = bright._data( this.elem, "fxshow" + this.prop );
			
					// Remember where we started, so that we can go back to it later
					this.options.orig[ this.prop ] = dataShow || bright.style( this.elem, this.prop );
					this.options.show = true;
			
					// Begin the animation
					// Make sure that we start at a small width/height to avoid any flash of content
					if ( dataShow !== undefined ) {
						// This show is picking up where a previous hide or show left off
						this.custom( this.cur(), dataShow );
					} else {
						this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
					}
			
					// Start by showing the element
					bright( this.elem ).show();
				},
			
				// Simple 'hide' function
				hide: function() {
					// Remember where we started, so that we can go back to it later
					this.options.orig[ this.prop ] = bright._data( this.elem, "fxshow" + this.prop ) || bright.style( this.elem, this.prop );
					this.options.hide = true;
			
					// Begin the animation
					this.custom( this.cur(), 0 );
				},
			
				// Each step of an animation
				step: function( gotoEnd ) {
					var p, n, complete,
						t = fxNow || createFxNow(),
						done = true,
						elem = this.elem,
						options = this.options;
			
					if ( gotoEnd || t >= options.duration + this.startTime ) {
						this.now = this.end;
						this.pos = this.state = 1;
						this.update();
			
						options.animatedProperties[ this.prop ] = true;
			
						for ( p in options.animatedProperties ) {
							if ( options.animatedProperties[ p ] !== true ) {
								done = false;
							}
						}
			
						if ( done ) {
							// Reset the overflow
							if ( options.overflow != null && !bright.support.shrinkWrapBlocks ) {
			
								bright.each( [ "", "X", "Y" ], function( index, value ) {
									elem.style[ "overflow" + value ] = options.overflow[ index ];
								});
							}
			
							// Hide the element if the "hide" operation was done
							if ( options.hide ) {
								bright( elem ).hide();
							}
			
							// Reset the properties, if the item has been hidden or shown
							if ( options.hide || options.show ) {
								for ( p in options.animatedProperties ) {
									bright.style( elem, p, options.orig[ p ] );
									bright.removeData( elem, "fxshow" + p, true );
									// Toggle data is no longer needed
									bright.removeData( elem, "toggle" + p, true );
								}
							}
			
							// Execute the complete function
							// in the event that the complete function throws an exception
							// we must ensure it won't be called twice. #5684
			
							complete = options.complete;
							if ( complete ) {
			
								options.complete = false;
								complete.call( elem );
							}
						}
			
						return false;
			
					} else {
						// classical easing cannot be used with an Infinity duration
						if ( options.duration == Infinity ) {
							this.now = t;
						} else {
							n = t - this.startTime;
							this.state = n / options.duration;
			
							// Perform the easing function, defaults to swing
							this.pos = bright.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
							this.now = this.start + ( (this.end - this.start) * this.pos );
						}
						// Perform the next step of the animation
						this.update();
					}
			
					return true;
				}				
			}
				
		bright.extend( bright.fx, {
			tick: function() {
				var timer,
					timers = bright.timers,
					i = 0;
		
				for ( ; i < timers.length; i++ ) {
					timer = timers[ i ];
					// Checks the timer has not already been removed
					if ( !timer() && timers[ i ] === timer ) {
						timers.splice( i--, 1 );
					}
				}
		
				if ( !timers.length ) {
					bright.fx.stop();
				}
			},
		
			interval: 13,
		
			stop: function() {
				clearInterval( timerId );
				timerId = null;
			},
		
			speeds: {
				slow: 600,
				fast: 200,
				// Default speed
				_default: 400
			},
		
			step: {
				opacity: function( fx ) {
					bright.style( fx.elem, "opacity", fx.now );
				},
		
				_default: function( fx ) {
					if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
						fx.elem.style[ fx.prop ] = fx.now + fx.unit;
					} else {
						fx.elem[ fx.prop ] = fx.now;
					}
				}
			}
		});
		
		
		/* 							*\
				Queueing base
		\*							*/
		
		bright.extend({
			_mark: function( elem, type ) {
				if ( elem ) {
					type = ( type || "fx" ) + "mark";
					bright._data( elem, type, (bright._data( elem, type ) || 0) + 1 );
				}
			},

			_unmark: function( force, elem, type ) {
				if ( force !== true ) {
					type = elem;
					elem = force;
					force = false;
				}
				if ( elem ) {
					type = type || "fx";
					var key = type + "mark",
						count = force ? 0 : ( (bright._data( elem, key ) || 1) - 1 );
					if ( count ) {
						bright._data( elem, key, count );
					} else {
						bright.removeData( elem, key, true );
						handleQueueMarkDefer( elem, type, "mark" );
					}
				}
			},
			queue: function( elem, type, data ) 
			{
				var q;	
				if ( elem ) {
					type = ( type || "fx" ) + "queue";
					q = bright._data( elem, type );			
					// Speed up dequeue by getting out quickly if this is just a lookup
					if ( data ) {			
						if ( !q || bright.isArray(data) ) {					
							q = bright._data( elem, type, bright.makeArray(data) );				
						} else {
							q.push( data );					
						}
					}					
					return q || [];		
				}				
			},
			dequeue: function( elem, type ) 
			{			
				type = type || "fx";

				var queue = bright.queue( elem, type ),
					fn = queue.shift(),
					hooks = {};

				// If the fx queue is dequeued, always remove the progress sentinel
				if ( fn === "inprogress" ) {
					fn = queue.shift();
				}

				if ( fn ) {
					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if ( type === "fx" ) {
						queue.unshift( "inprogress" );
					}

					bright._data( elem, type + ".run", hooks );
					fn.call( elem, function() {
						bright.dequeue( elem, type );
					}, hooks );
				}

				if ( !queue.length ) {
					bright.removeData( elem, type + "queue " + type + ".run", true );
					handleQueueMarkDefer( elem, type, "queue" );
				}
			}					
		});
		
		
		
		bright.fn.extend({
			queue: function(type, data)
			{
				var setter = 2;
				if (typeof type !== 'string')
				{
					data = type;
					type = 'fx';
					setter--;					
				}
				
				if ( arguments.length < setter ) {
					return bright.queue(this[0], type );
				}	
				
				return data === undefined ?
				this : this.each(function() {				
					var queue = bright.queue( this, type, data );				
					if ( type === "fx" && queue[0] !== "inprogress" ) {
						bright.dequeue( this, type );
					}
				});	
			},
			dequeue: function( type ) {
				return this.each(function() {
					bright.dequeue( this, type );
				});
			}
		});
		
		
		
		/* data */
		
		
		bright.extend({
			cache: {},
			uuid: 0,
			expando: ("bright" + ( bright.fn.bright + Math.random() )).replace( /\D/g, "" ),
			noop: {},
			//internal purposes
			_data: function(elem, name, data)
			{
				return this.data( elem, name, data, true );
			},
			data: function(elem, name, data, pvt)
			{
				if (!bright.acceptData(elem))
				{
					//doesn't accept data...
					return;
				}	
				var getByName = typeof name === 'string',
				internalKey = this.expando,
				ret,
				thisCache,
				privateCache,				
				isNode = elem.nodeType,
				cache = isNode ? this.cache : elem,
				id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
				isEvents = name === 'events';		
				
				if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
					return;
				}
				
				
				if ( !id ) {			
					if ( isNode ) {
						elem[ internalKey ] = id = ++this.uuid;
					} else {
						id = internalKey;
					}
				}
				
				if ( !cache[ id ] ) {
					cache[ id ] = {};				
					if ( !isNode ) {
						cache[ id ].toJSON = this.noop;
					}
				}
				
				
				privateCache = thisCache = cache[ id ];
				
				if ( !pvt ) {
					if ( !thisCache.data ) {
						thisCache.data = {};
					}
		
					thisCache = thisCache.data;
				}
				
				
				if ( data !== undefined ) {
					thisCache[ bright.camelCase( name ) ] = data;
				}
				
				if ( isEvents && !thisCache[ name ] ) {
					return privateCache.events;
				}
		
				// Check for both converted-to-camel and non-converted data property names
				// If a data property was specified
				if ( getByName ) {
		
					// First Try to find as-is property data
					ret = thisCache[ name ];
		
					// Test for null|undefined property data
					if ( ret == null ) {
		
						// Try to find the camelCased property
						ret = thisCache[ bright.camelCase( name ) ];
					}
				} else {
					ret = thisCache;
				}
				
				//console.log(ret);
				return ret;
			},
			acceptData: function(elem)
			{			
				//does the element habe anyData...	
				if ( elem.nodeName ) {
					var match = bright.noData[ elem.nodeName.toLowerCase() ];
		
					if ( match ) {
						return !(match === true || elem.getAttribute("classid") !== match);
					}
				}		
				return true;
			},
			noData: {
				"embed": true,
				// Ban all objects except for Flash (which handle expandos)
				"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
				"applet": true
			},
			removeData: function( elem, name, pvt) {
				if ( !bright.acceptData( elem ) ) {
					return;
				}

				var thisCache, i, l,

					// Reference to internal data cache key
					internalKey = bright.expando,

					isNode = elem.nodeType,

					// See bright.data for more information
					cache = isNode ? bright.cache : elem,

					// See bright.data for more information
					id = isNode ? elem[ internalKey ] : internalKey;

				// If there is already no cache entry for this object, there is no
				// purpose in continuing
				if ( !cache[ id ] ) {
					return;
				}

				if ( name ) {

					thisCache = pvt ? cache[ id ] : cache[ id ].data;

					if ( thisCache ) {

						// Support array or space separated string names for data keys
						if ( !bright.isArray( name ) ) {

							// try the string as a key before any manipulation
							if ( name in thisCache ) {
								name = [ name ];
							} else {

								// split the camel cased version by spaces unless a key with the spaces exists
								name = bright.camelCase( name );
								if ( name in thisCache ) {
									name = [ name ];
								} else {
									name = name.split( " " );
								}
							}
						}

						for ( i = 0, l = name.length; i < l; i++ ) {
							delete thisCache[ name[i] ];
						}

						// If there is no data left in the cache, we want to continue
						// and let the cache object itself get destroyed
						if ( !( pvt ? isEmptyDataObject : bright.isEmptyObject )( thisCache ) ) {
							return;
						}
					}
				}

				// See bright.data for more information
				if ( !pvt ) {
					delete cache[ id ].data;

					// Don't destroy the parent cache unless the internal data object
					// had been the only thing left in it
					if ( !isEmptyDataObject(cache[ id ]) ) {
						return;
					}
				}

				// Browsers that fail expando deletion also refuse to delete expandos on
				// the window, but it will allow it on all other JS objects; other browsers
				// don't care
				// Ensure that `cache` is not a window object #10080
				if ( bright.support.deleteExpando || !cache.setInterval ) {
					delete cache[ id ];
				} else {
					cache[ id ] = null;
				}

				// We destroyed the cache and need to eliminate the expando on the node to avoid
				// false lookups in the cache for entries that no longer exist
				if ( isNode ) {
					// IE does not allow us to delete expando properties from nodes,
					// nor does it have a removeAttribute function on Document nodes;
					// we must handle all of these cases
					if ( bright.support.deleteExpando ) {
						delete elem[ internalKey ];
					} else if ( elem.removeAttribute ) {
						elem.removeAttribute( internalKey );
					} else {
						elem[ internalKey ] = null;
					}
				}
			},
		});
		
		
		
// Ensure props that can't be negative don't go there on undershoot easing
bright.each( fxAttrs.concat.apply( [], fxAttrs ), function( i, prop ) {
	// exclude marginTop, marginLeft, marginBottom and marginRight from this list
	if ( prop.indexOf( "margin" ) ) {		
		bright.fx.step[ prop ] = function( fx ) {
			bright.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
		};
	}
});

if ( bright.expr && bright.expr.filters ) {
	bright.expr.filters.animated = function( elem ) {
		return bright.grep(bright.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = bright._data( elem, deferDataKey );		
	if ( defer &&
		( src === "queue" || !bright._data(elem, queueDataKey) ) &&
		( src === "mark" || !bright._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !bright._data( elem, queueDataKey ) &&
				!bright._data( elem, markDataKey ) ) {
				bright.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}


function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				bright.isNumeric( data ) ? +data :
					rbrace.test( data ) ? bright.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			bright.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && bright.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}


bright.fn.pushStack = function (elems, name, selector) {
    // Build a new bright matched element set
    var ret = this.constructor();

    if (bright.isArray(elems)) {
        push.apply(ret, elems);

    } else {
        bright.merge(ret, elems);
    }

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    ret.context = this.context;

    if (name === "find") {
        ret.selector = this.selector + (this.selector ? " " : "") + selector;
    } else if (name) {
        ret.selector = this.selector + "." + name + "(" + selector + ")";
    }

    // Return the newly-formed element set
    return ret;
}

function winnow(elements, qualifier, keep) {

    // Can't pass null or undefined to indexOf in Firefox 4
    // Set to 0 to skip string check
    qualifier = qualifier || 0;

    if (bright.isFunction(qualifier)) {
        return bright.grep(elements, function (elem, i) {
            var retVal = !!qualifier.call(elem, i, elem);
            return retVal === keep;
        });

    } else if (qualifier.nodeType) {
        return bright.grep(elements, function (elem, i) {
            return (elem === qualifier) === keep;
        });

    } else if (typeof qualifier === "string") {
        var filtered = bright.grep(elements, function (elem) {
            return elem.nodeType === 1;
        });

        if (isSimple.test(qualifier)) {
            return bright.filter(qualifier, filtered, !keep);
        } else {
            qualifier = bright.filter(qualifier, filtered);
        }
    }

    return bright.grep(elements, function (elem, i) {
        return (bright.inArray(elem, qualifier) >= 0) === keep;
    });
}


/* 					*\
	   Support
\*					*/

bright.support = (function(){
		var div = document.createElement( "div" );
		div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";	
		a = div.getElementsByTagName( "a" )[ 0 ];
		
		support = {
			cssFloat: !!a.style.cssFloat,
			deleteExpando: true
		}
	return support;
	
})();

/*   					*\
		Bright.css
\*						*/


var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
	rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
	rrelNum = /^([\-+])=([\-+.\de]+)/,
	rmargin = /^margin/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },

	// order is important!
	cssExpand = [ "Top", "Right", "Bottom", "Left" ],

	curCSS,

	getComputedStyle,
	currentStyle;

bright.fn.css = function( name, value ) {			
	return bright.access( this, function( elem, name, value ) {		
		return value !== undefined ? bright.style( elem, name, value ) : bright.css( elem, name );
	}, name, value, arguments.length > 1 );
};


bright.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": bright.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		elem = elem[0];
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {			
			return;
		}
		
		// Make sure that we're working with the right name
		var ret, type, origName = bright.camelCase( name ),
			style = elem.style, hooks = bright.cssHooks[ origName ];

		name = bright.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( bright.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !bright.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = bright.camelCase( name );
		hooks = bright.cssHooks[ name ];
		name = bright.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {},
			ret, name;

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});


/*   					*\
		Bright.ajax
\*						*/


bright.ajax = function(options, parms)
{
	var defaults = {
		url: '#',
		data: 'null',
		type: 'post',
		uploadFile: false
	}
	
	var options = bright.extend(options, defaults);	
	
	//main ajax call function...
	var xhr = new XMLHttpRequest();		
		if (options.type.toUpperCase() == "GET")
		{
			xhr.open('GET', options.url+"?"+options.data, true);
		}
		else
		{			
			xhr.open('POST', options.url, true);
		}	
		
		if (options.uploadFile)
		{		
			if (options.progress && typeof options.progress == 'function')
			{
				var progressFunc = options.progress;
				xhr.addEventListener("progress", progressFunc, false);
			}
		}		
		xhr.onreadystatechange = function() {
			//Call a function when the state changes.
			if(xhr.readyState == 4 && xhr.status == 200) {
				if (options.success && typeof options.success == 'function')
				{
					options.success(xhr.responseText);
				}
			}
			else if (xhr.readyState == 4 && xhr.status != 200)
			{
				if (options.error && typeof options.error == 'function')
				{
					options.error(xhr.responseText, xhr.status);
				}
			}
		}
	if (options.type.toUpperCase() == "GET")
	{
		xhr.send(null);
	}
	else
	{		
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(options.data);
	}	
}

//expose the bright Library to the DOM
window.bright = window.$ = bright;
})( window )
