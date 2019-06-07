import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/index';
import morgan from 'morgan';
import cors from 'cors';
require('dotenv/config');
import nedb from 'nedb';

let postsDb = new nedb({ filename: './posts.db', autoload: true });

const app = express();

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true})
.then(() => {
    console.log('DB connection successful')
})
.catch(err => console.error(err));

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(router);

app.get('/api/v1/categories', (req, res)=>{
    const categories =[
        "travel",
        "lifestyle",
        "business",
        "food",
        "work"
    ]
    res.status(200).send(categories);
})

app.post('/api/v1/posts',(req, res)=>{
    const body = req.body;
    console.log(body)
    if(Object.keys(req.body).length > 0){
    body.show = true;
    body.date = new Date();
    body.comments = [];
    if(body.description.length > 150){
        body.shortDescription = body.description.substr(0,150)
      }else {
        body.shortDescription = body.description;
      }
        postsDb.insert(body, (err, newDoc)=>{
            if(err){
                res.status(400).send(newDoc)
            }
            res.status(201).send(newDoc);
        })
    }else {
        res.sendStatus(400);
    }
})

app.get('/api/v1/posts', (req, res)=>{
     postsDb.find({show: true}).sort({ date: -1}).exec((err, posts)=>{
        res.status(200).send(posts)
     });
     
    
});

app.post('/api/v1/posts/post', (req, res)=> {
    const posts = req.body;
    if(Object.keys(req.body).length > 0){
        if(posts.description.length > 150){
            posts.shortDescription = posts.description.substr(0,150)
          }else {
            posts.shortDescription = posts.description;
          }
        postsDb.update({_id: posts.id}, {$set: posts}, {returnUpdatedDocs: true}, (err, number, post)=>{
            console.log('----->',post)
            if(err){
                return res.status(500).send({ error: err.errors })
            }
            res.status(201); res.send(post);
        })
    }else {
        res.sendStatus(400);
    }
})

app.get('/api/v1/posts/:id', (req, res)=>{
    const { id } = req.params;
    postsDb.findOne({ _id: id }, (err, post)=>{
        if(err) return res.sendStatus(400)
        res.status(200).send(post)
    })
})

app.post('/api/v1/posts/comment/:id', (req, res)=>{
    let posts = req.body;
    if(Object.keys(req.body).length > 0){
        posts._id = Math.floor(Math.random() * 1) + 100;
        postsDb.update({ _id: req.params.id}, { $addToSet: { comments: posts } }, {returnUpdatedDocs: true}, (err, number, post)=>{
            if(err){
                return res.status(500).send({ error: err.errors })
            }
            res.status(201); res.send(post); 
        })
    }else {
        res.sendStatus(400);
    }
})

app.post('/api/v1/posts/delete', (req, res)=> {
    const { _id } = req.body;
    if(Object.keys(req.body).length > 0){
        postsDb.update({_id}, { $set: { show: false } }, { returnUpdatedDocs: true }, (err,number,post)=>{
            if(err){
                return res.status(500).send({ error: err.erros })
            }
            res.status(201).send(post)
        } )
    } else {
        res.sendStatus(400);
    }
})

export default app;