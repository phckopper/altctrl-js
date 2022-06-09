var WebSocketClient = require('websocket').client;
var Emitter = require('events').EventEmitter;

class Altctrl {
    constructor(url) {
        this.wsClient = new WebSocketClient();
        this.wsClient.connect(url);
        this.wsClient.on("connect", (connection) => {
            connection.on("message", this._callback);
        });
        this.eventEmitter = Emitter();
    }

    _callback(data) {
        this.eventEmitter.emit("data", data);
    }

    get inputs() {
        return this.eventEmitter;
    }
}