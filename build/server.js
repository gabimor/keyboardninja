module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "21fc193d32804f0b3d9f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, default */
/***/ (function(module) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"}};

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/client/DataContext.js":
/*!***********************************!*\
  !*** ./src/client/DataContext.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // eslint-disable-line no-unused-vars

var DataContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
/* harmony default export */ __webpack_exports__["default"] = (DataContext);

/***/ }),

/***/ "./src/client/Layout.js":
/*!******************************!*\
  !*** ./src/client/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/Home */ "./src/client/pages/Home.js");
/* harmony import */ var _pages_App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/App */ "./src/client/pages/App.js");
/* harmony import */ var _pages_Login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/Login */ "./src/client/pages/Login.js");
/* harmony import */ var _pages_layout_Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/layout/Header */ "./src/client/pages/layout/Header.js");
/* harmony import */ var _pages_layout_Footer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/layout/Footer */ "./src/client/pages/layout/Footer.js");
/* harmony import */ var _pages_Signup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/Signup */ "./src/client/pages/Signup.js");
/* harmony import */ var _pages_ContactUs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/ContactUs */ "./src/client/pages/ContactUs.js");
/* harmony import */ var _pages_404__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/404 */ "./src/client/pages/404.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/Layout.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 30px;\n\n  @media (max-width: 992px) {\n    padding: 20px;\n  }\n\n  @media (max-width: 768px) {\n    padding: 10px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars












var Layout = function Layout() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_pages_layout_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/",
    component: _pages_Home__WEBPACK_IMPORTED_MODULE_4__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/login",
    component: _pages_Login__WEBPACK_IMPORTED_MODULE_6__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/signup",
    component: _pages_Signup__WEBPACK_IMPORTED_MODULE_9__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    exact: true,
    path: "/contact",
    component: _pages_ContactUs__WEBPACK_IMPORTED_MODULE_10__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/404",
    component: _pages_404__WEBPACK_IMPORTED_MODULE_11__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    path: "/:name",
    component: _pages_App__WEBPACK_IMPORTED_MODULE_5__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], {
    component: _pages_404__WEBPACK_IMPORTED_MODULE_11__["default"],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_pages_layout_Footer__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  })));
};

var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject());
/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/client/components/Button.js":
/*!*****************************************!*\
  !*** ./src/client/components/Button.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/components/Button.js";

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ", "\n  background:transparent;\n  color: #a4a3a6;\n  border: 1px solid #a4a3a6;\n\n  &:hover {\n    background: #9d8b8b;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ", "\n\n  background-color: #D1403D;\n  color: #ffffff;\n  border: 1px solid #d1403d;\n\n  &:hover {\n    background-color: #e86562;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



function Button(_ref) {
  var children = _ref.children,
      secondary = _ref.secondary,
      style = _ref.style,
      onClick = _ref.onClick;
  return secondary ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SecondaryButton, {
    style: style,
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, children) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PrimaryButton, {
    style: style,
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, children);
}
Button.propTypes = {
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
var style = "\n  display: inline-block;\n  cursor:pointer;\n  color: #E9E5E5;\n  padding: 8px 15px;\n  border-radius: 4px;\n  line-height: 100%;\n";
var PrimaryButton = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.button(_templateObject(), style);
var SecondaryButton = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.button(_templateObject2(), style);

/***/ }),

/***/ "./src/client/components/Input.js":
/*!****************************************!*\
  !*** ./src/client/components/Input.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_1__);


function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 6px;\n  border: solid 1px #423737;\n  color: #e9e5e5;\n  background: #261d1d;\n  border-radius: 5px;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}


var Input = _emotion_styled__WEBPACK_IMPORTED_MODULE_1___default.a.input(_templateObject());
/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/client/helpers/api.js":
/*!***********************************!*\
  !*** ./src/client/helpers/api.js ***!
  \***********************************/
/*! exports provided: signup, contactUs, login, getOS, logout, pin, getLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signup", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactUs", function() { return contactUs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOS", function() { return getOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pin", function() { return pin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
var headers = {
  // credentials: "include",
  Accept: "application/json",
  Cache: "no-cache",
  "Content-Type": "application/json"
};
function signup(email, password) {
  return fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: headers
  }).then(function (res) {
    return res.json();
  });
}
function contactUs(name, email, message) {
  return fetch("/api/contactus", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    }),
    headers: headers
  });
}
function login(email, password) {
  return fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: headers
  }).then(function (res) {
    return res.json();
  });
}
function getOS(appId, os) {
  return fetch("/api/apps/".concat(appId, "?os=").concat(os)).then(function (res) {
    return res.json();
  });
}
function logout() {
  return fetch("/api/logout", {
    method: "POST",
    headers: headers
  });
}
function pin(appId, shortcutId, isPinned) {
  return fetch("/api/pin", {
    method: "PATCH",
    body: JSON.stringify({
      appId: appId,
      shortcutId: shortcutId,
      isPinned: isPinned
    }),
    headers: headers
  });
}
function getLink(appId, shortcutIds) {
  return fetch("/api/getlink", {
    method: "POST",
    body: JSON.stringify({
      appId: appId,
      shortcutIds: shortcutIds
    }),
    headers: headers,
    credentials: "include"
  });
}

/***/ }),

/***/ "./src/client/helpers/index.js":
/*!*************************************!*\
  !*** ./src/client/helpers/index.js ***!
  \*************************************/
/*! exports provided: encodeAppName, upperFirstLetter, copyToClipboard, lightenDarkenColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeAppName", function() { return encodeAppName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upperFirstLetter", function() { return upperFirstLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyToClipboard", function() { return copyToClipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightenDarkenColor", function() { return lightenDarkenColor; });
function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-");
}
function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function copyToClipboard(text) {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute("value", text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
function lightenDarkenColor(color, amount) {
  var usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  var num = parseInt(color, 16);
  var r = (num >> 16) + amount;
  if (r > 255) r = 255;else if (r < 0) r = 0;
  var b = (num >> 8 & 0x00ff) + amount;
  if (b > 255) b = 255;else if (b < 0) b = 0;
  var g = (num & 0x0000ff) + amount;
  if (g > 255) g = 255;else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
}

/***/ }),

/***/ "./src/client/helpers/osSelect.js":
/*!****************************************!*\
  !*** ./src/client/helpers/osSelect.js ***!
  \****************************************/
/*! exports provided: init, getSelectedOS, setSelectedOS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedOS", function() { return getSelectedOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedOS", function() { return setSelectedOS; });
function init() {
  if (!document.cookie.includes("os=")) {
    setSelectedOS(getClientOS());
  }
}
function getSelectedOS() {
  var selectedOS = getCookie("os");

  if (!selectedOS) {
    selectedOS = getClientOS();
  }

  return selectedOS;
}
function setSelectedOS(os) {
  document.cookie = "os=" + os + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function getClientOS() {
  var isWin = navigator.platform.toLowerCase().includes("win");
  return isWin ? "win" : "mac";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

/***/ }),

/***/ "./src/client/pages/404.js":
/*!*********************************!*\
  !*** ./src/client/pages/404.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/404.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #fa9290;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin-bottom: 10px;\n  font-size: 18px;\n  color: #e9e5e5;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 40px;\n  color: #e86562;\n  margin: 100px 0 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



var Page404 = function Page404() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Header, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Code, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, "404 "), "Oops..."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Message, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "There's no one here")));
};

/* harmony default export */ __webpack_exports__["default"] = (Page404);
var Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h1(_templateObject());
var Message = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2());
var Code = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject3());
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject4());

/***/ }),

/***/ "./src/client/pages/App.js":
/*!*********************************!*\
  !*** ./src/client/pages/App.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_FirstTimeMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/FirstTimeMessage */ "./src/client/pages/app/FirstTimeMessage.js");
/* harmony import */ var _app_ShortcutList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app/ShortcutList */ "./src/client/pages/app/ShortcutList.js");
/* harmony import */ var _app_Controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app/Controls */ "./src/client/pages/app/Controls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _helpers_osSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/osSelect */ "./src/client/helpers/osSelect.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/App.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  columns: 2;\n  column-gap: 30px;  \n\n  @media (max-width: 1122px) {\n    columns: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars









var App = function App() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      app = _useContext.app,
      os = _useContext.os;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      messageVisible = _useState2[0],
      setMessageVisible = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    setMessageVisible(!document.cookie);
    _helpers_osSelect__WEBPACK_IMPORTED_MODULE_9__["init"]();
  }, []);
  var encodedName = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["encodeAppName"])(app.name);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_Controls__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: encodedName + ".png",
    name: app.name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), messageVisible && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_FirstTimeMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onDismiss: function onDismiss() {
      return setMessageVisible(false);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ResultsContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, app.sections.map(function (section) {
    var shortcuts = app.shortcuts.filter(function (e) {
      return e.sectionId.toString() === section._id.toString() && e[os];
    });
    if (shortcuts.length === 0) return undefined;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_ShortcutList__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: section._id,
      shortcuts: shortcuts,
      title: section.name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (App);
var ResultsContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());

/***/ }),

