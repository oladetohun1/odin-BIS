const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath = './';
    if (req.url === '/' || req.url === '/index.html') {
        filePath += 'index.html';
    } else if (req.url === '/about') {
        filePath += 'about.html';
    } else if (req.url === '/contact-me') {
        filePath += 'contact-me.html';
    } else {
        filePath += '404.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile('./404.html', (err, content) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
