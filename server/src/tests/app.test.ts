import mongoose  from 'mongoose';
import request from 'supertest';
import { app } from '../index';
import { getData } from '../loadData';
import { Headquarter } from '../models/headquarter';
import { Branch } from '../models/branch';
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
            "swiftCode": "aaaxxxxxXXX"
            
          });
          expect(response.statusCode).toBe(201);
      });
    });
    describe('provided headquarter already exists', () => {
      test('status code should be 400', async () => {
        const response = await request(app)
          .post('/v1/swift-codes')
          .send({ 
            "address": "JAMES BOURCHIER BLVD 76A HILL TOWER SOFIA, SOFIA, 1421",
           
            "bankName": "ADAMANT CAPITAL PARTNERS AD",
            "countryISO2": "BG",
            "countryName": "Bulgaria",
            "isHeadquarter": true,
            "swiftCode":  "ADCRBGS1XXX"
            
          });
          expect(response.statusCode).toBe(400);
      });
    });


    describe('provided branch already exists', () => {
      test('status code should be 400', async () => {
        const response = await request(app)
          .post('/v1/swift-codes')
          .send({ 
            "address": "PLAC TEATRALNY 4  - BYDGOSZCZ KUJAWSKO-POMORSKIE, 85-950 ",
           
            "bankName": "PKO BANK POLSKI S.A.",
            "countryISO2": "PL",
            "countryName": "POLAND",
            "isHeadquarter": false,
            "swiftCode":  "BPKOPLPWTOB"
            
          });
          expect(response.statusCode).toBe(400);
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
  await Headquarter.deleteMany({});
  await Branch.deleteMany({})
  await mongoose.connection.close();
});


