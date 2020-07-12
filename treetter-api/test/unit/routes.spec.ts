import { expect } from 'chai';
import supertest from 'supertest';
import api from '../../src/api/app';

const request = supertest(api);

describe('Rutas de acceso', () => {
    describe('[/] Ruta raiz', () => {
        it('Debe poder optener el listado de las rutas disponibles de la API', async () => {
            const response = await request
                .get('/')
                .set('Accept', 'application/json')
                .send()
                .expect(200);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Listado de rutas de interaccion con Treetter');
            expect(messageRes).to.have.property('code', 200);
            expect(messageRes).to.have.property('success', true);
            expect(messageRes).to.have.property('type_action', 'query_info');
            expect(messageRes.data).to.have.key('list');
            expect(messageRes.data.list).to.be.an('array').to.length(5);
        });
    });

    describe('[/singup]', () => {
        it('Debe de poder crear un nuevo usuario para el sistema', async () => {
            const newUser = {
                username: 'Vicentejsp',
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(201);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Usuario creado correctamente');
            expect(messageRes).to.have.property('code', 201);
            expect(messageRes).to.have.property('success', true);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.have.keys('access_token', 'method', 'role', 'username');
            expect(messageRes.data).to.have.property('role', 'ROLE_RESEARCHER');
            expect(messageRes.data).to.have.property('username', 'Vicentejsp');
            expect(messageRes.data).to.have.property('method', 'bearer');
        });

        it('Debe de fallar si el username ya está registrado', async () => {
            const newUser = {
                username: 'Vicentejsp',
                email: 'otrocorreo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(403);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Los datos que intentas registrar ya existen en el sistema, por favor verificalos e intenta de nuevo.');
            expect(messageRes).to.have.property('code', 403);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.be.an('array').to.length(1);
            expect(messageRes.data[0]).to.have.property('username', 'Vicentejsp');
        });

        it('Debe fallar si el email ya este registrado', async () => {
            const newUser = {
                username: 'jesussp',
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(403);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Los datos que intentas registrar ya existen en el sistema, por favor verificalos e intenta de nuevo.');
            expect(messageRes).to.have.property('code', 403);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.be.an('array').to.length(1);
            expect(messageRes.data[0]).to.have.property('email', 'correo@dominio.com');
        });

        it('Debe fallar si el username y el email ya este registrado', async () => {
            const newUser = {
                username: 'Vicentejsp',
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(403);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Los datos que intentas registrar ya existen en el sistema, por favor verificalos e intenta de nuevo.');
            expect(messageRes).to.have.property('code', 403);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.be.an('array').to.length(2);
            expect(messageRes.data[0]).to.have.property('username', 'Vicentejsp');
            expect(messageRes.data[1]).to.have.property('email', 'correo@dominio.com');
        });

        it('Debe fallar si los datos obligatorios no están completos (sin datos)', async () => {
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send()
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Datos de registro incompletos');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(3);
        });

        it('Debe fallar si los datos obligatorios no están completos (sin Username)', async () => {
            const newUser = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Datos de registro incompletos');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(1);
            expect(messageRes.data.required).to.eql(['username']);
        });

        it('Debe fallar si los datos obligatorios no están completos (sin Password)', async () => {
            const newUser = {
                username: 'Vicentejsp',
                email: 'correo@dominio.com'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Datos de registro incompletos');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(1);
            expect(messageRes.data.required).to.eql(['password']);
        });

        it('Debe fallar si los datos obligatorios no están completos (sin Email)', async () => {
            const newUser = {
                username: 'Vicentejsp',
                password: '1234567890'
            };
            const response = await request
                .post('/singup')
                .set('Accept', 'application/json')
                .send(newUser)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Datos de registro incompletos');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'create_account');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(1);
            expect(messageRes.data.required).to.eql(['email']);
        });
    });

    describe('[/singin]', () => {
        it('Debe poder logear un usuario registrado', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(201);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Usuario autenticado correctamente.');
            expect(messageRes).to.have.property('code', 201);
            expect(messageRes).to.have.property('success', true);
            expect(messageRes).to.have.property('type_action', 'user_auth');
            expect(messageRes.data).to.have.keys('access_token', 'method', 'role', 'username');
            expect(messageRes.data).to.have.property('role', 'ROLE_RESEARCHER');
            expect(messageRes.data).to.have.property('username', 'Vicentejsp');
            expect(messageRes.data).to.have.property('method', 'bearer');
        });

        it('Debe fallar al ingresar credenciales incorrectas', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234547890'
            };
            const response = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales incorrectas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_auth');
        });

        it('Debe fallar al intentar logear un usuario sin password', async () => {
            const user = {
                email: 'correo@dominio.com',
            };
            const response = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(403);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales incompletas, faltan datos');
            expect(messageRes).to.have.property('code', 403);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_auth');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(1);
        });

        it('Debe fallar al intentar logear un usuario sin email', async () => {
            const user = {
                password: '1234567890'
            };
            const response = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(403);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales incompletas, faltan datos');
            expect(messageRes).to.have.property('code', 403);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_auth');
            expect(messageRes.data).to.have.key('required');
            expect(messageRes.data.required).to.be.an('array').to.length(1);
        });

        it('Debe fallar al intentar logear un usuario inexistente', async () => {
            const user = {
                email: 'noexiste@dominio.com',
                password: '1234567890'
            };
            const response = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(400);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'En usuario no existe o esta inactivo.');
            expect(messageRes).to.have.property('code', 400);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_auth');
        });
    });

    describe('[/api/user]', () => {
        it('Debe obtener la información de un usuario registrado', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const login = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(201);
            const response = await request
                .get('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${login.body.data.access_token}`)
                .send({ role: 'ROLE_RESEARCHER' })
                .expect(200);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales válidas.');
            expect(messageRes).to.have.property('code', 200);
            expect(messageRes).to.have.property('success', true);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });

        it('Debe fallar al recibir un token inválido ', async () => {
            const user = { role: 'ROLE_RESEARCHER' }
            const response = await request
                .get('/api/user')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer eyasdsd.asdasd.wwedasggs`)
                .send(user)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales inválidas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });

        it('Debe fallar al no recibir un token de acceso ni role de usuario', async () => {
            const response = await request
                .get('/api/user')
                .set('Accept', 'application/json')
                .send()
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales inválidas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });

        it('Debe fallar al no recibir un token de acceso', async () => {
            const user = { role: 'ROLE_RESEARCHER' }
            const response = await request
                .get('/api/user')
                .set('Accept', 'application/json')
                .send(user)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales inválidas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });

        it('Debe fallar al no recibir role de usuario', async () => {
            const response = await request
                .get('/api/user')
                .set('Accept', 'application/json')
                .send()
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales inválidas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });
    });

    describe('[/treemap/:user]', () => {
        it('Debe fallar al no recibir un token de acceso', async () => {
            const user = { role: 'ROLE_RESEARCHER' }
            const response = await request
                .get('/api/treemap/Spawn7007')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer eyasdsd.asdasd.wwedasggs`)
                .send(user)
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Credenciales inválidas.');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'user_info');
        });

        it('Debe poder extrar JSON de treemap del usuario @Spawn7007', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const login = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(201);
            const response = await request
                .get('/api/treemap/Spawn7007')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${login.body.data.access_token}`)
                .send({ role: 'ROLE_RESEARCHER' })
                .expect(200);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Sea creado correctamente el treemap del usuario');
            expect(messageRes).to.have.property('code', 200);
            expect(messageRes).to.have.property('success', true);
            expect(messageRes).to.have.property('type_action', 'query_treemap');
            expect(messageRes.data).to.have.keys('user', 'sample', 'treemap', 'platforms');
            expect(messageRes.data).to.have.property('user', 'Spawn7007');
            expect(messageRes.data.sample).to.be.an('number');
            const { treemap } = messageRes.data;
            expect(treemap).to.have.keys('name', 'picProfile', 'verified', 'children');
            expect(treemap).to.have.property('name', 'Spawn7007');
            expect(treemap.children).to.be.an('array');
        });

        it('Debe fallar al no mandar un usuario', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const login = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(201);
            const response = await request
                .get('/api/treemap')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${login.body.data.access_token}`)
                .send({ role: 'ROLE_RESEARCHER' })
                .expect(401);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'No has ingresado un usuario para realizar la consulta');
            expect(messageRes).to.have.property('code', 401);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'query_treemap');
            expect(messageRes.data).to.have.key('treemap');
            expect(messageRes.data.treemap).to.be.an('array').to.length(0);
        });

        it('Debe de fallar al intentar extraer un treemap de un usuario inexistente de Twitter', async () => {
            const user = {
                email: 'correo@dominio.com',
                password: '1234567890'
            };
            const login = await request
                .post('/singin')
                .set('Accept', 'application/json')
                .send(user)
                .expect(201);
            const response = await request
                .get('/api/treemap/asdljjhdoso4392710dksla')
                .set('Accept', 'application/json')
                .set('Authorization', `bearer ${login.body.data.access_token}`)
                .send({ role: 'ROLE_RESEARCHER' })
                .expect(404);
            expect(response).to.have.property('body');
            const messageRes = response.body;
            expect(messageRes).to.have.keys('message', 'code', 'success', 'type_action', 'data');
            expect(messageRes).to.have.property('message', 'Usuario no encontrado en Twitter');
            expect(messageRes).to.have.property('code', 404);
            expect(messageRes).to.have.property('success', false);
            expect(messageRes).to.have.property('type_action', 'query_treemap');
        });
    });
});