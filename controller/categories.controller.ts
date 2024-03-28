import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

class CategoriesController{
    getCategories(){
        return request.get('/categories');
    }

    postCategories(data : {[key: string]: string}){
        return request.
        post('/categories').
        send(data);
    }

    getCategoryById(id:String){
        return request.get('/categories/'+id);
    }

    putCategoryById(id: string, data: { [key: string]: string }){
        return request
        .put('/categories/'+id)
        .send(data);
    }

    deleteCategoryById(id:string){
        return request
        .delete('/categories/'+id);
    }
}

export default new CategoriesController();