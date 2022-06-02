const express = require('express')
const axios = require('axios')

const cors = require('cors')

API_KEY = "AIzaSyC_WjgGfZpd8G9zXrb-VlHyxJSEGUDfv1s"

url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=free-ebooks&key=AIzaSyC_WjgGfZpd8G9zXrb-VlHyxJSEGUDfv1s"


const PORT = process.env.PORT || 8080

const app = express();


app.use(
    cors({
        origin: "http://localhost:4200"
    })
);

app.get('/', (req, res) => {
    res.json('Welcome to Library API!')
});

// API request to get books from Google Books API 

app.get('/books', (req, res) => { 



    let books = [];

    let booksList = [];

    axios.get(url).then(response => { 



        const html = response.data;

        booksList = html.items;

        console.log(booksList)

        // Go through all of the books and filter out the title, authors and thumbnail

        booksList.forEach(element => {

            console.log(element);

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


//Things to set up: 
//Connection to database 
//Get from database 
//set up user auth (password hashing)
