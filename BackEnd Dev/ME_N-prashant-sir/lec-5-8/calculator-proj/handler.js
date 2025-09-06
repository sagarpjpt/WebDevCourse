const {add} = require('./addTwoNo');
const requestHandler = (req, res) => {
    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'text/html')
    
    if(req.url === '/'){
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculator</title>
            </head>
            <body>
                <h1>Welcome to Calculator App</h1>
                <a href="/calculator">Go To Calc</a>
            </body>
            </html>    
        `)
        return res.end()
    }

    if(req.url.toLowerCase() === '/calculator'){
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculator</title>
            </head>
            <body>
                <h1>Welcome to Calculator page</h1>
                <a href="/">Go To Home Page</a>
                <br><br>
                <form action="/calculate-result" method="POST">
                    <span>x:</span>
                    <input type="number" name="x">
                    <br><br>
                    <span>y:</span>
                    <input type="number" name="y">
                    <br><br>
                    <input type="submit" value="Sum">
                </form>
            </body>
            </html>
        `)
        return res.end()
    }

    if(req.url.toLowerCase() === '/calculate-result' && req.method === 'POST'){
        const body = [];
        let sum;
        req.on('data', chunk => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parseBody);
            const bodyObject = Object.fromEntries(params)
            console.log(bodyObject);
            sum = add(parseInt(bodyObject.x), parseInt(bodyObject.y));
            console.log(sum)

            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Calculator</title>
                </head>
                <body>
                    <h1>Sum is : ${sum}</h1>
                    <a href='/'>Go to Home</a>
                </body>
                </html>            
            `)
            res.end()
        })
        return 
    }

    res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculator</title>
            </head>
            <body>
                <h1>404 page not found</h1>
            </body>
            </html>    
        `)
    res.end()
}

exports.requestHandler = requestHandler;