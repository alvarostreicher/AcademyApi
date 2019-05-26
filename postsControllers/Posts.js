import db from '../db/db';
import Posts from '../models/PostsModel';

class PostsController {
 async postTodo ( req, res )  {
    const posts = new Posts(req.body);
    await posts.save(
      (err, post) => {
        if(err){
          console.log('entro al error')
          return res.status(402).send({ error: err.errors})
        }
        return res.status(201).send(post)
      });
      
  }

  async getAllPosts ( req, res ) {
    const posts = await Posts.find();
    res.status(200).send(posts)
  }

  async getOnePost (req, res) {
    const postId = req.params.id;
    const posts = await Posts.findById({ _id: postId }, (err, post) => {
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