var restify= require('restify');
var db = require('./database')
var server = restify.createServer();
const restifyPlugins = require('restify-plugins');


// server.use(restify.bodyParser({
//   requestBodyOnGet: true
// }));
server.use(restifyPlugins.jsonBodyParser({
  mapParams: true
}));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({
  mapParams: true
}));
server.use(restifyPlugins.fullResponse());

server.get('/info', (req, res, next) => {
  res.send({
    data: db.all() || null
  })
  next()
});

server.get('/info/:app', (req, res, next) => {
  res.send({
    data: db.search({app: req.params.app})
  })
  next()
});

server.post('/info', (req, res, next) => {  
  res.send({
    data: db.insert('logs', req.body)
  })
  next()
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});