const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle : String,
    authorName:String,
    category:String,
    bookDescription:String,
    imageUrl:String,
    bookPdfLink:String,

});

module.exports = mongoose.model('books',bookSchema);