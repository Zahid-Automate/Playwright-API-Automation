import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Brands ',()=> {
    let newBrand;
    describe('Retrieve Brands Tests', () => {
        it('GET /brands', async () => {
            const res = await request.get('/brands');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(100);
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
        })
    
        it('GET /brands/{id}', async () => {
            const res = await request.get('/brands/65d1b173986188d4dce446ad');
            expect(res.statusCode).toBe(200);
            console.log(res);
            expect(Object.keys(res.body)).toEqual(['_id', 'name','description','createdAt','updatedAt','__v']);
            expect(res.body.name).toBe('zahid');
        })
    
        it('GET /brands/{id}', async () => {
            const res = await request.get('/brands/65d1b173986188d4dce446ad');
            expect(res.statusCode).toBe(200);
            console.log(res);
            expect(Object.keys(res.body)).toEqual(['_id', 'name','description','createdAt','updatedAt','__v']);
            expect(res.body.name).toBe('zahid');
        })   
        
    
    })
    
    describe.only('Create Brands Test',()=>{
        it('POST /brands', async () => {
            const req = {
                "name": "Test Brand "+ Math.floor(Math.random()* 10000),
                "description": "Camera Small Brands"
              }
            const res = await request
              .post('/brands')
              .send(req)  ;
            console.log(req);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toBe(req.name);
            expect(res. body).toHaveProperty('createdAt')
            expect(res.body.description).toBe(req.description);  
            newBrand = res.body;  

    })
        it('Schema Verification - Name is a mandatory field ', async()=> {
            const req={
                "name":""
            }
            const res = await request
            .post('/brands')
            .send(req)  ;

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Name is required');
        });

        it('Schema Verification - Min char length for name should be > 1 ', async()=> {
            const req={
                "name":"a"
            }
            const res = await request
            .post('/brands')
            .send(req)  ;

            expect(res.statusCode).toBe(422);
            expect(res.body.error).toEqual('Brand name is too short');
        });
    });

    describe('Create and Fetch Brands Test',()=>{
        it('POST /brands', async () => {
            const req = {
                "name": "Test Brand "+ Math.floor(Math.random()* 10000),
                "description": "Camera Small Brands"
              }
            const res = await request
              .post('/brands')
              .send(req)  ;
            console.log(req);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toBe(req.name);
            expect(res. body).toHaveProperty('createdAt')
            expect(res.body.description).toBe(req.description);  
            newBrand = res.body;  
        })
    
        it('GET /brands/{id}', async () => {
            const res = await request.get('/brands/'+newBrand._id);
            expect(res.statusCode).toBe(200);
            console.log(res);
            expect(Object.keys(res.body)).toEqual(['_id', 'name','description','createdAt','updatedAt','__v']);
            expect(res.body.name).toBe(newBrand.name);
        })   
    })
    
    describe('Update Brands Test',()=>{
        it('PUT /brands/{id}', async () => {
            const req = {
                "name": newBrand.name + ' updated'
              }
            const res = await request
              .put('/brands/'+newBrand._id)
              .send(req)  ;
    
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toBe(req.name);
            expect(res. body).toHaveProperty('createdAt');
            
        })
    })
    
    describe('Delete Brands Test',()=>{
        it('DELETE /brands/{id}', async () => {
            const res = await request
              .delete('/brands/'+newBrand._id);
            expect(res.statusCode).toEqual(200);
            
        })
    })

})
