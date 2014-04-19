bright.extend(bright.fn, {		
	internalCache: {},
	/*
	*	Appends data to the object, which is called "internal cache"
	*	@param: element {obj|node} The element you want to the data to stay
	*	@param: name {string} The name you want to use
	*	@param: data {object || string || boolean} This can be any type of information, as it's only setting that value...
 	*/
	data: function(element, name, data){
		var lib = this;
		var interalID = bright.uuid;

		if (element && !name && !data){
			bright.each(this.elements, function(){
				var actualElement = this;
				if (lib.internalCache[actualElement]){
					return lib.internalCache[actualElement][element];
				}
			});
		} else if (!name && !element && !data) {
			//so hes trying to fetch everything
			bright.each(this.elements, function(){
				var actualElement = this;
				if (lib.internalCache[actualElement]){
					return lib.internalCache[actualElement];
				}
			});
		}  
		
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
});