export class SocketlibError extends Error {}
export class SocketlibNoGMConnectedError extends SocketlibError {}
export class SocketlibInvalidUserError extends SocketlibError {}
export class SocketlibUnregisteredHandlerError extends SocketlibError {}
export class SocketlibRemoteException extends SocketlibError {}
export class SocketlibInternalError extends SocketlibError {}