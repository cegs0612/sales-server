import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usuariosModel from "./models/usuarios.js";
import sucursalModel from "./models/sucursales.js";
import productoModel from "./models/productos.js";
import ventaModel from "./models/ventas.js";


const app = express();
const PORT= 3001;
app.use(cors());
app.use(express.json());

// conexión a base de datos
mongoose.connect("mongodb+srv://all:5P9NvJXQn6EHzhG@cluster0.1focmhq.mongodb.net/SistemaVentas?retryWrites=true&w=majority",{useNewUrlParser: true});

//manejo de sucursales
app.post("/insertSucursal", async(req,res)=>{
    const sucursal= req.body;
    const codigo= sucursal.codSucursal;
    const denominacion= sucursal.denominacion;
    const pais= sucursal.pais;
    const ciudad= sucursal.ciudad;
    const calle= sucursal.calle;
    const numero= sucursal.numero;
    
    const nuevaSucursal = new sucursalModel({
        codSucursal: codigo,
        denominacion: denominacion,
        pais: pais,
        ciudad: ciudad,
        calle: calle,
        numero: numero,
        update: true,
    })
    await nuevaSucursal.save();
    res.send("Inserted Data");
});
app.get("/readSucursales", (req,res)=>{
    sucursalModel.find({},(err,result)=>{err? res.send(err):res.send(result)}).sort({pais:1,ciudad:1})
});
app.put("/updateSucursal",(req,res)=>{
    sucursalModel.replaceOne(
        {_id: req.body._id},
        {   
            codSucursal: req.body.codSucursal,
            denominacion: req.body.denominacion,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            calle: req.body.calle,
            numero: req.body.numero,
            update: true,
        })
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)})
});
app.delete("/deleteSucursal",(req,res)=>{
    sucursalModel.deleteOne({_id: req.body._id})
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});
//manejo de perfiles
app.get("/readPerfiles",(req,res)=>{
    usuariosModel.find({},(err,result)=>{err? res.send(err):res.send(result)
    }).sort({usuario:1});
});
app.get("/readPerfil",(req,res)=>{
    usuariosModel.find({_id:req.query._id},(err,result)=>{err? res.send(err):res.send(result)
    });
});
app.post("/insertPerfil",async(req,res)=>{
    const perfil = req.body;
    const newPerfil = new usuariosModel({
        codigo: perfil.codigo,
        usuario: perfil.usuario,
        puesto: perfil.puesto,
        acceso: perfil.acceso,
        clave: perfil.clave,
        datos: {
          nombres: perfil.datos.nombres,
          apellidos: perfil.datos.apellidos,
          carnet: perfil.datos.carnet,
        },
        contacto:{
          direccion: perfil.contacto.direccion,
          telefono: perfil.contacto.telefono,
        },
        update:true,
    });
    await newPerfil.save();
    res.send("Inserted data");
});
app.put("/updatePerfil",(req,res)=>{
    let perfil = req.body;
    usuariosModel.replaceOne(
        {_id: perfil._id},
        {
            codigo: perfil.codigo,
            usuario: perfil.usuario,
            puesto: perfil.puesto,
            acceso: perfil.acceso,
            clave: perfil.clave,
            datos: {
              nombres: perfil.datos.nombres,
              apellidos: perfil.datos.apellidos,
              carnet: perfil.datos.carnet,
            },
            contacto:{
              direccion: perfil.contacto.direccion,
              telefono: perfil.contacto.telefono,
            },
            update:perfil.update,
        }
    ).then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
}),
app.delete("/deletePerfil",(req,res)=>{
    usuariosModel.deleteOne({_id: req.body._id})
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});

//manejo de productos
app.get("/readProductos",(req,res)=>{
    productoModel.find({},(err,result)=>{err? res.send(err):res.send(result)
    }).sort({marca:1,codProducto:1});
});
app.post("/insertProducto",async(req,res)=>{
    const producto = req.body;
    const newProducto = new productoModel({
        codProducto: producto.codProducto,
        identificador: producto.identificador,
        nombre: producto.nombre,
        marca: producto.marca,
        presentacion: producto.presentacion,
        precio: producto.precio,
        update:true,
    });
    await newProducto.save();
    res.send("Inserted data");
});
app.put("/updateProducto",(req,res)=>{
    productoModel.replaceOne(
        {_id: req.body._id},{
        codProducto: req.body.codProducto,
        identificador: req.body.identificador,
        nombre: req.body.nombre,
        marca: req.body.marca,
        presentacion: req.body.presentacion,
        precio: req.body.precio,
        update:true,
    }).then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});
app.delete("/deleteProducto",(req,res)=>{
    productoModel.deleteOne({_id: req.body._id})
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});

// manejo de ventas
app.get("/readVentas",(req,res)=>{
    ventaModel.find(req.query,(err,result)=>{err? res.send(err):res.send(result)
    }).sort({fecha:1});
});
app.post("/insertVenta",async(req,res)=>{
    const venta = req.body;
    console.log(venta)
    const newVenta = new ventaModel({
        usuario: venta.usuario,
        sucursal: venta.sucursal,
        fecha: venta.fecha,
        factura: venta.factura,
        nombre: venta.nombre,
        nit: venta.nit,
        productos: venta.productos,
        total: venta.total,
        update:true,
    });
    await newVenta.save();
    res.send("Inserted data");
});
app.put("/updateVenta",(req,res)=>{
    ventaModel.updateOne({_id:req.body._id},{$set:req.body.updateVenta})
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});
app.delete("/deleteVenta",(req,res)=>{
    console.log(req.body);
    ventaModel.deleteOne(req.body)
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)})
})
//manejo reportes
app.get("/reporteVentas",(req,res)=>{
    ventaModel.find(req.query,(err,result)=>{
        err? res.send(err) : res.send(result)
    })
})
app.get("/reporteAdmin",(req,res)=>{
    ventaModel.find(req.query.query,(err,result)=>{
        err? res.send(err) : res.send(result)
    }).sort(req.query.sort);  
})


// cambio de contraseña
app.put("/changePassword",(req,res)=>{
    usuariosModel.updateOne({_id:req.body._id,},{$set:{clave:req.body.clave,}})
    .then((response)=>{res.send(response)})
    .catch((error)=>{res.send(error)});
});    

//login de usuarios
app.get("/login", (req,res)=>{
    const user = req.query.usuario;
    usuariosModel.find({usuario:user},(err,result)=>{
        if (err){
            res.send(err);
        } else{
            res.send(result);
        }
    })
})

app.listen(PORT,()=>{console.log("Conected to port "+PORT) })