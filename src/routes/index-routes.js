import express from 'express';
import cors from 'cors';
import loginRoutes from './login-routes.js';
import usuariosRoutes from './usuarios-routes.js';

const indexRoutes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: 'Betbox API' });
    });

    app.use(
        cors({ origin: '*' }),
        express.json(),
        loginRoutes,
        usuariosRoutes,
    );
}

export default indexRoutes;
