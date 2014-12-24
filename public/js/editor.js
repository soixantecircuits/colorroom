var pushermanSocket = io('http://localhost:8080');
var flywriterSocket = io('http://localhost:5555');

pushermanSocket
.on('init-color', function (index){
  $('#js-button-info').text(index);
  createColorPicker(colors[index]);
})
.on('button-pressed', function (index){
  $('#js-button-info').text(index);
  updateColorPicker(colors[index]);
});

flywriterSocket.on('connect', function(){
  flywriterSocket.emit('binding', config.location);
})

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
        console.log(color);
        flywriterSocket.emit('update-file', color);
      }
  });
}
