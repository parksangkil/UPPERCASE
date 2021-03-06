FOR_BOX((box) => {
	
	/*
	 * 주어진 이름을 가진 모든 룸에 데이터를 전송합니다.
	 */
	box.BROADCAST = METHOD({

		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//OPTIONAL: params.methodName
			//OPTIONAL: params.data

			let roomName = box.boxName + '/' + params.roomName;
			let methodName = params.methodName;
			let data = params.data;
			
			LAUNCH_ROOM_SERVER.broadcast({
				roomName : roomName,
				methodName : methodName,
				data : data
			});

			if (CPU_CLUSTERING.broadcast !== undefined) {

				CPU_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						methodName : methodName,
						data : data
					}
				});
			}

			if (SERVER_CLUSTERING.broadcast !== undefined) {

				SERVER_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						methodName : methodName,
						data : data
					}
				});
			}
		}
	});
});
