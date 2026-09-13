/**
 * socketlib - Embedded Version for Showdown FX
 * Original Author: Manuel Vögele
 * Modified for internal use to avoid dependencies.
 */

const modules = new Map();
let systemSocket = undefined;

const RECIPIENT_TYPES = {
	ONE_GM: 0,
	ALL_GMS: 1,
	EVERYONE: 2,
};

const MESSAGE_TYPES = {
	COMMAND: 0,
	REQUEST: 1,
	RESPONSE: 2,
	RESULT: 3,
	EXCEPTION: 4,
	UNREGISTERED: 5,
};

class SocketlibError extends Error {}
class SocketlibNoGMConnectedError extends SocketlibError {}
class SocketlibInvalidUserError extends SocketlibError {}
class SocketlibUnregisteredHandlerError extends SocketlibError {}
class SocketlibRemoteException extends SocketlibError {}
class SocketlibInternalError extends SocketlibError {}

Hooks.on("userConnected", handleUserActivity);

export class Socketlib {
    constructor() {
        // 내부 변수 참조
    }

	registerModule(moduleName) {
		const existingSocket = modules.get(moduleName);
		if (existingSocket)
			return existingSocket;
		
        const module = game.modules.get(moduleName);
		if (!module?.active) {
			console.error(`ShowdownFX (Internal Socket) | Module '${moduleName}' is not active.`);
			return undefined;
		}
        
		if (!module.socket) {
			console.warn(`ShowdownFX (Internal Socket) | 'socket':true missing in manifest for '${moduleName}'.`);
		}

		const newSocket = new SocketlibSocket(moduleName, "module");
		modules.set(moduleName, newSocket);
		return newSocket;
	}

	registerSystem(systemId) {
		if (game.system.id !== systemId) return undefined;
		
        const existingSocket = systemSocket;
		if (existingSocket) return existingSocket;
        
		const newSocket = new SocketlibSocket(systemId, "system");
		systemSocket = newSocket;
		return newSocket;
	}
}

class SocketlibSocket {
	constructor(moduleName, moduleType) {
		this.functions = new Map();
		this.socketName = `${moduleType}.${moduleName}`;
		this.pendingRequests = new Map();
		game.socket.on(this.socketName, this._onSocketReceived.bind(this));
	}

	register(name, func) {
		if (!(func instanceof Function)) {
			console.error(`ShowdownFX | Register error: '${name}' is not a function.`);
			return;
		}
		if (this.functions.has(name)) {
			console.warn(`ShowdownFX | Function '${name}' is already registered.`);
			return;
		}
		this.functions.set(name, func);
	}

	async executeAsGM(handler, ...args) {
		const [name, func] = this._resolveFunction(handler);
		if (game.user.isGM) {
			return this._executeLocal(func, ...args);
		}
		else {
			if (!game.users.activeGM) {
				throw new SocketlibNoGMConnectedError(`Could not execute '${name}' as GM. No GM connected.`);
			}
			return this._sendRequest(name, args, RECIPIENT_TYPES.ONE_GM);
		}
	}

	async executeAsUser(handler, userId, ...args) {
		const [name, func] = this._resolveFunction(handler);
		if (userId === game.userId)
			return this._executeLocal(func, ...args);
		const user = game.users.get(userId);
		if (!user || !user.active)
			throw new SocketlibInvalidUserError(`User ${userId} is not available.`);
		return this._sendRequest(name, args, [userId]);
	}

	async executeForAllGMs(handler, ...args) {
		const [name, func] = this._resolveFunction(handler);
		this._sendCommand(name, args, RECIPIENT_TYPES.ALL_GMS);
		if (game.user.isGM) {
			try { this._executeLocal(func, ...args); } catch (e) { console.error(e); }
		}
	}

	async executeForOtherGMs(handler, ...args) {
		const [name, func] = this._resolveFunction(handler);
		this._sendCommand(name, args, RECIPIENT_TYPES.ALL_GMS);
	}

	async executeForEveryone(handler, ...args) {
		const [name, func] = this._resolveFunction(handler);
		this._sendCommand(name, args, RECIPIENT_TYPES.EVERYONE);
		try { this._executeLocal(func, ...args); } catch (e) { console.error(e); }
	}

	async executeForOthers(handler, ...args) {
		const [name, func] = this._resolveFunction(handler);
		this._sendCommand(name, args, RECIPIENT_TYPES.EVERYONE);
	}

	async executeForUsers(handler, recipients, ...args) {
		if (!(recipients instanceof Array)) throw new TypeError("Recipients must be an array.");
		const [name, func] = this._resolveFunction(handler);
		const currentUserIndex = recipients.indexOf(game.userId);
		if (currentUserIndex >= 0) recipients.splice(currentUserIndex, 1);
		
        this._sendCommand(name, args, recipients);
		
        if (currentUserIndex >= 0) {
			try { this._executeLocal(func, ...args); } catch (e) { console.error(e); }
		}
	}

