import mongoose from "mongoose";

const apostasSchema = new mongoose.Schema(
    {
        id: { type: String },
        idBanca: { type: String, required: true },
        dataRegistro: { type: Number, required: true },
        campeonato: { type: String, required: true },
        mandante: { type: String, required: true },
        visitante: { type: String, required: true },
        mercado: { type: String, required: true },
        valorAposta: { type: Number, required: true },
        odd: { type: Number, required: true },
        pendente: { type: Boolean, required: true },
        resultado: { type: Number, required: true },
        observacao: { type: String },
        bancaRef: { type: mongoose.Schema.Types.ObjectId, ref: 'bancas' },
    }
);

const apostasCollection = mongoose.model('apostas', apostasSchema);

export default apostasCollection;
