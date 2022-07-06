import express from 'express';
import usuariosRoutes from './usuarios-routes.js';

const indexRoutes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: 'Betbox API' });
    });

    app.use(
        express.json(),
        usuariosRoutes
    );
}

export default indexRoutes;
