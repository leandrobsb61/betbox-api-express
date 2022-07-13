import apostasCollection from "../collections/apostas-collection.js"

export default class ApostasController {

    static listarApostasPorBanca = (req, res) => {
        const idBanca = req.query.idBanca

        apostasCollection.find({ idBanca }, {}, (error, apostas) => {
            if (error) {
                return res.status(500).send({ message: `${error.message} - falha ao listar apostas` });
            }
            res.status(200).send(apostas);
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

}
