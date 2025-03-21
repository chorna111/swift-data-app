process.env.NODE_ENV = 'test';

import request from 'supertest';
import { app } from '../index';
import { getData } from '../loadData';


jest.setTimeout(60000);
beforeAll(async () => {
  await getData()
  
});
describe('GET /v1/swift-codes/:swiftcode', () => {
  describe('given swiftcode is correct', () => {
    test('status code should be 200', async () => {
      const response = await request(app).get('/v1/swift-codes/AAISALTRXXX');
      expect(response.statusCode).toBe(200);
    });
  });

});


