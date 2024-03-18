import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('GET Brands Tests', () => {
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

describe('Post Brands Test',()=>{
    it.only('POST /brands', async () => {
        const req = {
            "name": "GoPro Camera Small",
            "description": "Camera Small Brands"
          }
        const res = await request
          .post('/brands')
          .send(req)  ;

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe(req.name);
        expect(res. body).toHaveProperty('createdAt')
        expect(res.body.description).toBe(req.description);
        
    })
})