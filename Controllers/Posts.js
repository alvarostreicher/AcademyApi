import Posts from '../models/PostsModel';
import { ObjectId } from 'mongodb';

class PostsController {
 async addPost ( req, res )  {
    const posts = new Posts(req.body);
    if(posts.description.length > 350){
      posts.shortDescription = posts.description.substr(0,200)
    }else {
      posts.shortDescription = posts.description;
    }
    await posts.save(
      (err, post) => {
        if(err){
          console.log('entro al error')
          return res.status(402).send({ error: err.errors})
        }
       return res.status(201).send(post)
      });
  }

  async postDelete ( req, res ) {
    const { _id } = req.body;
    await Posts.findByIdAndUpdate(_id, { $set: { show: false } }, {new: true}, (err, post)=> {
      if(err){
        return res.status(500).send({ error: err.erros })
      }
      res.status(201).send(post)
    })
  }

  async postEdit ( req, res ) {
    const posts = req.body;
    console.log(posts);
    await Posts.findByIdAndUpdate(posts.id, {$set: posts},{new: true}, (err, post)=>{
      if(err){
        return res.status(500).send({ error: err.errors })
      }
      res.status(201).send(post);
    })
    
  }

  async postFilter ( req, res ) {
    const { filter } = req.query;
    await Posts.find({ category: filter }, (err, post)=>{
      if(err){
        return resizeTo.status(404).send({ error: err.errors })
      }
      res.status(200).send(post)
    })
    
  }

  async AddComment ( req, res ) {
    let posts = req.body;
    posts._id = ObjectId();
    console.log(posts)
    await Posts.findByIdAndUpdate(req.params.id,{ $addToSet: { comments: posts } }, {new: true},
      (err, post) => {
        if(err){
          return res.status(500).send({ error: err.errors })
        }
        return res.status(201).send(post)
      } )
  }

  async getAllPosts ( req, res ) {
    const posts = await Posts.find({show: true}).sort({ date: -1 });
    res.status(200).send(posts)
  }

  async getOnePost (req, res) {
    const { id } = req.params;
    const posts = await Posts.findById({ _id: id }, (err, post) => {
      if(!err){
        res.status(200).send(post);
      }else {
        res.status(404).send({ error: 'such post was not found'})
      }
    });
    
  }
}

const postController = new PostsController();
export default postController;