/***/ "./src/client/pages/ContactUs.js":
/*!***************************************!*\
  !*** ./src/client/pages/ContactUs.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _contactUs_ContactForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contactUs/ContactForm */ "./src/client/pages/contactUs/ContactForm.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/ContactUs.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-weight: bold;\n  padding-bottom: 15px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 100px;\n  text-align: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Header, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, "Calling all shortcuts geeks"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Subtitle, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Join the effort do document every shortcut out there!"), "Missing your favorite app ? your favorite shortcut ? noticed a mistake ? here's how you can help: 1.", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_contactUs_ContactForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })));
});
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject());
var Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h1(_templateObject2());
var Subtitle = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h2(_templateObject3());

/***/ }),

/***/ "./src/client/pages/Home.js":
/*!**********************************!*\
  !*** ./src/client/pages/Home.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_AppList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/AppList */ "./src/client/pages/app/AppList.js");
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DataContext */ "./src/client/DataContext.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/Home.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #ffffff;\n  font-size: 50px;\n  margin-top: 150px;\n  margin-bottom: 190px;\n  text-align: center;\n  font-weight: 300;\n  line-height: 1.5em;\n\n  & b {\n    font-weight: 500;\n  }\n\n  @media (max-width: 992px) {\n    margin-top: 75px;\n    margin-bottom: 110px;\n    font-size: 40px;\n  }\n\n  @media (max-width: 768px) {\n    margin-top: 50px;\n    margin-bottom: 70px;\n    font-size: 30px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: grid;\n  grid-gap: 60px;\n  grid-template-areas:\n    \"os browsers browsers\"\n    \"coding coding coding\"\n    \"casual casual casual\"\n    \"graphics graphics graphics\"\n    \"office office office\";\n\n  @media (max-width: 992px) {\n    grid-template-areas:\n      \"os\"\n      \"browsers\"\n      \"coding\"\n      \"casual\"\n      \"graphics\"\n      \"office\";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  max-width: 1024px;\n  margin: 0 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars





var Home = function Home() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      appCategories = _useContext.appCategories;

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Hero, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, "Every app, every shortcut, ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, "the best ones first.")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(GridContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, appCategories.map(function (appCategory) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_app_AppList__WEBPACK_IMPORTED_MODULE_4__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      key: appCategory.gridArea
    }, appCategory, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    }));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject());
var GridContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject2());
var Hero = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.h1(_templateObject3());

/***/ }),

/***/ "./src/client/pages/Login.js":
/*!***********************************!*\
  !*** ./src/client/pages/Login.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/api */ "./src/client/helpers/api.js");
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _login_LoginForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/LoginForm */ "./src/client/pages/login/LoginForm.js");



var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/Login.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 300px;\n  margin: 100px auto 0 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars






var Login = function Login() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      doLogin = _useContext.doLogin;

  function handleSubmit(_x, _x2) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(email, password) {
      var userJson;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_5__["login"])(email, password);

            case 2:
              userJson = _context.sent;
              doLogin(userJson);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_login_LoginForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Login);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());

/***/ }),

/***/ "./src/client/pages/Signup.js":
/*!************************************!*\
  !*** ./src/client/pages/Signup.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../helpers/api */ "./src/client/helpers/api.js");
/* harmony import */ var _signup_SignupForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./signup/SignupForm */ "./src/client/pages/signup/SignupForm.js");



var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/Signup.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 300px;\n  margin: 100px auto 0 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars






var Signup = function Signup() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      doLogin = _useContext.doLogin;

  function handleSubmit(_x, _x2) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(email, password) {
      var userJson;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_6__["signup"])(email, password);

            case 2:
              userJson = _context.sent;
              doLogin(userJson);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_signup_SignupForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Signup);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.div(_templateObject());

/***/ }),

/***/ "./src/client/pages/app/AppItem.js":
/*!*****************************************!*\
  !*** ./src/client/pages/app/AppItem.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/AppItem.js";

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 60%;\n  margin-bottom: 5px;\n  opacity: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: center;\n  font-size: 14px;\n  opacity: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ", "\n  cursor: pointer;\n\n  :hover {\n    color: #e9e5e5;\n    background: ", ";\n    transform: scale(1.04);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #d1403d;\n  color: #cccad2;\n  position: absolute;\n  top: 10px;\n  left: -20px;\n  transform: rotate(-45deg);\n  font-size: 13px;\n  width: 80px;\n  text-align: center;\n  z-index: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ", "\n  position: relative;\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



function App(_ref) {
  var name = _ref.name,
      icon = _ref.icon,
      disabled = _ref.disabled;
  var Container = disabled ? DisabledContainer : EnabledContainer;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, disabled && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Soon, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Soon"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Image, {
    src: icon,
    disabled: disabled,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Name, {
    disabled: disabled,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, name));
}
var sharedStyles = "\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: var(--appItemSize);  \n  padding: 10px;\n  \n  background-color: #403434;\n  color: #d1b4b4;\n  transition: all 0.5s;\n\n  @media (min-width: 992px) {\n    width: var(--appItemSize);\n  }\n\n  @media (max-width: 768px) {\n      font-size:12px;        \n  }\n\n";
var DisabledContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject(), sharedStyles);
var Soon = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2());
var EnabledContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject3(), sharedStyles, Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["lightenDarkenColor"])("#4F4242", 10));
var Name = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject4(), [function (props) {
  return props.disabled ? 0.3 : 1;
}]);
var Image = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.img(_templateObject5(), [function (props) {
  return props.disabled ? 0.3 : 1;
}]);

/***/ }),

/***/ "./src/client/pages/app/AppList.js":
/*!*****************************************!*\
  !*** ./src/client/pages/app/AppList.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppList; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _AppItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppItem */ "./src/client/pages/app/AppItem.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/AppList.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #e9e5e5;\n  font-weight: 400;\n  font-size: 16px;\n  margin-bottom: 15px;\n  margin-left: 5px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-gap: 10px;\n  --appItemSize: 132px;\n\n  @media (max-width: 1124px) {\n    --appItemSize: 122px;\n  }\n\n  @media (max-width: 1024px) {\n    grid-template-columns: repeat(6, 1fr);\n    --appItemSize: 136px;\n  }\n\n  @media (max-width: 992px) {\n    --appItemSize: 145px;\n  }\n\n  @media (max-width: 880px) {\n    grid-template-columns: repeat(5, 1fr);\n    --appItemSize: 150px;\n  }\n\n  @media (max-width: 768px) {\n    --appItemSize: 137px;\n  }\n\n  @media (max-width: 650px) {\n    --appItemSize: 120px;\n  }\n\n  @media (max-width: 550px) {\n    grid-template-columns: repeat(4, 1fr);\n    --appItemSize: 110px;\n  }\n\n  @media (max-width: 414px) {\n    grid-template-columns: repeat(3, 1fr);\n    --appItemSize: 119px;\n  }\n\n  @media (max-width: 375px) {\n    --appItemSize: 106px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #2c2525;\n  grid-area: ", ";\n  padding: 20px;\n\n  @media (max-width: 992px) {\n    padding: 15px 10px;\n  }\n\n  @media (max-width: 767px) {\n    padding: 10px 6px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars




function AppList(_ref) {
  var name = _ref.name,
      apps = _ref.apps,
      gridArea = _ref.gridArea;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    gridArea: gridArea,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Header, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(InnerContainer, {
    className: gridArea,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, apps.map(function (app) {
    var encodedName = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["encodeAppName"])(app.name);

    var CurrItem = function CurrItem() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AppItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
        icon: "/logos/" + encodedName + ".png",
        name: app.name,
        disabled: app.disabled,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      });
    };

    return app.disabled ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CurrItem, {
      key: app.name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "/" + encodedName,
      key: app.name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CurrItem, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      }
    }));
  })));
}
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject(), function (props) {
  return props.gridArea;
});
var InnerContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2());
var Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h2(_templateObject3());

/***/ }),

/***/ "./src/client/pages/app/Controls.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/Controls.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _OSSelect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OSSelect */ "./src/client/pages/app/OSSelect.js");
/* harmony import */ var _GetLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GetLink */ "./src/client/pages/app/GetLink.js");
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../helpers/api */ "./src/client/helpers/api.js");




