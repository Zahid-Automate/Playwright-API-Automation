import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests',()=>{
          it('GET /posts', async () => {
          const res = await request.get('/posts');
         // console.log(res);
          expect(res.statusCode).toBe(200)
          expect(res.body[1].id).toBe(2)
         
        })
        // Test GET with queryParam
         it('GET /comments', async()=>{
          const res = await request
          .get('/comments')
          .query({postId:1, id:1})
          expect(res.body[0].postId).toBe(1)
          console.log(res)
         })
    })
