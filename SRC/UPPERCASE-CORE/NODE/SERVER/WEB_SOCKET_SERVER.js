/*
 * 웹 소켓 서버를 생성합니다.
 */
global.WEB_SOCKET_SERVER = METHOD({

	run : (webServer, connectionListener) => {
		//REQUIRED: webServer
		//REQUIRED: connectionListener

		let WebSocket = require('ws');
		let WebSocketServer = WebSocket.Server;
		
		let nativeConnectionListener = (conn) => {

			let headers = conn.upgradeReq.headers;

			let methodMap = {};
			let sendKey = 0;
			
			let clientInfo;
			let ip;
			
			let on;
			let off;
			let send;

			let runMethods = (methodName, data, sendKey) => {
				
				try {
					
					let methods = methodMap[methodName];
	
					if (methods !== undefined) {
	
						EACH(methods, (method) => {
	
							// run method.
							method(data,
	
							// ret.
							(retData) => {
	
								if (sendKey !== undefined) {
	
									send({
										methodName : '__CALLBACK_' + sendKey,
										data : retData
									});
								}
							});
						});
					}
				}
				
				// if catch error
				catch(error) {
					SHOW_ERROR('WEB_SOCKET_SERVER', error.toString());
				}
			};

			// when receive data
			conn.on('message', (str) => {

				let params = PARSE_STR(str);

				if (params !== undefined) {
					runMethods(params.methodName, params.data, params.sendKey);
				}
				
				clientInfo.lastRecieveTime = new Date();
			});

			// when disconnected
			conn.on('close', () => {

				runMethods('__DISCONNECTED');

				// free method map.
				methodMap = undefined;
			});

			// when error
			conn.on('error', (error) => {

				let errorMsg = error.toString();

				SHOW_ERROR('WEB_SOCKET_SERVER', errorMsg);

				runMethods('__ERROR', errorMsg);
			});

			ip = headers['x-forwarded-for'];

			if (ip === undefined) {
				ip = conn.upgradeReq.connection.remoteAddress;
			}

			connectionListener(

			// client info
			clientInfo = {
				
				ip : ip,
				
				connectTime : new Date()
			},

			// on.
			on = (methodName, method) => {
				//REQUIRED: methodName
				//REQUIRED: method

				var
				// methods
				methods = methodMap[methodName];

				if (methods === undefined) {
					methods = methodMap[methodName] = [];
				}

				methods.push(method);
			},

			// off.
			off = (methodName, method) => {
				//REQUIRED: methodName
				//OPTIONAL: method

				let methods = methodMap[methodName];

				if (methods !== undefined) {

					if (method !== undefined) {

						REMOVE({
							array : methods,
							value : method
						});

					} else {
						delete methodMap[methodName];
					}
				}
			},

			// send to client.
			send = (methodNameOrParams, callback) => {
				//REQUIRED: methodNameOrParams
				//OPTIONAL: methodNameOrParams.methodName
				//OPTIONAL: methodNameOrParams.data
				//OPTIONAL: callback
				
				let methodName;
				let data;
				
				if (CHECK_IS_DATA(methodNameOrParams) !== true) {
					methodName = methodNameOrParams;
				} else {
					methodName = methodNameOrParams.methodName;
					data = methodNameOrParams.data;
				}
				
				if (conn !== undefined && conn.readyState === WebSocket.OPEN) {
					
					try {
						
						if (callback === undefined) {
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data
							}));
						}
	
						else {
							
							let callbackName = '__CALLBACK_' + sendKey;
		
							// on callback.
							on(callbackName, (data) => {
		
								// run callback.
								callback(data);
		
								// off callback.
								off(callbackName);
							});
							
							conn.send(STRINGIFY({
								methodName : methodName,
								data : data,
								sendKey : sendKey
							}));

							sendKey += 1;
						}
						
					} catch(error) {
						SHOW_ERROR('WEB_SOCKET_SERVER', error.toString(), methodNameOrParams);
					}
					
					clientInfo.lastSendTime = new Date();
				}
			},

			// disconnect.
			() => {
				if (conn !== undefined) {
					conn.close();
					conn = undefined;
				}
			});
		};
		
		new WebSocketServer({
			server : webServer.getNativeServer()
		}).on('connection', nativeConnectionListener);
		
		console.log('[WEB_SOCKET_SERVER] 웹 소켓 서버가 실행중입니다.');
	}
});
