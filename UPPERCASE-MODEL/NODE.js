/*

Welcome to UPPERCASE-MODEL! (http://uppercase.io)

*/

FOR_BOX((box) => {

	/*
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.config
			
			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};

			// to implement.
		}
	});
});

FOR_BOX((box) => {

	OVERRIDE(box.MODEL, (origin) => {

		/*
		 * MODEL 클래스
		 */
		box.MODEL = CLASS({
			
			preset : () => {
				return origin;
			},

			init : (inner, self, params) => {
				//REQUIRED: params
				//REQUIRED: params.name
				//OPTIONAL: params.initData
				//OPTIONAL: params.methodConfig
				//OPTIONAL: params.isNotUsingObjectId
				//OPTIONAL: params.isNotUsingHistory

				let name = params.name;
				let initData = params.initData;
				let methodConfig = params.methodConfig;
				let isNotUsingObjectId = params.isNotUsingObjectId;
				let isNotUsingHistory = params.isNotUsingHistory;
				
				let createConfig;
				let getConfig;
				let updateConfig;
				let removeConfig;
				let findConfig;
				let countConfig;
				let checkIsExistsConfig;
				
				let createValid;
				let updateValid;
				
				let createRole;
				let getRole;
				let updateRole;
				let removeRole;
				let findRole;
				let countRole;
				let checkIsExistsRole;
				
				let createAdminRole;
				let updateAdminRole;
				let removeAdminRole;
				
				let createAuthKey;
				let updateAuthKey;
				let removeAuthKey;
				
				let is_idAssignable;
				
				let beforeCreateListeners = [];
				let afterCreateListeners = [];
				let beforeGetListeners = [];
				let afterGetListeners = [];
				let beforeUpdateListeners = [];
				let afterUpdateListeners = [];
				let beforeRemoveListeners = [];
				let afterRemoveListeners = [];
				let beforeFindListeners = [];
				let afterFindListeners = [];
				let beforeCountListeners = [];
				let afterCountListeners = [];
				let beforeCheckIsExistsListeners = [];
				let afterCheckIsExistsListeners = [];
				
				let db = box.DB({
					name : name,
					isNotUsingObjectId : isNotUsingObjectId,
					isNotUsingHistory : isNotUsingHistory
				});

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
						createRole = createConfig.role;
						createAuthKey = createConfig.authKey;
						createAdminRole = createConfig.adminRole;
					}

					if (getConfig !== undefined) {
						getRole = getConfig.role;
					}

					if (updateConfig !== undefined) {
						updateValid = updateConfig.valid;
						updateRole = updateConfig.role;
						updateAuthKey = updateConfig.authKey;
						updateAdminRole = updateConfig.adminRole;
					}

					if (removeConfig !== undefined) {
						removeRole = removeConfig.role;
						removeAuthKey = removeConfig.authKey;
						removeAdminRole = removeConfig.adminRole;
					}

					if (findConfig !== undefined) {
						findRole = findConfig.role;
					}

					if (countConfig !== undefined) {
						countRole = countConfig.role;
					}

					if (checkIsExistsConfig !== undefined) {
						checkIsExistsRole = checkIsExistsConfig.role;
					}
				}

				// init not inited data set. (when not cpu clustering or worker id is 1)
				if ((CPU_CLUSTERING.getWorkerId() === undefined || CPU_CLUSTERING.getWorkerId() === 1) && initData !== undefined) {
					
					let $or = [];

					EACH(initData, (value, name) => {

						let filter = {};
						
						filter[name] = TO_DELETE;
					
						$or.push(filter);
					});
					
					if ($or.length > 0) {

						db.find({
							filter : {
								$or : $or
							},
							isFindAll : true
						}, (notInitedDataSet) => {
							
							if (notInitedDataSet.length > 0) {
								
								SHOW_WARNING(box.boxName + '.' + name + 'Model', '초기화 되지 않은 데이터가 ' + notInitedDataSet.length + '개 있습니다. 모두 초기화합니다.');
								
								EACH(notInitedDataSet, (notInitedData) => {
									
									EACH(initData, (value, name) => {
										if (notInitedData[name] === undefined) {
											notInitedData[name] = value;
										}
									});
		
									db.update(notInitedData);
								});
							}
						});
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

				let getDB = self.getDB = () => {
					return db;
				};

				let on = inner.on = (methodName, funcOrFuncs) => {
					//REQUIRED: methodName
					//REQUIRED: funcOrFuncs
					//OPTIONAL: funcOrFuncs.before
					//OPTIONAL: funcOrFuncs.after

					// when create method
					if (methodName === 'create') {
						
						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCreateListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCreateListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCreateListeners.push(funcOrFuncs);
						}
					}

					// when get method
					else if (methodName === 'get') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeGetListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterGetListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterGetListeners.push(funcOrFuncs);
						}
					}

					// when update method
					else if (methodName === 'update') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeUpdateListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterUpdateListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterUpdateListeners.push(funcOrFuncs);
						}
					}

					// when remove method
					else if (methodName === 'remove') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeRemoveListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterRemoveListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterRemoveListeners.push(funcOrFuncs);
						}
					}

					// when find method
					else if (methodName === 'find') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeFindListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterFindListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterFindListeners.push(funcOrFuncs);
						}
					}

					// when count method
					else if (methodName === 'count') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCountListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCountListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCountListeners.push(funcOrFuncs);
						}
					}

					// when check is exists method
					else if (methodName === 'checkIsExists') {

						if (CHECK_IS_DATA(funcOrFuncs) === true) {

							// add before listener.
							if (funcOrFuncs.before !== undefined) {
								beforeCheckIsExistsListeners.push(funcOrFuncs.before);
							}
	
							// add after listener.
							if (funcOrFuncs.after !== undefined) {
								afterCheckIsExistsListeners.push(funcOrFuncs.after);
							}
							
						} else {
							
							// add after listener.
							afterCheckIsExistsListeners.push(funcOrFuncs);
						}
					}
				};

				let innerCreate = (data, ret, clientInfo) => {

					let validResult;

					// init data.
					if (initData !== undefined) {
						EACH(initData, (value, name) => {
							data[name] = value;
						});
					}

					// valid data.
					if (createValid !== undefined) {
						validResult = createValid.checkAndWash(data);
					}

					// when has error
					if (validResult !== undefined && validResult.checkHasError() === true) {

						ret({
							validErrors : validResult.getErrors()
						});
					}

					// when has not error
					else {

						NEXT([
						(next) => {
							
							let isNotRunNext;

							// run before create listeners.
							EACH(beforeCreateListeners, (beforeCreateListener) => {
								
								if (beforeCreateListener(data, next, ret, clientInfo) === false) {
									
									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// create data in database.
								db.create(data, {

									error : (errorMsg) => {
										ret({
											errorMsg : errorMsg
										});
									},

									success : (savedData) => {
										
										let isNotRunNext;
										
										// run after create listeners.
										EACH(afterCreateListeners, (afterCreateListener) => {
											
											if (afterCreateListener(savedData, () => {
												next(savedData);
											}, ret, clientInfo) === false) {
												
												isNotRunNext = true;
											}
										});
			
										if (isNotRunNext !== true) {
											next(savedData);
										}
									}
								});
							};
						},
						
						() => {
							return (savedData) => {
								
								// broadcast.
								box.BROADCAST({
									roomName : name + '/create',
									methodName : 'create',
									data : savedData
								});

								// broadcast by property.
								EACH(savedData, (value, propertyName) => {
									box.BROADCAST({
										roomName : name + '/' + propertyName + '/' + value + '/create',
										methodName : 'create',
										data : savedData
									});
								});

								ret({
									savedData : savedData
								});
							};
						}]);
					}
				};

				let innerGet = (idOrParams, ret, clientInfo) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//OPTIONAL: idOrParams.clientInfo

					let isIdMode;
					let id;
					let filter;
					let sort;
					let isRandom;
					let isToCache;
					let params;

					// init params.
					if (idOrParams !== undefined) {
						
						if (CHECK_IS_DATA(idOrParams) !== true) {
							
							isIdMode = true;
							
							id = idOrParams;
						}
						
						else {
							
							id = idOrParams.id;
							filter = idOrParams.filter;
							sort = idOrParams.sort;
							isRandom = idOrParams.isRandom;
							isToCache = idOrParams.isToCache;
							
							if (clientInfo === undefined) {
								clientInfo = idOrParams.clientInfo;
							}
						}
						
						params = {
							id : id,
							filter : filter,
							sort : sort,
							isRandom : isRandom,
							isToCache : isToCache
						};
					}
					
					NEXT([
					(next) => {
						
						let isNotRunNext;

						// run before get listeners.
						EACH(beforeGetListeners, (beforeGetListener) => {
							if (beforeGetListener(isIdMode === true ? id : params, next, ret, clientInfo) === false) {
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					(next) => {
						return () => {
						
							// get data in database.
							db.get(params, {
								
								error : (errorMsg) => {
									ret({
										errorMsg : errorMsg
									});
								},
								
								notExists : () => {
									ret({});
								},
								
								success : (savedData) => {
									
									let isNotRunNext;
		
									// run after get listeners.
									EACH(afterGetListeners, (afterGetListener) => {
										
										if (afterGetListener(savedData, () => {
											next(savedData);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(savedData);
									}
								}
							});
						};
					},
					
					() => {
						return (savedData) => {

							ret({
								savedData : savedData
							});
						};
					}]);
				};

				let innerUpdate = (data, ret, clientInfo, isNotToSaveHistory, isNotToUpdateLastUpdateTime) => {

					let id = data.id;
					let $inc = data.$inc;
					let $push = data.$push;
					let $addToSet = data.$addToSet;
					let $pull = data.$pull;
					
					let validResult;
					let $incValidResult;
					let $pushValidResult;
					let $addToSetValidResult;
					let $pullValidResult;

					// valid data.
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
						
						if ($addToSet !== undefined) {
							
							$addToSetValidResult = updateValid.checkForUpdate(RUN(() => {
								
								let dataForValid = {};
								
								EACH($addToSet, (value, attr) => {
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
					data.$addToSet = $addToSet;
					data.$pull = $pull;

					if (updateValid !== undefined && (
						validResult.checkHasError() === true ||
						($incValidResult !== undefined && $incValidResult.checkHasError() === true) ||
						($pushValidResult !== undefined && $pushValidResult.checkHasError() === true) ||
						($addToSetValidResult !== undefined && $addToSetValidResult.checkHasError() === true) ||
						($pullValidResult !== undefined && $pullValidResult.checkHasError() === true)
					)) {

						ret({
							validErrors : COMBINE([
								validResult.getErrors(),
								$incValidResult === undefined ? {} : $incValidResult.getErrors(),
								$pushValidResult === undefined ? {} : $pushValidResult.getErrors(),
								$addToSetValidResult === undefined ? {} : $addToSetValidResult.getErrors(),
								$pullValidResult === undefined ? {} : $pullValidResult.getErrors()
							])
						});
					}

					// when has not error
					else {

						NEXT([
						(next) => {
										
							let isNotRunNext;

							// run before update listeners.
							EACH(beforeUpdateListeners, (beforeUpdateListener) => {

								if (beforeUpdateListener(data, next, ret, clientInfo) === false) {

									isNotRunNext = true;
								}
							});

							if (isNotRunNext !== true) {
								next();
							}
						},

						(next) => {
							return () => {

								// update data in database.
								(isNotToUpdateLastUpdateTime === true ? db.updateNoRecord :
								(isNotToSaveHistory === true ? db.updateNoHistory :
								db.update))(data, {

									error : (errorMsg) => {
										ret({
											errorMsg : errorMsg
										});
									},

									notExists : () => {
										ret({});
									},

									success : (savedData, originData) => {
										
										let isNotRunNext;
										
										// run after update listeners.
										EACH(afterUpdateListeners, (afterUpdateListener) => {
			
											if (afterUpdateListener(savedData, originData, () => {
												next(savedData, originData);
											}, ret, clientInfo) === false) {
												
												isNotRunNext = true;
											}
										});
			
										if (isNotRunNext !== true) {
											next(savedData, originData);
										}
									}
								});
							};
						},
						
						() => {
							return (savedData, originData) => {

								// broadcast for watching.
								box.BROADCAST({
									roomName : name + '/' + savedData.id,
									methodName : 'update',
									data : savedData
								});

								ret({
									savedData : savedData,
									originData : originData
								});
							};
						}]);
					}
				};

				let innerRemove = (id, ret, clientInfo) => {
					
					NEXT([
					(next) => {
						
						let isNotRunNext;

						// run before remove listeners.
						EACH(beforeRemoveListeners, (beforeRemoveListener) => {
							
							if (beforeRemoveListener(id, next, ret, clientInfo) === false) {
								
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					(next) => {
						return () => {

							// remove data in database.
							db.remove(id, {

								error : (errorMsg) => {
									ret({
										errorMsg : errorMsg
									});
								},

								notExists : () => {
									ret({});
								},

								success : (originData) => {
									
									let isNotRunNext;

									// run after remove listeners.
									EACH(afterRemoveListeners, (afterRemoveListener) => {
										
										if (afterRemoveListener(originData, () => {
											next(originData);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});

									if (isNotRunNext !== true) {
										next(originData);
									}
								}
							});
						};
					},
						
					() => {
						return (originData) => {
							
							// broadcast for watching.
							box.BROADCAST({
								roomName : name + '/' + originData.id,
								methodName : 'remove',
								data : originData
							});
							
							// broadcast.
							box.BROADCAST({
								roomName : name + '/remove',
								methodName : 'remove',
								data : originData
							});

							// broadcast by property.
							EACH(originData, (value, propertyName) => {
								box.BROADCAST({
									roomName : name + '/' + propertyName + '/' + value + '/remove',
									methodName : 'remove',
									data : originData
								});
							});

							ret({
								originData : originData
							});
						};
					}]);
				};

				let innerFind = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//OPTIONAL: params.isToCache
					//OPTIONAL: params.clientInfo

					let filter;
					let sort;
					let start;
					let count;
					let isFindAll;
					let isToCache;

					if (params !== undefined) {
						filter = params.filter;
						sort = params.sort;
						start = INTEGER(params.start);
						count = INTEGER(params.count);
						isFindAll = params.isFindAll;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					params = {
						filter : filter,
						sort : sort,
						start : start,
						count : count,
						isFindAll : isFindAll,
						isToCache : isToCache
					};
					
					NEXT([
					(next) => {
						
						let isNotRunNext;

						// run before find listeners.
						EACH(beforeFindListeners, (beforeFindListener) => {
							if (beforeFindListener(params, next, ret, clientInfo) === false) {
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					(next) => {
						return () => {
							
							// find data set in database.
							db.find(params, {
		
								error : (errorMsg) => {
									ret({
										errorMsg : errorMsg
									});
								},
		
								success : (savedDataSet) => {
							
									let isNotRunNext;
		
									// run after find listeners.
									EACH(afterFindListeners, (afterFindListener) => {
		
										if (afterFindListener(savedDataSet, () => {
											next(savedDataSet);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(savedDataSet);
									}
								}
							});
						};
					},
					
					() => {
						return (savedDataSet) => {

							ret({
								savedDataSet : savedDataSet
							});
						};
					}]);
				};

				let innerCount = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//OPTIONAL: params.clientInfo

					let filter;
					let isToCache;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					params = {
						filter : filter,
						isToCache : isToCache
					};
					
					NEXT([
					(next) => {
						
						let isNotRunNext;

						// run before count listeners.
						EACH(beforeCountListeners, (beforeCountListener) => {
							if (beforeCountListener(params, next, ret, clientInfo) === false) {
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					(next) => {
						return () => {
							
							// count data in database.
							db.count(params, {
		
								error : (errorMsg) => {
									ret({
										errorMsg : errorMsg
									});
								},
		
								success : (count) => {
									
									let isNotRunNext;
		
									// run after count listeners.
									EACH(afterCountListeners, (afterCountListener) => {
										
										if (afterCountListener(count, () => {
											next(count);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(count);
									}
								}
							});
						};
					},
					
					() => {
						return (count) => {

							ret({
								count : count
							});
						};
					}]);
				};

				let innerCheckIsExists = (params, ret, clientInfo) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//OPTIONAL: params.clientInfo

					let filter;
					let isToCache;

					if (params !== undefined) {
						filter = params.filter;
						isToCache = params.isToCache;
						
						if (clientInfo === undefined) {
							clientInfo = params.clientInfo;
						}
					}
					
					params = {
						filter : filter,
						isToCache : isToCache
					};
					
					NEXT([
					(next) => {
						
						let isNotRunNext;

						// run before check is exists listeners.
						EACH(beforeCheckIsExistsListeners, (beforeCheckIsExistsListener) => {
							if (beforeCheckIsExistsListener(params, next, ret, clientInfo) === false) {
								isNotRunNext = true;
							}
						});

						if (isNotRunNext !== true) {
							next();
						}
					},

					(next) => {
						return () => {
						
							// check is exists data in database.
							db.checkIsExists(params, {
		
								error : (errorMsg) => {
									ret({
										errorMsg : errorMsg
									});
								},
		
								success : (isExists) => {
									
									let isNotRunNext;
		
									// run after check is exists listeners.
									EACH(afterCheckIsExistsListeners, (afterCheckIsExistsListener) => {
		
										if (afterCheckIsExistsListener(isExists, () => {
											next(isExists);
										}, ret, clientInfo) === false) {
											
											isNotRunNext = true;
										}
									});
		
									if (isNotRunNext !== true) {
										next(isExists);
									}
								}
							});
						};
					},
					
					() => {
						return (isExists) => {

							ret({
								isExists : isExists
							});
						};
					}]);
				};

				let create = self.create = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers

					let callback;
					let notValidHandler;
					let errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCreate(data, (result) => {

						let errorMsg;
						let validErrors;
						let savedData;

						if (result !== undefined) {

							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;

							if (errorMsg !== undefined) {
								if (errorHandler !== undefined) {
									errorHandler(errorMsg);
								} else {
									SHOW_ERROR(box.boxName + '.' + name + 'Model.create', errorMsg);
								}
							} else if (validErrors !== undefined) {
								if (notValidHandler !== undefined) {
									notValidHandler(validErrors);
								} else {
									SHOW_WARNING(box.boxName + '.' + name + 'Model.create', '데이터가 유효하지 않습니다.', {
										data : data,
										validErrors : validErrors
									});
								}
							} else if (callback !== undefined) {
								callback(savedData);
							}

						} else if (callback !== undefined) {
							callback();
						}
					});
				};

				let get = self.get = (idOrParams, callbackOrHandlers) => {
					//OPTIONAL: idOrParams
					//OPTIONAL: idOrParams.id
					//OPTIONAL: idOrParams.filter
					//OPTIONAL: idOrParams.sort
					//OPTIONAL: idOrParams.isRandom
					//OPTIONAL: idOrParams.isToCache
					//OPTIONAL: idOrParams.clientInfo
					//REQUIRED: callbackOrHandlers

					let callback;
					let notExistsHandler;
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
						errorHandler = callbackOrHandlers.error;
					}

					innerGet(idOrParams, (result) => {

						let errorMsg;
						let savedData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							savedData = result.savedData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.get', errorMsg);
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.get', '데이터가 존재하지 않습니다.', idOrParams);
							}
						} else if (callback !== undefined) {
							callback(savedData);
						}
					});
				};

				let update = self.update = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers

					let callback;
					let notExistsHandler;
					let notValidHandler;
					let errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerUpdate(data, (result) => {

						let errorMsg;
						let validErrors;
						let savedData;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.update', errorMsg);
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '데이터가 유효하지 않습니다.', {
									data : data,
									validErrors : validErrors
								});
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '수정할 데이터가 존재하지 않습니다.', data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
					});
				};
				
				let updateNoHistory = self.updateNoHistory = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers

					let callback;
					let notExistsHandler;
					let notValidHandler;
					let errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerUpdate(data, (result) => {

						let errorMsg;
						let validErrors;
						let savedData;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.update', errorMsg);
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '데이터가 유효하지 않습니다.', {
									data : data,
									validErrors : validErrors
								});
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '수정할 데이터가 존재하지 않습니다.', data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
						
					}, undefined, true);
				};
				
				let updateNoRecord = self.updateNoRecord = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//REQUIRED: data.id
					//OPTIONAL: callbackOrHandlers

					let callback;
					let notExistsHandler;
					let notValidHandler;
					let errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							notValidHandler = callbackOrHandlers.notValid;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerUpdate(data, (result) => {

						let errorMsg;
						let validErrors;
						let savedData;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							validErrors = result.validErrors;
							savedData = result.savedData;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.update', errorMsg);
							}
						} else if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '데이터가 유효하지 않습니다.', {
									data : data,
									validErrors : validErrors
								});
							}
						} else if (savedData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.update', '수정할 데이터가 존재하지 않습니다.', data);
							}
						} else if (callback !== undefined) {
							callback(savedData, originData);
						}
						
					}, undefined, true, true);
				};
				
				let remove = self.remove = (id, callbackOrHandlers) => {
					//REQUIRED: id
					//OPTIONAL: callbackOrHandlers

					let callback;
					let notExistsHandler;
					let errorHandler;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							notExistsHandler = callbackOrHandlers.notExists;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerRemove(id, (result) => {

						let errorMsg;
						let originData;

						if (result !== undefined) {
							errorMsg = result.errorMsg;
							originData = result.originData;
						}

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.remove', errorMsg);
							}
						} else if (originData === undefined) {
							if (notExistsHandler !== undefined) {
								notExistsHandler();
							} else {
								SHOW_WARNING(box.boxName + '.' + name + 'Model.remove', '삭제할 데이터가 존재하지 않습니다.', id);
							}
						} else if (callback !== undefined) {
							callback(originData);
						}
					});
				};

				let find = self.find = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.sort
					//OPTIONAL: params.start
					//OPTIONAL: params.count
					//OPTIONAL: params.isFindAll
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers

					let callback;
					let errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerFind(params, (result) => {

						let errorMsg = result.errorMsg;
						let savedDataSet = result.savedDataSet;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.find', errorMsg);
							}
						} else {
							callback(savedDataSet);
						}
					});
				};

				let count = self.count = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers

					let callback;
					let errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCount(params, (result) => {

						let errorMsg = result.errorMsg;
						let count = result.count;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.count', errorMsg);
							}
						} else {
							callback(count);
						}
					});
				};

				let checkIsExists = self.checkIsExists = (params, callbackOrHandlers) => {
					//OPTIONAL: params
					//OPTIONAL: params.filter
					//OPTIONAL: params.isToCache
					//REQUIRED: callbackOrHandlers

					let callback;
					let errorHandler;

					// init params.
					if (callbackOrHandlers === undefined) {
						callbackOrHandlers = params;
						params = undefined;
					}

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							callback = callbackOrHandlers.success;
							errorHandler = callbackOrHandlers.error;
						}
					}

					innerCheckIsExists(params, (result) => {

						let errorMsg = result.errorMsg;
						let isExists = result.isExists;

						if (errorMsg !== undefined) {
							if (errorHandler !== undefined) {
								errorHandler(errorMsg);
							} else {
								SHOW_ERROR(box.boxName + '.' + name + 'Model.checkIsExists', errorMsg);
							}
						} else {
							callback(isExists);
						}
					});
				};

				// init room for create, get, find.
				box.ROOM(name, (clientInfo, on) => {

					// init create.
					if (createConfig !== false) {

						// on create.
						on('create', (data, ret) => {
							
							// ignore undefined data attack.
							if (data !== undefined) {

								if (createAdminRole !== undefined && clientInfo.roles !== undefined && CHECK_IS_IN({
									array : clientInfo.roles,
									value : createAdminRole
								}) === true) {

									innerCreate(data, ret, clientInfo);

								} else if (createRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
									array : clientInfo.roles,
									value : createRole
								}) === true)) {

									// inject auth key.
									if (createAuthKey !== undefined) {
										data[createAuthKey] = clientInfo.authKey;
									}

									innerCreate(data, ret, clientInfo);

								} else {

									ret({
										isNotAuthed : true
									});
								}
							}
						});
					}

					// init get.
					if (getConfig !== false) {

						// on get.
						on('get', (idOrParams, ret) => {
						
							if (getRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array : clientInfo.roles,
								value : getRole
							}) === true)) {
								
								if (idOrParams !== undefined && CHECK_IS_DATA(idOrParams) === true) {

									// delete for server params.
									delete idOrParams.isToCache;
								}

								innerGet(idOrParams, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init update.
					if (updateConfig !== false) {

						// on update.
						on('update', (data, ret) => {
							
							// ignore undefined data attack.
							if (data !== undefined) {

								if (updateRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									array : clientInfo.roles,
									value : updateRole
								}) === true || CHECK_IS_IN({
									array : clientInfo.roles,
									value : updateAdminRole
								}) === true))) {
	
									// check and inject auth key. (when not admin)
									if (updateAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array : clientInfo.roles,
										value : updateAdminRole
									}) === true) !== true) {
	
										// get data in database.
										db.get(data.id, {
	
											error : (errorMsg) => {
												ret({
													errorMsg : errorMsg
												});
											},
	
											notExists : () => {
												ret({});
											},
	
											success : (savedData) => {
												
												// check auth key.
												if (savedData[updateAuthKey] === clientInfo.authKey) {
	
													// do not change auth key.
													data[updateAuthKey] = clientInfo.authKey;
	
													innerUpdate(data, ret, clientInfo);
												}
	
												// not authed
												else {
													ret({
														isNotAuthed : true
													});
												}
											}
										});
	
									} else {
										innerUpdate(data, ret, clientInfo);
									}
	
								} else {
	
									ret({
										isNotAuthed : true
									});
								}
							}
						});
					}

					// init remove.
					if (removeConfig !== false) {

						// on remove.
						on('remove', (id, ret) => {
							
							// ignore undefined data attack.
							if (id !== undefined) {

								if (removeRole === undefined || (clientInfo.roles !== undefined && (CHECK_IS_IN({
									array : clientInfo.roles,
									value : removeRole
								}) === true || CHECK_IS_IN({
									array : clientInfo.roles,
									value : removeAdminRole
								}) === true))) {
	
									// check auth key. (when not admin)
									if (removeAuthKey !== undefined && (clientInfo.roles !== undefined && CHECK_IS_IN({
										array : clientInfo.roles,
										value : removeAdminRole
									}) === true) !== true) {
	
										// get data in database.
										db.get(id, {
	
											error : (errorMsg) => {
												ret({
													errorMsg : errorMsg
												});
											},
	
											notExists : () => {
												ret({});
											},
	
											success : (savedData) => {
	
												// check auth key.
												if (savedData[removeAuthKey] === clientInfo.authKey) {
													innerRemove(id, ret, clientInfo);
												}
	
												// not authed
												else {
													ret({
														isNotAuthed : true
													});
												}
											}
										});
	
									} else if (removeAuthKey === undefined && removeAdminRole !== undefined) {
	
										if (clientInfo.roles !== undefined && CHECK_IS_IN({
											array : clientInfo.roles,
											value : removeAdminRole
										}) === true) {
	
											innerRemove(id, ret, clientInfo);
	
										} else {
	
											ret({
												isNotAuthed : true
											});
										}
	
									} else {
										innerRemove(id, ret, clientInfo);
									}
	
								} else {
	
									ret({
										isNotAuthed : true
									});
								}
							}
						});
					}

					// init find.
					if (findConfig !== false) {

						// on find.
						on('find', (params, ret) => {

							if (findRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array : clientInfo.roles,
								value : findRole
							}) === true)) {

								if (params !== undefined) {

									// delete for server params.
									delete params.isFindAll;
									delete params.isToCache;
								}

								innerFind(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init count.
					if (countConfig !== false) {

						// on count.
						on('count', (params, ret) => {

							if (countRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array : clientInfo.roles,
								value : countRole
							}) === true)) {
								
								if (params !== undefined) {

									// delete for server params.
									delete params.isToCache;
								}

								innerCount(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}

					// init check is exists.
					if (checkIsExistsConfig !== false) {

						// on check is exists.
						on('checkIsExists', (params, ret) => {
							
							if (checkIsExistsRole === undefined || (clientInfo.roles !== undefined && CHECK_IS_IN({
								array : clientInfo.roles,
								value : checkIsExistsRole
							}) === true)) {
								
								if (params !== undefined) {

									// delete for server params.
									delete params.isToCache;
								}

								innerCheckIsExists(params, ret, clientInfo);

							} else {

								ret({
									isNotAuthed : true
								});
							}
						});
					}
				});
			}
		});
	});
});
