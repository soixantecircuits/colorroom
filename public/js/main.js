var ctn = document.getElementById('js-ctn');

function initSocket(){
  var socket = io('http://localhost:8080');
  socket.on('button-pressed', function (index) {
    ctn.style = 'background-color:' + config.colors[index];
  });
}

initSocket();