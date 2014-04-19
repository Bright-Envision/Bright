/* main selector for the new library */
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