	_sendRequest(handlerName, args, recipient) {
		const message = {handlerName, args, recipient, id: foundry.utils.randomID(), type: MESSAGE_TYPES.REQUEST};
		const promise = new Promise((resolve, reject) => this.pendingRequests.set(message.id, {handlerName, resolve, reject, recipient}));
		game.socket.emit(this.socketName, message);
		return promise;
	}

	_sendCommand(handlerName, args, recipient) {
		const message = {handlerName, args, recipient, type: MESSAGE_TYPES.COMMAND};
		game.socket.emit(this.socketName, message);
	}

	_sendResult(id, result) {
		game.socket.emit(this.socketName, {id, result, type: MESSAGE_TYPES.RESULT});
	}

	_sendError(id, type) {
		game.socket.emit(this.socketName, {id, type, userId: game.userId});
	}

	_executeLocal(func, ...args) {
		return func.call({socketdata: {userId: game.userId}}, ...args);
	}

	_resolveFunction(func) {
		if (func instanceof Function) {
			const entry = Array.from(this.functions.entries()).find(([key, val]) => val === func);
			if (!entry) throw new SocketlibUnregisteredHandlerError(`Function '${func.name}' not registered.`);
			return [entry[0], func];
		}
		const fn = this.functions.get(func);
		if (!fn) throw new SocketlibUnregisteredHandlerError(`Handler '${func}' not registered.`);
		return [func, fn];
	}

	_onSocketReceived(message, senderId) {
		if (message.type === MESSAGE_TYPES.COMMAND || message.type === MESSAGE_TYPES.REQUEST)
			this._handleRequest(message, senderId);
		else
			this._handleResponse(message, senderId);
	}

	async _handleRequest(message, senderId) {
		const {handlerName, args, recipient, id, type} = message;
		
        if (recipient instanceof Array) {
			if (!recipient.includes(game.userId)) return;
		} else {
			switch (recipient) {
				case RECIPIENT_TYPES.ONE_GM: if (!game.users.activeGM?.isSelf) return; break;
				case RECIPIENT_TYPES.ALL_GMS: if (!game.user.isGM) return; break;
				case RECIPIENT_TYPES.EVERYONE: break;
				default: return;
			}
		}

		let name, func;
		try {
			[name, func] = this._resolveFunction(handlerName);
		} catch (e) {
			if (e instanceof SocketlibUnregisteredHandlerError && type === MESSAGE_TYPES.REQUEST) {
				this._sendError(id, MESSAGE_TYPES.UNREGISTERED);
			}
			throw e;
		}

		const context = {socketdata: {userId: senderId}};
		if (type === MESSAGE_TYPES.COMMAND) {
			func.call(context, ...args);
		} else {
			try {
				const result = await func.call(context, ...args);
				this._sendResult(id, result);
			} catch (e) {
				console.error(e);
				this._sendError(id, MESSAGE_TYPES.EXCEPTION);
				throw e;
			}
		}
	}

	_handleResponse(message, senderId) {
		const {id, result, type} = message;
		const request = this.pendingRequests.get(id);
		if (!request) return;

		if (!this._isResponseSenderValid(senderId, request.recipient)) return;

		switch (type) {
			case MESSAGE_TYPES.RESULT: request.resolve(result); break;
			case MESSAGE_TYPES.EXCEPTION: request.reject(new SocketlibRemoteException(`Remote exception.`)); break;
			case MESSAGE_TYPES.UNREGISTERED: request.reject(new SocketlibUnregisteredHandlerError(`Handler unregistered on target.`)); break;
			default: request.reject(new SocketlibInternalError(`Unknown result type.`)); break;
		}
		this.pendingRequests.delete(id);
	}

	_isResponseSenderValid(senderId, recipients) {
		if (recipients === RECIPIENT_TYPES.ONE_GM && game.users.get(senderId).isGM) return true;
		if (recipients instanceof Array && recipients.includes(senderId)) return true;
		return false;
	}
}

function handleUserActivity(user, active) {
	if (!active) {
		const activeSockets = Array.from(modules.values());
		if (systemSocket) activeSockets.push(systemSocket);

		for (const socket of activeSockets) {
			const failedRequests = Array.from(socket.pendingRequests.entries()).filter(([id, request]) => {
				const recipient = request.recipient;
				if (recipient === RECIPIENT_TYPES.ONE_GM) {
					if (!game.users.activeGM) {
						request.reject(new SocketlibNoGMConnectedError("No GM connected."));
						return true;
					}
				} else if (recipient instanceof Array) {
					if (recipient.includes(user.id)) {
						request.reject(new SocketlibInvalidUserError("User disconnected."));
						return true;
					}
				}
				return false;
			});
			for (const [id, request] of failedRequests) {
				socket.pendingRequests.delete(id);
			}
		}
	}
}