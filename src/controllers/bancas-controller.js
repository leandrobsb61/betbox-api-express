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
                    novaBanca.saldoBanca = (req.body.saldoBanca) ? req.body.saldoBanca : 0;
                    novaBanca.mercados = [];
                    novaBanca.save((error) => {
                        if (error) {
                            res.status(500).send({ message: `${error.message} - falha ao cadastrar banca` });
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
                            novaBanca.saldoBanca = (req.body.saldoBanca) ? req.body.saldoBanca : 0;
                            novaBanca.mercados = [];
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

    static cadastrarMercadoEmBanca = (req, res) => {

        bancasCollection.findById(req.body.id, (error, banca) => {
            if (error) {
                res.status(500).send({ message: `${error.message} - falha ao selecionar banca` });
            } else {
                if (banca.mercados.includes(req.body.mercado)) {
                    return res.status(422).send({ message: `Mercado já cadastrado para essa banca` });
                }
                const mercados = banca.mercados;
                mercados.push(req.body.mercado);
                bancasCollection.findByIdAndUpdate(req.body.id, { mercados }, (error) => {
                    if (error) {
                        res.status(500).send({ message: `${error.message} - falha ao cadastrar mercado` });
                    } else {
                        res.status(200).send({message: `Mercado incluído com sucesso`, mercados});
                    }
                });
            }
        });
    }

    static removerMercadoEmBanca = (req, res) => {

        bancasCollection.findById(req.body.id, (error, banca) => {
            if (error) {
                res.status(500).send({ message: `${error.message} - falha ao selecionar banca` });
            } else {
                if (!banca.mercados.includes(req.body.mercado)) {
                    return res.status(422).send({ message: `Mercado não encontrado` });
                }
                const mercados = banca.mercados;
                mercados.splice(req.body.mercado, 1);
                bancasCollection.findByIdAndUpdate(req.body.id, { mercados }, (error) => {
                    if (error) {
                        res.status(500).send({ message: `${error.message} - falha ao excluir mercado` });
                    } else {
                        res.status(200).send({message: `Mercado excluído com sucesso`, mercados});
                    }
                });
            }
        });
    }
}