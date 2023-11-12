// Create web server

// 1. Create web server
// 2. Handle request and response
// 3. Create a route for GET /comments
// 4. Return all comments in JSON format
// 5. Create a route for POST /comments
// 6. Read comments from request body
// 7. Add comment to comments array
// 8. Return added comment in JSON format

const http = require('http');
const url = require('url');
const fs = require('fs');

const comments = [
  { id: 1, author: 'Evan', text: 'Hello!' },
  { id: 2, author: 'You', text: 'Hello there!' },
];

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);

  if (method === 'GET' && parsedUrl.pathname === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (method === 'POST' && parsedUrl.pathname === '/comments') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const comment = JSON.parse(bodyString);

      comments.push(comment);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comment));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('Server listening on port 3000'));