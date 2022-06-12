const express = require('express')
const axios = require('axios')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')


let currentUser = "";

API_KEY = "AIzaSyDiWI447DKTfOXdnxgF0Ak6Kcng6Ebcua4"

url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=25&filter=free-ebooks&key=${API_KEY}`


const PORT = process.env.PORT || 8080

const app = express();

//Create connection with database

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "library"
})

//Connect to database

connection.connect(err => { 

    if (err) throw err;

    console.log("Connected!")
})


app.use(
    cors({
        origin: "http://localhost:4200"
    })
);

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Welcome to Library API!')
});

//Check if the login info matches the user info in the database

app.post('/login', async (req,res) => {

    let databaseUser = {username: "", password: ""};

    const user = req.body;

    const getUserQuery = `SELECT username, password FROM users WHERE username='${user.username}'`;

    connection.query(getUserQuery, async (err, result) => {

        if(err) throw err;

        databaseUser = result[0]

              
        if(databaseUser == undefined){

            res.send("User not found! Please try again!")

            console.log("User not found!")

        }else if(await bcrypt.compare(user.password, databaseUser.password)){
        
            res.send('Login Successful!')

            currentUser = databaseUser.username
         

       }else{

            res.send("Login Failed! Please try again!")
        
 
      }

      
    })


})

//Creates a new user 

app.post('/createUser', async (req, res) => {

    const user = req.body;

    console.log(user)

    user.password = await hashPassword(user.password)

    const sql = `INSERT INTO users(username, password) VALUES ('${user.username}', '${user.password}')`

    connection.query(sql, (err, response) => {
        if (err) throw err; 

    })
})

//Show a list of all signed up users
app.get('/showusers', async (req, res) => {

    const sql = "SELECT * FROM users;"

    connection.query(sql, (err, result) => {

        if(err) throw err;

        res.send(result)
    })


})


//Add the book that the user rented
app.post('/addBook', (req, res) => {

    const book = req.body

    const sql = `INSERT INTO user_books(user_id, title, author, thumbnail, description, publisher, categories)
    VALUES((SELECT id FROM users WHERE username='${currentUser}'), 
    '${book.title}', 
    '${book.author}', 
    '${book.thumbnail}', 
    '${book.description}',
    '${book.publisher}',
    '${book.categories}');`;

    connection.query(sql, (err, response) => {
        if(err) throw err;
    })




})

//Get the books the user has rented
app.get('/getbooks/:username', (req, res) => {



    const username = req.params.username



    var id = 0;



    const sql1 = `SELECT id FROM users WHERE username='${username}'`

    connection.query(sql1, (err, response) => {
        if(err) throw err;

        id = response[0].id

        const sql2 = `SELECT * FROM user_books WHERE user_id=${id}`

        connection.query(sql2, (err, result) =>{
    
            
            if(err) throw err; 
    
            res.send(result)
    
    
        })

      


    })

  



  

})

// API request to get books from Google Books API 

app.get('/books', (req, res) => { 



    let books = [];

    let booksList = [];

    axios.get(url).then(response => { 



        const html = response.data;

        booksList = html.items;

        

        // Go through all of the books and filter out the title, authors and thumbnail

        booksList.forEach(element => {

            let  info = element.volumeInfo

            let image = element.volumeInfo.imageLinks

            books.push({
                title: info.title,
                author: info.authors,
                thumbnail: image.thumbnail,
                description: info.description,
                publisher: info.publisher,
                categories: info.categories

            });
        });
        
        res.send(books)
        
    })

  

    

})



// Connection to Express server

app.listen(PORT, (err) => {

    if (err) console.log(err)

    console.log(`Listening on ${PORT}`)


})


async function hashPassword(pass){

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword;

}