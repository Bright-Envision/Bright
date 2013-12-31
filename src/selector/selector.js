(function(window, undefined) {
	var selector = {	
		getClass: function(className){
			var allTags = this.getTags('*');
			allTags = allTags.elements;
			var elements = new Object();
			if (allTags){
				var le = allTags.length;						
				var sClassName = className.split(',');				
				var len = sClassName.length;
				var el = elements.elements = Array();				
				for (var i = 0; i < len; i++){					
					var cSelector = sClassName[i].replace(/[. ]/gi, ''); //removes the "."
					elements.elements = selector.selectMultipleClass(cSelector, allTags);						
				}				
				return elements;				
			} else {
				return {
					elements: Array(),
					selector: allTags,
					scope: window
				}
			}

		},
		selectMultipleClass: function(className, allTags){
			if (className && allTags) {
				var le = allTags.length;
				var elements = Array();
				for (var i = 0; i < le; i++){							
					if (allTags[i].className == className){
						elements.push(allTags[i]);
					}
				}
				return elements;
			}
		},
		getElements: function(select){
			if (select && typeof select == 'string'){
				//okay now split the selector into corresponding selectors
				var selectors = select.split(',');
				var len = selectors.length;
				var elements = Array();
				for (var i = 0; i < len; i++){
					var correctSelector = selectors[i];
					if (correctSelector.indexOf('<') != -1 || correctSelector.indexOf(':') != -1 || correctSelector.indexOf('>') != -1 || correctSelector.indexOf('+') != -1 || correctSelector.indexOf('[') != -1){
						//css3 selectors
						console.log('css3 selector');
						console.log(correctSelector);
						var el = selector.css3Selectors(correctSelector);
					} else if (correctSelector.indexOf('.') != -1 || correctSelector.indexOf('#') != -1) {
						//simple selectors
						console.log('css simple selector');
						console.log(correctSelector);
						var selectorSplit = correctSelector.split(/[ ]/gi);
						var selectors = selectorSplit.length;
						for (var s = 0; s < selectors; s++ ){
							if (selectorSplit[s].charAt(0) == '.'){
								//class
								elements.push(selector.getClass(correctSelector));
								console.log(el);
							} else if (selectorSplit[s].charAt(0) == '#') {
								//id...
								selector.getID(selectorSplit[s]);
							} else {

							}

							
						}
					} else {
						//maybe just a tag...
						
						//throw new Error("sector patten not recognised : " + correctSelector);
					}
				}
			}
		},
		getId: function(id){

		},
		getTags: function(selector){
			if (typeof selector == 'string'){
				var ele = document.getElementsByTagName(selector);
				var len = ele.length;
				var elem = {
					elements: Array()
				}			
				for (var i = 0; i < len; i++){
					elem.elements.push(ele[i]);
				}
				return elem;
			}
			return [];
		},
		getMultiple: function(selector){

		},
		customSelector: function(){

		},
		css3Selectors: function(){

		},
		getChildren: function(){

		}

	};
	window.selector = selector;
})(window);