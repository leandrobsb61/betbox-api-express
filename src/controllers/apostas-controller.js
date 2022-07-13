import apostasCollection from "../collections/apostas-collection.js"

export default class ApostasController {

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
