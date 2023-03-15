import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    usuario:{
        type:  String,
        required: true,
    },
    sucursal:{
        type:  String,
        required: true,
    },
    fecha:{
        type:  Date,
        required: true,
    },
    factura:{
        type:  Number,
        required: true,
    },
    nombre:{
        type:  String,
        required: true,
    },
    nit:{
        type:  Number,
        required: true,
    },
    productos:{
        type:  Array,
        required: true,
    },
    total:{
        type:  Number,
        required: true,
    },
    update:{
        type: Boolean,
        required: true,
    }
});

const ventaModel = mongoose.model("venta",ventaSchema);

export default ventaModel;