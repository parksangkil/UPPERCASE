TEST('FIND_FOLDER_NAMES', function(check) {
	'use strict';

	check(CHECK_ARE_SAME([FIND_FOLDER_NAMES({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {
		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		}
	}), ['subFolder1', 'subFolder2']]));

	FIND_FOLDER_NAMES({
		path : 'UPPERCASE-CORE/testFolder',
		isSync : true
	}, {

		error : function(errorMsg) {
			console.log('ERROR!', errorMsg);
		},

		notExists : function() {
			console.log('NOT EXISTS!');
		},

		success : function(folderNames) {
			check(CHECK_ARE_SAME([folderNames, ['subFolder1', 'subFolder2']]));
		}
	});
});
