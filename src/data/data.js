bright.extend(bright.fn, {	
	internalCache: {},
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