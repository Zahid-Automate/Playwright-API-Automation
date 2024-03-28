import baseConfig from '../config/base.config';
import adminController from '../controller/admin.controller';
import controller from '../controller/categories.controller';

describe('Categories', () => {
    const req = {
        "name": "Test Category " + Math.floor(Math.random() * 10000),
    };

    describe('Retrieve Categories Tests', () => {
        it('GET /categories', async () => {
            const res = await controller.getCategories();
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(100);
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
        });

        it('GET /categories/{id}', async () => {
            const res = await controller.getCategoryById('65fc455a986188d4dce45e01');
            expect(res.statusCode).toBe(200);
            expect(Object.keys(res.body)).toEqual(['_id', 'name', '__v']);
        });
    });

    describe('Create Category', () => {
        let postCategory;
        let token;

        beforeAll(async () => {
            const data = { "email": baseConfig.email, "password": baseConfig.password };
            const res = await adminController.postAdminLogin(data);
            token = res.body.token;
            console.log('Auth token is ' + token);
        });

        it('POST /Category', async () => {
            const data = {
                "name": "Test Category " + Math.floor(Math.random() * 10000),
            };
            const res = await controller
                .postCategories(data)
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(postCategory, null, 2));
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(data.name);
        });
    });
    describe('Update Category', () => {
        let postCategory;
        let token;
        beforeAll(async () => {
            const data = { "email": baseConfig.email, "password": baseConfig.password };
            const res = await adminController.postAdminLogin(data);
            token = res.body.token;
            console.log('Auth token is ' + token);
            postCategory = await controller
                .postCategories(req)
                .set("Authorization", "Bearer " + token);
            console.log("zooooooom " + postCategory.body._id)
        });
        it('PUT /Category', async () => {
            const data = {
                "name": "Test Category " + Math.floor(Math.random() * 10000) + "_Updated",
            };
            const res = await controller
                .putCategoryById(postCategory.body._id, data)
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(data.name);
        });
    });

    describe('Delete Category', () => {
        let postCategory;
        let token;
        beforeAll(async () => {
            const data = { "email": baseConfig.email, "password": baseConfig.password };
            const res = await adminController.postAdminLogin(data);
            token = res.body.token;
            console.log('Auth token is ' + token);
            postCategory = await controller
                .postCategories(req)
                .set("Authorization", "Bearer " + token);
            console.log("delete zooooooom " + postCategory.body._id)
        });
        it('Delete /Category', async () => {
            const res = await controller
                .deleteCategoryById(postCategory.body._id)
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
        });
    });
});