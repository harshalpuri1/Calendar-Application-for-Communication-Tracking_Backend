const express = require('express');
const cors = require('cors');
const routes = require('./src/routes.root');
const bodyParser = require('body-parser');
const errorHandler = require('./src/v1/auth/middlewares/errorhandler');
require('dotenv').config();
const http = require('http');

// Initialize the app first
const app = express();

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// Create server after app is defined
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Calendar Application for Communication Tracking, Your service is live 🎉');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    const { statusCode, message } = output.payload;
    res.status(statusCode).json({ status: false, statusCode, message });
  } else {
    res.status(500).json({ status: false, statusCode: 500, message: "Internal Server Error" });
  }
});

module.exports = app;
