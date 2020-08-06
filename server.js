let express = require('express')
let app = express()
let port = 3000
let vue = require('vue')
let axios = require('axios')

// form data and json data handling 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//making css,js files available within our application
app.use(express.static('public'))

// connecting to database
let db 
let mongodb = require('mongodb')
let connectionString = "mongodb+srv://todoAppUser:MaruF786@marufdb.wsaij.mongodb.net/TodoApp?retryWrites=true&w=majority"

let localhost = "mongodb://localhost:27017/TodoApp";

mongodb.connect(localhost, { useNewUrlParser: true }, function (err, client) {
  db = client.db();
  app.listen(port);
});
// database end



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
      <form id="create-form" action="/" method="POST">
        <div class="d-flex align-items-center ">
          <input id="item-text" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button  class="btn btn-info">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul id="item-list" class="list-group pb-5">
      ${item
        .map((e) => {
          return `<li  class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <a href="item/${e._id}" class="item-text">${e.text}</a>
        <div>
          <button  data-id=${e._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button  data-id=${e._id}  class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`
        })
        .join("")}
    </ul>
    
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="/browser.js"></script>
</body>
</html>
    `);
  })

   

})


//post method
app.post('/', (req, res) => {
  // let item = req.body.item
  let text = req.body.text
  if (text != '') {
     db.collection("items").insertOne({ text: text }, function (err,info) {
       res.json(info.ops[0])
     });
  } else {
     
    res.send(` <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <div class="alert alert-danger">Sorry can not be empty</div>`);
   
  }
 
})


/// update method

app.post("/update-item", (req, res) => {
  // console.log(req.body.text)
  let updatedText = req.body.text
  if (updatedText != " " || updatedText != null) {
    db.collection("items").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.body.id) }, { $set: { text: updatedText } }, () => {
        res.send("Success");
      }
    );
  } else {
    res.send('Can not be empty')
  }
});



//// delete item

app.post('/delete-item', (req, res) => {
  let id = req.body.id
  // console.log("Delete "+id)

  db.collection('items').deleteOne({ _id: new mongodb.ObjectId(id) }, () => {
    res.redirect('/')
  })


})






// loading singple items in different page and url
app.get('/item/:id',(req, res)=>{
  let id = req.params.id

  db.collection('items').find({ _id: new mongodb.ObjectId(id) }).toArray((err, item) => {
    res.send(`${item.map(e => {
   return `<span>${e.text}</span>`
    })}`)
  })


  // db.collection('items').findOne({ _id: new mongodb.ObjectId(id)})
})



// test 

// app.get("/single/:id", (req, res) => {
//   db.collection('items').findOne({ _id: new mongodb.ObjectId(req.param.id) }, e => {
//     console.log(e.text)
//   })
// })

























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