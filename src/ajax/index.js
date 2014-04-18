bright.extend(bright.fn, {
		ajax: function(options){
			var defaults = {
				url: '#',
				data: 'null',
				type: 'post'
			}
			
			var options = bright.extend(options, defaults);	
			
			//main ajax call function...
			var xhr = new XMLHttpRequest();		
				if (options.type.toUpperCase() == "GET"){
					xhr.open('GET', options.url+"?"+options.data, true);
				} else	{			
					xhr.open('POST', options.url, true);
				}	
				
			
				if (options.progress && typeof options.progress == 'function') {
					var progressFunc = options.progress;
					xhr.addEventListener("progress", progressFunc, false);
				}
					
				xhr.onreadystatechange = function() {
					//Call a function when the state changes.
					if(xhr.readyState == 4 && xhr.status == 200) {
						if (options.success && typeof options.success == 'function') {
							options.success(xhr.responseText);
						}
					} else if (xhr.readyState == 4 && xhr.status != 200) {
						if (options.error && typeof options.error == 'function') {
							options.error(xhr.responseText, xhr.status);
						}
					}
				}
			if (options.type.toUpperCase() == "GET") {
				xhr.send(null);
			} else {		
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(options.data);
			}
		}
});