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


	bright.fn.infiniteScroll = function(options){
		//when he/she scrolls down the page or element it keeps getting more and more data...
		if (typeof options == "string")
		{
			url = options;
		}
		else if (typeof options == "object")
		{
			url = options.url;
		}
		var elem = this;
		window.onscroll = function(){			
			if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-100)) && !isntloading) {
				isntloading = true;
				bright.ajax({
					type: 'POST',
					data: 'data=more',
					url: url,
					success: function(data)
					{						
						var element = bright(elem[0]).text();
						bright(elem[0]).text(element + data);
						isntloading = false;
					}		
				});
			}
		}
		return this;
	}
	
	bright.fn.progressBar = function(options)
	{
		if (typeof options == "string")
		{
			var percentage = parseInt(options);
			percentage = (percentage+'%');
			var progress = bright('.bright-ui-progressBar')[0][0];
			bright(progress).css('width', percentage);
		}
		else
		{		
			if (this[0].length > 0)
			{
				for (var i = 0; i < this[0].length; i++)
				{

				}
			}
			else
			{
				var ele = document.createElement('span');
					ele.className = "bright-ui-progressBar";
					
				bright(this[0]).css('width', '300px');
				bright(this[0]).css('height', '25px');
				bright(this[0]).append(ele);			
				bright(ele).css({
					display: 'block',
					height: '25px',
					transition: '1s linear',
					background: '#6A6AFD',
					width: '0%'
				});		

			}
		}
		return this;
	}
})(bright);
