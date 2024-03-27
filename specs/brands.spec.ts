import controller from '../controller/brand.controller';

describe('Brands', () => {
    describe('Retrieve Brands Tests', () => {
        it('GET /brands', async () => {
            const res = await controller.getBrands();
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(100);
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
        });

        it('GET /brands/{id}', async () => {
            const res = await controller.getBrandById('65d1b173986188d4dce446ad');
            expect(res.statusCode).toBe(200);
            expect(Object.keys(res.body)).toEqual(['_id', 'name', 'description', 'createdAt', 'updatedAt', '__v']);
            expect(res.body.name).toBe('zahid');
        });
    });

    describe('Create Brands', () => {
        let postBrand;
        const data = {
            "name": "Test Brand " + Math.floor(Math.random() * 10000),
            "description": "Camera Small Brands"
        };
        beforeAll(async () => {
          postBrand = await controller.postBrands(data);
        });

        it('POST /brands', () => {
            console.log(JSON.stringify(postBrand, null, 2));
            expect(postBrand.statusCode).toBe(200);
            expect(postBrand.body.name).toEqual(data.name);
            expect(postBrand.body).toHaveProperty('createdAt');
            const expectedKeys = new Set(['_id', 'name', 'description', 'createdAt', 'updatedAt', '__v']);
            const receivedKeys = new Set(Object.keys(postBrand.body));
            expect(receivedKeys).toEqual(expectedKeys);
            //expect(Object.keys(postBrand.body)).toEqual(['_id', 'name', 'description', 'createdAt', 'updatedAt', '__v']);
        });

        afterAll(async()=>{
           await controller.deleteBrand(postBrand.body._id);
        });

        it('Schema Verification - Name is a mandatory field ', async()=> {
            const req={
                "name":""
            }
            const res = await controller.postBrands(req);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Name is required');
        });

        it('Schema Verification - Min char length for name should be > 1 ', async()=> {
            const req={
                "name":"a"
            }
            const res= await controller.postBrands(req);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too short');
        });

        it('Schema Verification - Name more than 30 characters is not allowed ', async()=> {
            const req={
                "name":"dsdsadas dfff sfsf sffff fasfasfasf"
            }
            const res= await controller.postBrands(req);

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too long');
        });

        it('Schema Verification - Brand description can only be a string', async()=> {
            const req={
                "name":"Test Brand "+ Math.floor(Math.random()* 10000),
                "description" : 9999,
            }
            const res= await controller.postBrands(req);
  
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand description must be a string');
        });

        it('Business Validation Request - Dup Brand not allowed - Check to create brand with the same name', async () => {
            //Second request
            const res2= await controller.postBrands(data);

            expect(res2.statusCode).toEqual(422);
            expect(res2.body.error).toContain('already exists');
         })

         it('Business Validation GET Request - Check with an Invalid id', async () => {
            const res = await controller.getBrandById('643fc8e9bf61a96982033333');
            expect(res.statusCode).toBe(404);
            console.log(res);
            expect(res.body.error).toBe('Brand not found.');
        })

        it('Business Validation Update Request - Throw an Error for Updating an invalid brand', async () => {          
            const req2 = {
                "name": "chocolate"+ ' updated'
              }
            const res2= await controller.putBrands('123',req2);
            console.log(res2);
            expect(res2.statusCode).toEqual(422);
            expect(res2.body.error).toBe('Unable to update brands');  
        })

        it('Business Validation Delete invalid brand ', async () => {
            const res = await controller.deleteBrand('abcdefg');
    
            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toBe('Unable to delete brand');
            
        })
    });

    describe('Fetch Individual brand', () => {
        let postBrand;
        beforeAll(async () => {
            const data = {
                "name": "Test Brand " + Math.floor(Math.random() * 10000),
                "description": "Camera Small Brands"
            };
            postBrand = await controller.postBrands(data);
        });

        it('GET /brands/{id}', async () => {
            const res = await controller.getBrandById(postBrand.body._id);
            expect(res.statusCode).toBe(200);
            expect(Object.keys(res.body)).toEqual(['_id', 'name', 'description', 'createdAt', 'updatedAt', '__v']);
            expect(res.body.name).toBe(postBrand.body.name);
        });

        afterAll(async()=>{
            postBrand = await controller.deleteBrand(postBrand.body._id);
        });
    });

    describe('Update Brands Test', () => {
        let postBrand;
        const data = {
            "name": "Test Brand " + Math.floor(Math.random() * 10000),
            "description": "Camera Small Brands"
        };
        beforeAll(async () => {
          postBrand = await controller.postBrands(data);
        });
        it('PUT /brands/{id}', async () => {
            const req = {
                "name": postBrand.body.name + ' updated'
            };
            const res = await controller.putBrands(postBrand.body._id,req);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toBe(req.name);
            expect(res.body).toHaveProperty('createdAt');
        });
        afterAll(async()=>{
            postBrand = await controller.deleteBrand(postBrand.body._id);
        });
    });

    describe('Delete Brands Test', () => {
        let postBrand;
        const data = {
            "name": "Test Brand " + Math.floor(Math.random() * 10000),
            "description": "Camera Small Brands"
        };
        beforeAll(async () => {
          postBrand = await controller.postBrands(data);
        });
        it('DELETE /brands/{id}', async () => {
            const res = await controller.deleteBrand(postBrand.body._id);
            expect(res.statusCode).toEqual(200);
        });
    });
});