var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/Controls.js";

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  position: relative;\n  margin-right: 20px;\n  margin-left: auto;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 40px;\n  margin-left: 20px;\n  font-weight: 200;\n  line-height: normal;\n\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    font-size: 25px;\n  }\n\n  @media (max-width: 768px) {\n    font-size: 12px;\n    margin-left: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  width: 50px;\n  height: 50px;\n  transition: all 0.5s;\n\n  @media (max-width: 992px) {\n    width: 35px;\n    height: 35px;\n  }\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n    margin-bottom: 4px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  flex-direction: row;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: center;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: center;\n  padding: 10px;\n  margin: 60px 0 40px 0;\n  border-bottom: solid 1px #5a5a5a;\n  position: sticky;\n  top: 0;\n  background: linear-gradient(#3c1b1b, #371616) no-repeat;\n\n  @media (max-width: 768px) {\n    margin: 30px 0 20px 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  height: 39px;\n  border-left: solid 1px #5a5a5a;\n  margin: 0 20px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars








var Controls = function Controls(_ref) {
  var icon = _ref.icon,
      name = _ref.name;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      app = _useContext.app,
      os = _useContext.os,
      doSetOs = _useContext.doSetOs;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      publicLink = _useState2[0],
      setPublicLink = _useState2[1];

  function handleGetLink() {
    return _handleGetLink.apply(this, arguments);
  }

  function _handleGetLink() {
    _handleGetLink = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var shortcutIds, link;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              shortcutIds = app.shortcuts.filter(function (e) {
                return e.isPinned;
              }).map(function (e) {
                return e._id;
              });
              _context.next = 3;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_10__["getLink"])(app._id, shortcutIds).then(function (data) {
                return data.text();
              });

            case 3:
              link = _context.sent;
              setPublicLink(link);
              Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["copyToClipboard"])(link);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleGetLink.apply(this, arguments);
  }

  function handleGetLinkClose() {
    setPublicLink();
  }

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(NameWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Icon, {
    src: "/logos/" + icon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Name, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, name)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SearchWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_OSSelect__WEBPACK_IMPORTED_MODULE_8__["default"], {
    onSelect: doSetOs,
    os: os,
    oss: app.oss,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Seperator, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_GetLink__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onGetLink: handleGetLink,
    onClose: handleGetLinkClose,
    link: publicLink,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Controls);
var Seperator = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject());
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject2());
var NameWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject3());
var Icon = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.img(_templateObject4());
var Name = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.h1(_templateObject5());
var SearchWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject6());

/***/ }),

/***/ "./src/client/pages/app/FirstTimeMessage.js":
/*!**************************************************!*\
  !*** ./src/client/pages/app/FirstTimeMessage.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/FirstTimeMessage.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #ffe6ab;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 5px;\n  font-size: 22px;\n  font-weight: 200;\n  color: #e9e5e5;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin: 0.5em 0;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #742f2d;\n  padding: 20px;\n  line-height: 1.5em;\n  border-radius: 5px;\n  margin-bottom: 20px;\n  width: calc(50% - 15px);\n  position: relative;\n  font-weight: 300;\n\n  @media (max-width: 1122px) {\n    width: 100%;\n  }\n\n  @media (min-width: 768px) {\n    margin-top: -20px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



var FirstTimeMessage = function FirstTimeMessage(_ref) {
  var onDismiss = _ref.onDismiss;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, "Welcome!"), " Here's a few things to try here: ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TextWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, "- Browse and ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Highlight, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "pin"), " your favorite shortcuts"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, "- Hit ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Highlight, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, "Get Link"), " and share your selection with friends"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Dismiss, {
    onClick: onDismiss,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, "\xD7"));
};

/* harmony default export */ __webpack_exports__["default"] = (FirstTimeMessage);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject());
var TextWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject2());
var Dismiss = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject3());
var Highlight = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject4());

/***/ }),

/***/ "./src/client/pages/app/GetLink.js":
/*!*****************************************!*\
  !*** ./src/client/pages/app/GetLink.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");
/* harmony import */ var _GetLinkPopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GetLinkPopup */ "./src/client/pages/app/GetLinkPopup.js");
var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/GetLink.js";
 // eslint-disable-line no-unused-vars




var GetLink = function GetLink(_ref) {
  var link = _ref.link,
      onGetLink = _ref.onGetLink,
      onClose = _ref.onClose;
  var popupElm = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  function handleClickAway(e) {
    if (popupElm.current && !popupElm.current.contains(e.target)) onClose();
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.addEventListener("mousedown", handleClickAway);
    return function () {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onClick: onGetLink,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), "\xA0 Get Link"), link && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GetLinkPopup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    link: link,
    ref: popupElm,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (GetLink);

/***/ }),

/***/ "./src/client/pages/app/GetLinkPopup.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/GetLinkPopup.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/GetLinkPopup.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-weight: 300;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin: 20px 0 10px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 6px;\n  border: solid 1px #423737;\n  color: #ffe6ab;\n  background: #261d1d;\n  border-radius: 5px;\n  font-size: 12px;\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #2e2424;\n  max-width: 300px;\n  padding: 20px;\n  position: relative;\n  border-radius: 5px;\n  box-shadow: 0px 7px 23px 10px rgba(0, 0, 0, 0.4);\n\n  position: absolute;\n  right: 0;\n  top: 64px;\n\n  :after {\n    left: 80%;\n    margin-left: -4px;\n    top: -10px;\n    border-bottom: 10px solid #2e2424;\n    display: block;\n    position: absolute;\n    right: 20px;\n    vertical-align: middle;\n    content: \"\";\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-style: none double solid;\n    width: 0;\n    height: 0;\n  }\n  small {\n    color: #9d8b8b;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars


var GetLinkPopup = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    ref: ref,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, "Done! "), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Text, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, "Your selected shortcuts are saved with this link. You can share it with friends or save it for future reference."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(InputWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input, {
    type: "text",
    value: props.link,
    onFocus: function onFocus(event) {
      return event.target.select();
    },
    readOnly: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, "Link copied to clipboard")));
});
/* harmony default export */ __webpack_exports__["default"] = (GetLinkPopup);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject());
var Input = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.input(_templateObject2());
var InputWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject3());
var Text = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject4()); // const Seperator = styled.hr`
//   border: 0;
//   border-top: 1px solid #453a3a;
// `

/***/ }),

/***/ "./src/client/pages/app/OSSelect.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/OSSelect.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/OSSelect.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 30px;\n  i + i {\n    margin-left: 20px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars



function OSSelect(_ref) {
  var oss = _ref.oss,
      os = _ref.os,
      onSelect = _ref.onSelect;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(OSButton, {
    buttonOS: "win",
    selectedOS: os,
    supportedOSS: oss,
    onClick: onSelect,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(OSButton, {
    buttonOS: "mac",
    selectedOS: os,
    supportedOSS: oss,
    onClick: onSelect,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }));
}

var OSButton = function OSButton(_ref2) {
  var buttonOS = _ref2.buttonOS,
      selectedOS = _ref2.selectedOS,
      supportedOSS = _ref2.supportedOSS,
      _onClick = _ref2.onClick;
  var SELECTED_COLOR = "#E9E5E5";
  var UNSELECTED_COLOR = "#5A5A5A";
  var iconName = buttonOS === "mac" ? "apple" : "windows";
  return supportedOSS.includes(buttonOS) && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fab fa-" + iconName,
    style: {
      color: selectedOS === buttonOS ? SELECTED_COLOR : UNSELECTED_COLOR,
      cursor: selectedOS === buttonOS ? "default" : "pointer"
    },
    onClick: function onClick() {
      return selectedOS === buttonOS ? undefined : _onClick(buttonOS);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (OSSelect);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject());

/***/ }),

/***/ "./src/client/pages/app/Pin.js":
/*!*************************************!*\
  !*** ./src/client/pages/app/Pin.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shortcut; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/Pin.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 11px;\n  color: ", ";\n  margin: 0 auto;\n  padding: 0 6px;\n  line-height: 10px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  line-height: 11px;\n  margin-left: 7px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-flex;\n  width: 100%;\n  align-items: flex-start;\n  border: solid 1px ", ";\n  border-radius: 3px;\n  padding: 5px 0 3px;\n  cursor: pointer;\n  vertical-align: middle;\n  user-select: none;\n\n  img {\n    height: 12px;\n  }\n\n  :hover {\n    border-color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars




function Shortcut(_ref) {
  var pins = _ref.pins,
      isPinned = _ref.isPinned,
      onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    isPinned: isPinned,
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(IconWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, isPinned ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/pin-on.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/pin-off.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Count, {
    isPinned: isPinned,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, pins));
}
Shortcut.propTypes = {
  pins: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  isPinned: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
};
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject(), function (_ref2) {
  var isPinned = _ref2.isPinned;
  return isPinned ? "#ffe6ab" : "#9D8B8B";
}, function (_ref3) {
  var isPinned = _ref3.isPinned;
  return isPinned ? Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["lightenDarkenColor"])("#ffe6ab", 50) : Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["lightenDarkenColor"])("#9D8B8B", 50);
});
var IconWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject2());
var Count = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.span(_templateObject3(), function (_ref4) {
  var isPinned = _ref4.isPinned;
  return isPinned ? "#ffe6ab" : "#E9E5E5";
});

/***/ }),

