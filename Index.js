const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./ServerData/Config');

const User = require('./ServerData/UserSchema');
const Books = require('./ServerData/ProductSchema');

const app = express();
const port = 3001;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Add Book in db
    app.post('/addbooks', async (req, res) => {
        try {
            const {
                bookTitle,
                authorName,
                category,
                bookDescription,
                imageUrl,
                bookPdfLink,
            } = req.body;

            if (!bookTitle || !authorName || !category || !bookDescription || !imageUrl || !bookPdfLink) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            const newBook = new Books({
                bookTitle,
                authorName,
                category,
                bookDescription,
                imageUrl,
                bookPdfLink,
            });
            const savedBook = await newBook.save();
    
            console.log('Saved Book:', savedBook);
    
            res.json({
                message: 'Book added successfully!',
                data: savedBook,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    //Get All data
    app.get('/allbooks', async (req, res) => {
        try {
          const allBooks = await Books.find();
          console.log(allBooks);
          res.status(200).json(allBooks);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
    
      // Update a specific book by ID
        app.put('/updatebook/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const {
                    bookTitle,
                    authorName,
                    category,
                    bookDescription,
                    imageUrl,
                    bookPdfLink,
                } = req.body;
                // Check if any required field is missing or empty
                if (!bookTitle || !authorName || !category || !bookDescription || !imageUrl || !bookPdfLink) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                // Find the book by ID and update its fields
                const updatedBook = await Books.findByIdAndUpdate(
                    id,
                    {
                        bookTitle,
                        authorName,
                        category,
                        bookDescription,
                        imageUrl,
                        bookPdfLink,
                    },
                    { new: true } // Set {new: true} to return the updated document
                );
                if (!updatedBook) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                res.json({
                    message: 'Book updated successfully!',
                    data: updatedBook,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });

        // For Product Delete
        app.delete('/deletebook/:id', async (req, resp) => {
            let result = await Books.deleteOne({_id:req.params.id})
            resp.send(req.params);
        });

        // get single data from id
        app.get('/book/:id', async (req, resp) => {
            try {
                let result = await Books.findOne({ _id: req.params.id });
        
                if (result) {
                    resp.send(result);
                } else {
                    resp.status(404).send('Book not found');
                }
            } catch (error) {
                resp.status(500).send('Internal Server Error'); 
            }
        });

    
app.get('/',(req,res) => {
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});