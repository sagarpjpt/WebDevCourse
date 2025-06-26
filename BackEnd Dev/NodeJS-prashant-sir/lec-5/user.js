const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log(req)
    res.setHeader('Content-Type', 'text/html')
    if(req.url === '/'){
        res.write
        (`
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>

            <body>

                <h1>Enter Details</h1>

                <form action="/submit-details" method="POST">

                    <input type="text" placeholder="enter your name:" name="username" />

                    <br><br>

                    <input type="radio" name="gender" id="male" value="male" />
                    <label for="male">Male</label>

                    <br>

                    <input type="radio" name="gender" id="female" value="female" />
                    <label for="female">Female</label>

                    <br><br>

                    <input type="submit" value="Submit">

                </form>
            </body>

            </html>
        `)
        return res.end()
    }

    if(req.url.toLowerCase() === '/submit-details' && req.method === "POST"){
        // writing formdata recieved from client and save to a file name user.txt

        const body = [];

        // reading chunks
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })

        // buffering chunks
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)

            // parsing request
            const params= new URLSearchParams(parsedBody);
            const bodyObject =  {};
            for(const [key, value] of params.entries()){
                bodyObject[key] = value;
            }
            console.log(bodyObject) //{ username: 'shivam', gender: 'male' }

            // writing to file 
            fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
        })

        res.write
        (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Form Submitted</h1>
            </body>
            </html>
        `)

        // res.setHeader('location', '/') redirect it to '/' page
        return res.end()
    }

    res.write
    (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>404 page not found</h1>
        </body>
        </html>    
    `)
    res.end()
})

const PORT = 3000;
server.listen(PORT, () =>{
    console.log(`server listening on http://localhost:${PORT}`)
})
