const http = require('http');
const url = require('url');
const Router = require('./controller/router.js');
const BaseController = require('./controller/baseController.js');
const db = require('./model/database.js');

db.connect;

const server = http.createServer(async (req, res) => {
  let parseUrl = url.parse(req.url, true);
  let path = parseUrl.pathname;
  let trimPath = path.replace(/^\/+|\/$/g, '');
  let { controller, action } = BaseController.parsePath(trimPath);
  let handler = Router[controller][action];
  // console.log(BaseController.parsePath(trimPath));
  try { handler(req, res) } catch (err) { Router.notFound.view(req, res) };
})

const PORT = 8080;
server.listen(PORT, function () {
  console.log(`server running at localhost:${PORT}`);
});