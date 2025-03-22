import mongoose  from 'mongoose';
import request from 'supertest';
import { app } from '../index';
import { getData } from '../loadData';


jest.setTimeout(60000);
beforeAll(async () => {
  await getData()
  
});
describe('GET /v1/swift-codes/:swiftcode', () => {
  describe('given swiftcode is value from our database', () => {
    test('status code should be 200', async () => {
      const response = await request(app).get('/v1/swift-codes/AAISALTRXXX');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('given swiftcode is string and 11 characters long but not from  our database', () => {
  test('status code should be 404',async()=>{
    const response = await request(app).get('/v1/swift-codes/ggggggggggg');
    expect(response.statusCode).toBe(404);

      })
      

    });
  describe('given swiftcode is incorrect', () => {
      test('status code should be 400',async()=>{
        const response = await request(app).get('/v1/swift-codes/ggg');
        expect(response.statusCode).toBe(400);
    
    })
      
    
    });
})

describe('GET /v1/swift-codes/country/:countryISO2code', () => {

    describe('country isocode is not real', () => {
      test('status code should be 404',async()=>{
        const response = await request(app).get('/v1/swift-codes/country/zz');
        expect(response.statusCode).toBe(404);
    
      })
      
    
    });
    describe('country isocode is incorrect', () => {
      test('status code should be 400',async()=>{
        const response = await request(app).get('/v1/swift-codes/country/zzz');
        expect(response.statusCode).toBe(400);
    
      })
      
    
    });

    
  
})
describe('POST /v1/swift-codes', () => {
    describe('provided swift code is incorrect', () => {
      test('status code should be 400', async () => {
        const response = await request(app)
          .post('/v1/swift-codes')
          .send({ 
            swiftCode: 'wwwww',  
            bankName: 'Alior',
            countryISO2: 'PL',
            countryName: 'Poland',
            isHeadquarter: true,
            address: 'address'
          });
        expect(response.statusCode).toBe(400);
      });
    });
    describe('provided swift code is correct', () => {
      test('status code should be 201', async () => {
        const response = await request(app)
          .post('/v1/swift-codes')
          .send({ 
            "address": "Poland, Krakowska 12",
           
            "bankName": "Alior",
            "countryISO2": "PL",
            "countryName": "Poland",
            "isHeadquarter": true,
            "swiftCode": "123xxxxxXXX"
            
          });
          expect(response.statusCode).toBe(201);
      });
    });
 });


describe('DELETE /v1/swift-codes/:swiftcode',()=>{
  describe('provided swift code is correct,code will be deleted',()=>{
    test('status code should be 201',async ()=>{
      const response=await request(app).delete('/v1/swift-codes/AAISALTRXXX');
      expect(response.statusCode).toBe(200);
    })
  })
  describe('provided swift code is incorrect',()=>{
    test('status code should be 400',async ()=>{
      const response=await request(app).delete('/v1/swift-codes/A');
      expect(response.statusCode).toBe(400);
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close();
});


