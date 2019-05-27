import mongoose  from 'mongoose';

const CategorySchema = new mongoose.Schema({
    type: String
});

export default mongoose.model('Categories', CategorySchema, 'categories');