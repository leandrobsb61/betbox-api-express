import mongoose from "mongoose";

const bancasSchema = new mongoose.Schema(
    {
        id: { type: String },
        nomeBanca: { type: String, required: true },
        descricaoBanca: { type: String },
        saldoBanca: { type: String },
        selecionada: { type: Boolean },
        idUsuario: { type: String, required: true },
        usuarioRef: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }
    }
);

const bancasCollection = mongoose.model('bancas', bancasSchema);

export default bancasCollection;
