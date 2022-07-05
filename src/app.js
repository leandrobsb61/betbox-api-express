import express from 'express';

const app = express();

app.use(express.json());

// configurando rotas com express
app.get('/', (req, res) => {
    res.status(200).send('Betbox API');
});

export default app;
