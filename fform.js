import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name : String ,
    email : String ,
    msg : String
    
})

export default mongoose.model('Fform' , formSchema)