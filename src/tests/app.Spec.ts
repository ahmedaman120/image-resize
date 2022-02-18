import supertest from 'supertest';
import app from '../app';



const request = supertest(app);


describe('test endpoint', () => {
  it('test image that on our list', async () => {
    const response = await request.get(
      '/api/image?name=test&width=300&height=300'
    );
    expect(response.statusCode).toBe(200);
  });


  it('test image that on our list', async () => {
    const response = await request.get(
      '/api/image?name=test3&width=300&height=300'
    );
    expect(response.statusCode).toBe(400);
  });

  it('test endpoint with wrong format of width', async () => {
    const response = await request.get(
      '/api/image?name=test3&width=d300&height=300'
    );
    expect(response.statusCode).toBe(400);
  });

  it('test endpoint with wrong format of height', async () => {
    const response = await request.get(
      '/api/image?name=test3&width=d300&height=sad300'
    );
    expect(response.statusCode).toBe(400);
  });
})