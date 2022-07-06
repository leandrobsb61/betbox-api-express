import express from 'express';
import loginRoutes from './login-routes.js';
import usuariosRoutes from './usuarios-routes.js';

const indexRoutes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: 'Betbox API' });
    });

    app.use(
        express.json(),
        loginRoutes,
        usuariosRoutes,
    );
}

export default indexRoutes;
