const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');


module.exports.dbConnect = async () => {
    try{
        await mongoose.connect(process.env.DB_URL,{useNewURLParser: true});
        console.log('Database is connected.....');
        
    } catch (error) {
        console.log(error.message);
        
    }
}