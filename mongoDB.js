//This is API Operations Using MongoDB Database and Postman
//Here we do operations on mongo database Directly

const { request, response } = require('express')
const express = require('express')

const MongoClient = require('mongodb').MongoClient
const app = express()

var database;
app.use(express.json())

app.get('/', (request, response) => {
    response.send("Welcome to MongoDB and Node JS.. ")
})

//Get all Books
app.get("/api/books", (request, response) => {
    database.collection('books').find({}).toArray((error, result) => {
        if (error) throw error
        response.send(result)
    })
})

//Get book by ID
app.get("/api/books/:id", (request, response) => {
    database.collection('books').find({ id: parseInt(request.params.id) }).toArray((error, result) => {
        if (error) throw error
        if (result.length > 0)
            response.send(result)
        else
            response.send("No Book ID Matched")
    })
})

//Add new book
app.post("/api/books/addBook", (request, response) => {
    let res = database.collection('books').find({}).sort({ id: -1 }).limit(1)
    res.forEach(obj => {
        let book = {
            id: obj.id + 1,
            bookname: request.body.bookname,
            price: request.body.price
        }
        database.collection('books').insertOne(book, (error, result) => {
            if (error) response.status(500).send(error)
            response.send("Data added Successfully..")
        })
    });

})


//Update Book Details
app.put("/api/books/:id", (request, response) => {
    let book={
        id : parseInt(request.params.id),
        bookname: request.body.bookname,
        price: request.body.price
    }
    let dataset={
        $set:book
    }
    database.collection('books').updateOne({id : parseInt(request.params.id)},dataset,(error,result)=>{
        if(error) throw error
        response.send("Data Updated Successfully...")
    })

})

//To delete a book by ID 
app.delete("/api/books/:id", (request, response) => {
    database.collection('books').deleteOne({ id: parseInt(request.params.id) }, (error, result) => {
        if (error)throw error
        response.send("Book Deleted Successfully..")
    })
})




//Create a Node JS and MongoDB Connection
app.listen(1234, () => {
    MongoClient.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (error, result) => {
        if (error)
            throw error;
        database = result.db('myDatabase')
    })
    console.log("Connection Successful..")
})