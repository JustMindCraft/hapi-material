const Koa = require('koa')
const port = parseInt(process.env.PORT, 10) || 3000
const app = require('./NextApp.js');
const router = require("./router/index");
const initDB = require("./db/initDB");
const seed = require("./db/seed");
const registerSockects = require("./sockets")
require('fs');
const path = require('path')
const static = require('koa-static');
var parse = require('co-body');
var co = require("co");

var thunkify = require('thunkify');

app.prepare().then(() => {
  initDB();
  
  const server = new Koa();
  const staticPath = './public';
  server.use(static(
    path.join( __dirname,  staticPath)
  ))
  const KoaServer = require('http').createServer(server.callback());
  const bodyParser = require('koa-bodyparser');
  //middlewares
  server.use(bodyParser());
  server.use(require('./middles/scope'));
  server.use(require('./middles/access'));
  const views = require('koa-views')
  server.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
  }))

  server.use(router.routes())
  .use(router.allowedMethods());
  


  const io = require('socket.io')(KoaServer);
  KoaServer.listen(port, async () => {
    await seed();
    console.log(`> Ready on http://localhost:${port}`)
  });
  io.on('connection', async (socket) => {
    registerSockects(socket);
  });
})
