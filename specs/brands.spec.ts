import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Brands Tests', () => {
    it('GET /brands', async () => {
        const res = await request.get('/brands');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(100);
        expect(Object.keys(res.body[0])).toEqual(['_id','name'])
      })

})