/***/ "./src/client/pages/app/Shortcut.js":
/*!******************************************!*\
  !*** ./src/client/pages/app/Shortcut.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shortcut; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/Shortcut.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: ", ";\n  flex-wrap: wrap;\n  font-size: 14px;\n  color: #e9e5e5;\n\n  kbd {\n    font-size: 14px;\n  }\n\n  .kbn-or {\n    padding: 1px 10px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-style: italic;\n  margin: 0 3px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin: 0 3px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars





function split(keysArr, seperator) {
  var newArr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keysArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item1 = _step.value;
      var item1Split = item1.split(seperator);

      for (var i = 0; i < item1Split.length; i++) {
        newArr.push(item1Split[i].trim()); // dont add seperator after last element

        if (i !== item1Split.length - 1) {
          newArr.push(seperator);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newArr;
}

function Shortcut(_ref) {
  var keys = _ref.keys,
      isHtml = _ref.isHtml;
  if (isHtml) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    dangerouslySetInnerHTML: {
      __html: prepareHtml(keys)
    },
    isHtml: isHtml,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  });
  var keysArr = split([keys], " or ");
  return keysArr.map(function (e, index) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ShortcutOption, {
      keys: e,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    }), " ");
  });
}

function prepareHtml(html) {
  var isEnding = false;

  while (html.includes("**")) {
    html = html.replace("**", isEnding ? "</kbd>" : "<kbd>");
    isEnding = !isEnding;
  }

  return Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["upperFirstLetter"])(html);
}

function ShortcutOption(_ref2) {
  var keys = _ref2.keys;
  var keysArr = split([keys], "+");
  keysArr = split(keysArr, "|");
  keysArr = split(keysArr, "..");
  keysArr = split(keysArr, " ");
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }, keysArr.map(function (key, index) {
    var numpad;

    if (key.includes("numpad")) {
      key = key.replace("numpad", "");
      numpad = " Numpad ";
    }

    var toRender;
    key = key.toLowerCase();

    switch (key) {
      case "arrows":
      case "+":
      case "..":
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Spacer, {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          }
        }, key);

      case " ":
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Then, {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          }
        }, "then");

      case "or":
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          key: index,
          className: "kbn-or",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          }
        }, "or");

      case "plus":
        toRender = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("kbd", {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }, "+");
        break;

      case "|":
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Spacer, {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 88
          }
        }, "/");

      case "up":
      case "down":
      case "left":
      case "right":
        toRender = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("kbd", {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
          className: "fas fa-long-arrow-alt-".concat(key),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        }));
        break;

      default:
        toRender = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("kbd", {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          }
        }, Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["upperFirstLetter"])(key));
        break;
    }

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      }
    }, numpad && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Spacer, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      }
    }, "numpad"), toRender);
  }));
}

Shortcut.propTypes = {
  keys: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
var Spacer = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject());
var Then = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject2());
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject3(), function (props) {
  return props.isHtml ? "block" : "inline-flex";
});

/***/ }),

/***/ "./src/client/pages/app/ShortcutItem.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/ShortcutItem.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../helpers/api */ "./src/client/helpers/api.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");
/* harmony import */ var _Shortcut__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Shortcut */ "./src/client/pages/app/Shortcut.js");
/* harmony import */ var _Pin__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Pin */ "./src/client/pages/app/Pin.js");




var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/ShortcutItem.js";

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  padding: 0 13px 0 0;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  // width: 1%;\n  text-align: center;\n  padding: 0 13px 0 15px;\n  user-select: none;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: ", ";\n  user-select: none;  \n  padding-right:20px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-top: 3px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 13px;\n  color: #a4a3a6;\n  margin-left: 10px;\n  cursor: pointer;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars









function ShortcutItem(_ref) {
  var id = _ref.id,
      action = _ref.action,
      keys = _ref.keys,
      pins = _ref.pins,
      isPinned = _ref.isPinned,
      isHtml = _ref.isHtml,
      note = _ref.note;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      app = _useContext.app,
      doPin = _useContext.doPin;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(pins),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState, 2),
      pinsState = _useState2[0],
      setPinsState = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState3, 2),
      infoVisible = _useState4[0],
      setInfoVisible = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(isPinned),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_useState5, 2),
      isPinnedState = _useState6[0],
      setIsPinnedState = _useState6[1];

  function handlePin() {
    return _handlePin.apply(this, arguments);
  }

  function _handlePin() {
    _handlePin = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
      var newPins, newIsPinned;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newPins = isPinnedState ? pins : pins + 1;
              newIsPinned = !isPinnedState;
              setPinsState(newPins);
              setIsPinnedState(newIsPinned);
              doPin(id, newPins, newIsPinned);
              _context.next = 7;
              return Object(_helpers_api__WEBPACK_IMPORTED_MODULE_8__["pin"])(app._id, id, newIsPinned);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handlePin.apply(this, arguments);
  }

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(PinContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Pin__WEBPACK_IMPORTED_MODULE_11__["default"], {
    isPinned: isPinnedState,
    pins: pinsState,
    onClick: handlePin,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(ActionContainer, {
    isPinned: isPinnedState,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["upperFirstLetter"])(action), note && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(InfoIcon, {
    className: "fas fa-info",
    onClick: function onClick() {
      return setInfoVisible(!infoVisible);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }), infoVisible && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(InfoContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }, note)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(KeysContainer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Shortcut__WEBPACK_IMPORTED_MODULE_10__["default"], {
    keys: keys,
    isHtml: isHtml,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  })));
}

ShortcutItem.propTypes = {
  action: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,
  keys: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ShortcutItem);
var InfoIcon = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.i(_templateObject());
var InfoContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject2());
var ActionContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject3(), function (props) {
  return props.isPinned ? "#ffe6ab" : "inherit";
});
var PinContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject4());
var KeysContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_5___default.a.div(_templateObject5());

/***/ }),

/***/ "./src/client/pages/app/ShortcutList.js":
/*!**********************************************!*\
  !*** ./src/client/pages/app/ShortcutList.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShortcutList; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ShortcutItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShortcutItem */ "./src/client/pages/app/ShortcutItem.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers */ "./src/client/helpers/index.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/app/ShortcutList.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: grid;\n  grid-gap: 8px 0;\n  grid-template-columns: 80px 1fr 1fr;\n  padding: 8px 0;\n  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);\n  background: #2e2424;\n  font-weight: 300;\n\n  > div {\n    border-bottom: solid 1px #453a3a;\n    padding-bottom:8px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #e9e5e5;\n  background: #a12d2a;\n  padding: 5px 10px 7px 15px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-block;\n  margin-bottom: 40px;\n  font-size: 14px;\n  border-radius: 5px;\n  overflow: hidden;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars





function ShortcutList(_ref) {
  var title = _ref.title,
      shortcuts = _ref.shortcuts;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_DataContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      os = _useContext.os;

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Title, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["upperFirstLetter"])(title)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Table, {
    cellSpacing: 0,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, shortcuts.map(function (shortcut) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ShortcutItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: shortcut._id,
      id: shortcut._id,
      keys: shortcut[os],
      action: shortcut.action,
      note: shortcut.note,
      pins: shortcut.pins,
      isHtml: shortcut.isHtml,
      isPinned: !!shortcut.isPinned,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    });
  })));
}
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject());
var Title = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.header(_templateObject2());
var Table = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.div(_templateObject3());

/***/ }),

/***/ "./src/client/pages/contactUs/ContactForm.js":
/*!***************************************************!*\
  !*** ./src/client/pages/contactUs/ContactForm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/api */ "./src/client/helpers/api.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/contactUs/ContactForm.js";

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #e9e5e5;\n  border-radius: 3px;\n  display: block;\n  width: 100%;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  background: #e9e5e5;\n  border-radius: 3px;\n  display: block;\n  width: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #9d8b8b;\n  display: block;\n  margin: 15px 0 5px 0;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: left;\n  margin-top: 50px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





