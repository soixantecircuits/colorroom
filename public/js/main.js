var ctn = document.getElementById('js-ctn');
var currentIndex;
var colors = [];

function initColors(){
  $.getJSON(config.colorsList.file, function (data) {
    if(data.colors.length){
      colors = [];
      $.each(data.colors, function (key, val) {
        colors.push(val.code);
      });
    }
  });
}

function initSocket(){
  var pushermanSocket = io(config.socketio.address + ':' + config.socketio.ports.pusherman);
  var flywriterSocket = io(config.socketio.address + ':' + config.socketio.ports.flywriter);

  pushermanSocket
  .on('button-pressed', function (index) {
    currentIndex = index - 1;
    ctn.style = 'background-color:' + colors[index - 1];
  });

  if(config.liveUpdate){
    flywriterSocket
    .on('live-change', function (color){
      ctn.style = 'background-color:' + color;
      colors[currentIndex] = color;
    })
    .on('reload-config', function(){
      initColors();
    })
  }
}

initColors();
initSocket();