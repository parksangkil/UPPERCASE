TEST('IMG', function(check) {
	'use strict';

	var
	// img
	img = IMG({
		style : {
			width : 300,
			position : 'fixed',
			left : 40,
			top : 40
		},
		src : 'UPPERCASE-CORE/image.png'
	}).appendTo(BODY);
});
