// let express = require("express");
// let app = express.createServer();

let http = require("http");
let fs = require("fs");
let server = http.createServer();
let config = require('./config');

server.on('request', (req, res) => {
  fs.readFile(__dirname + '/html/index.html', (err, data) => {

    if (err) {
      console.log("error");
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    console.log(req.url);
  })

});


let socketio = require('socket.io');
let io = socketio.listen(server);

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);


// console.log("io.sockets:",io);

// Scoket Event
io.sockets.on('connection',
  (socket) => {

  // console.log("socket:", socket);
    socket.emit('greeting', {message: 'hello sockets'},
    (data) => {
      console.log('result: ' + data);
    });

  socket.on('updateTransform', (transform) => {
    // console.log("update:",transform);

    //dbに保存


    //自分以外に送る
    socket.broadcast.emit("updateResponse", transform);
    //自分にも送る
    socket.emit("updateResponse", transform);
  });

});

