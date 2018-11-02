let io = require('socket.io-client');
let url = "http://localhost:3000";
let online = "http://ec2-13-229-64-160.ap-southeast-1.compute.amazonaws.com:3000/";

let socket = io(online);

socket.on('connect', (data) => {
  console.log("connect!");
});

socket.on('updateResponse', (transform) => {
  console.log("transform:", transform);
});


setTimeout(() => {
  console.log("3 times");
  let transform = {position: {x: 100, y: 100, z: 100}};
  socket.emit("updateTransform", transform);
}, 3000);

