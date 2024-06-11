const mongoose = require('mongoose');


// Defining the data base
// const db = mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
  
// module.exports = db


// Local Dev
const db = mongoose.connect('mongodb://localhost/VisionPro');
module.exports = db

