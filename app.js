//Problem: Need a simple way to look at a user's badge count and JS points from a web browser

//Solution: Use Node.js to preform the profile look ups and server our template via HTTP
const router = require('./router.js');
//1. Create a Web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  request.statusCode = 200;
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
    

