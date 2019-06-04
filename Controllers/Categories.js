import Categories from '../models/CategoryModel';

class CategoriesController {
    async getCategories (req, res) {
        const [{categories}] = await Categories.find();
        res.status(200).send(categories)
    }

    async postCategories (req, res) {
        const categories = new Categories(req.body);
        await categories.save((err, post) => {
            if(err){
              console.log('entro al error')
              return res.status(402).send({ error: err.errors})
            }
            return res.status(201).send(post)
          });
    }
}

const categoriesController = new CategoriesController();
export default categoriesController;