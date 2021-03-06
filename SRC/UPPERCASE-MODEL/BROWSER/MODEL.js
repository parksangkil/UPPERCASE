FOR_BOX((box) => {
	
	OVERRIDE(box.MODEL, (origin) => {

		/*
		 * MODEL 클래스
		 */
		box.MODEL = CLASS((cls) => {
			
			let onNewInfos = {};
			let onNewInfoCount = 0;
			
			let getOnNewInfos = cls.getOnNewInfos = () => {
				return onNewInfos;
			};
			
			return {
				
				preset : () => {
					return origin;
				},
				
				init : (inner, self, params) => {
					//REQUIRED: params
					//OPTIONAL: params.roomServerName
					//REQUIRED: params.name
					//OPTIONAL: params.initData
					//OPTIONAL: params.methodConfig
					//OPTIONAL: params.isNotUsingObjectId
		
					let roomServerName = params.roomServerName;
					let name = params.name;
					let initData = params.initData;
					let methodConfig = params.methodConfig;
					let isNotUsingObjectId = params.isNotUsingObjectId;
					
					let createConfig;
					let getConfig;
					let updateConfig;
					let removeConfig;
					let findConfig;
					let countConfig;
					let checkIsExistsConfig;
					
					let createValid;
					let updateValid;
					let is_idAssignable;
					
					let room = box.ROOM({
						roomServerName : roomServerName,
						name : name
					});
					
					let create;
					let get;
					let getWatching;
					let update;
					let remove;
					let find;
					let findWatching;
					let count;
					let checkIsExists;
					let onNewAndFind;
					let onNewAndFindWatching;
		
					// init method config.
					if (methodConfig !== undefined) {
		
						createConfig = methodConfig.create;
						getConfig = methodConfig.get;
						updateConfig = methodConfig.update;
						removeConfig = methodConfig.remove;
						findConfig = methodConfig.find;
						countConfig = methodConfig.count;
						checkIsExistsConfig = methodConfig.checkIsExists;
		
						if (createConfig !== undefined) {
							createValid = createConfig.valid;
						}
		
						if (updateConfig !== undefined) {
							updateValid = updateConfig.valid;
						}
					}
		
					let getName = self.getName = () => {
						return name;
					};
		
					let getInitData = self.getInitData = () => {
						return initData;
					};
		
					let getCreateValid = self.getCreateValid = () => {
						return createValid;
					};
		
					let getUpdateValid = self.getUpdateValid = () => {
						return updateValid;
					};
		
					let getRoom = self.getRoom = () => {
						return room;
					};
		
					// create.
					if (createConfig !== false) {
		
						create = self.create = (data, callbackOrHandlers) => {
							//REQUIRED: data
							//OPTIONAL: callbackOrHandlers
							//OPTIONAL: callbackOrHandlers.success
							//OPTIONAL: callbackOrHandlers.notValid
							//OPTIONAL: callbackOrHandlers.notAuthed
							//OPTIONAL: callbackOrHandlers.error
		
							let callback;
							let notValidHandler;
							let notAuthedHandler;
							let errorHandler;
							
							let validResult;
		
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									notValidHandler = callbackOrHandlers.notValid;
									notAuthedHandler = callbackOrHandlers.notAuthed;
									errorHandler = callbackOrHandlers.error;
								}
							}
		
							// init data.
							if (initData !== undefined) {
								EACH(initData, (value, name) => {
									data[name] = value;
								});
							}
		
							if (createValid !== undefined) {
								validResult = createValid.checkAndWash(data);
							}
		
							if (validResult !== undefined && validResult.checkHasError() === true) {
		
								if (notValidHandler !== undefined) {
									notValidHandler(validResult.getErrors());
								} else {
									console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` NOT VALID!: ', validResult.getErrors());
								}
		
							} else {
		
								room.send({
									methodName : 'create',
									data : data
								}, (result) => {
		
									let errorMsg;
									let validErrors;
									let isNotAuthed;
									let savedData;
		
									if (result !== undefined) {
		
										errorMsg = result.errorMsg;
										validErrors = result.validErrors;
										isNotAuthed = result.isNotAuthed;
										savedData = result.savedData;
		
										if (errorMsg !== undefined) {
											if (errorHandler !== undefined) {
												errorHandler(errorMsg);
											} else {
												console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` ERROR: ' + errorMsg);
											}
										} else if (validErrors !== undefined) {
											if (notValidHandler !== undefined) {
												notValidHandler(validErrors);
											} else {
												console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` NOT VALID!: ', validErrors);
											}
										} else if (isNotAuthed === true) {
											if (notAuthedHandler !== undefined) {
												notAuthedHandler();
											} else {
												console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.create` NOT AUTHED!');
											}
										} else if (callback !== undefined) {
											callback(savedData);
										}
		
									} else if (callback !== undefined) {
										callback();
									}
								});
							}
						};
					}
		
					// get.
					if (getConfig !== false) {
						
						get = self.get = (idOrParams, callbackOrHandlers) => {
							//OPTIONAL: idOrParams
							//OPTIONAL: idOrParams.id
							//OPTIONAL: idOrParams.filter
							//OPTIONAL: idOrParams.sort
							//OPTIONAL: idOrParams.isRandom
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notExistsHandler;
							let notAuthedHandler;
							let errorHandler;
							
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = idOrParams;
								idOrParams = {};
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							room.send({
								methodName : 'get',
								data : idOrParams
							}, (result) => {
		
								let errorMsg;
								let isNotAuthed;
								let savedData;
		
								if (result !== undefined) {
									errorMsg = result.errorMsg;
									isNotAuthed = result.isNotAuthed;
									savedData = result.savedData;
								}
		
								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.get` ERROR: ' + errorMsg);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.get` NOT AUTHED!');
									}
								} else if (savedData === undefined) {
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.get` NOT EXISTS!', idOrParams);
									}
								} else if (callback !== undefined) {
									callback(savedData);
								}
							});
						};
		
						getWatching = self.getWatching = (idOrParams, callbackOrHandlers) => {
							//OPTIONAL: idOrParams
							//OPTIONAL: idOrParams.id
							//OPTIONAL: idOrParams.filter
							//OPTIONAL: idOrParams.sort
							//OPTIONAL: idOrParams.isRandom
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notExistsHandler;
							let notAuthedHandler;
							let errorHandler;
							
							let isExited;
							let subRoom;
							
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = idOrParams;
								idOrParams = {};
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notExistsHandler = callbackOrHandlers.notExists;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							self.get(idOrParams, {
		
								success : (savedData) => {
		
									let exit;
		
									if (isExited !== true && callback !== undefined) {
		
										subRoom = box.ROOM({
											roomServerName : roomServerName,
											name : name + '/' + savedData.id
										});
		
										callback(savedData,
		
										// add update handler.
										(callback) => {
											subRoom.on('update', callback);
										},
		
										// add remove handler.
										(callback) => {
											subRoom.on('remove', (originData) => {
												callback(originData);
												exit();
											});
										},
		
										// exit.
										exit = () => {
											if (subRoom !== undefined) {
												subRoom.exit();
												subRoom = undefined;
											}
										});
									}
								},
		
								notExists : notExistsHandler,
								notAuthed : notAuthedHandler,
								error : errorHandler
							});
		
							return OBJECT({
		
								init : (inner, self) => {
		
									let exit = self.exit = () => {
		
										if (subRoom !== undefined) {
											subRoom.exit();
										}
		
										isExited = true;
									};
								}
							});
						};
					}
		
					// update.
					if (updateConfig !== false) {
		
						update = self.update = (data, callbackOrHandlers) => {
							//REQUIRED: data
							//REQUIRED: data.id
							//OPTIONAL: callbackOrHandlers
		
							let id = data.id;
							let $inc = data.$inc;
							let $push = data.$push;
							let $pull = data.$pull;
							
							let callback;
							let notValidHandler;
							let notExistsHandler;
							let notAuthedHandler;
							let errorHandler;

							let validResult;
							let $incValidResult;
							let $pushValidResult;
							let $pullValidResult;
							let validErrors;
		
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									notValidHandler = callbackOrHandlers.notValid;
									notExistsHandler = callbackOrHandlers.notExists;
									notAuthedHandler = callbackOrHandlers.notAuthed;
									errorHandler = callbackOrHandlers.error;
								}
							}
		
							if (updateValid !== undefined) {
								
								validResult = updateValid.checkForUpdate(data);
								
								if ($inc !== undefined) {
									$incValidResult = updateValid.checkForUpdate($inc);
								}
								
								if ($push !== undefined) {
									
									$pushValidResult = updateValid.checkForUpdate(RUN(() => {
										
										let dataForValid = {};
										
										EACH($push, (value, attr) => {
											dataForValid[attr] = [value];
										});
										
										return dataForValid;
									}));
								}
								
								if ($pull !== undefined) {
									
									$pullValidResult = updateValid.checkForUpdate(RUN(() => {
										
										let dataForValid = {};
										
										EACH($pull, (value, attr) => {
											dataForValid[attr] = [value];
										});
										
										return dataForValid;
									}));
								}
							}
		
							data.id = id;
							data.$inc = $inc;
							data.$push = $push;
							data.$pull = $pull;
		
							if (updateValid !== undefined && (
								validResult.checkHasError() === true ||
								($incValidResult !== undefined && $incValidResult.checkHasError() === true) ||
								($pushValidResult !== undefined && $pushValidResult.checkHasError() === true) ||
								($pullValidResult !== undefined && $pullValidResult.checkHasError() === true)
							)) {
								
								validErrors = COMBINE([
									validResult.getErrors(),
									$incValidResult === undefined ? {} : $incValidResult.getErrors(),
									$pushValidResult === undefined ? {} : $pushValidResult.getErrors(),
									$pullValidResult === undefined ? {} : $pullValidResult.getErrors()
								]);
		
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT VALID!: ', validErrors);
								}
		
							} else {
		
								room.send({
									methodName : 'update',
									data : data
								}, (result) => {
		
									let errorMsg;
									let validErrors;
									let isNotAuthed;
									let savedData;
									let originData;
		
									if (result !== undefined) {
										errorMsg = result.errorMsg;
										validErrors = result.validErrors;
										isNotAuthed = result.isNotAuthed;
										savedData = result.savedData;
										originData = result.originData;
									}
		
									if (errorMsg !== undefined) {
										if (errorHandler !== undefined) {
											errorHandler(errorMsg);
										} else {
											console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` ERROR: ' + errorMsg);
										}
									} else if (validErrors !== undefined) {
										if (notValidHandler !== undefined) {
											notValidHandler(validErrors);
										} else {
											console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT VALID!: ', validErrors);
										}
									} else if (isNotAuthed === true) {
										if (notAuthedHandler !== undefined) {
											notAuthedHandler();
										} else {
											console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT AUTHED!');
										}
									} else if (savedData === undefined) {
										if (notExistsHandler !== undefined) {
											notExistsHandler();
										} else {
											console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.update` NOT EXISTS!', data);
										}
									} else if (callback !== undefined) {
										callback(savedData, originData);
									}
								});
							}
						};
					}
		
					// remove.
					if (removeConfig !== false) {
		
						remove = self.remove = (id, callbackOrHandlers) => {
							//REQUIRED: id
							//OPTIONAL: callbackOrHandlers
		
							let callback;
							let notExistsHandler;
							let notAuthedHandler;
							let errorHandler;
		
							if (callbackOrHandlers !== undefined) {
								if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
									callback = callbackOrHandlers;
								} else {
									callback = callbackOrHandlers.success;
									notExistsHandler = callbackOrHandlers.notExists;
									notAuthedHandler = callbackOrHandlers.notAuthed;
									errorHandler = callbackOrHandlers.error;
								}
							}
		
							room.send({
								methodName : 'remove',
								data : id
							}, (result) => {
		
								let errorMsg;
								let isNotAuthed;
								let originData;
		
								if (result !== undefined) {
									errorMsg = result.errorMsg;
									isNotAuthed = result.isNotAuthed;
									originData = result.originData;
								}
		
								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.remove` ERROR: ' + errorMsg);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.remove` NOT AUTHED!');
									}
								} else if (originData === undefined) {
									if (notExistsHandler !== undefined) {
										notExistsHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.remove` NOT EXISTS!', id);
									}
								} else if (callback !== undefined) {
									callback(originData);
								}
							});
						};
					}
		
					// find.
					if (findConfig !== false) {
		
						find = self.find = (params, callbackOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.filter
							//OPTIONAL: params.sort
							//OPTIONAL: params.start
							//OPTIONAL: params.count
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notAuthedHandler;
							let errorHandler;
		
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							room.send({
								methodName : 'find',
								data : params
							}, (result) => {
		
								let errorMsg = result.errorMsg;
								let isNotAuthed = result.isNotAuthed;
								let savedDataSet = result.savedDataSet;
		
								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.find` ERROR: ' + errorMsg);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.find` NOT AUTHED!');
									}
								} else if (callback !== undefined) {
									callback(savedDataSet);
								}
							});
						};
		
						findWatching = self.findWatching = (params, callbackOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.filter
							//OPTIONAL: params.sort
							//OPTIONAL: params.start
							//OPTIONAL: params.count
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notAuthedHandler;
							let errorHandler;
							
							let isExited;
							let subRooms = {};
		
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							self.find(params, {
		
								success : (savedDataSet) => {
		
									let exit;
		
									if (isExited !== true && callback !== undefined) {
		
										EACH(savedDataSet, (savedData, i) => {
		
											let id = savedData.id;
		
											subRooms[id] = box.ROOM({
												roomServerName : roomServerName,
												name : name + '/' + id
											});
										});
		
										callback(savedDataSet,
		
										// add update handler.
										(id, callback) => {
											subRooms[id].on('update', callback);
										},
		
										// add remove handler.
										(id, callback) => {
											subRooms[id].on('remove', (originData) => {
												callback(originData);
												exit(id);
											});
										},
		
										// exit.
										exit = (id) => {
											if (subRooms[id] !== undefined) {
												subRooms[id].exit();
												delete subRooms[id];
											}
										});
									}
								},
		
								notAuthed : notAuthedHandler,
								error : errorHandler
							});
		
							return OBJECT({
		
								init : (inner, self) => {
									
									let exit = self.exit = () => {
		
										EACH(subRooms, (subRoom) => {
											subRoom.exit();
										});
		
										isExited = true;
									};
								}
							});
						};
					}
		
					if (countConfig !== false) {
		
						count = self.count = (params, callbackOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.filter
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notAuthedHandler;
							let errorHandler;
		
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							room.send({
								methodName : 'count',
								data : params
							}, (result) => {
		
								let errorMsg = result.errorMsg;
								let isNotAuthed = result.isNotAuthed;
								let count = result.count;
		
								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.count` ERROR: ' + errorMsg);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.count` NOT AUTHED!');
									}
								} else if (callback !== undefined) {
									callback(count);
								}
							});
						};
					}
		
					if (checkIsExistsConfig !== false) {
		
						checkIsExists = self.checkIsExists = (params, callbackOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.filter
							//REQUIRED: callbackOrHandlers
		
							let callback;
							let notAuthedHandler;
							let errorHandler;
		
							// init params.
							if (callbackOrHandlers === undefined) {
								callbackOrHandlers = params;
								params = undefined;
							}
		
							if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
								callback = callbackOrHandlers;
							} else {
								callback = callbackOrHandlers.success;
								notAuthedHandler = callbackOrHandlers.notAuthed;
								errorHandler = callbackOrHandlers.error;
							}
		
							room.send({
								methodName : 'checkIsExists',
								data : params
							}, (result) => {
		
								let errorMsg = result.errorMsg;
								let isNotAuthed = result.isNotAuthed;
								let isExists = result.isExists;
		
								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.checkIsExists` ERROR: ' + errorMsg);
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										console.log('[UPPERCASE-MODEL] `' + box.boxName + '.' + name + 'Model.checkIsExists` NOT AUTHED!');
									}
								} else if (callback !== undefined) {
									callback(isExists);
								}
							});
						};
					}
		
					let onNew = self.onNew = (properties, handler) => {
						//OPTIONAL: properties
						//REQUIRED: handler
		
						let roomForCreate;
						
						let infoId = onNewInfoCount;
						
						onNewInfoCount += 1;
		
						if (handler === undefined) {
							handler = properties;
							properties = undefined;
		
							(roomForCreate = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/create'
							})).on('create', (savedData) => {
								
								onNewInfos[infoId].lastCreateTime = savedData.createTime;
								
								handler(savedData);
							});
		
						} else if (properties === undefined) {
							
							(roomForCreate = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/create'
							})).on('create', (savedData) => {
								
								onNewInfos[infoId].lastCreateTime = savedData.createTime;
								
								handler(savedData);
							});
		
						} else {
		
							EACH(properties, (value, propertyName) => {
								
								if (value !== undefined) {
		
									(roomForCreate = box.ROOM({
										roomServerName : roomServerName,
										name : name + '/' + propertyName + '/' + value + '/create'
									})).on('create', (savedData) => {
			
										if (EACH(properties, (value, propertyName) => {
											
											if (value !== undefined) {
												
												if (value === TO_DELETE) {
													if (savedData[propertyName] !== undefined) {
														return false;
													}
												} else if (savedData[propertyName] !== value) {
													return false;
												}
											}
											
										}) === true) {
											
											onNewInfos[infoId].lastCreateTime = savedData.createTime;
											
											handler(savedData);
										}
									});
			
									return false;
								}
							});
							
							if (roomForCreate === undefined) {
								onNew(undefined, handler);
								return;
							}
						}
						
						onNewInfos[infoId] = {
							
							findMissingDataSet : () => {
								
								if (onNewInfos[infoId].lastCreateTime !== undefined && find !== undefined) {
									
									find({
										filter : properties !== undefined ? COMBINE([properties, {
											createTime : {
												$gt : onNewInfos[infoId].lastCreateTime
											}
										}]) : {
											createTime : {
												$gt : onNewInfos[infoId].lastCreateTime
											}
										}
									}, REVERSE_EACH(handler));
								}
							}
						};
		
						return OBJECT({
		
							init : (inner, self) => {
								
								let exit = self.exit = () => {
									
									delete onNewInfos[infoId];
									
									if (roomForCreate !== undefined) {
										roomForCreate.exit();
									}
								};
							}
						});
					};
		
					let onNewWatching = self.onNewWatching = (properties, handler) => {
						//OPTIONAL: properties
						//REQUIRED: handler
		
						let roomForCreate;
						
						let infoId = onNewInfoCount;
						
						let subRooms = [];
						
						let innerHandler = (savedData) => {
		
							let id = savedData.id;
							
							let subRoom;
							
							let closeWatching;
		
							subRooms.push(subRoom = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/' + id
							}));
		
							handler(savedData,
		
							// add update handler.
							(callback) => {
								subRoom.on('update', callback);
							},
		
							// add remove handler.
							(callback) => {
								subRoom.on('remove', (originData) => {
									callback(originData);
									closeWatching();
								});
							},
		
							// close watching.
							closeWatching = () => {
		
								subRoom.exit();
		
								REMOVE({
									array : subRooms,
									value : subRoom
								});
							});
						};
						
						onNewInfoCount += 1;
		
						if (handler === undefined) {
							handler = properties;
							properties = undefined;
		
							(roomForCreate = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/create'
							})).on('create', (savedData) => {
								
								onNewInfos[infoId].lastCreateTime = savedData.createTime;
								
								innerHandler(savedData);
							});
		
						} else if (properties === undefined) {
		
							(roomForCreate = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/create'
							})).on('create', (savedData) => {
								
								onNewInfos[infoId].lastCreateTime = savedData.createTime;
								
								innerHandler(savedData);
							});
							
						} else {
		
							EACH(properties, (value, propertyName) => {
								
								if (value !== undefined) {
		
									(roomForCreate = box.ROOM({
										roomServerName : roomServerName,
										name : name + '/' + propertyName + '/' + value + '/create'
									})).on('create', (savedData) => {
			
										if (EACH(properties, (value, propertyName) => {
											
											if (value !== undefined) {
												
												if (value === TO_DELETE) {
													if (savedData[propertyName] !== undefined) {
														return false;
													}
												} else if (savedData[propertyName] !== value) {
													return false;
												}
											}
											
										}) === true) {
											
											onNewInfos[infoId].lastCreateTime = savedData.createTime;
											
											innerHandler(savedData);
										}
									});
			
									return false;
								}
							});
							
							if (roomForCreate === undefined) {
								onNewWatching(undefined, handler);
								return;
							}
						}
						
						onNewInfos[infoId] = {
							
							findMissingDataSet : () => {
								
								if (onNewInfos[infoId].lastCreateTime !== undefined && find !== undefined) {
									
									find({
										filter : properties !== undefined ? COMBINE([properties, {
											createTime : {
												$gt : onNewInfos[infoId].lastCreateTime
											}
										}]) : {
											createTime : {
												$gt : onNewInfos[infoId].lastCreateTime
											}
										}
									}, REVERSE_EACH(innerHandler));
								}
							}
						};
		
						return OBJECT({
		
							init : (inner, self) => {
								
								let exit = self.exit = () => {
									
									delete onNewInfos[infoId];
		
									if (roomForCreate !== undefined) {
										roomForCreate.exit();
									}
		
									EACH(subRooms, (subRoom) => {
										subRoom.exit();
									});
								};
							}
						});
					};
					
					// on new and find.
					if (findConfig !== false) {
						
						onNewAndFind = self.onNewAndFind = (params, handlerOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.properties
							//OPTIONAL: params.filter
							//OPTIONAL: params.sort
							//OPTIONAL: params.start
							//OPTIONAL: params.count
							//OPTIONAL: params.isNotOnNew
							//REQUIRED: handlerOrHandlers
							//REQUIRED: handlerOrHandlers.handler
							//OPTIONAL: handlerOrHandlers.success
							//OPTIONAL: handlerOrHandlers.notAuthed
							//OPTIONAL: handlerOrHandlers.error
							
							let properties;
							let filter;
							let sort;
							let start;
							let count;
							let isNotOnNew;
							let onNewRoom;
							
							let handler;
							let callback;
							let notAuthedHandler;
							let errorHandler;
		
							// init params.
							if (handlerOrHandlers === undefined) {
								handlerOrHandlers = params;
								params = undefined;
							}
							
							if (params !== undefined) {
								properties = params.properties;
								filter = params.filter;
								sort = params.sort;
								start = params.start;
								count = params.count;
								isNotOnNew = params.isNotOnNew;
							}
		
							if (CHECK_IS_DATA(handlerOrHandlers) !== true) {
								handler = handlerOrHandlers;
							} else {
								handler = handlerOrHandlers.handler;
								callback = handlerOrHandlers.success;
								notAuthedHandler = handlerOrHandlers.notAuthed;
								errorHandler = handlerOrHandlers.error;
							}
							
							if (isNotOnNew !== true) {
								onNewRoom = onNew(properties, (savedData) => {
									handler(savedData, true);
								});
							}
							
							find({
								filter : COMBINE([properties, filter]),
								sort : sort,
								start : start,
								count : count
							}, {
								success : (savedDataSet) => {
									
									if (callback !== undefined) {
										callback(savedDataSet);
									}
									
									REVERSE_EACH(savedDataSet, (savedData) => {
										handler(savedData, false);
									});
								},
								notAuthed : notAuthedHandler,
								error : errorHandler
							});
							
							return OBJECT({
			
								init : (inner, self) => {
									
									let exit = self.exit = () => {
			
										if (onNewRoom !== undefined) {
											onNewRoom.exit();
										}
									};
								}
							});
						};
						
						onNewAndFindWatching = self.onNewAndFindWatching = (params, handlerOrHandlers) => {
							//OPTIONAL: params
							//OPTIONAL: params.properties
							//OPTIONAL: params.filter
							//OPTIONAL: params.sort
							//OPTIONAL: params.start
							//OPTIONAL: params.count
							//OPTIONAL: params.isNotOnNew
							//REQUIRED: handlerOrHandlers
							//REQUIRED: handlerOrHandlers.handler
							//OPTIONAL: handlerOrHandlers.success
							//OPTIONAL: handlerOrHandlers.notAuthed
							//OPTIONAL: handlerOrHandlers.error
							
							let properties;
							let filter;
							let sort;
							let start;
							let count;
							let isNotOnNew;
							
							let handler;
							let callback;
							let notAuthedHandler;
							let errorHandler;
							
							let onNewWatchingRoom;
							let findWatchingRoom;
		
							// init params.
							if (handlerOrHandlers === undefined) {
								handlerOrHandlers = params;
								params = undefined;
							}
							
							if (params !== undefined) {
								properties = params.properties;
								filter = params.filter;
								sort = params.sort;
								start = params.start;
								count = params.count;
								isNotOnNew = params.isNotOnNew;
							}
		
							if (CHECK_IS_DATA(handlerOrHandlers) !== true) {
								handler = handlerOrHandlers;
							} else {
								handler = handlerOrHandlers.handler;
								callback = handlerOrHandlers.success;
								notAuthedHandler = handlerOrHandlers.notAuthed;
								errorHandler = handlerOrHandlers.error;
							}
							
							if (isNotOnNew !== true) {
								onNewWatchingRoom = onNewWatching(properties, (savedData, addUpdateHandler, addRemoveHandler, closeWatching) => {
									handler(savedData, addUpdateHandler, addRemoveHandler, closeWatching, true);
								});
							}
							
							findWatchingRoom = findWatching({
								filter : COMBINE([properties, filter]),
								sort : sort,
								start : start,
								count : count
							}, {
								success : (savedDataSet, addUpdateHandler, addRemoveHandler, exit) => {
									
									if (callback !== undefined) {
										callback(savedDataSet, addUpdateHandler, addRemoveHandler, exit);
									}
									
									REVERSE_EACH(savedDataSet, (savedData) => {
										
										handler(savedData, (handler) => {
											addUpdateHandler(savedData.id, handler);
										}, (handler) => {
											addRemoveHandler(savedData.id, handler);
										},
	
										// close watching.
										() => {
											exit(savedData.id);
										},
										
										// is new data
										false);
									});
								},
								notAuthed : notAuthedHandler,
								error : errorHandler
							});
							
							return OBJECT({
			
								init : (inner, self) => {
									
									let exit = self.exit = () => {
			
										if (onNewWatchingRoom !== undefined) {
											onNewWatchingRoom.exit();
										}
										
										findWatchingRoom.exit();
									};
								}
							});
						};
					}
		
					let onRemove = self.onRemove = (properties, handler) => {
						//OPTIONAL: properties
						//REQUIRED: handler
		
						let roomForRemove;
		
						if (handler === undefined) {
							handler = properties;
		
							(roomForRemove = box.ROOM({
								roomServerName : roomServerName,
								name : name + '/remove'
							})).on('remove', handler);
		
						} else {
		
							EACH(properties, (value, propertyName) => {
								
								if (value !== undefined) {
									
									(roomForRemove = box.ROOM({
										roomServerName : roomServerName,
										name : name + '/' + propertyName + '/' + value + '/remove'
									})).on('remove', (originData) => {
			
										if (EACH(properties, (value, propertyName) => {
											
											if (value !== undefined) {
												
												if (value === TO_DELETE) {
													if (originData[propertyName] !== undefined) {
														return false;
													}
												} else if (originData[propertyName] !== value) {
													return false;
												}
											}
											
										}) === true) {
											handler(originData);
										}
									});
			
									return false;
								}
							});
						}
		
						return OBJECT({
		
							init : (inner, self) => {
								
								let exit = self.exit = () => {
									if (roomForRemove !== undefined) {
										roomForRemove.exit();
									}
								};
							}
						});
					};
				}
			};
		});
	});
});
