import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required: true,
    },
    clave:{
        type: String,
        required: true,
    },
    codigo:{
        type: String,
        required: true,
    },
    acceso:{
        type: Number,
        required: true,
    },
    puesto:{
        type: String,
        required: true,
    },
    datos:{
        type: Object,
        required: true,
    },
    contacto:{
        type: Object,
        required: true
    },
    update:{
        type:Boolean,
        required: true,
    }
});

const usuariosModel = mongoose.model("usuarios",usuarioSchema);

export default usuariosModel;