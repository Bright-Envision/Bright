bright.extends(bright.fn, {
		ajax: function(options){
			var _defaults = {
				type: 'get',
				data: '',
				url: '/',
				success: null,
				error: null
			}
		}
});