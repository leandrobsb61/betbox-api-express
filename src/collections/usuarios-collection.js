import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: { type: String },
        nomeUsuario: { type: String, required: true },
        emailUsuario: { type: String, required: true },
        senhaUsuario: { type: String, required: true }
    }
);

const usuariosCollection = mongoose.model('usuarios', usuarioSchema);

export default usuariosCollection;
