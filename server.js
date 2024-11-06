const path = require('path');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;

console.log('Starting server with following environment:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${port}`);
console.log(`Current directory: ${process.cwd()}`);
console.log('Directory contents:', require('fs').readdirSync('.'));

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    console.log('Next.js app prepared');
    const server = express();

    server.get('*', (req, res) => {
      console.log(`Handling request for: ${req.url}`);
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
      console.log('Server successfully started');
    });
  })
  .catch((err) => {
    console.error('Error starting server:');
    console.error(err);
    process.exit(1);
  });

// Gestione errori non catturati
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});