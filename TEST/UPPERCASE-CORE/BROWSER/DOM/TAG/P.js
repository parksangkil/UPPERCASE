TEST('P', function(check) {
	'use strict';

	var
	// test div
	div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0
		},
		c :

		// paragraph
		P({
			c : 'This is paragraph.'
		})
	}).appendTo(BODY);
});
