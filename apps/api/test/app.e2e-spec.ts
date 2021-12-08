import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LightMyRequestResponse } from 'fastify';
import { AppModule } from '../src/modules/common';

describe('MediaController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      /*
       * .overrideProvider(CatsService)
       * .useValue(catsService)
       */
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('/data/medias (GET)', () => {
    function validate(res: LightMyRequestResponse): void {
      const payload: any = JSON.parse(res.payload);
      expect(res.statusCode).toEqual(200);
      expect(res.statusMessage).toEqual('OK');
      expect(Object.keys(payload)).toEqual(['medias']);
      expect(Object.keys(payload.medias[0])).toEqual(['name', 'image', 'id']);
      expect(payload.medias[0].name).toBeDefined();
      expect(payload.medias[0].image).toBeDefined();
      expect(payload.medias[0].id).toBeDefined();
    }
    function invalidate(
      code: number,
      message: string,
    ): (res: LightMyRequestResponse) => void {
      return (res: LightMyRequestResponse): void => {
        const payload: any = JSON.parse(res.payload);
        expect(res.statusCode).toEqual(code);
        expect(res.statusMessage).toEqual(message);
        expect(Object.keys(payload)).toEqual(['message']);
      };
    }
    it('should work with nothing', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
        })
        .then(validate);
    });
    it('should work with a search query', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: {
            q: 'Test',
          },
        })
        .then(validate);
    });
    it('should work with a pagination', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: {
            p: '2',
            n: '5',
          },
        })
        .then(validate);
    });
    it('should error 400 on invalid query', async () => {
      let q = '';
      for (let i = 0; i < 301; i++) q += 'a';
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: { q },
        })
        .then(invalidate(400, 'Bad Request'));
    });
    it('should error 400 on invalid page', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: { p: '0' },
        })
        .then(invalidate(400, 'Bad Request'));
    });
    it('should error 400 on invalid limit', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: { n: '132' },
        })
        .then(invalidate(400, 'Bad Request'));
    });
    it('should return an empty array on max speculative total', async () => {
      return app
        .inject({
          method: 'GET',
          url: '/data/medias',
          query: { n: '100', p: '100' },
        })
        .then((res: LightMyRequestResponse): void => {
          const payload: any = JSON.parse(res.payload);
          expect(res.statusCode).toEqual(200);
          expect(res.statusMessage).toEqual('OK');
          expect(Object.keys(payload)).toEqual(['medias']);
          expect(payload.medias.length).toEqual(0);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
