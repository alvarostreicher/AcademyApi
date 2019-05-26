import mongoose  from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

export default mongoose.model('Posts', PostSchema);