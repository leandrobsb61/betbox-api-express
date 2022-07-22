import apostasCollection from "../collections/apostas-collection.js"

export default class ApostasController {

    static listarApostasPorBanca = (req, res) => {
        const idBanca = req.query.idBanca;

        apostasCollection.find({ idBanca }, {}, (error, apostas) => {
            if (error) {
                return res.status(500).send({ message: `${error.message} - falha ao listar apostas` });
            }
            res.status(200).send(apostas);
        });
    }

    static buscarApostaPorId = (req, res) => {
        const id = req.params.id;
        apostasCollection.findById(id, (err, aposta) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - aposta não encontrada` });
            } else {
                res.status(200).json(aposta);
            }
        });
    }

    static cadastrarAposta = (req, res) => {
        const novaAposta = new apostasCollection(req.body);
        novaAposta.bancaRef = req.body.idBanca;
        novaAposta.save((erro) => {
            if (erro) {
                res.status(500).send({ message: `${erro.message} - falha ao cadastrar aposta` });
            } else {
                res.status(201).send({ message: `Aposta cadastrada com sucesso` });
            }
        });
    }

    static editarAposta = (req, res) => {
        const id = req.params.id;

        apostasCollection.findByIdAndUpdate(id, { $set: req.body }, (error) => {
            if (!error) {
                res.status(200).send({ message: `Aposta alterada com sucesso` });
            } else {
                res.status(500).send({ message: `${error.message} - falha ao alterar a aposta` });
            }
        });

    }

    static removerAposta = (req, res) => {
        const id = req.params.id;
        apostasCollection.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - aposta não encontrada` });
            } else {
                res.status(200).send({ message: `Aposta excluída com sucesso` });
            }
        });
    }

}
