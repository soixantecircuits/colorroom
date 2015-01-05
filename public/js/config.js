var config = {
  limit: 48,
  colorsList: {
    file: 'config/colors.json',
    systemPath: '/home/hugo/sources/nodejs/colorroom/public/'
  },
  socketio: {
    address: 'http://192.168.1.16',
    ports: {
      pusherman: 8080,
      flywriter: 5555
    }
  }
}