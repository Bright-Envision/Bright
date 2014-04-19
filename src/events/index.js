//standard events
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
});	