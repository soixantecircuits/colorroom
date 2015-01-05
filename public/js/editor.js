if(config.liveUpdate){
  var pushermanSocket = io(config.socketio.address + ':' + config.socketio.ports.pusherman);
  var flywriterSocket = io(config.socketio.address + ':' + config.socketio.ports.flywriter);
  var currentIndex;
  var currentColor;
  var colors = [];
  var saveTimer;

  function initColors(){
    $.getJSON('../' + config.colorsList.file, function (data) {
      if(data.colors.length){
        colors = [];
        $.each(data.colors, function (key, val) {
          colors.push(val);
        });
      }
    });
  }

  function initSockets(){
    pushermanSocket
    .on('init-color', function (index){
      $('#js-button-info').text(index);
      currentIndex = index;
      currentColor = colors[index];
      createColorPicker(colors[index]);
    })
    .on('button-pressed', function (index){
      $('#js-button-info').text(index);
      currentIndex = index;
      updateColorPicker(colors[index]);
    });

    flywriterSocket
    .on('connect', function(){
      flywriterSocket.emit('binding', {
        path: config.colorsList.systemPath + config.colorsList.file,
        color: colors[currentIndex]
      });
    });
  }

  function updateColorPicker (color){
    $("#js-colorpicker").trigger("colorpickersliders.updateColor", color);
  }

  function createColorPicker(color){
    $("#js-colorpicker").ColorPickerSliders({
      color: color,
      flat: true,
      sliders: true,
      swatches: false,
      hsvpanel: true,
      grouping: true,
      size: 'lg',
      onchange: function (container, color){
        var hex = '#' + toHex(color.rgba.r) + toHex(color.rgba.g) + toHex(color.rgba.b);
        document.body.style = 'background-color:' + hex;
        colors[currentIndex] = hex;
        currentColor = hex;
        flywriterSocket.emit('update-color', hex);
        autoSave();
      }
    });
  }

  function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function autoSave(){
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function(){
      flywriterSocket.emit('update-file', colors);
    }, 500);
  }

  initColors();
  initSockets();
}