/* harmony default export */ __webpack_exports__["default"] = (function () {
  function handleSubmit(event) {
    event.preventDefault();
    var _event$target = event.target,
        name = _event$target.name,
        email = _event$target.email,
        message = _event$target.message;
    Object(_helpers_api__WEBPACK_IMPORTED_MODULE_2__["contactUs"])(name.value, email.value, message.value);
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Form, {
    onSubmit: handleSubmit,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Label, {
    htmlFor: "name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, "NAME"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input, {
    id: "name",
    name: "name",
    type: "text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Label, {
    htmlFor: "email",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, "EMAIL"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Input, {
    id: "email",
    name: "email",
    type: "email",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Label, {
    htmlFor: "message",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, "MESSAGE"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Textarea, {
    id: "message",
    name: "message",
    rows: 7,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "submit",
    style: {
      display: "block",
      width: "100%",
      padding: 12,
      marginTop: 25
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, "Send"));
});
var Form = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.form(_templateObject());
var Label = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.label(_templateObject2());
var Input = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.input(_templateObject3());
var Textarea = _emotion_styled__WEBPACK_IMPORTED_MODULE_4___default.a.textarea(_templateObject4());

/***/ }),

/***/ "./src/client/pages/layout/Footer.js":
/*!*******************************************!*\
  !*** ./src/client/pages/layout/Footer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Footer; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/layout/Footer.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  height: 50px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars


function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  });
}
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.footer(_templateObject());

/***/ }),

/***/ "./src/client/pages/layout/Header.js":
/*!*******************************************!*\
  !*** ./src/client/pages/layout/Header.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Logo */ "./src/client/pages/layout/Logo.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nav */ "./src/client/pages/layout/Nav.js");

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/layout/Header.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: baseline;\n  padding-top: 10px;\n\n  @media (max-width: 992px) {\n    padding-top: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars


 // import { logout } from "../../helpers/api"
// import DataContext from "../../DataContext"




function Header() {
  // const { user, doLogout } = useContext(DataContext)
  // function handleLogout() {
  //   logout()
  //   doLogout()
  // }
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Logo__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Nav__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (Header);
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.header(_templateObject());

/***/ }),

/***/ "./src/client/pages/layout/Logo.js":
/*!*****************************************!*\
  !*** ./src/client/pages/layout/Logo.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logo; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/layout/Logo.js";

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #e86562;\n  font-size: 1.35em;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #ffffff;\n  font-size: 30px;\n  display: inline-block;\n  cursor: pointer;\n  font-weight: 300;\n  position: relative;\n\n  @media (max-width: 992px) {\n    font-size: 25px;\n  }\n\n  @media (max-width: 768px) {\n    font-size: 20px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  font-size: 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars


function Logo() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(H1, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, "keyboard", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    style: {
      fontWeight: 700
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, "ninja", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Dot, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "."), "me"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Beta, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, " Beta"));
}
var Beta = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.small(_templateObject());
var H1 = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.h1(_templateObject2());
var Dot = _emotion_styled__WEBPACK_IMPORTED_MODULE_2___default.a.span(_templateObject3());

/***/ }),

/***/ "./src/client/pages/layout/Nav.js":
/*!****************************************!*\
  !*** ./src/client/pages/layout/Nav.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/layout/Nav.js";

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: inline-block;\n  font-size: 14px;\n  font-weight: 300;\n  list-style: none;\n  margin-left: auto;\n\n  li {\n    padding-left: 20px;\n    display: inline-block;\n  }\n\n  a {\n    color: #ffffff;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars





function Anonymous() {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
    to: "/contact",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, "Wanna help?")));
}

function LoggedIn(_ref) {
  var user = _ref.user,
      onLogout = _ref.onLogout;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, user.email), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
    to: "/apps",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "My apps")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    onClick: onLogout,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, "Logout")));
}

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, props.user ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LoggedIn, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  })) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Anonymous, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }));
});
var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_3___default.a.ul(_templateObject());

/***/ }),

/***/ "./src/client/pages/login/LoginForm.js":
/*!*********************************************!*\
  !*** ./src/client/pages/login/LoginForm.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Login; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_powerplug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-powerplug */ "react-powerplug");
/* harmony import */ var react_powerplug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_powerplug__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! email-validator */ "email-validator");
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(email_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Input */ "./src/client/components/Input.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/login/LoginForm.js";

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin-top: 5px;\n  color: #e86562;\n  font-size: 14px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #9d8b8b;\n  font-size: 14px;\n  margin-bottom: 5px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: center;\n  margin-top: 40px;\n  color: #e9e5e5;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-top: 10px;\n  a {\n    font-size: 13px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: center;\n  margin-bottom: 20px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars






 // export default ""

function Login(_ref) {
  var onSubmit = _ref.onSubmit;

  function handleSubmit(e, values, setValues) {
    e.preventDefault();
    var emailValid = email_validator__WEBPACK_IMPORTED_MODULE_5__["validate"](values.email);
    var passwordValid = values.password && values.password.length >= 6;
    setValues({
      emailValid: emailValid,
      passwordValid: passwordValid
    });

    if (emailValid && passwordValid) {
      onSubmit(values.email, values.password);
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_powerplug__WEBPACK_IMPORTED_MODULE_4__["Form"], {
    initial: {
      email: "gabimor@gmail.com",
      password: "123456",
      emailValid: true,
      passwordValid: true
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, function (_ref2) {
    var field = _ref2.field,
        values = _ref2.values,
        setValues = _ref2.setValues;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FormContainer, {
      onSubmit: function onSubmit(e) {
        return handleSubmit(e, values, setValues);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Header, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }, "Log in"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }, "Email"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, field("email").bind, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    })), !values.emailValid && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }, "Please enter a valid email"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LabelWrapper, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }, "Password"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    }, "Forgot password ?")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, field("password").bind, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      }
    })), !values.passwordValid && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      }
    }, "Please enter your password"), " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      type: "submit",
      style: {
        marginTop: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    }, "Log in"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SignupWrapper, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }, "Don't have an account ?", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: "/signup",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }, " Sign up")));
  });
}
var FormContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.form(_templateObject());
var Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.h2(_templateObject2());
var LabelWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject3());
var SignupWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject4());
var Label = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.label(_templateObject5());
var Error = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.label(_templateObject6());

/***/ }),

/***/ "./src/client/pages/signup/SignupForm.js":
/*!***********************************************!*\
  !*** ./src/client/pages/signup/SignupForm.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Signup; });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "@babel/runtime/helpers/taggedTemplateLiteral");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "@babel/runtime/helpers/extends");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_powerplug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-powerplug */ "react-powerplug");
/* harmony import */ var react_powerplug__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_powerplug__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! email-validator */ "email-validator");
/* harmony import */ var email_validator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(email_validator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/styled */ "@emotion/styled");
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Input */ "./src/client/components/Input.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Button */ "./src/client/components/Button.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/client/pages/signup/SignupForm.js";

function _templateObject6() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  margin-top: 5px;\n  color: #e86562;\n  font-size: 14px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  color: #9d8b8b;\n  font-size: 14px;\n  margin-bottom: 5px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: center;\n  margin-top: 40px;\n  color: #e9e5e5;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  margin-top: 10px;\n  a {\n    font-size: 13px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  text-align: center;\n  margin-bottom: 20px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

 // eslint-disable-line no-unused-vars







function Signup(_ref) {
  var onSubmit = _ref.onSubmit;

  function handleSubmit(e, values, setValues) {
    e.preventDefault();
    var emailValid = email_validator__WEBPACK_IMPORTED_MODULE_5__["validate"](values.email);
    var passwordValid = values.password && values.password.length >= 6 && values.password.length <= 12;
    setValues({
      emailValid: emailValid,
      passwordValid: passwordValid
    });

    if (emailValid && passwordValid) {
      onSubmit(values.email, values.password);
    }
  }

  var mockEmail = "a".concat(Math.floor(Math.random() * Math.floor(1000000)), "@b.com");
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_powerplug__WEBPACK_IMPORTED_MODULE_4__["Form"], {
    initial: {
      email: mockEmail,
      password: "123456",
      emailValid: true,
      passwordValid: true
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, function (_ref2) {
    var field = _ref2.field,
        values = _ref2.values,
        setValues = _ref2.setValues;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FormContainer, {
      onSubmit: function onSubmit(e) {
        return handleSubmit(e, values, setValues);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Header, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    }, "Sign up"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }, "Email"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, field("email").bind, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    })), !values.emailValid && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }, "Please enter a valid email"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LabelWrapper, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Label, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    }, "Password")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, field("password").bind, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    })), !values.passwordValid && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    }, "Please choose a password of 6-12 charecters"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      type: "submit",
      style: {
        marginTop: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    }, "Sign up"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(SignupWrapper, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }, "Already have an account ?", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: "/login",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }, " Log in")));
  });
}
var FormContainer = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.form(_templateObject());
var Header = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.h2(_templateObject2());
var LabelWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject3());
var SignupWrapper = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.div(_templateObject4());
var Label = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.label(_templateObject5());
var Error = _emotion_styled__WEBPACK_IMPORTED_MODULE_6___default.a.label(_templateObject6());

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);


