const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/gimnasiodb';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))

module.exports = mongoose;