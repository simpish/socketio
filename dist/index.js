let http = require("http");
let fs = require("fs");
let server = http.createServer();
let config = require('./config');
let io = require('socket.io');

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


//SocketServer
io.listen(server);

// Scoket Event
io.sockets.on('connection', (socket) => {
  socket.emit('greeting', {message: 'hello'},
    (data) => {
      console.log('result: ' + data);
    });
});

io.sockets.on('updateTransform', (transform) => {
  console.log("update:",transform);
});

// Scoket Event


// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);


