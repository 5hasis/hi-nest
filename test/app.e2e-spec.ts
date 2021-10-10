import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //테스팅 어플리케이션도 실제처럼 설정해줘야함
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
        forbidNonWhitelisted:true,
        transform: true, //우리가 원하는 실제 타입으로 변환해줌
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Moviw API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'things', //forbidNonWhitelisted:true, 이기 때문에
        })
        .expect(400); 
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');

    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404)
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title:'Updated Test'
      })
      .expect(200)
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
    });
  });

});
