// Liviu Radu, 041-290-873
// Assignment 3 - Tests for GET /foods (Jest + Supertest)

const request = require('supertest');
const app = require('../server/server');

describe('GET /foods', () => {
  // Test 1: the route works and returns JSON
  test('returns status 200 and JSON', async () => {
    const res = await request(app).get('/foods');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  // Test 2: the mock database has exactly five items
  test('returns five food items', async () => {
    const res = await request(app).get('/foods');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(5);
  });

  // Test 3: every item has a name and a numeric price
  test('each item has a name and a price', async () => {
    const res = await request(app).get('/foods');
    res.body.forEach((food) => {
      expect(typeof food.name).toBe('string');
      expect(typeof food.price).toBe('number');
    });
  });
});

// Test 4: unknown routes hit the 404 handler
describe('Unknown route', () => {
  test('returns 404', async () => {
    const res = await request(app).get('/nope');
    expect(res.statusCode).toBe(404);
  });
});
