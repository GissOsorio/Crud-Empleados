const request = require('supertest');
const app = require ('/Users/giselaosorio/Documents/Tarea3/backend/src/app.js');

describe('api', function () {
    describe('GET /empleados', function () {
      it('responde con una lista de empleados', function () {
        request(app)
        .get('/empleados')
        .expect(200);
      });
    });
});
  
describe('api', function () {
    describe('POST /empleados', function () {
        it('TEST 05 usuario creado', done=>{
            const data={
                "nombre":"Gisela Osorio"
            }
            request(app)
            .post('/empleados')
            .send(data)
            .expect(500)
            .end((err)=>{
                if(err) return done(err);
                done();
            })
        }); 
    });
});

describe('api', function () {
    describe('DELETE /empleados/FAFAFA', function () {
      it('No existe un empleado con ese id', function () {
        request(app)
        .delete('/empleados/FAFAFA')
        .expect(404);
      });
    });
});