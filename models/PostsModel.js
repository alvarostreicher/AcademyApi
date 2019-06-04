import mongoose  from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: [],
    show: {
        type: Boolean,
        required: true,
        default: true
    }

});

export default mongoose.model('Posts', PostSchema);