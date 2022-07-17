import bancasCollection from "../collections/bancas-collection.js";
import usuariosCollection from '../collections/usuarios-collection.js';

export default class BancaController {

    static listarBancasPorUsuario = (req, res) => {

        const idUsuario = req.query.idUsuario

        bancasCollection.find({ idUsuario }, {}, (error, bancas) => {
            if (error) {
                return res.status(500).send({ message: `${error.message} - falha ao listar bancas` });
            }
            res.status(200).send(bancas);
        });
    }

    static cadastrarBanca = (req, res) => {

        const idUsuario = req.body.idUsuario;

        usuariosCollection.findById(idUsuario, (error, usuario) => {

            if (error) {
                return res.status(500).send({ message: `${error.message} - falha ao cadastrar banca` });
            }

            if (!usuario) {
                return res.status(400).send({ message: `Usuário não encontrado` });
            }

            bancasCollection.find({ idUsuario }, (error, bancas) => {
    
                if (error) {
                    return res.status(500).send({ message: `${error.message} - falha ao cadastrar banca` });
                }

                if (!bancas || !bancas.length) {
                    const novaBanca = new bancasCollection(req.body);
                    novaBanca.selecionada = true;
                    novaBanca.dataInicial = new Date().getTime();
                    novaBanca.usuarioRef = req.body.idUsuario;
                    novaBanca.save((error) => {
                        if (error) {
                            res.status(500).send({ message: `${error.message} - falha ao cadastrar banca` })
                        } else {
                            res.status(201).send({ message: 'Banca cadastrada' });
                        }
                    });
                } else {
                    let bancaExistente = false;
                    for (const bancaDB of bancas) {
                        if (bancaDB.nomeBanca === req.body.nomeBanca) {
                            bancaExistente = true;
                        }
                    }
                    if (!bancaExistente) {
                        bancasCollection.updateMany({}, { $set: { selecionada: false } }, { multi: true }, () => {
                            let novaBanca = new bancasCollection(req.body);
                            novaBanca.selecionada = true;
                            novaBanca.dataInicial = new Date().getTime();
                            novaBanca.usuarioRef = req.body.idUsuario;
                            novaBanca.save((error) => {
                                if (error) {
                                    res.status(500).send({ message: `${error.message} - falha ao cadastrar banca` });
                                } else {
                                    res.status(201).send({ message: 'Banca cadastrada com sucesso' });
                                }
                            });
                        });
                    } else {
                        res.status(422).send({ message: 'Banca já existente para esse usuário' });
                    }
                }
            });
        });
    }

    static alterarBancaSelecionada = (req, res) => {

        bancasCollection.updateMany({}, { $set: { selecionada: false } }, { multi: true }, () => {
            bancasCollection.findByIdAndUpdate(req.body.id, { selecionada: true }, (error) => {
                if (error) {
                    res.status(500).send({ message: `${error.message} - falha ao selecionar banca` });
                } else {
                    res.status(200).send();
                }
            });
        });
    }
}