const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req);
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server process listening on http://localhost:${PORT}`);
})