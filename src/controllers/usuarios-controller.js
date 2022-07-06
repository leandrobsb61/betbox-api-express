import usuariosCollection from '../collections/usuarios-collection.js';

export default class UsuariosController {

    static buscarUsuarios = (req, res) => {
        usuariosCollection.find((error, usuarios) => {
            res.status(200).json(usuarios);
        });
    }

    static cadastrarUsuario = (req, res) => {
        usuariosCollection.find((error, usuarios) => {
            if (error) {
                res.status(500).send({ message: `${error.message} - falha ao cadastrar usuário` });
            } else {

                let usuarioExistente = false;
                for (const usuarioDB of usuarios) {
                    if (usuarioDB.emailUsuario === req.body.emailUsuario) {
                        usuarioExistente = true;
                    }
                }

                if (!usuarioExistente) {
                    let novoUsuario = new usuariosCollection(req.body);
                    novoUsuario.save((error) => {
                        if (error) {
                            res.status(500).send({ message: `${error.message} - falha ao cadastrar usuário.` })
                        } else {
                            res.status(201).send({ message: 'Usuário cadastrado' });
                        }
                    });
                } else {
                    res.status(422).send({ message: 'Email já cadastrado' });
                }
            }
        });
    }

}
