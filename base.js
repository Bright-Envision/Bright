/*! 
*  Bright JavaScript Library v1.0
*   Author: Ryan Clough	
*/

(function( window, undefined ) {
	var version = 1.0,
	isready = false,
	queue = [];
	bright = function( selector, context ) {		
		return new bright.fn.inti(selector, context);		
	};

	
	bright.fn = bright.prototype = {
		inti:function(selector, context)
		{
			//Initialize....
			//the selectors	
			 if (!selector) {
				return this;
			}
			
			
			
			if (selector === "body" && !context && document.body) {				
				this[0] = document.body;							
				return this;
			}
			
			var elementArray = Array(); //houses the multiple elements				
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
				}
				else
				{
					if (selector[0])
					{
						this[0] = selector[0];
						return this;
					}
				}
			}
			else if (selector.indexOf(" ") !== -1)
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
		  	if ((typeof borders == "boolean")&&(borders == true))
		  	{
			  	//wants a border and stuff...
			  	border = true;
			  	color = options.color;
		  	}
			//this will  validate any form that gets inserted into it... it will be able to check if the user has put some values in... Simple Validate
			if (this[0].length > 0)
				{
					var ele = this[0];
						for (var i = 0; i < ele.length; i++){
							bright(ele[i]).validate(options, fun);
						}

				}
				else
				{
					
					var follow = true;
					var inputsElements = Array();
					var inputs = this[0].getElementsByTagName('input');
					
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
				}
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
			animate: function(properties, options)
			{			
				Animation(this, properties, options);
				return this;
			},
			parent: function()
			{			
				var ElementArray = Array();
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
			css: function(styleName, value)
			{			
				bright(this[0]).each(function(i, element){
					console.log(element);
					if (!element == undefined)
						return false;
						
					if (typeof styleName == 'object')
					{
						for (var prop in styleName) {
							  if (styleName.hasOwnProperty(prop)) {			  	
								  element.style[prop] = styleName[prop];						  
							 }
						 }
					}
					else
					{
					 if (styleName)
					  {
						if (!value){								
						  return element.style[styleName];
						} 
						else
						{							
						 element.style[styleName] = value;
						}
					  }					 
					}	
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
				console.log(this);
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
				return this[0].appendChild(html);				
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
			}
}
				
				
					
		  
	
	
// Give the init function the bright prototype for later instantiation	
bright.fn.inti.prototype = bright.fn;
	
//expose the bright Library to the DOM
window.bright = window.$ = bright;

bright.extend = bright.fn.extend = function(obj1, target, deep){
		var src, options, copy, copyIsArray;
		
		if (typeof deep == 'boolean')
		{
			deep = true;			
		}
		
		if (typeof target !== "object" && typeof target != "function")
		{
			target = {};
		}		
		
		//console.log(obj1, target);
		//this is a good utility as it will merge objects together...
		//Also target gets merged with the other one...
		var obj3 = {};		
		for (options in obj1)
		{			
			options = obj1;			
			for (name in options)
			{
				src = target[name];
				copy = options[name];				
				if (target === copy)
				{	
					continue;
				}				
				
				if (deep && copy && (copyIsArray = bright.isArray(copy)))
				{
					if (copyIsArray)
					{
						copyIsArray = false;
						clone = src && bright.isArray(src) ? src : [];
					}
					else
					{
						clone = src && bright.isArray(src) ? src : {};
					}	
					
					target[name] = bright.extend(deep, clone, copy);
				}
				else if (copy != undefined)				
				{					
					target[name] = copy;
				}
			
			}
			if (target){				
				return target;
			}
		}
};

bright.isArray = function(src)
{
	return typeof src == "array"? true : false
}

bright.inArray = function(array, value)
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
}

bright.isFunction = function(obj)
{
	return typeof obj === "function";
}

bright.trim = function(text)
{	
    return text == null ? "" : trim.call(text);
}


bright.each = function(obj, callback, args)
{
	if (!obj){		
		return;
	}
	
	var name,
	length = obj.length,
	isObj = (typeof obj === "object");
	
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
}

function lightbox(ele)
{
	 imglink = bright(ele).parent().attr('href');
	 var backing = document.createElement('div');
	  backing.style.backgroundColor = "rgb(0,0,0)";	
	  backing.style.opacity = 0.75;
	  backing.style.filter = 'alpha(opacity=70)';
	  backing.style.width = "100%";
	  backing.style.height = "100%";
	  backing.style.margin = "0";				  	  
	  backing.style.padding = "0";
	  backing.style.zIndex = "999999";	//just so it goes all the other elements except the image preview box	
	  backing.style.position = "fixed";				 
	  backing.style.top = "0px";
	  backing.style.left = "0px";	  	  
  document.body.appendChild(backing);			
  
  var loading = document.createElement('img');
	  loading.src = 'images/loading.gif';
	  loading.width = "128";
	  loading.height = "128";
	  loading.style.position = "fixed";
	  loading.style.background = "#fff";
	  loading.style.left = "45%";
	  loading.style.top = "45%";
	  loading.style.zIndex = "999999999"
	 document.body.appendChild(loading);
  
  var ele = document.createElement('img');
	  ele.style.padding = "20px"; //Just some styling
	  ele.style.backgroundColor = "#fff";
	  ele.style.position = "fixed";
	  ele.style.cursor = "pointer";	
	  ele.style.zIndex = "9999999";	//just so it goes all the other elements			  	  			  	  
	  ele.src = imglink; //gets the img tag src and adds it to the new one...
	  ele.style.top = "-5000px"; //takes it off the screen so it wont show up on the screen
	  ele.style.left = "-5000px";	//the same as above  	
	  ele.onclick = function(){
		bright(ele).remove();
		bright(backing).remove()
	}; //when it gets clicked it removes it self...
	  backing.onclick = function(){
		   bright(ele).remove();
		   bright(loading).remove();		  	   
		   bright(backing).remove(); //when it gets clicked it removes it self...
	  }	
	  
	  
	  //hmmm add a loading gif...
	  
	 var img = new Image;
	 img.src = imglink;	    	  	
	
  document.body.appendChild(ele); //Appends element to add
  img.onload = function(){ //waits until the img has loaded correctly and then centers it
	 if ((img.width > window.innerWidth)||(img.height > window.innerHeight)) //resize it...
	 {
		ele.style.width = "50%"; //resizes the image to half of its original size
		ele.style.height = "auto";
	 }
	 bright(loading).hide();
	 
	 bright(ele).center();	//Centers the element		
	 
  } 
  
  window.onresize = function()
  {
	 bright(ele).center();
  } 
}

function Animation(elem, properties, options)
{	
	var speed = options;
	if (typeof speed == "string")
	{
		if (speed == "fast")
		speed = 10;
		
		if (speed == "medium")
		speed = 30;
		
		if (speed == "slow")
		speed = 50;
	}
	else
	{
		speed = 20;
	}		
	
	var animatingLeft = false, 
	animatingTop = false,
	animatingRight = false;
	
	if (!elem || !properties)
		return elem;
		
	if (typeof properties === "object")
	{
		var properties = properties;
		var topPoint = new Object;	
		if ((properties.left)||(properties.right)||(properties.top))
		{
			if (properties.left)	
			{
				var QueueIDLeft = Math.round(Math.random(0) * 100);
				queue.push(QueueIDLeft);
			}	
			if (properties.top)	
			{
				var QueueIDTop = Math.round(Math.random(0) * 100);
				queue.push(QueueIDTop);
			}
			
			if (properties.Right)				
			{
				var QueueIDRight = Math.round(Math.random(0) * 100);
				queue.push(QueueIDRight);				
			}
		}		
		var windowoffset = Math.round((window.innerWidth)/(elem[0].offsetWidth));			
		var animationTimer = setInterval(function()
		{
			if (elem[0].style.position != "absolute")
			{				
				clearInterval(animationTimer);
				return;
			}			
			if ((properties.left)||(properties.right)||(properties.top))
			{
				if (properties.left)				
					topPoint.Left = elem[0].offsetLeft;
					
				if (properties.top)				
					topPoint.Top = elem[0].offsetTop;
				
				if (properties.right)				
					topPoint.Right = elem[0].offsetLeft + elem[0].offsetWidth;
			}				
			
			if (properties.left){
				if ( properties.left >= topPoint.Left){
					animatingLeft = true;
					elem[0].style.left = ((topPoint.Left + 10) + 'px');					
					if (topPoint.Left >= (properties.left-10))
					{
						var index = bright.inArray(queue,QueueIDLeft);							
						queue.splice(index, 1);						
					}					
				}
				else if (!animatingLeft)
				{
					elem[0].style.left = ((topPoint.Left - 10) + 'px');					
					if (topPoint.Left <= (properties.left-10))
					{					
						var index = bright.inArray(queue,QueueIDLeft);							
						queue.splice(index, 1);						
					}				
				}
			}
			
			if (properties.top){
				if (properties.top > topPoint.Top){
					animatingTop = true;					
					elem[0].style.top = ((topPoint.Top + 10) + 'px');						
					if (topPoint.Top >= (properties.top-windowoffset))
					{					
						var index = bright.inArray(queue, QueueIDTop);	
						if (index != -1){
							queue.splice(index, 1);
						}
					}
					else
					{
						elem[0].style.top = ((topPoint.Top + 10) + 'px');	
					}
				}
				else if (!animatingTop)
				{
					elem[0].style.top = ((topPoint.Top - windowoffset) + 'px');				
					if (topPoint.Top <= (properties.top-windowoffset))
					{
						var index = bright.inArray(queue,QueueIDTop);							
						queue.splice(index, 1);											
					}				
				}
			}				
				
			if (queue.length < 1)
			{
				clearInterval(animationTimer);		
			}			
		}, speed);
	}
	return this;
}


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

})( window )
