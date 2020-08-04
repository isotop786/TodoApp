let express = require('express')
let app = express()
let port = 3000

// connecting to database
let db 
let mongodb = require('mongodb')
let connectionString = "mongodb+srv://todoAppUser:MaruF786@marufdb.wsaij.mongodb.net/TodoApp?retryWrites=true&w=majority"

mongodb.connect(connectionString, {useNewUrlParser:true}, function (err, client) {
  db = client.db()
  app.listen(port)
})
// database end

app.use(express.urlencoded({extended:false}))

app.get('/', function (req, res) {
  
  db.collection('items').find().toArray((err, item) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 font-weight-bold text-center py-1 text-warning">To-Do App!!! </h1>
    
    <div class="jumbotron p-3 shadow-sm ">
      <form action="/" method="POST">
        <div class="d-flex align-items-center ">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-info">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      ${item.map(e => {
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${e.text}</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`;
      }).join('')}
    </ul>
    
  </div>
  
</body>
</html>
    `);
  })

   

})


//post method
app.post('/', (req, res) => {
  let item = req.body.item
  if (item != '') {
     db.collection("items").insertOne({ text: item }, function () {
       res.redirect('/')
     });
  } else {
     
    res.send(` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <div class="alert alert-danger">Sorry can not be empty</div>`);
   
  }
 
})





























// let express = require('express')
// let port = 3000
// let app = express()
// // app.use(express.urlencoded({extended:false}))

// app.use(express.urlencoded({ extended: false }))


// app.get('/', function (req, res) {
//     res.send(`
//     <form action="/answer" method="post">
//     <p>What color is in the sky on a clear sunny day</p>
//     <input name="color">
//     <button>Submit</button>
//     </form>
//     `)
// })


// app.post('/answer', function (req, res) {
//     // let ans = req.body.color

//     // res.send(`<h1>Hello! you poor litte ${ans}</h1>`)

//     let ans = req.body.color

//     if (ans == "blue") {
//         res.send(`
//         <p style="color:green">Congrats, it's the correct answer</p>
//         <a href="/">Back to Homepage</a>
//         `)
//     } else {
//         res.send(`<p style="color:red">Sorry, whatever you've answerd that damn wrong</p>
//         <a href="/">Back to Homepages</a>`)
//     }


// })
// app.listen(port)