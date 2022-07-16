import mongoose from "mongoose";

const bancasSchema = new mongoose.Schema(
    {
        id: { type: String },
        idUsuario: { type: String, required: true },
        nomeBanca: { type: String, required: true },
        usuarioRef: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
        saldoBanca: { type: Number },
        selecionada: { type: Boolean },
    }
);

const bancasCollection = mongoose.model('bancas', bancasSchema);

export default bancasCollection;
