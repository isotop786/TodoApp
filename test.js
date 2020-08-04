let http = require('http')
const port = 8000
let app = http.createServer(function (req, res) {
    res.end('Node Server running on port :' + port);

    if (req.url =="/") {
        res.end("Hello, and welcome to home page")
    }

    if (req.url == "/about") {
        res.end("About Page")
    }

})

app.listen(port)