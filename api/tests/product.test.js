const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js

describe('GET /api/products', () => {
  it('should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Add tests for other endpoints
// Gracefully close the server after tests
afterAll(() => {
  server.close(); // Close the server after tests are completed
});
