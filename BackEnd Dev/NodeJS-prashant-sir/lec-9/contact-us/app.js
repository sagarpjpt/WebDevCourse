const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('first dummy middleware', req.url, req.method)
    next()
})

app.use((req, res, next) => {
    console.log('second dummy middleware',req.url, req.method)
    next()
})

// app.use((req, res, next) => {
//     console.log('third dummy middleware', req.url, req.method)
//     res.send(
//         `<p>welcome</p>`
//     )
//     next()
// })

app.get('/', (req, res, next) => {
    console.log('handling / for get ', req.url, req.method)
    res.send('<h1>welcone to home pagee</h1>')
})

app.get('/contact-us', (req, res, next) => {
    console.log('handling / for get', req.url, req.method)
    res.send(`
        <h1>please give your details</h1>
        <form action='/contact-us' method='POST'>
            <input type = 'text' name='name' placeholder='enter your name' />
            <input type = 'email' name='email' placeholder='enter your email' />
            <input type = 'submit' />
        </form>     
    `)
})

app.post('/contact-us', (req, res, next) => {
    console.log('handling /contact-us for post', req.url, req.method)
    res.send(
        `<h1>we will contact you shortly</h1>`
    )
})

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`server running on address http://localhost:${PORT}`)
})