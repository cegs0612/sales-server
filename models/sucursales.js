import mongoose from "mongoose";

const sucursalSchema = new mongoose.Schema({
    codSucursal:{
        type: String,
        required: true,
    },
    denominacion:{
        type: String,
        required: true,
    },
    pais:{
        type: String,
        required: true,
    },
    ciudad:{
        type: String,
        required: true,
    },
    calle:{
        type: String,
        required: true,
    },
    numero:{
        type: String,
        required: true,
    },
    update:{
        type:Boolean,
        required: true,
    }
});

const sucursalModel = mongoose.model("sucursales",sucursalSchema);

export default sucursalModel;