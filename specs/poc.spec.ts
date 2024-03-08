import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {

  describe('GET Request', () => {
    it('GET /posts', async () => {
      const res = await request.get('/posts');
      // console.log(res);
      expect(res.statusCode).toBe(200)
      expect(res.body[1].id).toBe(2)

    })
    // Test GET with queryParam
    it('GET /comments', async () => {
      const res = await request
        .get('/comments')
        .query({ postId: 1, id: 1 })
      expect(res.body[0].postId).toBe(1)
      console.log(res)
    })
  })
  // Test Post Request with a body
  describe('POST Request', () => {
    it('POST /posts', async () => {
      const req = {
        "userId": 1,
        "title": "My Name is AnothyJeevan",
        "body": "This is a post request"
      }
      const res = await request
        .post('/posts')
        .send(req)

      expect(res.body.title).toBe(req.title)
    })
  })

  //Test PUT Request with a body
  describe('PUT Request', () => {
    it.only('PUT /posts/{id}', async () => {
      const req = {
        "userId": 5,
        "title": "My Name is UpdatedAnothyJeevan",
        "body": "This is a Updated post request"
      }
      const res = await request
        .put('/posts/1')
        .send(req)

      expect(res.body.title).toBe(req.title)
    })
  })
})
