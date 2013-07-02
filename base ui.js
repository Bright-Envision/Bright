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
	}
	
	bright.fn.progressBar = function(options)
	{
		if (!this[0]) return;
		
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
	
	bright.fn.calender = function(options)
	{
		var defaults = {
			popup: true		
		}
		
		var options = bright.extend(options, defaults);		
		//this will be the base of a calendar 	
		if (!options.popup)
		{
			calenderBase();
		}
		
		bright(this[0]).click(function()
		{
			calenderBase(this);
		});
		
		
		return this;		
	}
	
	bright.fn.effects = function()
	{		
		return this;
	}	
	
	function calenderBase(elem){
			if (bright(".bright-ui-calender")[0].length > 0)
			{
				bright(".bright-ui-calender").remove();
			}
			
			var calenderHolder;				
			var Months = Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Sep', 'Dec');
			var date = new Date();
			var year = date.getFullYear()
			var actualMonth = date.getMonth();
			var dateHolder;
			var element = elem;
			creation();
			
			function creation()
			{
				calenderHolder = document.createElement('div');
				calenderHolder.className = "bright-ui-calender";
				calenderHolder = bright(document.body).append(calenderHolder);				
				bright(calenderHolder).css({
					width: '267px',
					position: 'absolute'
				});
				
				var leftButton = document.createElement('span');			
				leftButton.onclick = function()
				{

					actualMonth--;
					if (actualMonth < 0)
					{

						actualMonth = 11;
						year--;

					}
					bright(this).parent().findChild('.bright-calender-top-header').html('<span>'+Months[actualMonth] + '</span>' + "&nbsp;" + '<span>' + year + '</span>');					
					dateHolder.innerHTML = '';
					generateCal();
				}


				//Creating a function that will allow the user to click the right arrow and render the dates from mondays to sundays. 
				var calenderTopHolder = document.createElement('div');
					calenderTopHolder.className = 'bright-calender-top-holder';
				calenderHolder.appendChild(calenderTopHolder);
				
				
				bright(calenderTopHolder).css({
					width: '117px',
					margin: '0 auto'
				});
				
				calenderTopHolder.appendChild(leftButton);
				var rightButton = document.createElement('span');				
				rightButton.onclick = function()
				{

					actualMonth++;
					if (actualMonth > 11)
					{

						actualMonth = 0;
						year++;

					}
					
					
					bright(this).parent().findChild('.bright-calender-top-header').html('<span>'+Months[actualMonth] + '</span>' + "&nbsp;" + '<span>' + year + '</span>');
					dateHolder.innerHTML = '';
					generateCal();
				}


				//Creating a function that will allow the user to click the left arrow and render the dates from mondays to sundays.
				

				var calenderTop = document.createElement('div');
					calenderTop.className = "bright-calender-top-header";
				calenderTop.innerHTML = '<span>'+Months[actualMonth] + '</span>' + "&nbsp;" + '<span>' + year + '</span>';
				calenderTop.id = 'monthHeading';
				calenderTopHolder.appendChild(calenderTop);
		
				calenderTopHolder.appendChild(rightButton);
				
				bright(calenderTop).css({					
					display: 'inline-block',
					margin: '0px 10px',
					webkitUserSelect: 'none'					
				});
				
				
				bright(rightButton).css({
					backgroundImage: 'url(sprites.png)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '0px 0px',
					width: '16px',
					display: 'inline-block',
					height: '16px'
				});
				
				bright(leftButton).css({
					backgroundImage: 'url(sprites.png)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '-18px 0px',
					width: '16px',
					display: 'inline-block',
					height: '16px'
				});
				
				
				
				
				//Adds the month name at the top of the table.
				var datesnames = document.createElement('div'); 
				datesnames.innerHTML = '<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>';
				datesnames.className = "bright-calender-top-header-top";				
				bright(calenderHolder).append(datesnames);				
				
				bright(datesnames).findChild('span').each(function(i, val)
				{
					bright(val).css({
						width: '38px',						
						backgroundColor: '#9B9BB6',
						display: 'inline-block',
						textAlign: 'center',
						padding: '10px 0'
					});
				});

				dateHolder = document.createElement('div');
				calenderHolder.appendChild(dateHolder);
				generateCal();
			}


			function generateCal()
			{
			var done = false;
			for (var i = 1; i <= 31; i++)
			{
				var dayname = new Date(year, actualMonth, 1);
						dayname = dayname.getDay() - 1;	

						if (done == false && dayname !== 0)
						{
							for (var s = 0; s < dayname; s++)
							{
								var ele = document.createElement('span');
								ele.innerHTML = "&#160;";				                		                		
								dateHolder.appendChild(ele);
								bright(ele).css({							
									width: '38px',
									padding: '10px 0',									
									display: 'inline-block',
									textAlign: 'center'
								});
							}
							done = true;
						}
						
					if (daysInMonth(i, actualMonth, year))
					{
						var dayEle = document.createElement('span');
						dayEle.innerHTML = i;
						bright(dayEle).css({							
							width: '38px',
							padding: '10px 0',
							backgroundColor: '#9B9BB6',
							display: 'inline-block',
							textAlign: 'center',
							cursor: 'pointer'
						});
						
						dayEle.onclick = function()
						{
							bright(element).val(bright(this).text() + "/"+ actualMonth + '/' + year);							
							bright(calenderHolder).remove();
						}
						
						bright(dayEle).hover(function()
						{								
							bright(this).css('backgroundColor', '#e6e6e6');
						}, function()
						{
							bright(this).css('backgroundColor', 'rgb(155, 155, 182)');
						});
						dateHolder.appendChild(dayEle);
					}
				}			
			}

			
			function daysInMonth(day, month, year){            	
				var date = new Date(year, month, day);
				if (date.getMonth() == month && date.getDate() == day){
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		
		bright.fn.glowpolsat = function(options)
			{
				var speed = options.speed;
				var colour = options.colour;
				var Backcolour = options.Backcolour;
				var elem = this[0][0];				
				setInterval(function()
				{					
					if (bright(elem).css('backgroundColor') == colour)
					{						
						bright(elem).css('backgroundColor', colour);
					}
					else
					{
						bright(elem).css('backgroundColor', Backcolour);
					}
				}, speed);
				
				return this;
			}		
})(bright);
