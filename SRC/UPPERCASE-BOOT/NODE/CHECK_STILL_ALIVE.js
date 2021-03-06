/*
 * Check still alive object
 */
global.CHECK_STILL_ALIVE = OBJECT({

	init : () => {

		UPPERCASE.ROOM('checkStillAliveRoom', (clientInfo, on, off, send) => {
			
			// I'm still alive!!
			on('check', (notUsing, ret) => {
				ret('__ALIVE');
			});
			
			// I'm still alive!! (string mode)
			on('checkStr', (notUsing, ret) => {
				send({
					str : '__ALIVE'
				});
			});
		});
	}
});
