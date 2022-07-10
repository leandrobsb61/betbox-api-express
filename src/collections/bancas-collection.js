import mongoose from "mongoose";

const bancasSchema = new mongoose.Schema(
    {
        id: { type: String },
        nomeBanca: { type: String, required: true },
        descricaoBanca: { type: String, required: true },
        saldoBanca: { type: String, required: true },
        selecionada: { type: Boolean },
        idUsuario: { type: String, required: true },
        usuarioRef: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true }
    }
);

const bancasCollection = mongoose.model('bancas', bancasSchema);

export default bancasCollection;