var app = __webpack_require__(/*! ./server */ "./src/server.js").default;

var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(app);
var currentApp = app;
server.listen("3000" || false, function (error) {
  if (error) {
    console.log(error);
  }

  console.log("server started");
});

if (true) {
  console.log("✅  Server-side HMR Enabled!");
  module.hot.accept(/*! ./server */ "./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log("🔁  HMR Reloading `./server`...");

    try {
      app = __webpack_require__(/*! ./server */ "./src/server.js").default;
      server.removeListener("request", currentApp);
      server.on("request", app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
}

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! connect-flash */ "connect-flash");
/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(connect_flash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _server_cache__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./server/cache */ "./src/server/cache.js");
/* harmony import */ var _client_Layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./client/Layout */ "./src/client/Layout.js");
/* harmony import */ var _client_DataContext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./client/DataContext */ "./src/client/DataContext.js");
/* harmony import */ var _server_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./server/page */ "./src/server/page.js");
/* harmony import */ var _server_auth__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./server/auth */ "./src/server/auth.js");
/* harmony import */ var _server_api__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./server/api */ "./src/server/api.js");
/* harmony import */ var _server_models__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./server/models */ "./src/server/models.js");


var _jsxFileName = "/Users/gabimor/Code/keyboardninja/src/server.js";

/* eslint-disable import/first */
 // eslint-disable-line no-unused-vars












var RedisStore = __webpack_require__(/*! connect-redis */ "connect-redis")(express_session__WEBPACK_IMPORTED_MODULE_9___default.a);

dotenv__WEBPACK_IMPORTED_MODULE_12___default.a.config();








var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var app = express__WEBPACK_IMPORTED_MODULE_10___default()();
var router = express__WEBPACK_IMPORTED_MODULE_10___default.a.Router();
app.disable("x-powered-by");
app.use(express_session__WEBPACK_IMPORTED_MODULE_9___default()({
  store: new RedisStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000,
    secure: false
  }
}));
app.use(compression__WEBPACK_IMPORTED_MODULE_11___default()());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({
  extended: true
}));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_6___default()());
app.use(passport__WEBPACK_IMPORTED_MODULE_7___default.a.initialize());
app.use(connect_flash__WEBPACK_IMPORTED_MODULE_8___default()());
app.use(passport__WEBPACK_IMPORTED_MODULE_7___default.a.session());
app.use("/api", _server_api__WEBPACK_IMPORTED_MODULE_18__["default"]);
app.use("/", router);
app.use(express__WEBPACK_IMPORTED_MODULE_10___default.a.static("/Users/gabimor/Code/keyboardninja/public"));
app.get("/404", defaultHandler);
app.get("/contact", defaultHandler);
app.get("/:name",
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res, next) {
    var appsHash, foundApp, appId, _app, os, userShortcuts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, appCategories, dataContext;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _server_cache__WEBPACK_IMPORTED_MODULE_13__["getAppsHash"]();

          case 3:
            appsHash = _context.sent;
            foundApp = appsHash.find(function (e) {
              return e.name === req.params.name;
            });

            if (foundApp) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.redirect("/404"));

          case 7:
            appId = foundApp.id;
            _context.next = 10;
            return _server_cache__WEBPACK_IMPORTED_MODULE_13__["getApp"](appId);

          case 10:
            _app = _context.sent;
            os = req.cookies.os;

            if (!os) {
              os = req.headers["user-agent"].toLowerCase().includes("win") ? "win" : "mac";
            } // if app doesn't support the detected os, switch os to the one that's supported


            if (!_app.oss.includes(os)) {
              os = _app.oss[0];
            }

            if (!req.query.h) {
              _context.next = 47;
              break;
            }

            _context.prev = 15;
            _context.next = 18;
            return _server_models__WEBPACK_IMPORTED_MODULE_19__["UserShortcut"].findById(req.query.h);

          case 18:
            userShortcuts = _context.sent;
            // TODO: replace with production solution
            _app = JSON.parse(JSON.stringify(_app));

            if (!(userShortcuts && userShortcuts.appId.toString() === appId)) {
              _context.next = 41;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 24;

            _loop = function _loop() {
              var shortcutId = _step.value;
              _app.shortcuts.find(function (e) {
                return e._id.toString() === shortcutId.toString();
              }).isPinned = true;
            };

            for (_iterator = userShortcuts.shortcuts[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }

            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](24);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 33:
            _context.prev = 33;
            _context.prev = 34;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(33);

          case 41:
            _context.next = 47;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context["catch"](15);
            console.log(req.path);
            console.log(_context.t1.toString()); // res.redirect(req.path)

          case 47:
            _context.next = 49;
            return _server_cache__WEBPACK_IMPORTED_MODULE_13__["getAppCategories"]();

          case 49:
            appCategories = _context.sent;
            dataContext = {
              app: _app,
              os: os,
              appCategories: appCategories
            };
            sendPage(req, res, dataContext, _app.name + " keyboard shortcuts");
            _context.next = 57;
            break;

          case 54:
            _context.prev = 54;
            _context.t2 = _context["catch"](0);
            next(_context.t2);

          case 57:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 54], [15, 43], [24, 29, 33, 41], [34,, 36, 40]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.get("/", defaultHandler);

function defaultHandler(_x4, _x5, _x6) {
  return _defaultHandler.apply(this, arguments);
}

function _defaultHandler() {
  _defaultHandler = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {
    var appCategories, dataContext;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _server_cache__WEBPACK_IMPORTED_MODULE_13__["getAppCategories"]();

          case 3:
            appCategories = _context2.sent;
            dataContext = {
              appCategories: appCategories,
              user: req.user
            };
            sendPage(req, res, dataContext);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _defaultHandler.apply(this, arguments);
}

app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err.toString() + err.stack);
});

var getTemplate = function getTemplate(url, dataContext) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_client_DataContext__WEBPACK_IMPORTED_MODULE_15__["default"].Provider, {
    value: dataContext,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 149
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["StaticRouter"], {
    context: {},
    location: url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150
    }
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_client_Layout__WEBPACK_IMPORTED_MODULE_14__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151
    }
  })));
};

var sendPage = function sendPage(req, res, dataContext, title) {
  var cacheKey = req.originalUrl + "-" + dataContext.os;

  if (!req.user) {
    var cachePage = _server_cache__WEBPACK_IMPORTED_MODULE_13__["get"](cacheKey);

    if (!cachePage) {
      var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_4__["renderToString"])(getTemplate(req.url, dataContext));
      cachePage = Object(_server_page__WEBPACK_IMPORTED_MODULE_16__["page"])(markup, title, assets, dataContext);
      _server_cache__WEBPACK_IMPORTED_MODULE_13__["set"](cacheKey, cachePage);
    }

    res.status(200).send(cachePage);
  } else {
    res.write(Object(_server_page__WEBPACK_IMPORTED_MODULE_16__["pageStart"])(title, assets, dataContext));
    var stream = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_4__["renderToNodeStream"])(getTemplate(req.url, dataContext));
    stream.pipe(res, {
      end: "false"
    });
    stream.on("end", function () {
      res.end(Object(_server_page__WEBPACK_IMPORTED_MODULE_16__["pageEnd"])());
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/server/api.js":
/*!***************************!*\
  !*** ./src/server/api.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sendgrid/mail */ "@sendgrid/mail");
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sendgrid_mail__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models */ "./src/server/models.js");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./db */ "./src/server/db.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cache */ "./src/server/cache.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! md5 */ "md5");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_9__);










var router = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();
router.get("/health",
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.send("healthy");

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/signup",
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res, next) {
    var _req$body, email, password;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 3;
            return _db__WEBPACK_IMPORTED_MODULE_7__["signupUser"](email, password);

          case 3:
            req.login({
              email: email,
              password: password
            }, function (err) {
              if (err) {
                return next(err);
              }

              return res.json({
                email: email
              });
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/contactus", function (req, res, next) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      email = _req$body2.email,
      message = _req$body2.message;
  _sendgrid_mail__WEBPACK_IMPORTED_MODULE_5___default.a.setApiKey(process.env.SENDGRID_API_KEY);
  var msg = {
    to: "gabimor@gmail.com",
    from: email,
    subject: "KeyboardNinja contact us",
    text: message
  };
  _sendgrid_mail__WEBPACK_IMPORTED_MODULE_5___default.a.send(msg);
  res.sendStatus(200);
}); // router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   (req, res, next) => {
//     req.session.save(err => {
//       if (err) {
//         return next(err)
//       }
//       res.redirect("/")
//     })
//   }
// )
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// )

router.post("/login", function (req, res, next) {
  // passport.authenticate(
  //   "local",
  //   {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //   },
  //   function(req, res) {
  //     // If this function gets called, authentication was successful.
  //     // `req.user` contains the authenticated user.
  //     res.redirect("/users/" + req.user.username)
  //   }
  // )
  passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate("local", function (error, user, info) {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(info);
    } else {
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.json({
          email: user.email
        });
      });
    }
  })(req, res);
});
router.post("/logout", function (req, res) {
  req.logout();
  res.send();
}); // router.patch("/pin", function(req, res) {
//   const { appId, shortcutId, isPinned } = req.body
//   // db.setPin(req.user.id, appId, shortcutId, isPinned)
//   // cache.setPin(appId, shortcutId, isPinned)
//   req.session.pins = req.session.pins || 0
//   req.session.pins++
//   res.status(200).send()
// })

