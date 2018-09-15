// Server Instance
const server = require('./server');

const serverPort = process.env.API_PORT || 41000;

// Initialize server
server.listen(serverPort, (err) => {
  if (err) {
    console.error(`Error initializing server: ${err.message}`);
  } else {
    console.log(`Server running at port: ${serverPort}`);
  }
});
