const path = require('path');
const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');

const port = process.env.PORT || 3000;

const run = async () => {
  const app = express();

  app.set('json spaces', 2);
  app.set('subdomain offset', 1);

  app.use(compression());
  app.use(methodOverride());
  app.use(cors({ origin: '*' }));
  app.use(express.json());

  app.on('error', error => {
    switch (error.code) {
      case 'EACCES':
        console.error(`${port} requires elevated privileges`);

        return process.exit(1);

      case 'EADDRINUSE':
        console.error(`${port} is already in use`);

        return process.exit(1);

      default:
        throw error;
    }
  });

  process.on('unhandledRejection', error => {
    console.log('!!! Unhandled Rejection !!!', error);
  });

  process.on('uncaughtException', error => {
    console.log('!!! Uncaught Exception !!!', error);
  });

  app.use(express.static(path.join(__dirname, './build')));

  // Ako odemo na bilo koju rutu (stranicu) na nasem domenu 
  // moramo da user-u vratimo kao odgovor index.html  
  // u kojem se nalazi nasa react aplikacija 
  // i react aplikacija unutar svoje logike 
  // ce da prikaze user-u 
  // stranicu koju treba da vidi 
  app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, './build/index.html'));
  });

  app.listen(port, error => {
    if (error) throw error;

    console.log(`todo app started 🌱 at port ${port}`);
  });
};

run();