router.post("/getlink",
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {
    var appsHash, _req$body3, appId, shortcutIds, appName, link, hash, existingSave, userShortcut;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _cache__WEBPACK_IMPORTED_MODULE_8__["getAppsHash"]();

          case 2:
            appsHash = _context3.sent;
            _req$body3 = req.body, appId = _req$body3.appId, shortcutIds = _req$body3.shortcutIds;
            appName = appsHash.find(function (e) {
              return e.id.toString() === appId;
            }).name;
            link = process.env.APP_URL + appName;

            if (!(shortcutIds.length > 0)) {
              _context3.next = 13;
              break;
            }

            hash = md5__WEBPACK_IMPORTED_MODULE_9___default()(req.sessionID + shortcutIds.join()).substring(8);
            link += "?h=" + hash;
            _context3.next = 11;
            return _models__WEBPACK_IMPORTED_MODULE_6__["UserShortcut"].findById(hash);

          case 11:
            existingSave = _context3.sent;

            if (!existingSave) {
              userShortcut = new _models__WEBPACK_IMPORTED_MODULE_6__["UserShortcut"]({
                _id: mongoose__WEBPACK_IMPORTED_MODULE_4__["Types"].ObjectId(hash),
                appId: appId,
                shortcuts: shortcutIds
              });
              userShortcut.save();
            }

          case 13:
            res.status(200).send(link);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/server/auth.js":
/*!****************************!*\
  !*** ./src/server/auth.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passport-local */ "passport-local");
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models */ "./src/server/models.js");





passport__WEBPACK_IMPORTED_MODULE_2___default.a.use(new passport_local__WEBPACK_IMPORTED_MODULE_3__["Strategy"]({
  usernameField: "email",
  passwordField: "password"
},
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(username, password, done) {
    var user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models__WEBPACK_IMPORTED_MODULE_4__["User"].findOne({
              email: username,
              password: password
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 8:
            return _context.abrupt("return", done(null, false, {
              message: "Incorrect email or password"
            }));

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}())); // serialize user object

passport__WEBPACK_IMPORTED_MODULE_2___default.a.serializeUser(function (user, done) {
  done(null, {
    id: user.id,
    email: user.email
  });
}); // deserialize user object

passport__WEBPACK_IMPORTED_MODULE_2___default.a.deserializeUser(function (user, done) {
  done(null, user);
});

/***/ }),

/***/ "./src/server/cache.js":
/*!*****************************!*\
  !*** ./src/server/cache.js ***!
  \*****************************/
/*! exports provided: getAppsHash, getAppCategories, setPin, getApp, set, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppsHash", function() { return getAppsHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppCategories", function() { return getAppCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPin", function() { return setPin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApp", function() { return getApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-cache */ "node-cache");
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_cache__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/server/helpers.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models */ "./src/server/models.js");






var nodeCache = new node_cache__WEBPACK_IMPORTED_MODULE_3___default.a();
function getAppsHash() {
  return _getAppsHash.apply(this, arguments);
}

function _getAppsHash() {
  _getAppsHash = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
    var appsHash, apps, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, app;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appsHash = nodeCache.get("appsHash");

            if (appsHash) {
              _context.next = 26;
              break;
            }

            appsHash = [];
            _context.next = 5;
            return _models__WEBPACK_IMPORTED_MODULE_5__["App"].find();

          case 5:
            apps = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = apps[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              app = _step.value;
              appsHash.push({
                id: app._id.toString(),
                name: Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["encodeAppName"])(app.name)
              });
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            nodeCache.set("appsHash", appsHash);

          case 26:
            return _context.abrupt("return", appsHash);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));
  return _getAppsHash.apply(this, arguments);
}

function getAppCategories() {
  return _getAppCategories.apply(this, arguments);
}

function _getAppCategories() {
  _getAppCategories = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
    var appCategories;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            appCategories = nodeCache.get("appCategories");

            if (appCategories) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return _models__WEBPACK_IMPORTED_MODULE_5__["AppCategory"].find().lean();

          case 4:
            appCategories = _context2.sent;
            nodeCache.set("appHash", appCategories);

          case 6:
            return _context2.abrupt("return", appCategories);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAppCategories.apply(this, arguments);
}

function setPin(appId, shortcutId, isPinned) {
  var app = nodeCache.get("app-" + appId);
  var change = isPinned ? 1 : -1;
  app.shortcuts.find(function (e) {
    return e._id.toString() === shortcutId.toString();
  }).pins += change;
  nodeCache.set("app-" + appId, app);
}
function getApp(_x) {
  return _getApp.apply(this, arguments);
}

function _getApp() {
  _getApp = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(appId) {
    var cacheApp, userShortcuts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, userShortcut, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cacheApp = nodeCache.get("app-" + appId);

            if (cacheApp) {
              _context3.next = 53;
              break;
            }

            _context3.next = 4;
            return _models__WEBPACK_IMPORTED_MODULE_5__["App"].findById(appId).lean();

          case 4:
            cacheApp = _context3.sent;
            cacheApp.shortcuts = cacheApp.shortcuts.map(function (shortcut) {
              return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, shortcut, {
                pins: 0
              });
            });
            _context3.next = 8;
            return _models__WEBPACK_IMPORTED_MODULE_5__["UserShortcut"].find({
              appId: appId
            }).lean();

          case 8:
            userShortcuts = _context3.sent;
            // calculate pins field
            // go over every appid, userId record
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 12;
            _iterator2 = userShortcuts[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 39;
              break;
            }

            userShortcut = _step2.value;
            // go over every shortcut in that record
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 19;

            _loop = function _loop() {
              var shortcut = _step3.value;
              var app = cacheApp.shortcuts.find(function (e) {
                return e._id.toString() === shortcut.toString();
              });
              app.pins++;
            };

            for (_iterator3 = userShortcut.shortcuts[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              _loop();
            }

            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](19);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 28:
            _context3.prev = 28;
            _context3.prev = 29;

            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }

          case 31:
            _context3.prev = 31;

            if (!_didIteratorError3) {
              _context3.next = 34;
              break;
            }

            throw _iteratorError3;

          case 34:
            return _context3.finish(31);

          case 35:
            return _context3.finish(28);

          case 36:
            _iteratorNormalCompletion2 = true;
            _context3.next = 14;
            break;

          case 39:
            _context3.next = 45;
            break;

          case 41:
            _context3.prev = 41;
            _context3.t1 = _context3["catch"](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t1;

          case 45:
            _context3.prev = 45;
            _context3.prev = 46;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 48:
            _context3.prev = 48;

            if (!_didIteratorError2) {
              _context3.next = 51;
              break;
            }

            throw _iteratorError2;

          case 51:
            return _context3.finish(48);

          case 52:
            return _context3.finish(45);

          case 53:
            return _context3.abrupt("return", cacheApp);

          case 54:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[12, 41, 45, 53], [19, 24, 28, 36], [29,, 31, 35], [46,, 48, 52]]);
  }));
  return _getApp.apply(this, arguments);
}

function set(key, value) {
  nodeCache.set(key, value);
}
function get(key) {
  return nodeCache.get(key);
} // export default nodeCache
// START PERFORMANCE MEASURE
// const hrstart = process.hrtime()
// END PERFORMANCE MEASURE
// const hrend = process.hrtime(hrstart)
// console.log(`${hrend[0]}s ${hrend[1] / 1000000}ms`)

/***/ }),

/***/ "./src/server/db.js":
/*!**************************!*\
  !*** ./src/server/db.js ***!
  \**************************/
/*! exports provided: setPin, signupUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPin", function() { return setPin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signupUser", function() { return signupUser; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models */ "./src/server/models.js");




mongoose__WEBPACK_IMPORTED_MODULE_2___default.a.connect("mongodb+srv://gabimor:".concat(process.env.ATLAS_PASSWORD, "@cluster0-li1ur.mongodb.net/keyboard_ninja?retryWrites=true"), {
  useNewUrlParser: true
}); // mongoose.set("debug", true)

