import mongoose from "mongoose";

mongoose.connect('mongodb+srv://leandrobsb61:123@cluster-betbox.gdx9h.mongodb.net/betbox-db');

let db = mongoose.connection;

export default db;
