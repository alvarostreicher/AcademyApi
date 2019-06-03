import mongoose  from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categories: []
});

export default mongoose.model('Categories', CategorySchema, 'categories');