function setPin(_x, _x2, _x3, _x4) {
  return _setPin.apply(this, arguments);
}

function _setPin() {
  _setPin = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(userId, appId, shortcutId, isPinned) {
    var update;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (isPinned) {
              update = {
                $addToSet: {
                  shortcuts: [shortcutId]
                }
              };
            } else {
              update = {
                $pull: {
                  shortcuts: shortcutId
                }
              };
            }

            _context.next = 3;
            return _models__WEBPACK_IMPORTED_MODULE_3__["UserShortcut"].findOneAndUpdate({
              userId: userId,
              appId: appId
            }, update, {
              upsert: true
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setPin.apply(this, arguments);
}

function signupUser(_x5, _x6) {
  return _signupUser.apply(this, arguments);
}

function _signupUser() {
  _signupUser = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(email, password) {
    var user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models__WEBPACK_IMPORTED_MODULE_3__["User"].findOne({
              email: email,
              password: password
            });

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            user = new _models__WEBPACK_IMPORTED_MODULE_3__["User"]({
              email: email,
              password: password
            });
            _context2.next = 7;
            return user.save();

          case 7:
            return _context2.abrupt("return", user);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signupUser.apply(this, arguments);
}

/***/ }),

/***/ "./src/server/helpers.js":
/*!*******************************!*\
  !*** ./src/server/helpers.js ***!
  \*******************************/
/*! exports provided: encodeAppName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeAppName", function() { return encodeAppName; });
function encodeAppName(name) {
  return name.toLowerCase().replace(new RegExp(" ", "g"), "-");
}

/***/ }),

/***/ "./src/server/models.js":
/*!******************************!*\
  !*** ./src/server/models.js ***!
  \******************************/
/*! exports provided: User, App, AppCategory, UserShortcut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppCategory", function() { return AppCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserShortcut", function() { return UserShortcut; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

var User = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("users", new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  email: String,
  password: String
})); // mongoose.set("debug", function(coll, method, query, doc) {
//   console.log(1231231)
//   console.log(coll, method, query, doc)
// })
// getAppUrlName, shortcut.getPins, getIdByUrlName

var App = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("apps", new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  name: String,
  icon: String,
  sections: [new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    name: String
  })],
  oss: [String],
  shortcuts: [new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    action: String,
    sectionId: mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"].ObjectId,
    win: String,
    mac: String,
    isHtml: Boolean,
    note: String
  })]
}));
var AppCategory = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("app_categories", new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  name: String,
  icon: String,
  apps: [new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    name: String,
    icon: String
  })]
}));
var UserShortcut = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("user_shortcuts", new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
  userId: mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"].ObjectId,
  appId: mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"].ObjectId,
  shortcuts: [mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"].ObjectId]
}));

/***/ }),

/***/ "./src/server/page.js":
/*!****************************!*\
  !*** ./src/server/page.js ***!
  \****************************/
/*! exports provided: style, page, pageStart, pageEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "page", function() { return page; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageStart", function() { return pageStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageEnd", function() { return pageEnd; });
// /*
//   #a12d2a - shortcuts titles
//   #D1403D - darkRed
//   #E86562 - red, links
//   #fa9290 - links
//   #5A5A5A - mutedIcon
//   #9D8B8B - labelText, pinBorder
//   #A4A3A6 - pin
//   #d1b4b4 - textRed
//   #d1d0d4 - soon text
//   #E9E5E5 - softText
//   #ffe6ab - pinSelected
//   #FFFFFF - white
//   #4F4242 - appPanel
//   #453A3A - darkBorder
//   #442323 - mainBG1
//   #270505 - mainBG2
//   #2C2525 - panelZebra
//   #2E2424 - panel
//   #000000 - black
// */
var style = "<style>\n* {\n  box-sizing: border-box;\n}\nhtml {\n  height:100%;\n  background-color: #270505;\n}\n\nbody {\n  background: linear-gradient(#442323, #270505) no-repeat;    \n  background-size: 100% 400px;\n  color: #FFFFFF;\n  margin: 0;\n  font-family: \"IBM Plex Sans\", sans-serif;\n  font-size: 14px;\n  min-height: 500px;\n}\n\ninput, textarea, select, button {\n  font-family: inherit;\n  font-size: inherit;\n  border: none;\n  box-sizing: border-box;\n}\n\ninput:focus, textarea:focus, select:focus, div:focus, button:focus,\ninput:active, textarea:active, select:active, div:active, button:active {\n  outline: 0;\n}\n\ninput {\n  padding: 8px 10px 8px;\n  color: #FFFFFF;\n  background: #000000;\n}\n\nkbd {\n  display: inline-block;\n  background-color: #635656;\n  color: #FFFFFF;\n  font-family: inherit;\n\n  font-size: 13px;\n  border: solid 1px #442323;\n  border-radius: 6px;\n  padding: 0 2px;\n  min-width: 32px;\n  text-align: center;\n  box-shadow: 0px 6px 1px 1px rgba(30,30,30,0.2);\n}\n\nlabel {\n  margin-right: 6px;\n  color: #FFFFFF;\n}\n\nul, ul li, ol, ol li {\n  margin: 0;\n  padding: 0;\n  list-style-position: inside;\n}\n\n\nul, ul li {\n  list-style: none;\n}\n\na {\n  color: #fa9290;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nh1,h2,h3,h4,h5,h6 {\n  margin: 0;\n  line-height:1em;\n  font-weight: normal;\n}\n</style>";
function page(markup, title, assets, data) {
  var head = assets.client.css ? "<link rel=\"stylesheet\" href=\"".concat(assets.client.css, "\">") : "";
  head +=  false ? undefined : "<script src=\"".concat(assets.client.js, "\" defer crossorigin></script>");
  return "<!doctype html>\n    <html lang=\"\">\n    <head>\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta charset=\"utf-8\" />\n      <title>".concat(title || "Keyboard Ninja Me", "</title>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link\n        href=\"https://use.fontawesome.com/releases/v5.4.2/css/all.css\"\n        integrity=\"sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns\"\n        crossOrigin=\"anonymous\"\n        rel=\"stylesheet\" />\n      <link\n        href=\"https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i\"\n        rel=\"stylesheet\" />\n\n      ").concat(style, "\n      ").concat(head || "", "\n    </head>\n    <body>\n      <script>\n        window.__KBN_DATA__ = ").concat(data ? JSON.stringify(data) : undefined, ";\n      </script>\n      <div id=\"root\">").concat(markup, "</div>\n      ").concat(tracking, "\n    </body>\n    </html>");
}
function pageStart(title, assets, data) {
  var head = assets.client.css ? "<link rel=\"stylesheet\" href=\"".concat(assets.client.css, "\">") : "";
  head +=  false ? undefined : "<script src=\"".concat(assets.client.js, "\" defer crossorigin></script>");
  return "<!doctype html>\n    <html lang=\"\">\n    <head>\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n      <meta charset=\"utf-8\" />\n      <title>".concat(title || "Keyboard Ninja Me", "</title>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <link\n        href=\"https://use.fontawesome.com/releases/v5.4.2/css/all.css\"\n        integrity=\"sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns\"\n        crossOrigin=\"anonymous\"\n        rel=\"stylesheet\" />\n      <link\n        href=\"https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i\"\n        rel=\"stylesheet\" />\n      ").concat(style, "\n      ").concat(head || "", "\n    </head>\n    <body>\n      <script>\n        window.__KBN_DATA__ = ").concat(data ? JSON.stringify(data) : undefined, ";\n      </script>\n      <div id=\"root\">");
}
function pageEnd() {
  return "</div>".concat(tracking, "</body></html>");
}
var tracking = "\n  <!-- Hotjar Tracking Code for http://www.keyboardninja.me -->\n  <script>\n      (function(h,o,t,j,a,r){\n          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n          h._hjSettings={hjid:1186459,hjsv:6};\n          a=o.getElementsByTagName('head')[0];\n          r=o.createElement('script');r.async=1;\n          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n          a.appendChild(r);\n      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');\n  </script>\n  <!-- Global site tag (gtag.js) - Google Analytics -->\n  <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-90675788-2\"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n\n    gtag('config', 'UA-90675788-2');\n  </script>";

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! /Users/gabimor/Code/keyboardninja/src */"./src/index.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/extends":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/taggedTemplateLiteral":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/taggedTemplateLiteral" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/taggedTemplateLiteral");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@emotion/styled":
/*!**********************************!*\
  !*** external "@emotion/styled" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "email-validator":
/*!**********************************!*\
  !*** external "email-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("email-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "node-cache":
/*!*****************************!*\
  !*** external "node-cache" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-cache");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-powerplug":
/*!**********************************!*\
  !*** external "react-powerplug" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-powerplug");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map