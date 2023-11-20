const mongoose = require('mongoose');

const URI = 'mongodb://localhost/gimnasiodb';

mongoose.connect(URI)
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))
    
module.exports = mongoose;