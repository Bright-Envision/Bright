/*! 
*  Bright Framework...
*/

(function(bright){
	var keycodes = 
	{
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
	var isntloading = false;

	bright.fn.extend({
		ui: {
			version: '1.1'
		}
	});
	
	
	bright.fn.extend(bright.fn, {
		infiniteScroll: function(options){
		//when he/she scrolls down the page or element it keeps getting more and more data...
			if (typeof options == "string")
			{
				url = options;
			}
			else if (typeof options == "object")
			{
				url = options.url;
			}
			
			var elem = this[0];
			window.onscroll = function(){			
				if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-100)) && !isntloading) {
					isntloading = true;
					bright.ajax({
						type: 'POST',
						data: 'data=more',
						url: url,
						success: function(data)
						{					
							var element = bright(elem).text();						
							bright(elem).text(element + data);
							isntloading = false;
						}		
					});
				}
			}
			return this;
		},	
		progressBar: function(options)
		{			
			if (typeof options == "string")
			{
				var percentage = parseInt(options);
				percentage = (percentage+'%');		
				var elem = bright(this[0]).findChild('.bright-ui-progressBar')[0];
				bright(elem).each(function(i, val){			
					bright(val).css('width', percentage);
				});
			}
			else
			{		
						
				bright(this[0]).each(function(i, elem){											
						var ele = document.createElement('span');
						ele.className = "bright-ui-progressBar";			
						bright(elem).css('width', '300px');
						bright(elem).css('height', '25px');
						bright(elem).append(ele);			
						bright(ele).css({
							display: 'block',
							height: '25px',
							transition: '1s linear',
							background: '#6A6AFD',
							width: '0%'
						});		
					});
				}		
			return this;
		}		
	});

	
			
})(bright);
