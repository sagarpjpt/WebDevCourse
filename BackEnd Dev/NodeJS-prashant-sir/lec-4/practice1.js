const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req);
  if (req.url === "/" || req.url === "/home") {
    res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Myntra</title>
                </head>
                <body>
                    
                    <nav>
                        <!-- title -->
                        <h3>Myntra</h3>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/men">Men</a></li>
                            <li><a href="/women">Women</a></li>
                            <li><a href="/kids">Kids</a></li>
                            <li><a href="/cart">Cart</a></li>
                        </ul>
                    </nav>

                </body>
                </html>
            `);
    return res.end();
  }

  if(req.url.toLowerCase() === '/men'){
    res.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Myntra</title>
              </head>
              <body>
                  
                  <h1>THIS IS MENS SECTION</h1>

              </body>
              </html>
            `)
    return res.end()
  }

  if(req.url.toLowerCase() === '/women'){
    res.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Myntra</title>
              </head>
              <body>
                  
                  <h1>THIS IS WOMEN SECTION</h1>

              </body>
              </html>
            `)
    return res.end()
  }

  if(req.url.toLowerCase() === '/kids'){
    res.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Myntra</title>
              </head>
              <body>
                  
                  <h1>THIS IS KIDS SECTION</h1>

              </body>
              </html>
            `)
    return res.end()
  }

  if(req.url.toLowerCase() === '/cart'){
    res.write(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Myntra</title>
              </head>
              <body>
                  
                  <h1>THIS IS CART SECTION</h1>

              </body>
              </html>
            `)
    return res.end()
  }

  // sending response to client
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Coding</title></head>");
  res.write("<body><h1>404 Page not found</h1></body>");
  res.write("<html/>");
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server process listening on http://localhost:${PORT}`);
});
