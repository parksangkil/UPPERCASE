/*
 * 파일의 정보를 불러옵니다.
 * 
 * 파일의 크기(size), 생성 시간(createTime), 최종 수정 시간(lastUpdateTime)을 불러옵니다.
 */
global.GET_FILE_INFO = METHOD(() => {
	
	let FS = require('fs');

	return {

		run : (pathOrParams, callbackOrHandlers) => {
			//REQUIRED: pathOrParams
			//REQUIRED: pathOrParams.path	불러올 파일의 경로
			//OPTIONAL: pathOrParams.isSync	true로 설정하면 callback을 실행하지 않고 즉시 실행하여 결과를 반환합니다. 이 설정은 명령이 끝날때 까지 프로그램이 멈추게 되므로 필요한 경우에만 사용합니다.
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.notExists
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let path;
			let isSync;
			
			let notExistsHandler;
			let errorHandler;
			let callback;

			// init params.
			if (CHECK_IS_DATA(pathOrParams) !== true) {
				path = pathOrParams;
			} else {
				path = pathOrParams.path;
				isSync = pathOrParams.isSync;
			}

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notExistsHandler = callbackOrHandlers.notExists;
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}

			// when normal mode
			if (isSync !== true) {

				CHECK_FILE_EXISTS(path, (isExists) => {

					if (isExists === true) {

						FS.stat(path, (error, stat) => {

							if (error !== TO_DELETE) {

								let errorMsg = error.toString();

								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR('GET_FILE_INFO', errorMsg);
								}

							} else if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('GET_FILE_INFO', '파일이 존재하지 않습니다.', {
										path : path
									});
								}

							} else if (callback !== undefined) {
								callback({
									size : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								});
							}
						});

					} else {

						if (notExistsHandler !== undefined) {
							notExistsHandler(path);
						} else {
							SHOW_WARNING('GET_FILE_INFO', '파일이 존재하지 않습니다.', {
								path : path
							});
						}
					}
				});
			}

			// when sync mode
			else {

				return RUN(() => {

					try {

						if (CHECK_FILE_EXISTS({
							path : path,
							isSync : true
						}) === true) {
							
							let stat = FS.statSync(path);

							if (stat.isDirectory() === true) {

								if (notExistsHandler !== undefined) {
									notExistsHandler(path);
								} else {
									SHOW_WARNING('GET_FILE_INFO', '파일이 존재하지 않습니다.', {
										path : path
									});
								}
								
							} else {
								
								if (callback !== undefined) {
									callback({
										size : stat.size,
										createTime : stat.birthtime,
										lastUpdateTime : stat.mtime
									});
								}
								
								return {
									size : stat.size,
									createTime : stat.birthtime,
									lastUpdateTime : stat.mtime
								};
							}

						} else {

							if (notExistsHandler !== undefined) {
								notExistsHandler(path);
							} else {
								SHOW_WARNING('GET_FILE_INFO', '파일이 존재하지 않습니다.', {
									path : path
								});
							}
						}

					} catch(error) {

						if (error !== TO_DELETE) {

							let errorMsg = error.toString();

							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR('GET_FILE_INFO', errorMsg);
							}
						}
					}

					// return undefined.
					return;
				});
			}
		}
	};
});
