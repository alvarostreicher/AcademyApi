import Posts from '../models/PostsModel';
import { ObjectId } from 'mongodb';

class PostsController {
 addPost ( req, res )  {
    const posts = new Posts(req.body);
    if(posts.description.length > 350){
      posts.shortDescription = posts.description.substr(0,200)
    }else {
      posts.shortDescription = posts.description;
    }
     posts.save(
      (err, post) => {
        if(err){
          console.log('entro al error')
          return res.status(402).send({ error: err.errors})
        }
       return res.status(201).send(post)
      });
  }

  postDelete ( req, res ) {
    const { _id } = req.body;
     Posts.findByIdAndUpdate(_id, { $set: { show: false } }, {new: true}, (err, post)=> {
      if(err){
        return res.status(500).send({ error: err.erros })
      }
      res.status(201).send(post)
    })
  }

   postEdit ( req, res ) {
    const posts = req.body;
    if(posts.description.length > 350){
      posts.shortDescription = posts.description.substr(0,200)
    }else {
      posts.shortDescription = posts.description;
    }
    console.log(posts);
     Posts.findByIdAndUpdate(posts.id, {$set: posts},{new: true}, (err, post)=>{
      if(err){
        return res.status(500).send({ error: err.errors })
      }
      res.status(201).send(post);
    })
    
  }

  postFilter ( req, res ) {
    const { filter } = req.query;
     Posts.find({ category: filter }, (err, post)=>{
      if(err){
        return resizeTo.status(404).send({ error: err.errors })
      }
      res.status(200).send(post)
    })
    
  }

  AddComment ( req, res ) {
    let posts = req.body;
    posts._id = ObjectId();
    console.log(posts)
    Posts.findByIdAndUpdate(req.params.id,{ $addToSet: { comments: posts } }, {new: true},
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

   getOnePost (req, res) {
    const { id } = req.params;
    const posts = Posts.findById({ _id: id }, (err, post) => {
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