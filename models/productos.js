import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    codProducto:{
        type: String,
        required: true,
    },
    identificador:{
        type: String,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    marca:{
        type: String,
        required: true,
    },
    presentacion:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    update:{
        type: Boolean,
        required: true,
    },
});

const productoModel = mongoose.model("productos", productoSchema);

export default productoModel;