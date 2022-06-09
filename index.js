var WebSocketClient = require('websocket').client;
var Emitter = require('events').EventEmitter;

class Altctrl {
    constructor(url) {
        this.wsClient = new WebSocketClient();
        this.eventEmitter = new Emitter();
        this.wsClient.connect(url);
        this.wsClient.on("connect", (connection) => {
            connection.on("message", this._callback.bind(this));
        });
    }

    _callback(data) {
        this.eventEmitter.emit("data", data);
    }

    get inputs() {
        return this.eventEmitter;
    }
}

module.exports = Altctrl