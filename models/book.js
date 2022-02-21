let mongoose = require('mongoose');

///create model class

let bookModel = mongoose.Schema({
    name: String,
    ContactNumber: String,
    Email: String
   
},
{
    collection:"books"
})

module.exports = mongoose.model('Book', bookModel)