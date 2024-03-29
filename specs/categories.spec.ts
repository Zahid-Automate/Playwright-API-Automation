import baseConfig from '../config/base.config';
import controller from '../controller/categories.controller';
import { getCategoryId, login } from '../utils/helper';

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
        let token, categoryId;
        beforeAll(async () => {
            // const data = { "email": baseConfig.email, "password": baseConfig.password };
            // const res = await adminController.postAdminLogin(data);
            // token = res.body.token;
            // console.log('Auth token is ' + token);
            token = await login(baseConfig.email,baseConfig.password);
        });

        it('POST /Category', async () => {
            const data = {
                "name": "Test Category " + Math.floor(Math.random() * 10000),
            };
            const res = await controller
                .postCategories(data)
                .set("Authorization", "Bearer " + token);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(data.name);
        });
    });
    describe('Update Category', () => {
        let token, categoryId;
        beforeAll(async () => {
            token = await login(baseConfig.email,baseConfig.password);
            categoryId = await getCategoryId(token);
        });
        it('PUT /Category', async () => {
            const data = {
                "name": "Test Category " + Math.floor(Math.random() * 10000) + "_Updated",
            };
            const res = await controller
                .putCategoryById(categoryId, data)
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(data.name);
        });
    });

    describe('Delete Category', () => {
        let token , categoryId;
        beforeAll(async () => {
            token = await login(baseConfig.email,baseConfig.password);
            categoryId = await getCategoryId(token);
        });
        it('Delete /Category', async () => {
            const res = await controller
                .deleteCategoryById(categoryId)
                .set("Authorization", "Bearer " + token);
            console.log(JSON.stringify(res, null, 2));
            expect(res.statusCode).toBe(200);
        });
    });
});