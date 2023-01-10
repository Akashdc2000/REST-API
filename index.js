//This is API Operations Using Postman and Static data i.e books object/array


const { request, response } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

const books = [
    { title: 'C', id: 1 },
    { title: "C++", id: 2 },
    { title: "java", id: 3 },
    { title: "Python", id: 4 },
    { title: "JS", id: 5 },
    { title: "Node JS", id: 6 }
]


app.get('/', (request, response) => {
    response.send("<h1>Hello Everyone</h1>")
})

app.get('/api/books', (request, response) => {
    response.send(books)
})

app.get('/api/books/:id',(request,response)=>{
    const book=books.find(v=>v.id ===parseInt(request.params.id))

    if(!book) 
        response.status(404).send("Book not found ")
    else
        response.send(book)

})

app.post("/api/books/addBook",(request,response)=>{
    const book={
        id: books.length+1,
        title:request.body.title
    }
    books.push(book);
    response.send(book);

})

app.put("/api/books/:id",(request,response)=>{
    const book=books.find(v=>v.id === parseInt(request.params.id))
    if(!book)
        response.status(404).send("Book is not Found")
    else
        book.title=request.body.title;
    response.send(book);
})


app.delete("/api/books/:id",(request,response)=>{
    const book=books.find(v=>v.id===parseInt(request.params.id))

    if(!book)
        response.status(404).send("Book Doesn't Exist")
    const index=books.indexOf(book);
    books.splice(index,1);
    response.send(book)
})

const server=app.listen(1234, (error) => {
    console.log("Server Listening at 1234")
})

console.log(server.address().address+" "+server.address().port);