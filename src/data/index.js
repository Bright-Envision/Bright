bright.extend(bright.fn, {		
	internalCache: {},
	/*
	*	Appends data to the object, which is called "internal cache"
	*	@param: element {obj|node} The element you want to the data to stay
	*	@param: name {string} The name you want to use
	*	@param: data {object || string || boolean} This can be any type of information, as it's only setting that value...
 	*/
	data: function(name, data){
		var lib = this;
		var domkey = bright.uuid;
		var elem = this.elements;
		var node = elem[0];
		var nodeType = node.nodeType;
		var isNode = nodeType;

		var id =  nodeType ? node[domkey] : node[domkey] && domkey;

		var cache = isNode ? bright.fn.internalCache : node;	

		if (!id){
			if (isNode){
				id = node[domkey] = bright.guid++;
			} else {
				id = domkey;
			}
		}

		if (!cache[id]){
			cache[id] = isNode ? {} : {
				toJSON: bright.noop
			}
		}

		if (typeof name === 'object' || typeof name === "function"){
			cache[id] = bright.extend(cache[id], name);
		}

		thisCache = cache[id];

		if (data !== undefined){
			thisCache[bright.camelCase(name)] = data;
		}

		if (typeof name == 'string'){
			ret = thisCache[name];
			if (ret == null){
				ret = thisCache[bright.camelCase(name)];
			}
		} else {
			ret = thisCache;
		}

		return ret;
		/*

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
		return this;*/
	},
	/*
	*	This does the opposite to addData, it will just remove the data 
	*	@param: element {obj|node} The element you want to the data to stay
	*	@param: name {string} The name you want to use
	*/
	removeData: function(element, name){
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
});