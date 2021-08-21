/* Ousiastika einai to server ayto to js file*/ 


const express = require('express')
const path = require('path')
const app = express()
const port = 8080
var exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mysql = require('mysql');
const { connect } = require('http2');


app.use(express.static(__dirname + '/public'));

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

/* MySQL stuff */

// dhmiourgia syndeshs me th vash.
const pool = mysql.createConnection({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'bookDB'
});


// find all books.
app.get('/books' , (req,res) => {
    pool.query('SELECT * FROM books' , (err,rows) => {
        if (!err){
            var data = JSON.stringify(rows);
            var jdata = JSON.parse(data);
            res.send(jdata);
        } else{
            console.log(err);
        }
    })
})

// get book by id.
app.get('/books/:id' , (req,res) => {
    pool.query('SELECT * FROM books WHERE id = ?',[req.params.id],(err,rows) => {
        if (!err){
            var data = JSON.stringify(rows);
            var jdata = JSON.parse(data);
            res.send(jdata);
        }else{
            console.log(err);
        }
    })
})

// Delete a book
app.delete('/books/:id' , (req,res) => {
    const params = req.body;
    pool.query('DELETE FROM books WHERE id = ?',[params.id],(err,rows) => {
        if (!err){
            console.log("Book with ID : " + params.id + " has been deleted successfully.");
        }else{
            console.log(err);
        }
    })
})

// Add a book
app.post('/books' , (req,res) => {
    const params = req.body;
    pool.query('INSERT INTO books SET title = ?, author = ?, id = ?' , [params.title,params.author,params.id] , (err,rows) => {
        if (!err){
            console.log("Book " + params.title + " has been added succesfully.");
        }else{
            if (err.errno == 1062){ // handle to sfalma diplotypwn gia na dwsoume mhnyma sthn konsola.
                console.log("Book " + params.title + " has already been added.");
            }else{
                console.log(err);
            }
        }   
    })
})

// Update a book
app.put('/books' , (req,res) => {
    const params = req.body;
    pool.query("UPDATE books SET title = ? , author = ?, review = ? WHERE id = ?", [params.title,params.author,params.review,params.id], (err,rows) => {
        if (!err){
            console.log('Book with id : ' + params.id + " has been updated.");
        }else{
            console.log(err);
        }
    })
})

/*Serve static content from directory "public",
it will be accessible under path /static, 
e.g*/

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.listen(port)