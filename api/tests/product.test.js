const request = require('supertest');
const { app, server } = require('../index'); // Assuming your Express app is exported from index.js

describe('GET /api/products', () => {
  afterAll(() => {
    server.close(); // Properly close the server after tests
  });

  it('should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
