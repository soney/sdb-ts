"use strict";
exports.__esModule = true;
var index_1 = require("../built/index");
var http = require("http");
var WebSocket = require("ws");
var port = 3000;
var server = http.createServer();
var wss = new WebSocket.Server({ server: server });
var sdbServer = new index_1.SDBServer(wss);
var doc = sdbServer.get('touchdoc', 'touchdoc');
doc.createIfEmpty({
    tg: {},
    ps: {}
});
server.listen(port);
console.log("Listening on port " + port);
