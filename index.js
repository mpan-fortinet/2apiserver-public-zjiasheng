const server = require("./app.js");
const debugLogger = require('./utils/logger.js');
const ini = require("./utils/ini");
const wsObj = require("./web/websock")
server.on('upgrade', function upgrade(request, socket, head) {
 // const { pathname } = parse(request.url);
 const urlmap = new URL(request.url,"http://nouse")
 const pathname = urlmap.pathname 
  console.log(pathname)
  if (pathname === '/ws') {
    wsObj.handleUpgrade(request, socket, head, function done(conn) {
      console.log("request",request)
      const envIp = "1.1.1.1"
      // 这里request可以换成参数
      wsObj.emit('connection', conn, envIp);
    });
  } else {
    socket.destroy();
  }
});
server.listen(ini.listenport, function () {
    debugLogger.log(`listen: ${ini.listenport}`);
  });